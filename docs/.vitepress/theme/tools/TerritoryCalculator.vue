<script setup lang="ts">
import { computed, ref } from 'vue';
import { withBase } from 'vitepress';
import { formatCount, formatNumber } from './lib/format';
import { useQueryState } from './lib/query-state';
import { territoryAreas, type TerritoryArea } from './territory/areas';
import { parseTerritory, sampleTerritory, type Holding } from './territory/parse';
import {
  CopyLinkButton,
  DataTable,
  LevelRangeField,
  SegmentedField,
  StatReadout,
  TextAreaField,
  ToolPanel,
  type Column,
  type SortState
} from './ui';

// The paste stays out of the URL (it can run to a hundred lines); the filters
// and the sort go in it.
const { state } = useQueryState({ level: [0, 110], own: 'open', sort: 'level', dir: 'asc' });

const paste = ref('');
const parsed = computed(() => parseTerritory(paste.value));
const hasPaste = computed(() => parsed.value.lineCount > 0);

// `territory list` (immortals) names every owner; `territory clan` only
// shows your own clan's areas, so the rest are just "not yours"
const byClan = computed(() => parsed.value.kind === 'list');
const isAll = computed(() => parsed.value.kind === 'all');

interface Row {
  area: TerritoryArea;
  holding: Holding | null;
  held: boolean;
  owner: string;
}

const rows = computed<Row[]>(() =>
  territoryAreas.map(area => {
    const holding = isAll.value ? null : (parsed.value.holdings.get(area.name) ?? null);
    const held = byClan.value ? Boolean(holding?.clan) : Boolean(holding);
    const owner = byClan.value
      ? (holding?.clan ?? 'Unclaimed')
      : held
        ? 'Your clan'
        : 'Not yours';

    return { area, holding, held, owner };
  })
);

const heldCount = computed(() => rows.value.filter(row => row.held).length);

const ownOptions = computed(() =>
  byClan.value
    ? [
        { label: 'Unclaimed', value: 'open' },
        { label: 'Claimed', value: 'held' },
        { label: 'All', value: 'all' }
      ]
    : [
        { label: 'Not yours', value: 'open' },
        { label: 'Your clan\'s', value: 'held' },
        { label: 'All', value: 'all' }
      ]
);

const showOwnership = computed(() => hasPaste.value && !isAll.value);

const visible = computed(() => {
  const [low, high] = state.level;

  return rows.value.filter(row => {
    if (row.area.max < low || row.area.min > high) return false;
    if (!showOwnership.value || state.own === 'all') return true;
    return state.own === 'held' ? row.held : !row.held;
  });
});

const levelSort = (row: Row) => row.area.min * 1000 + row.area.max;

const columns = computed<Column<Row>[]>(() => [
  {
    key: 'area',
    label: 'Area',
    sortable: true,
    sortValue: row => row.area.name.replace(/^the\s+/i, '')
  },
  { key: 'level', label: 'Level', align: 'right', sortable: true, sortValue: levelSort, width: '6.5rem', nowrap: true },
  // Every row would say "Not yours" when that's the filter
  ...(showOwnership.value && (byClan.value || state.own !== 'open')
    ? [{ key: 'owner', label: 'Owner', sortable: true, sortValue: (row: Row) => `${row.held ? 0 : 1}${row.owner}` }]
    : [])
]);

const sort = computed<SortState>({
  get: () => ({ key: state.sort, dir: state.dir === 'desc' ? 'desc' : 'asc' }),
  set: value => {
    state.sort = value?.key ?? 'level';
    state.dir = value?.dir ?? 'asc';
  }
});

const areaHref = (area: TerritoryArea) => withBase(`/world/areas.html#${area.anchor}`);

// The docs call some areas something else ("Kallendale" is Kallendale
// Forest); say so when it's more than a leading "The"
const strip = (name: string) => name.toLowerCase().replace(/^the\s+/, '').replace(/[^a-z0-9]+/g, '');
const docNameNote = (area: TerritoryArea) => (strip(area.name) === strip(area.docName) ? '' : area.docName);

const status = computed(() => {
  const { lineCount, unknown } = parsed.value;

  if (!paste.value.trim()) return '';
  if (!lineCount) return 'No area lines found. They start with a number in brackets, like [  1] Eastern Moors.';
  if (isAll.value) {
    return `That's territory all, which lists every area a clan can conquer. Paste territory clan to see which are yours.`;
  }
  const read = formatCount(lineCount - unknown.length, 'area');

  return byClan.value ? `Read ${read} from territory list.` : `Read ${read} your clan holds.`;
});

const placeholder = '[  1] Eastern Moors\n[  2] Hagarth\n[  3] The Bog of Durlah';

function loadSample() {
  paste.value = sampleTerritory;
}
</script>

<template>
  <div class="au-tool territory">
    <ToolPanel title="Your clan's territory">
      <template #actions>
        <button type="button" class="au-button" @click="loadSample">Load an example</button>
        <button v-if="paste" type="button" class="au-button" @click="paste = ''">Clear</button>
      </template>
      <TextAreaField
        v-model="paste"
        label="Output of territory clan"
        :rows="8"
        mono
        :placeholder="placeholder"
        hint="Type territory clan in the game and paste everything it prints. A leader's list, with flag rooms, works too."
      />
      <p v-if="status" class="status" aria-live="polite">{{ status }}</p>
      <div v-if="parsed.unknown.length" class="unknown" role="note">
        <p class="unknown-title">
          {{ formatCount(parsed.unknown.length, 'name') }} the tool doesn't know
        </p>
        <ul>
          <li v-for="name in parsed.unknown" :key="name"><code>{{ name }}</code></li>
        </ul>
        <p class="au-hint">
          The area list comes from the game's area files. A name here means an area was added or renamed
          since, so it's missing from the table below.
        </p>
      </div>
    </ToolPanel>

    <ToolPanel title="Areas">
      <template #actions><CopyLinkButton /></template>
      <div class="filters">
        <LevelRangeField v-model="state.level" class="level" hint="Shows areas whose range overlaps these levels." />
        <SegmentedField v-if="showOwnership" v-model="state.own" label="Show" :options="ownOptions" />
      </div>
      <div class="au-stats" aria-live="polite">
        <template v-if="showOwnership">
          <StatReadout
            :label="byClan ? 'Unclaimed' : 'Not yours'"
            :value="territoryAreas.length - heldCount"
            unit="areas"
            primary
          />
          <StatReadout :label="byClan ? 'Claimed' : 'Your clan holds'" :value="heldCount" unit="areas" />
        </template>
        <StatReadout v-else label="Can be conquered" :value="territoryAreas.length" unit="areas" primary />
        <StatReadout label="In the table" :value="visible.length" :unit="`of ${formatNumber(territoryAreas.length)}`" />
      </div>
    </ToolPanel>

    <DataTable
      v-model:sort="sort"
      :columns="columns"
      :rows="visible"
      :row-key="row => row.area.name"
      :highlight="row => showOwnership && state.own === 'all' && row.held"
      caption="Conquerable areas"
      max-height="36rem"
      empty-text="No area matches these filters."
    >
      <template #cell-area="{ row }">
        <a :href="areaHref(row.area)">{{ row.area.name }}</a>
        <span v-if="docNameNote(row.area)" class="aka">{{ docNameNote(row.area) }} in the docs</span>
      </template>
      <template #cell-level="{ row }">{{ row.area.label }}</template>
      <template #cell-owner="{ row }">
        <span class="owner" :class="{ muted: !row.held }">{{ row.owner }}</span>
        <span v-if="row.holding?.by || row.holding?.flagRoom" class="aka">
          <template v-if="row.holding?.by">by {{ row.holding.by }}</template><template v-if="row.holding?.by && row.holding?.flagRoom">, </template><template v-if="row.holding?.flagRoom">flag in {{ row.holding.flagRoom }}</template>
        </span>
      </template>
    </DataTable>
  </div>
</template>

<style scoped>
.filters {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 16px 32px;
}

@media (max-width: 719px) {
  .filters {
    grid-template-columns: minmax(0, 1fr);
  }
}

.status {
  margin: -8px 0 0;
  font-size: 14px;
  line-height: 22px;
  color: var(--vp-c-text-2);
}

.unknown {
  padding: 12px 16px;
  border: 1px solid var(--vp-c-warning-2);
  border-left-width: 4px;
  border-radius: 8px;
  background-color: var(--vp-c-warning-soft);
}

.unknown-title.unknown-title {
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
}

.unknown ul {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 8px;
  margin: 0 0 8px;
  padding: 0;
  list-style: none;
}

.unknown li {
  margin: 0;
}

.au-stats {
  margin: 0;
}

.aka {
  display: block;
  font-size: 13px;
  line-height: 18px;
  color: var(--vp-c-text-2);
}

.owner {
  white-space: nowrap;
}

.muted {
  color: var(--vp-c-text-2);
}
</style>
