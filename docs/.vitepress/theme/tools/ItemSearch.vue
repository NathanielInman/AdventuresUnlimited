<script setup lang="ts">
import { computed, markRaw, onBeforeUnmount, onMounted, ref, shallowRef, useId, watch } from 'vue';
import { withBase } from 'vitepress';
import areasSource from '../../../world/areas.md?raw';
import { formatNumber } from './lib/format';
import { areaKeys, loadArea, loadItemIndex, type IndexItem, type Item } from './lib/items';
import { useQueryState } from './lib/query-state';
import {
  CheckField,
  CopyLinkButton,
  DataTable,
  FieldGrid,
  LevelRangeField,
  MudText,
  NumberField,
  SelectField,
  ToolPanel,
  type Column,
  type SortState
} from './ui';
import ChipToggles from './items/ChipToggles.vue';
import ItemDetail from './items/ItemDetail.vue';
import ResultPager from './items/ResultPager.vue';
import { readLegacyQuery } from './items/legacy-query';
import {
  areaSlug,
  areaSortName,
  bonusSummary,
  defaultWeights,
  magicGroups,
  parseAreaAnchors,
  scoreOf,
  slotLabels,
  typeGroups,
  viewItem,
  weightStats,
  type ItemView,
  type TypeGroup
} from './items/model';

const PAGE_SIZE = 25;
const LEVEL_MAX = 120;
/** How long the text search waits for typing to pause */
const SEARCH_DELAY = 120;

const filterDefaults = {
  q: '',
  types: [] as string[],
  slot: '',
  weapon: '',
  staff: '',
  wand: '',
  pill: '',
  potion: '',
  scroll: '',
  other: '',
  from: '',
  level: [0, LEVEL_MAX],
  placed: false,
  test: false
};

const { state, set, hrefFor } = useQueryState({
  vnum: '',
  area: '',
  ...filterDefaults,
  ...defaultWeights,
  sort: '-score',
  page: 1
});

type FilterKey = keyof typeof filterDefaults;

/** Change filters and go back to the first page of results. */
function setFilter(patch: Partial<typeof filterDefaults>) {
  set({ ...patch, page: 1 } as Partial<typeof state>);
}

function resetFilters() {
  setFilter(JSON.parse(JSON.stringify(filterDefaults)));
  query.value = '';
}

function resetWeights() {
  set({ ...defaultWeights, page: 1 });
}

// The list comes from the item index, one small file fetched after mount.
// Views are built once and never made reactive: 11,000 of them behind Vue
// proxies would make every filter pass slow.
type ListView = ItemView<IndexItem>;

const views = shallowRef<readonly ListView[]>([]);
const areaNames = shallowRef(new Map<string, string>());
const loading = ref(true);
const failed = ref(false);
const pendingAreaName = ref<string | null>(null);

const byVnum = computed(() => new Map(views.value.map(view => [view.vnum, view])));

onMounted(async () => {
  // Old calculator links carry their filters under other names
  const legacy = readLegacyQuery(location.search);

  if (legacy) {
    history.replaceState(history.state, '', location.pathname + legacy.search + location.hash);
    Object.assign(state, legacy.patch);
    pendingAreaName.value = legacy.areaName;
  }

  const media = window.matchMedia('(max-width: 639px)');
  const onMedia = () => (narrow.value = media.matches);

  onMedia();
  media.addEventListener('change', onMedia);
  stopMedia = () => media.removeEventListener('change', onMedia);

  // A shared item link fetches its own area file straight away
  watch(() => [state.vnum, state.area] as const, ([vnum, area]) => loadDetail(vnum, area), { immediate: true });

  try {
    const index = await loadItemIndex();

    areaNames.value = index.areas;
    views.value = index.items.map(item => markRaw(viewItem(item)));
  } catch {
    failed.value = true;
  }
  loading.value = false;

  if (pendingAreaName.value) {
    const match = [...areaNames.value].find(([, name]) => name === pendingAreaName.value);

    if (match) state.from = match[0];
    pendingAreaName.value = null;
  }
});

let stopMedia: (() => void) | undefined;
const narrow = ref(false);

onBeforeUnmount(() => {
  stopMedia?.();
  clearTimeout(searchTimer);
});

// The text search updates the list a moment after typing pauses
const query = ref('');
let searchTimer: ReturnType<typeof setTimeout> | undefined;

watch(query, value => {
  clearTimeout(searchTimer);
  if (value === state.q) return;
  searchTimer = setTimeout(() => setFilter({ q: value }), SEARCH_DELAY);
});

watch(
  () => state.q,
  value => {
    if (value !== query.value) query.value = value;
  },
  { immediate: true }
);

// Scores and filtering
const weights = computed(() => weightStats.map(stat => Number(state[stat.key]) || 0));
const customWeights = computed(() => weightStats.some(stat => state[stat.key] !== stat.weight));

interface Row {
  id: string;
  view: ListView;
  score: number;
  level: number;
  name: string;
  kind: string;
  area: string;
}

function kindOf(view: ItemView): string {
  if (view.group === 'other' && view.slots.length) {
    const slot = slotLabels[view.slots[0]] ?? view.slots[0];

    return `${slot} ${view.typeLabel.toLowerCase()}`;
  }
  return view.kind;
}

// Sorting compares text the way DataTable does (English, numbers in
// numeric order), but through one Intl.Collator and only once per item:
// each text column becomes a rank, so sorting compares numbers.
// String.localeCompare with options builds its collator on every call,
// which made a sort of the full list take a third of a second.
const collator = new Intl.Collator('en', { numeric: true });

/** Each value's place in sorted order; values the test calls the same share a rank. */
function ranksOf(values: string[], order: number[], same: (a: string, b: string) => boolean): Int32Array {
  const ranks = new Int32Array(values.length);
  let rank = 0;

  order.forEach((index, at) => {
    if (at > 0 && !same(values[order[at - 1]], values[index])) rank++;
    ranks[index] = rank;
  });
  return ranks;
}

const sortedOrder = (values: string[]) => values.map((_, index) => index).sort((a, b) => collator.compare(values[a], values[b]));
const sameText = (a: string, b: string) => collator.compare(a, b) === 0;

const nameRanks = computed(() => {
  const names = views.value.map(view => view.plain);
  const order = sortedOrder(names);

  return {
    // The name column sorts case-insensitively; names that differ only in
    // case sit next to each other in the collator's order, so one sort serves both
    name: ranksOf(names, order, (a, b) => sameText(a.toLowerCase(), b.toLowerCase())),
    /** The tie-breaker tells case apart */
    exact: ranksOf(names, order, sameText)
  };
});

const kinds = computed(() => views.value.map(kindOf));
const rankOf = (values: string[]) => ranksOf(values, sortedOrder(values), sameText);
const kindRanks = computed(() => rankOf(kinds.value));
const areaRanks = computed(() => rankOf(views.value.map(view => areaSortName(view.areaName))));

const scores = computed(() => {
  const w = weights.value;

  return Float64Array.from(views.value, view => scoreOf(view, w));
});

const sortKeys = ['score', 'level', 'name', 'kind', 'area'] as const;

const sort = computed<SortState>(() => {
  const desc = state.sort.startsWith('-');
  const key = state.sort.replace(/^-/, '');

  return {
    key: (sortKeys as readonly string[]).includes(key) ? key : 'score',
    dir: desc ? 'desc' : 'asc'
  };
});

function onSort(next: SortState | null) {
  if (!next) return;
  set({ sort: `${next.dir === 'desc' ? '-' : ''}${next.key}`, page: 1 });
}

// The whole list in display order. It only changes with the sort or the
// weights; filtering walks it and keeps the order, so typing never sorts.
const ordered = computed(() => {
  const list = views.value;
  const score = scores.value;
  const names = nameRanks.value;
  const { key, dir } = sort.value;
  const sign = dir === 'asc' ? 1 : -1;
  const level = Int32Array.from(list, view => view.level);
  const primary: ArrayLike<number> =
    key === 'level'
      ? level
      : key === 'name'
        ? names.name
        : key === 'kind'
          ? kindRanks.value
          : key === 'area'
            ? areaRanks.value
            : score;

  return Int32Array.from(list.keys()).sort(
    (a, b) =>
      (primary[a] - primary[b]) * sign ||
      score[b] - score[a] ||
      level[b] - level[a] ||
      names.exact[a] - names.exact[b]
  );
});

const terms = computed(() => state.q.toLowerCase().split(/\s+/).filter(Boolean));

// One pass over the ordered list: the matches, and the count of each type
// among the items that pass every filter but the type ones (for the chips)
const matched = computed(() => {
  const list = views.value;
  const [low, high] = state.level;
  const { from, placed, test, slot, types, weapon, other } = state;
  const spellFilter: Record<string, string> = Object.fromEntries(magicGroups.map(group => [group, state[group]]));
  const words = terms.value;
  const counts = Object.fromEntries(typeGroups.map(group => [group.value, 0])) as Record<TypeGroup, number>;
  const hits: number[] = [];

  for (const index of ordered.value) {
    const view = list[index];

    if (from && view.areaKey !== from) continue;
    if (placed && !view.placed) continue;
    if (!test && view.testGear) continue;
    if (view.level < low || view.level > high) continue;
    if (slot && !view.slots.includes(slot)) continue;
    if (words.length && !words.every(word => view.haystack.includes(word))) continue;
    counts[view.group]++;
    if (types.length && !types.includes(view.group)) continue;
    if (view.group === 'weapon') {
      if (weapon && view.weaponClass !== weapon) continue;
    } else if (view.group === 'other') {
      if (other && view.type !== other) continue;
    } else if (view.group !== 'armor') {
      const spell = spellFilter[view.group];

      if (spell && !view.spells.includes(spell)) continue;
    }
    hits.push(index);
  }
  return { hits, counts };
});

const typeOptions = computed(() =>
  typeGroups.map(group => ({
    ...group,
    count: loading.value ? undefined : matched.value.counts[group.value]
  }))
);

const total = computed(() => matched.value.hits.length);
const pageCount = computed(() => Math.max(1, Math.ceil(total.value / PAGE_SIZE)));
const page = computed(() => Math.min(Math.max(1, Math.round(state.page) || 1), pageCount.value));

// Rows only for the page on screen
const pageRows = computed<Row[]>(() => {
  const list = views.value;

  return matched.value.hits.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE).map(index => {
    const view = list[index];

    return {
      id: view.id,
      view,
      score: scores.value[index],
      level: view.level,
      name: view.plain,
      kind: kinds.value[index],
      area: view.areaName
    };
  });
});

const results = ref<HTMLElement | null>(null);

function goToPage(next: number) {
  set({ page: next }, { push: true });
  const top = results.value?.getBoundingClientRect().top ?? 0;

  if (top < 0) results.value?.scrollIntoView({ block: 'start' });
}

// Columns: a narrow screen folds type, area and bonuses under the name. The
// table only sees one page, already in order, so its own sort keeps it.
const pageOrder = (row: Row) => pageRows.value.indexOf(row) * (sort.value.dir === 'asc' ? 1 : -1);

const allColumns: Column<Row>[] = [
  { key: 'name', label: 'Item', sortable: true, sortValue: pageOrder },
  { key: 'level', label: 'Level', align: 'right', sortable: true, width: '5rem', sortValue: pageOrder },
  { key: 'kind', label: 'Type', sortable: true, nowrap: true, sortValue: pageOrder },
  { key: 'area', label: 'Area', sortable: true, sortValue: pageOrder, width: '11rem' },
  { key: 'score', label: 'Score', align: 'right', sortable: true, width: '5.5rem', sortValue: pageOrder }
];

const columns = computed(() =>
  narrow.value
    ? allColumns
        .filter(column => ['name', 'level', 'score'].includes(column.key))
        .map(column => (column.key === 'name' ? column : { ...column, width: '4.5rem' }))
    : allColumns
);

function bonusesOf(view: ItemView): string {
  const parts: string[] = [];

  if (view.item.weapon) parts.push(`${view.item.weapon.dice[0]}d${view.item.weapon.dice[1]}`);
  if (view.spells.length) parts.push(`L${view.spellLevel ?? '?'} ${view.spells.join(', ')}`);
  const bonuses = bonusSummary(view);

  if (bonuses) parts.push(bonuses);
  return parts.join(' · ');
}

// Areas: a link to the areas page when it has a row for the area
const areaAnchors = parseAreaAnchors(areasSource);

function areaInfo(view: ItemView) {
  return areaAnchors.get(areaSlug(view.areaName)) ?? null;
}

function areaHref(view: ItemView): string | null {
  const info = areaInfo(view);

  return info ? withBase(`/world/areas.html#${info.slug}`) : null;
}

/** An area page link by area key, for the rooms and mobs an item's sources name. */
function areaHrefForKey(key: string): string | null {
  const name = detailView.value?.item.refs.areas[key] ?? areaNames.value.get(key);
  const info = name ? areaAnchors.get(areaSlug(name)) : null;

  return info ? withBase(`/world/areas.html#${info.slug}`) : null;
}

const itemHref = (view: ItemView) => hrefFor({ vnum: view.vnum, area: view.areaKey });

/** A link to any item by vnum; the area joins the link once the item is loaded. */
function itemHrefForVnum(vnum: number): string {
  const view = byVnum.value.get(String(vnum));

  return view ? itemHref(view) : hrefFor({ vnum: String(vnum), area: '' });
}

// Filter choices, from the data
const byName = (a: string, b: string) => a.localeCompare(b, 'en');

function optionsFrom(values: Iterable<string>, anyLabel: string, label = (value: string) => value) {
  return [
    { label: anyLabel, value: '' },
    ...[...new Set(values)].filter(Boolean).sort(byName).map(value => ({ label: label(value), value }))
  ];
}

const areaOptions = computed(() => {
  const sortedAreas = [...areaNames.value].sort((a, b) => byName(areaSortName(a[1]), areaSortName(b[1])));

  return [{ label: 'All areas', value: '' }, ...sortedAreas.map(([key, name]) => ({ label: name, value: key }))];
});

const slotOptions = computed(() => {
  const present = new Set(views.value.flatMap(view => view.slots));

  return [
    { label: 'Any slot', value: '' },
    ...Object.entries(slotLabels)
      .filter(([slot]) => present.has(slot))
      .map(([value, label]) => ({ label, value }))
  ];
});

// Each type's own filter, built once from the data
const allSubFilters = computed(() => {
  const capital = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
  const groupViews = (group: TypeGroup) => views.value.filter(view => view.group === group);
  const list: { key: FilterKey; group: TypeGroup; label: string; options: { label: string; value: string }[] }[] = [
    {
      key: 'weapon',
      group: 'weapon',
      label: 'Weapon class',
      options: optionsFrom(groupViews('weapon').map(view => view.weaponClass), 'Any class', capital)
    },
    ...magicGroups.map(group => ({
      key: group as FilterKey,
      group: group as TypeGroup,
      label: `${typeGroups.find(entry => entry.value === group)!.label.replace(/s$/, '').replace('Stave', 'Staff')} spell`,
      options: optionsFrom(groupViews(group).flatMap(view => view.spells), 'Any spell')
    })),
    {
      key: 'other',
      group: 'other',
      label: 'Other kind',
      options: optionsFrom(groupViews('other').map(view => view.type), 'Any kind', value => capital(value.replace(/_/g, ' ')))
    }
  ];

  return list;
});

// Show a type's own filter when the type is picked, or when it is set
const subFilters = computed(() =>
  allSubFilters.value.filter(entry => state.types.includes(entry.group) || state[entry.key] !== '')
);

const testGearHint = computed(() => {
  const count = views.value.filter(view => view.testGear).length;

  return `${count ? `${formatNumber(count)} items` : 'A few items'} built for immortals or testing: above level 110, more than +100 hit or damage, or weapon dice averaging over 1,000.`;
});

const placedHint = computed(() => {
  const count = views.value.filter(view => !view.placed).length;

  return `Hides ${count ? formatNumber(count) : 'the'} items no reset, shop, script or quest loads: crafted things, staff gifts and leftovers.`;
});

const filtersActive = computed(() =>
  (Object.keys(filterDefaults) as FilterKey[]).some(
    key => JSON.stringify(state[key]) !== JSON.stringify(filterDefaults[key])
  )
);

// The detail view: vnums are unique in the game, so the vnum alone finds the
// item. It needs the full item, so it loads the item's area file: the one
// the link names, or the one the index puts the vnum in.
const detailView = shallowRef<ItemView<Item> | null>(null);
const detailLoading = ref(false);
let detailToken = 0;

async function findItem(vnum: string, area: string): Promise<Item | undefined> {
  const inArea = async (key: string) => (await loadArea(key)).find(item => String(item.vnum) === vnum);

  if (area && areaKeys.includes(area)) {
    const item = await inArea(area);

    if (item) return item;
  }
  const entry = (await loadItemIndex()).items.find(item => String(item.vnum) === vnum);

  return entry && entry.areaKey !== area ? inArea(entry.areaKey) : undefined;
}

async function loadDetail(vnum: string, area: string) {
  const token = ++detailToken;

  if (!vnum) {
    detailLoading.value = false;
    return;
  }
  if (detailView.value?.vnum === vnum) return;
  detailLoading.value = true;
  let found: Item | undefined;

  try {
    found = await findItem(vnum, area);
  } catch {
    found = undefined;
  }
  if (token !== detailToken) return;
  detailView.value = found ? markRaw(viewItem(found)) : null;
  detailLoading.value = false;
}

const detail = computed(() => {
  if (!state.vnum) return null;
  return { view: detailView.value?.vnum === state.vnum ? detailView.value : null };
});

const detailScore = computed(() => (detail.value?.view ? scoreOf(detail.value.view, weights.value) : 0));
const listHref = computed(() => hrefFor({ vnum: '', area: '' }));

// Back to the list: the browser's back restores the scroll position, so use
// it when the detail was opened from the list
const openedFromList = ref(false);
const lastViewed = ref<string | null>(null);

function openItem(event: MouseEvent, view: ItemView) {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return;
  openedFromList.value = true;
  lastViewed.value = view.id;
}

function backToList(event: MouseEvent) {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return;
  if (openedFromList.value) {
    event.preventDefault();
    openedFromList.value = false;
    history.back();
  }
}

watch(
  () => state.vnum,
  vnum => {
    if (vnum) lastViewed.value = vnum;
  }
);

const searchId = useId();
const resultsId = useId();
const totalText = computed(() => `${formatNumber(total.value)} ${total.value === 1 ? 'item' : 'items'}`);

const sortLabel = computed(() => {
  const names: Record<string, string> = { score: 'score', level: 'level', name: 'name', kind: 'type', area: 'area' };

  return `${names[sort.value.key]}, ${sort.value.dir === 'desc' ? 'highest first' : 'lowest first'}`;
});
</script>

<template>
  <div class="au-tool item-search">
    <template v-if="state.vnum">
      <p class="back">
        <a :href="listHref" @click="backToList">
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          All items
        </a>
      </p>

      <ToolPanel v-if="!detail?.view" :title="detailLoading ? 'Loading the item' : 'No such item'">
        <div v-if="detailLoading" class="loading" role="status">
          <div class="bar busy"><span /></div>
          <p class="au-hint">Fetching the item data.</p>
        </div>
        <p v-else class="empty-text">
          No item has vnum {{ state.vnum }}. The item data covers every object the game loads, so this one
          is gone from the game or never was in it.
        </p>
      </ToolPanel>

      <ToolPanel v-else>
        <ItemDetail
          :view="detail.view"
          :weights="weights"
          :score="detailScore"
          :area="areaInfo(detail.view)"
          :area-href="areaHref(detail.view)"
          :item-href="itemHrefForVnum"
          :area-href-for="areaHrefForKey"
        />
      </ToolPanel>
    </template>

    <template v-else>
      <ToolPanel title="Find items">
        <template #actions>
          <button v-if="filtersActive" type="button" class="au-button" @click="resetFilters">Clear filters</button>
          <CopyLinkButton />
        </template>

        <div class="top-row">
          <div class="au-field search">
            <label class="au-label" :for="searchId">Search</label>
            <input
              :id="searchId"
              v-model="query"
              class="au-control"
              type="search"
              autocomplete="off"
              spellcheck="false"
              placeholder="Name, keyword or vnum"
              :aria-describedby="resultsId"
            >
          </div>
          <SelectField
            class="area"
            label="Area"
            :model-value="state.from"
            :options="areaOptions"
            @update:model-value="value => setFilter({ from: String(value) })"
          />
          <LevelRangeField
            class="levels"
            :model-value="state.level"
            :max="LEVEL_MAX"
            @update:model-value="value => setFilter({ level: value })"
          />
        </div>

        <ChipToggles
          label="Type"
          :model-value="state.types"
          :options="typeOptions"
          @update:model-value="value => setFilter({ types: value })"
        />

        <FieldGrid min="13rem">
          <SelectField
            label="Worn on"
            :model-value="state.slot"
            :options="slotOptions"
            @update:model-value="value => setFilter({ slot: String(value) })"
          />
          <SelectField
            v-for="entry in subFilters"
            :key="entry.key"
            :label="entry.label"
            :model-value="state[entry.key] as string"
            :options="entry.options"
            @update:model-value="value => setFilter({ [entry.key]: String(value) })"
          />
        </FieldGrid>

        <CheckField
          label="Only items placed in the world"
          :hint="placedHint"
          :model-value="state.placed"
          @update:model-value="value => setFilter({ placed: value })"
        />
        <CheckField
          label="Include immortal and test gear"
          :hint="testGearHint"
          :model-value="state.test"
          @update:model-value="value => setFilter({ test: value })"
        />
      </ToolPanel>

      <details class="weights" :open="customWeights || undefined">
        <summary>
          <span class="summary-title">Score weights</span>
          <span class="summary-hint">{{ customWeights ? 'Custom' : 'Defaults' }}: each point of a stat adds its weight to the score</span>
        </summary>
        <div class="weights-body">
          <FieldGrid min="8.5rem">
            <NumberField
              v-for="stat in weightStats"
              :key="stat.key"
              :label="stat.label"
              :model-value="state[stat.key]"
              :min="-100"
              :max="100"
              @update:model-value="value => set({ [stat.key]: value, page: 1 })"
            />
          </FieldGrid>
          <div class="au-row">
            <button type="button" class="au-button" :disabled="!customWeights" @click="resetWeights">Reset to defaults</button>
            <p class="au-hint">
              Defaults: 7 for each stat point and damroll, 4 for hitroll, 1 per hit point or mana, 0 for moves.
            </p>
          </div>
        </div>
      </details>

      <section ref="results" class="results" aria-label="Results">
        <div class="results-head">
          <p :id="resultsId" class="count" aria-live="polite">
            <template v-if="loading">Loading items</template>
            <template v-else-if="failed">The item data didn't load. Reload the page to try again.</template>
            <template v-else><strong>{{ totalText }}</strong> <span class="sort-note">sorted by {{ sortLabel }}</span></template>
          </p>
        </div>

        <div v-if="loading" class="loading" role="status">
          <div class="bar busy"><span /></div>
          <p class="au-hint">Fetching the item list.</p>
          <div class="skeleton" aria-hidden="true">
            <span v-for="n in 8" :key="n" />
          </div>
        </div>

        <div v-else-if="!failed && !total" class="empty">
          <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true">
            <circle cx="21" cy="21" r="12" fill="none" stroke="currentColor" stroke-width="3" />
            <path d="M30 30l9 9" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
          </svg>
          <p class="empty-title">No items match</p>
          <p class="au-hint">
            <template v-if="state.q">Nothing is called "{{ state.q }}" with these filters. </template>
            Try a wider level range, another area or fewer types.
          </p>
          <button type="button" class="au-button" @click="resetFilters">Clear filters</button>
        </div>

        <template v-else-if="!failed">
          <DataTable
            :columns="columns"
            :rows="pageRows"
            row-key="id"
            :sort="sort"
            :highlight="row => row.id === lastViewed"
            caption="Items matching the filters"
            max-height="none"
            @update:sort="onSort"
          >
            <template #cell-name="{ row }">
              <a class="item-link" :href="itemHref(row.view)" @click="openItem($event, row.view)"><MudText :text="row.view.name" /></a>
              <span v-if="!row.view.placed" class="flag">not placed</span>
              <span v-if="narrow" class="meta">{{ row.kind }} · {{ row.area }}</span>
              <span v-if="bonusesOf(row.view)" class="meta bonuses">{{ bonusesOf(row.view) }}</span>
            </template>
            <template #cell-area="{ row }">
              <a v-if="areaHref(row.view)" class="area-link" :href="areaHref(row.view)!">{{ row.area }}</a>
              <template v-else>{{ row.area }}</template>
            </template>
            <template #cell-score="{ row }">
              <strong class="score">{{ formatNumber(row.score) }}</strong>
            </template>
          </DataTable>

          <ResultPager
            :page="page"
            :page-size="PAGE_SIZE"
            :total="total"
            :href-for="next => hrefFor({ page: next })"
            noun="items"
            @go="goToPage"
          />
        </template>
      </section>
    </template>
  </div>
</template>

<style scoped>
.item-search {
  scroll-margin-top: calc(var(--vp-nav-height) + 16px);
}

.top-row {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) minmax(16rem, 1.2fr);
  gap: 16px 20px;
  align-items: start;
}

@media (max-width: 959px) {
  .top-row {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  .top-row .search {
    grid-column: 1 / -1;
  }
}

@media (max-width: 639px) {
  .top-row {
    grid-template-columns: minmax(0, 1fr);
  }
}

.back.back {
  margin: 0 0 12px;
  font-size: 14px;
}

.back a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  text-decoration: none;
}

.back a:hover {
  text-decoration: underline;
}

/* Score weights: a panel that folds away */
.weights {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
}

.weights summary {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 2px 12px;
  padding: 14px 20px 14px 44px;
  position: relative;
  list-style: none;
  cursor: pointer;
  border-radius: 12px;
}

.weights summary::-webkit-details-marker {
  display: none;
}

/* A chevron that turns, so open and closed differ by shape */
.weights summary::before {
  content: '';
  position: absolute;
  left: 22px;
  top: 21px;
  width: 7px;
  height: 7px;
  border: solid var(--vp-c-text-2);
  border-width: 0 2px 2px 0;
  transform: rotate(-45deg);
  transition: transform 0.2s;
}

.weights[open] summary::before {
  transform: rotate(45deg);
  top: 18px;
}

.weights summary:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.summary-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.summary-hint {
  font-size: 13px;
  line-height: 20px;
  color: var(--vp-c-text-2);
}

.weights-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 20px 20px;
}

.weights-body .au-hint {
  flex: 1 1 16rem;
}

.au-button:disabled {
  opacity: 0.45;
  cursor: default;
}

/* Results */
.results {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
  scroll-margin-top: calc(var(--vp-nav-height) + 16px);
}

.count.count {
  margin: 0;
  font-size: 15px;
  line-height: 24px;
}

.sort-note {
  color: var(--vp-c-text-2);
}

.item-link {
  font-weight: 500;
  text-decoration: none;
}

.item-link:hover {
  text-decoration: underline;
}

/* Item names keep their game colors, which are tuned for both themes, but
   wrap like text */
.item-link :deep(.au-mud) {
  white-space: normal;
  overflow-wrap: anywhere;
}

.area-link {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.area-link:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

.meta {
  display: block;
  margin-top: 2px;
  font-size: 13px;
  line-height: 19px;
  color: var(--vp-c-text-2);
}

.flag {
  margin-left: 8px;
  padding: 0 6px;
  border: 1px dashed var(--vp-c-text-3);
  border-radius: 6px;
  font-size: 12px;
  line-height: 18px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.bonuses {
  font-variant-numeric: tabular-nums;
}

.score {
  font-weight: 600;
}

/* Loading and empty states */
.loading {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bar {
  height: 4px;
  border-radius: 2px;
  background-color: var(--vp-c-default-soft);
  overflow: hidden;
}

.bar span {
  display: block;
  height: 100%;
  background-color: var(--vp-c-brand-1);
}

/* One request with no progress to show: a stripe that slides across */
.bar.busy span {
  width: 30%;
  animation: busy 1.2s ease-in-out infinite;
}

@keyframes busy {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(340%);
  }
}

.skeleton {
  display: flex;
  flex-direction: column;
  gap: 1px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--vp-c-divider);
}

.skeleton span {
  height: 38px;
  background: linear-gradient(90deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 50%, var(--vp-c-bg) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.4s linear infinite;
}

@keyframes shimmer {
  from {
    background-position: 100% 0;
  }

  to {
    background-position: -100% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton span {
    animation: none;
  }

  .bar.busy span {
    width: 100%;
    animation: none;
    opacity: 0.5;
  }
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 40px 20px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  text-align: center;
  color: var(--vp-c-text-3);
}

.empty-title.empty-title {
  margin: 4px 0 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.empty .au-hint {
  max-width: 28rem;
}

.empty .au-button {
  margin-top: 8px;
}

.empty-text.empty-text {
  margin: 0;
  font-size: 14px;
  line-height: 22px;
}
</style>
