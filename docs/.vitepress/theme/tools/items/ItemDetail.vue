<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue';
import { formatNumber, formatSigned } from '../lib/format';
import { MudText, StatReadout } from '../ui';
import {
  conditionOf,
  flagValue,
  qualityOf,
  readFlag,
  slotLabels,
  weightStats,
  type AreaInfo,
  type ItemView
} from './model';

// Everything the item data knows about one item, in the order a player
// reads lore output: what it is, what it gives, what it's made of, where it
// comes from.
const props = defineProps<{
  view: ItemView;
  weights: number[];
  score: number;
  area: AreaInfo | null;
  areaHref: string | null;
  /** Items with the same vnum in other area files */
  twins: { view: ItemView; href: string }[];
}>();

const item = computed(() => props.view.item);

// Weight is in tenths of a pound; identify prints weight / 10
const pounds = computed(() => {
  const tenths = Number(item.value.weight);

  if (!Number.isFinite(tenths)) return null;
  return Math.floor(tenths / 10);
});

const cost = computed(() => {
  const value = Number(item.value.cost);

  return Number.isFinite(value) ? { gold: Math.floor(value / 100), silver: value % 100 } : null;
});

const bonusRows = computed(() =>
  props.view.affects.map(affect => {
    const weight = affect.stat >= 0 ? props.weights[affect.stat] : null;

    return { ...affect, weight, points: weight === null ? null : weight * affect.amount };
  })
);

const armorClass = computed(() => {
  if (props.view.group !== 'armor') return null;
  return ['pierce', 'bash', 'slash', 'vs magic'].map(kind => ({
    kind: kind === 'vs magic' ? 'Magic' : kind[0].toUpperCase() + kind.slice(1),
    value: Number(flagValue(item.value, `${kind}:`) ?? 0)
  }));
});

const weapon = computed(() => {
  if (props.view.group !== 'weapon') return null;
  const dice = flagValue(item.value, 'damage') ?? '';
  const match = /^(\d+)d(\d+)$/.exec(dice);
  const average = match ? (Number(match[1]) * (Number(match[2]) + 1)) / 2 : null;
  const specials = (flagValue(item.value, 'special type') ?? '').split(',').filter(Boolean);

  return {
    weaponClass: flagValue(item.value, 'weapon class') ?? '',
    dice,
    average,
    attack: flagValue(item.value, 'weapon type') ?? '',
    specials
  };
});

const charges = computed(() => {
  if (!['wand', 'staff'].includes(props.view.group)) return null;
  return {
    left: Number(flagValue(item.value, 'charges left') ?? 0),
    total: Number(flagValue(item.value, 'charges total') ?? 0)
  };
});

const containerFlagNames = ['closeable', 'pickproof', 'closed', 'locked', 'put on'];

// The generator labelled value 0 "container weight" and value 3 "container
// capacity", but identify prints value 0 as the capacity and value 3 as the
// maximum weight.
const container = computed(() => {
  if (item.value.itemType !== 'container') return null;
  const values = item.value.values;
  const flags = readFlag(values[1]);

  return {
    capacity: Number(values[0]),
    maxWeight: Number(values[3]),
    multiplier: Number(values[4]),
    key: Number(values[2]),
    flags: containerFlagNames.filter((_, bit) => flags & (1 << bit))
  };
});

// Lights: value 2 is the hours left, -1 (every flag bit) for one that never
// burns out. The item data decoded that as 67,108,926.
const lightHours = computed(() => {
  if (item.value.itemType !== 'light') return null;
  return readFlag(item.value.values[2]);
});

const drink = computed(() => {
  if (item.value.itemType !== 'drink') return null;
  return {
    liquid: (flagValue(item.value, 'drink liquid type') ?? '').replace(/'/g, ''),
    left: Number(item.value.values[1]),
    total: Number(item.value.values[0])
  };
});

const lockpick = computed(() =>
  item.value.itemType === 'lockpick' ? readFlag(item.value.values[0]) : null
);

const furniture = computed(() => {
  if (item.value.itemType !== 'furniture') return null;
  const { maxPeople, maxWeight, healBonus, manaBonus, flags } = item.value.furniture;

  return { maxPeople, maxWeight, healBonus, manaBonus, flags };
});

const alignment = computed(() => {
  const flags = item.value.extraflags;
  const banned = ['good', 'neutral', 'evil'].filter(side => flags.includes(`anti${side}`));

  if (!banned.length) return null;
  const allowed = ['good', 'neutral', 'evil'].filter(side => !banned.includes(side));

  return allowed.length ? `Only ${allowed.join(' or ')} characters` : 'Nobody';
});

const flagNotes: Record<string, string> = {
  noremove: "can't be removed once worn",
  nodrop: "can't be dropped",
  noid: "can't be identified",
  meltdrop: 'melts when dropped',
  rotdeath: 'crumbles when its owner dies',
  sellextract: 'destroyed when sold',
  area_only: "can't leave its area",
  nolocate: "can't be found with locate object",
  nouncurse: "can't be uncursed"
};

const otherFlags = computed(() =>
  item.value.extraflags.filter(flag => !/^anti(good|neutral|evil)$/.test(flag))
);

const notes = computed(() =>
  item.value.extraflags.filter(flag => flagNotes[flag]).map(flag => flagNotes[flag])
);

const limit = computed(() => {
  const allowed = item.value.totalAllowed;

  if (!allowed || allowed === 'unlimited') return null;
  return Number(allowed);
});

const areaLevels = computed(() => {
  const levels = props.area?.levels ?? '';

  if (!levels) return '';
  if (levels === 'HERO') return 'an area for heroes';
  if (levels === 'ALL') return 'an area for every level';
  if (/^\d/.test(levels)) return `an area for levels ${levels}`;
  return '';
});

const quality = computed(() => qualityOf(item.value.quality));
const condition = computed(() => conditionOf(item.value));
const material = computed(() => item.value.submaterial.filter(Boolean).join(' '));
const materialGroup = computed(() => item.value.material.filter(Boolean).join(' '));
const slots = computed(() => props.view.slots.map(slot => slotLabels[slot] ?? slot));

const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

// Copies a link to just this item, without the list's filters
async function copyItemLink() {
  const url = `${location.origin}${location.pathname}?vnum=${encodeURIComponent(props.view.vnum)}&area=${encodeURIComponent(props.view.areaKey)}`;

  try {
    await navigator.clipboard.writeText(url);
  } catch {
    const input = document.createElement('textarea');

    input.value = url;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
  }
  copied.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = false), 2000);
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <article class="detail" :aria-labelledby="`item-${view.id}`">
    <header class="head">
      <div class="titles">
        <h2 :id="`item-${view.id}`" class="name"><MudText :text="view.name" /></h2>
        <p class="sub">
          {{ view.typeLabel }}<template v-if="slots.length">, {{ slots.join(', ').toLowerCase() }}</template>
          <span class="dot" aria-hidden="true">·</span>
          <template v-if="areaHref"><a :href="areaHref">{{ view.areaName }}</a></template>
          <template v-else>{{ view.areaName }}</template>
          <span class="dot" aria-hidden="true">·</span>
          vnum {{ view.vnum }}
        </p>
      </div>
      <button type="button" class="au-button" @click="copyItemLink">
        <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16">
          <path v-if="copied" d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <g v-else fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
            <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
          </g>
        </svg>
        <span>{{ copied ? 'Link copied' : 'Copy item link' }}</span>
        <span class="au-visually-hidden" aria-live="polite">{{ copied ? 'Link to this item copied to the clipboard' : '' }}</span>
      </button>
    </header>

    <div v-if="!view.loaded" class="warning" role="note">
      <strong>Not in the game.</strong>
      {{ view.areaName }} is in the source tree but not in the game's area list, so this item can't drop.
      <template v-if="twins.some(twin => twin.view.loaded)">
        In play, vnum {{ view.vnum }} is
        <template v-for="twin in twins.filter(t => t.view.loaded)" :key="twin.view.id">
          <a :href="twin.href"><MudText :text="twin.view.name" /></a> from {{ twin.view.areaName }}.
        </template>
      </template>
    </div>

    <p v-if="item.long" class="long"><MudText :text="item.long" /></p>

    <div class="au-stats readouts">
      <StatReadout label="Score" :value="score" primary />
      <StatReadout label="Level" :value="view.level" />
      <StatReadout label="Weight" :value="pounds === null ? '?' : pounds" :unit="pounds === null ? undefined : 'lb'" />
      <StatReadout label="Value" :value="cost ? cost.gold : '?'" :unit="cost ? `gold${cost.silver ? `, ${cost.silver} silver` : ''}` : undefined" />
    </div>

    <div class="grid">
      <section v-if="bonusRows.length" class="card">
        <h3 class="card-title">Bonuses</h3>
        <table class="mini">
          <caption class="au-visually-hidden">Stat bonuses and how much each adds to the score</caption>
          <thead>
            <tr>
              <th scope="col">Stat</th>
              <th scope="col" class="num">Bonus</th>
              <th scope="col" class="num">Weight</th>
              <th scope="col" class="num">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in bonusRows" :key="index">
              <th scope="row">{{ row.label }}</th>
              <td class="num">{{ formatSigned(row.amount) }}</td>
              <td class="num muted">{{ row.weight === null ? '-' : `× ${row.weight}` }}</td>
              <td class="num">{{ row.points === null ? '-' : formatNumber(row.points) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colspan="3">Total</th>
              <td class="num"><strong>{{ formatNumber(score) }}</strong></td>
            </tr>
          </tfoot>
        </table>
        <p v-if="bonusRows.some(row => row.weight === null)" class="au-hint">
          The score only counts the {{ weightStats.length }} weighted stats; the rest are shown as they are.
        </p>
      </section>

      <section v-if="armorClass" class="card">
        <h3 class="card-title">Armor class</h3>
        <dl class="ac">
          <div v-for="entry in armorClass" :key="entry.kind">
            <dt>{{ entry.kind }}</dt>
            <dd>{{ formatNumber(entry.value) }}</dd>
          </div>
        </dl>
      </section>

      <section v-if="weapon" class="card">
        <h3 class="card-title">Weapon</h3>
        <dl class="facts">
          <div><dt>Class</dt><dd>{{ weapon.weaponClass }}</dd></div>
          <div>
            <dt>Damage</dt>
            <dd>
              {{ weapon.dice }}<template v-if="weapon.average !== null">, {{ formatNumber(weapon.average, weapon.average % 1 ? 1 : 0) }} on average</template>
            </dd>
          </div>
          <div><dt>Attack</dt><dd>{{ weapon.attack }}</dd></div>
          <div v-if="weapon.specials.length">
            <dt>Special</dt>
            <dd class="tags"><span v-for="special in weapon.specials" :key="special" class="tag">{{ special }}</span></dd>
          </div>
        </dl>
      </section>

      <section v-if="view.spells.length" class="card">
        <h3 class="card-title">{{ charges ? 'Charges' : 'Spells' }}</h3>
        <p class="spells">
          <template v-if="charges">
            {{ charges.left }} of {{ charges.total }} charges of level {{ view.spellLevel }}
          </template>
          <template v-else>Level {{ view.spellLevel }} spells of</template>
        </p>
        <ul class="spell-list">
          <li v-for="spell in view.spells" :key="spell">{{ spell }}</li>
        </ul>
      </section>

      <section v-if="container" class="card">
        <h3 class="card-title">Container</h3>
        <dl class="facts">
          <div><dt>Capacity</dt><dd>{{ formatNumber(container.capacity) }}</dd></div>
          <div><dt>Maximum weight</dt><dd>{{ formatNumber(container.maxWeight) }}</dd></div>
          <div v-if="container.multiplier !== 100"><dt>Weight multiplier</dt><dd>{{ container.multiplier }}%</dd></div>
          <div v-if="container.flags.length"><dt>Flags</dt><dd>{{ container.flags.join(', ') }}</dd></div>
        </dl>
      </section>

      <section v-if="lightHours !== null" class="card">
        <h3 class="card-title">Light</h3>
        <p class="spells">{{ lightHours < 0 ? 'Never burns out' : `Burns for ${formatNumber(lightHours)} hours` }}</p>
      </section>

      <section v-if="drink" class="card">
        <h3 class="card-title">Drink</h3>
        <p class="spells">{{ drink.left }} of {{ drink.total }} drinks of {{ drink.liquid }}</p>
      </section>

      <section v-if="lockpick !== null" class="card">
        <h3 class="card-title">Lockpick</h3>
        <p class="spells">Adds {{ lockpick }}% to pick locks</p>
      </section>

      <section v-if="furniture" class="card">
        <h3 class="card-title">Furniture</h3>
        <dl class="facts">
          <div><dt>Holds</dt><dd>{{ furniture.maxPeople }} {{ furniture.maxPeople === '1' ? 'person' : 'people' }}</dd></div>
          <div v-if="furniture.flags.length"><dt>Use</dt><dd>{{ furniture.flags.join(', ') }}</dd></div>
          <div v-if="Number(furniture.healBonus)"><dt>Healing</dt><dd>{{ furniture.healBonus }}%</dd></div>
          <div v-if="Number(furniture.manaBonus)"><dt>Mana</dt><dd>{{ furniture.manaBonus }}%</dd></div>
        </dl>
      </section>

      <section class="card wide">
        <h3 class="card-title">Details</h3>
        <dl class="facts two">
          <div><dt>Keywords</dt><dd class="mono">{{ item.names.join(' ') }}</dd></div>
          <div><dt>Type</dt><dd>{{ view.typeLabel.toLowerCase() }}</dd></div>
          <div><dt>Worn</dt><dd>{{ slots.length ? slots.join(', ').toLowerCase() : 'not worn' }}</dd></div>
          <div v-if="material || materialGroup">
            <dt>Material</dt>
            <dd>{{ material || materialGroup }}<span v-if="material && materialGroup" class="muted"> ({{ materialGroup }})</span></dd>
          </div>
          <div><dt>Quality</dt><dd>{{ quality }} <span class="muted">({{ item.quality }})</span></dd></div>
          <div v-if="condition"><dt>Condition</dt><dd>{{ condition }} <span class="muted">when new</span></dd></div>
          <div v-if="alignment"><dt>Alignment</dt><dd>{{ alignment }}</dd></div>
          <div v-if="otherFlags.length">
            <dt>Flags</dt>
            <dd class="tags"><span v-for="flag in otherFlags" :key="flag" class="tag">{{ flag }}</span></dd>
          </div>
          <div v-if="notes.length"><dt>Note</dt><dd>{{ notes.join('; ') }}</dd></div>
          <div><dt>Random drops</dt><dd>{{ item.rarity }}</dd></div>
          <div v-if="limit !== null"><dt>Limit</dt><dd>{{ formatNumber(limit) }} in the world at once</dd></div>
        </dl>
      </section>

      <section class="card wide">
        <h3 class="card-title">Where to find it</h3>
        <p class="where">
          In <a v-if="areaHref" :href="areaHref">{{ view.areaName }}</a><template v-else>{{ view.areaName }}</template><template v-if="areaLevels">, {{ areaLevels }}</template>.
          <template v-if="areaHref">The areas page has directions from Market Square.</template>
        </p>
        <p v-if="twins.length && view.loaded" class="au-hint">
          The same vnum is also in
          <template v-for="(twin, index) in twins" :key="twin.view.id"><template v-if="index">, </template><a :href="twin.href">{{ twin.view.areaName }}</a></template><template v-if="twins.every(twin => !twin.view.loaded)">, an area file the game doesn't load</template>.
        </p>
      </section>
    </div>
  </article>
</template>

<style scoped>
.detail {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px 16px;
}

.titles {
  min-width: 0;
  flex: 1 1 20rem;
}

/* Beat .vp-doc h2 margins and the top border */
.name.name {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  letter-spacing: -0.01em;
  overflow-wrap: anywhere;
}

.sub.sub {
  margin: 4px 0 0;
  font-size: 14px;
  line-height: 22px;
  color: var(--vp-c-text-2);
}

.dot {
  margin: 0 6px;
  color: var(--vp-c-text-3);
}

.name :deep(.au-mud),
.long :deep(.au-mud) {
  white-space: normal;
}

.long.long {
  margin: 0;
  padding: 10px 14px;
  border-left: 3px solid var(--vp-c-divider);
  font-size: 14px;
  line-height: 22px;
  color: var(--vp-c-text-2);
  font-style: italic;
}

.readouts.readouts {
  margin: 0;
}

.warning {
  padding: 12px 16px;
  border: 1px solid var(--vp-c-warning-2);
  border-left-width: 4px;
  border-radius: 8px;
  background-color: var(--vp-c-warning-soft);
  font-size: 14px;
  line-height: 22px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(18rem, 100%), 1fr));
  gap: 16px;
  align-items: start;
}

.card {
  min-width: 0;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg);
}

.card.wide {
  grid-column: 1 / -1;
}

/* Beat .vp-doc h3 */
.card-title.card-title {
  margin: 0 0 10px;
  padding: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

/* Beat .vp-doc table */
.mini.mini {
  display: table;
  width: 100%;
  margin: 0;
  border-collapse: collapse;
  font-size: 14px;
  line-height: 20px;
}

.mini tr {
  border: 0;
  background: transparent;
}

.mini th,
.mini td {
  padding: 5px 0 5px 12px;
  border: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  background: transparent;
  text-align: left;
  font-weight: 400;
}

.mini th:first-child {
  padding-left: 0;
}

.mini thead th {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.mini tbody th {
  color: var(--vp-c-text-1);
}

.mini tfoot th,
.mini tfoot td {
  border-bottom: 0;
  font-weight: 600;
}

.mini .num {
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.muted {
  color: var(--vp-c-text-2);
}

.spells.spells,
.where.where {
  margin: 0;
  font-size: 14px;
  line-height: 22px;
}

.where + .au-hint {
  margin-top: 8px;
}

.card .au-hint {
  margin-top: 8px;
}

.ac {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin: 0;
}

.ac div {
  padding: 8px 4px;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  text-align: center;
}

.ac dt {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.ac dd {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  font-variant-numeric: tabular-nums;
}

.facts {
  display: grid;
  gap: 6px 24px;
  margin: 0;
  font-size: 14px;
  line-height: 22px;
}

.facts.two {
  grid-template-columns: repeat(auto-fill, minmax(min(20rem, 100%), 1fr));
}

.facts div {
  display: grid;
  grid-template-columns: 8.5rem 1fr;
  gap: 12px;
  min-width: 0;
}

.facts dt {
  color: var(--vp-c-text-2);
}

.facts dd {
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
}

.mono {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 6px;
}

.tag {
  padding: 0 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  font-size: 13px;
  line-height: 22px;
}

.spell-list.spell-list {
  margin: 8px 0 0;
  padding-left: 20px;
  font-size: 14px;
  line-height: 22px;
}

.spell-list li + li {
  margin-top: 0;
}

@media (max-width: 639px) {
  .name.name {
    font-size: 20px;
    line-height: 28px;
  }

  .facts div {
    grid-template-columns: 7rem 1fr;
  }
}
</style>
