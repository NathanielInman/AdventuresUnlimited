<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue';
import { formatNumber, formatRange, formatSigned } from '../lib/format';
import { MudText, StatReadout } from '../ui';
import SourceParts from './SourceParts.vue';
import type { Item } from '../lib/items';
import {
  affectLabel,
  conditionVaries,
  craftsmanship,
  diceAverage,
  medianRange,
  slotLabels,
  sourceLines,
  weightStats,
  type AreaInfo,
  type ItemView
} from './model';

// Everything the game knows about one item, in the order a player reads
// identify: what it is, what it gives, what it's made of, where it comes from.
const props = defineProps<{
  view: ItemView<Item>;
  weights: number[];
  score: number;
  area: AreaInfo | null;
  areaHref: string | null;
  /** Link to another item by vnum */
  itemHref: (vnum: number) => string;
  /** Link to an area on the areas page, by area key */
  areaHrefFor: (key: string) => string | null;
}>();

const item = computed(() => props.view.item);

const cost = computed(() => ({ gold: Math.floor(item.value.cost / 100), silver: item.value.cost % 100 }));

const bonusRows = computed(() =>
  props.view.affects.map(affect => {
    const weight = affect.stat >= 0 && affect.amount !== null ? props.weights[affect.stat] : null;

    return { ...affect, weight, points: weight === null || affect.amount === null ? null : weight * affect.amount };
  })
);

/** "6 to 8" when copies roll around the listed value. */
const rollText = (value: number) => {
  const range = medianRange(item.value, value);

  if (!range) return null;
  return range[0] === range[1] ? `always ${range[0]}` : `${range[0]} to ${range[1]}`;
};

const armorClass = computed(() => {
  const ac = item.value.ac;

  if (!ac) return null;
  return ['Pierce', 'Bash', 'Slash', 'Magic'].map((kind, index) => ({ kind, value: ac[index], roll: rollText(ac[index]) }));
});

const weapon = computed(() => {
  const data = item.value.weapon;

  if (!data) return null;
  const [count, sides] = data.dice;
  const countRange = medianRange(item.value, count);
  const sidesRange = medianRange(item.value, sides);
  let varies: string | null = null;

  if (countRange || sidesRange) {
    const [lowCount, highCount] = countRange ?? [count, count];
    const [lowSides, highSides] = sidesRange ?? [sides, sides];

    varies = `Copies roll ${formatRange(lowCount, highCount)} dice of ${formatRange(lowSides, highSides)} sides.`;
  }
  return {
    ...data,
    dice: `${count}d${sides}`,
    average: diceAverage(data.dice),
    craft: craftsmanship(item.value),
    varies
  };
});

const magic = computed(() => item.value.magic ?? null);
const charged = computed(() => magic.value?.charges !== undefined);

const container = computed(() => item.value.container ?? null);

const light = computed(() => item.value.light ?? null);

const drink = computed(() => item.value.drink ?? null);

const furniture = computed(() => item.value.furniture ?? null);

const alignment = computed(() => {
  const flags = item.value.flags ?? [];
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
  nouncurse: "can't be uncursed",
  no_sell: "can't be sold",
  noauction: "can't be auctioned"
};

const otherFlags = computed(() => (item.value.flags ?? []).filter(flag => !/^anti(good|neutral|evil)$/.test(flag)));

const notes = computed(() =>
  (item.value.flags ?? []).filter(flag => flagNotes[flag]).map(flag => flagNotes[flag])
);

const areaLevels = computed(() => {
  const levels = props.area?.levels ?? '';

  if (!levels) return '';
  if (levels === 'HERO') return 'an area for heroes';
  if (levels === 'ALL') return 'an area for every level';
  if (/^\d/.test(levels)) return `an area for levels ${levels}`;
  return '';
});

const condition = computed(() => item.value.cond ?? 'mint');
const varies = computed(() => conditionVaries(item.value));
const slots = computed(() => props.view.slots.map(slot => slotLabels[slot] ?? slot));
const wearText = computed(() => (item.value.wear ?? []).join(' ') || 'none');

// Long room lists stop here
const roomLimit = 8;

const sources = computed(() =>
  sourceLines(item.value, { itemHref: props.itemHref, areaHref: props.areaHrefFor })
);

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

    <p v-if="item.desc" class="long"><MudText :text="item.desc" /></p>

    <div class="au-stats readouts">
      <StatReadout label="Score" :value="score" primary />
      <StatReadout label="Level" :value="view.level" />
      <StatReadout label="Weight" :value="item.lb" unit="lb" />
      <StatReadout label="Value" :value="formatNumber(cost.gold)" :unit="`gold${cost.silver ? `, ${cost.silver} silver` : ''}`" />
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
              <td class="num">{{ row.amount === null ? row.text : formatSigned(row.amount) }}</td>
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

      <section v-if="item.aff" class="card">
        <h3 class="card-title">Affects</h3>
        <p class="spells">Wearing it gives you</p>
        <ul class="spell-list">
          <li v-for="name in item.aff" :key="name">{{ affectLabel(name) }}</li>
        </ul>
      </section>

      <section v-if="armorClass" class="card">
        <h3 class="card-title">Armor class</h3>
        <dl class="ac">
          <div v-for="entry in armorClass" :key="entry.kind">
            <dt>{{ entry.kind }}</dt>
            <dd>{{ formatNumber(entry.value) }}</dd>
            <dd v-if="entry.roll" class="roll">{{ entry.roll }}</dd>
          </div>
        </dl>
        <p v-if="armorClass.some(entry => entry.roll)" class="au-hint">
          Each copy can roll a point either way, and never below 1.
        </p>
      </section>

      <section v-if="weapon" class="card">
        <h3 class="card-title">Weapon</h3>
        <dl class="facts">
          <div><dt>Class</dt><dd>{{ weapon.class }}</dd></div>
          <div>
            <dt>Damage</dt>
            <dd>
              {{ weapon.dice }}, {{ formatNumber(weapon.average, weapon.average % 1 ? 1 : 0) }} on average
            </dd>
          </div>
          <div><dt>Attack</dt><dd>{{ weapon.attack }}<template v-if="weapon.dam !== weapon.attack">, {{ weapon.dam }} damage</template></dd></div>
          <div v-if="weapon.craft"><dt>Craftsmanship</dt><dd>{{ weapon.craft }}</dd></div>
          <div v-if="weapon.flags">
            <dt>Flags</dt>
            <dd class="tags"><span v-for="flag in weapon.flags" :key="flag" class="tag">{{ flag }}</span></dd>
          </div>
        </dl>
        <p v-if="weapon.varies" class="au-hint">{{ weapon.varies }}</p>
      </section>

      <section v-if="magic" class="card">
        <h3 class="card-title">{{ charged ? 'Charges' : 'Spells' }}</h3>
        <p class="spells">
          <template v-if="charged">
            {{ magic.charges }} of {{ magic.max }} charges of level {{ magic.level }}
          </template>
          <template v-else>Level {{ magic.level }} spells of</template>
        </p>
        <ul class="spell-list">
          <li v-for="(spell, index) in magic.spells" :key="index">{{ spell }}</li>
        </ul>
      </section>

      <section v-if="container" class="card">
        <h3 class="card-title">Container</h3>
        <dl class="facts">
          <div><dt>Capacity</dt><dd>{{ formatNumber(container.cap) }}</dd></div>
          <div><dt>Maximum weight</dt><dd>{{ formatNumber(container.maxw) }}</dd></div>
          <div v-if="container.mult !== undefined"><dt>Weight multiplier</dt><dd>{{ container.mult }}%</dd></div>
          <div v-if="container.flags"><dt>Flags</dt><dd>{{ container.flags.join(', ') }}</dd></div>
          <div v-if="container.key"><dt>Key</dt><dd><a :href="itemHref(container.key)">vnum {{ container.key }}</a></dd></div>
        </dl>
      </section>

      <section v-if="light !== null" class="card">
        <h3 class="card-title">Light</h3>
        <p class="spells">{{ light === 'infinite' ? 'Never burns out' : `Burns for ${formatNumber(light)} hours` }}</p>
      </section>

      <section v-if="drink" class="card">
        <h3 class="card-title">{{ view.type === 'fountain' ? 'Fountain' : 'Drink' }}</h3>
        <p class="spells">
          <template v-if="view.type === 'fountain'">Flows with {{ drink.color }} {{ drink.liquid }}</template>
          <template v-else-if="drink.left > 0">{{ drink.left }} of {{ drink.max }} drinks of {{ drink.color }} {{ drink.liquid }}</template>
          <template v-else>Empty, holds {{ drink.max }} drinks</template>
          <template v-if="drink.poison">, poisoned</template>
        </p>
      </section>

      <section v-if="furniture" class="card">
        <h3 class="card-title">Furniture</h3>
        <dl class="facts">
          <div><dt>Holds</dt><dd>{{ furniture.people }} {{ furniture.people === 1 ? 'person' : 'people' }}</dd></div>
          <div v-if="furniture.flags"><dt>Use</dt><dd>{{ furniture.flags.map(flag => flag.replace(/_/g, ' ')).join(', ') }}</dd></div>
          <div v-if="furniture.heal"><dt>Healing</dt><dd>{{ furniture.heal }}%</dd></div>
          <div v-if="furniture.mana"><dt>Mana</dt><dd>{{ furniture.mana }}%</dd></div>
        </dl>
      </section>

      <section v-if="item.info" class="card">
        <h3 class="card-title">{{ view.typeLabel }}</h3>
        <dl class="facts">
          <div v-for="[label, value] in item.info" :key="label"><dt>{{ label }}</dt><dd>{{ value }}</dd></div>
        </dl>
      </section>

      <section class="card wide">
        <h3 class="card-title">Details</h3>
        <dl class="facts two">
          <div><dt>Keywords</dt><dd class="mono">{{ item.kw }}</dd></div>
          <div><dt>Type</dt><dd>{{ view.type }}</dd></div>
          <div><dt>Wear</dt><dd>{{ wearText }}</dd></div>
          <div v-if="item.sub || item.mat">
            <dt>Material</dt>
            <dd>{{ item.sub || item.mat }}<span v-if="item.sub && item.mat" class="muted"> ({{ item.mat }})</span></dd>
          </div>
          <div v-if="item.qual"><dt>Quality</dt><dd>{{ item.qual }}</dd></div>
          <div>
            <dt>Condition</dt>
            <dd>{{ condition }}<span v-if="varies" class="muted"> at best; copies spawn as low as damaged</span></dd>
          </div>
          <div v-if="alignment"><dt>Alignment</dt><dd>{{ alignment }}</dd></div>
          <div v-if="otherFlags.length">
            <dt>Flags</dt>
            <dd class="tags"><span v-for="flag in otherFlags" :key="flag" class="tag">{{ flag }}</span></dd>
          </div>
          <div v-if="notes.length"><dt>Note</dt><dd>{{ notes.join('; ') }}</dd></div>
          <div v-if="item.limit !== undefined"><dt>Limit</dt><dd>{{ formatNumber(item.limit) }} in the world at once</dd></div>
          <div v-if="item.rarity"><dt>Rarity</dt><dd>a reset loads it {{ item.rarity }}% of the time</dd></div>
          <div v-if="item.val"><dt>Values</dt><dd class="mono">{{ item.val.join(' ') }}</dd></div>
          <div v-if="item.owner"><dt>Old owner</dt><dd>{{ item.owner }}</dd></div>
        </dl>
      </section>

      <section class="card wide">
        <h3 class="card-title">Where to find it</h3>
        <ul v-if="sources.length" class="sources">
          <li v-for="(source, index) in sources" :key="index" :class="`source-${source.kind}`">
            <SourceParts :parts="source.line" />
            <ul v-if="source.rooms" class="rooms">
              <li v-for="(room, roomIndex) in source.rooms.slice(0, roomLimit)" :key="roomIndex"><SourceParts :parts="room" /></li>
              <li v-if="source.rooms.length > roomLimit" class="muted">and {{ source.rooms.length - roomLimit }} more</li>
            </ul>
          </li>
        </ul>
        <div v-else class="unplaced" role="note">
          <strong>Not placed in the world.</strong>
          No reset, shop, script or quest loads it: it's crafted, a quest reward, or given by staff.
        </div>
        <p class="where">
          Its area file is <a v-if="areaHref" :href="areaHref">{{ view.areaName }}</a><template v-else>{{ view.areaName }}</template><template v-if="areaLevels">, {{ areaLevels }}</template>.
          <template v-if="areaHref">The areas page has directions from Market Square.</template>
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

.unplaced {
  margin-bottom: 10px;
  padding: 10px 14px;
  border: 1px solid var(--vp-c-warning-2);
  border-left-width: 4px;
  border-radius: 8px;
  background-color: var(--vp-c-warning-soft);
  font-size: 14px;
  line-height: 22px;
}

.sources.sources {
  margin: 0 0 10px;
  padding-left: 20px;
  font-size: 14px;
  line-height: 22px;
}

.sources li + li {
  margin-top: 4px;
}

.rooms.rooms {
  margin: 2px 0 0;
  padding-left: 20px;
  list-style: circle;
}

.rooms li + li {
  margin-top: 0;
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

.ac dd.roll {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--vp-c-text-2);
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
