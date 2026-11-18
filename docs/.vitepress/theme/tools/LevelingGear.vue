<script setup lang="ts">
import { computed, ref } from 'vue';
import { withBase } from 'vitepress';
import { alignmentChoice, listAlignments } from './leveling/alignment';
import { alignments, stages, type GearItem, type GearStop } from './leveling/data';

// One stage's gear in the speed leveling guide: where to stop, the walk
// there, and each item with its stats and source. Follows the alignment
// picked in <LevelingAlignment />; before that (and in the built HTML) it
// lists the gear for every alignment and labels what is alignment-bound.

const props = defineProps<{ stage: string }>();

const stage = computed(() => stages.find(entry => entry.id === props.stage));

const itemFor = (item: GearItem) => item.for ?? alignments.filter(a => !item.zaps?.includes(a));

const shown = (item: GearItem) =>
  alignmentChoice.value === 'all' || itemFor(item).includes(alignmentChoice.value);

const stops = computed(() =>
  (stage.value?.stops ?? [])
    .map(stop => ({ ...stop, items: stop.items.filter(shown) }))
    .filter(stop => stop.items.length > 0)
);

const itemHref = (item: GearItem) => withBase(`/tools/items.html?vnum=${item.vnum}&area=${item.area}`);
const areaHref = (stop: GearStop) => withBase(`/world/areas.html#${stop.anchor}`);
const wearAt = (item: GearItem) => Math.max(item.level - 5, 0);

const slotLabel: Record<string, string> = { held: 'held', float: 'floating' };

/** Badges for an item: who it's for, and what to watch out for */
function badges(item: GearItem) {
  const list: { text: string; kind: string; title?: string }[] = [];
  const forList = itemFor(item);

  if (forList.length < alignments.length && alignmentChoice.value === 'all') {
    list.push({ text: `${listAlignments(forList)} only`, kind: forList.length === 1 ? forList[0] : 'some' });
  }
  if (item.zaps?.length) {
    list.push({
      text: `Zaps ${listAlignments(item.zaps).toLowerCase()}`,
      kind: 'warn',
      title: 'Anti-alignment flag: the item knocks itself off a character of this alignment'
    });
  }
  if (item.iron) {
    list.push({ text: 'Iron', kind: 'plain', title: 'Sylvan elves, heishan elves and frost giants can\'t wear iron' });
  }
  if (item.limit) {
    list.push({ text: `Limit ${item.limit}`, kind: 'plain', title: `Only ${item.limit} can exist in the game at once` });
  }
  if (item.keep) list.push({ text: 'Already yours', kind: 'plain' });
  return list;
}

const copied = ref<string | null>(null);
let copiedTimer: ReturnType<typeof setTimeout> | undefined;

async function copyWalk(walk: string) {
  try {
    await navigator.clipboard.writeText(walk);
    copied.value = walk;
    clearTimeout(copiedTimer);
    copiedTimer = setTimeout(() => (copied.value = null), 1500);
  } catch {
    // No clipboard access: the walk is still there to select by hand
  }
}
</script>

<template>
  <div v-if="stage" class="au-tool leveling-gear">
    <p v-if="stops.length === 0" class="empty">
      Nothing to pick up here for your alignment.
    </p>
    <section v-for="stop in stops" :key="stop.at + stop.area" class="stop">
      <header class="stop-head">
        <span class="stop-level">{{ stop.at.includes('-') ? 'Levels' : 'Level' }} {{ stop.at }}</span>
        <a v-if="stop.anchor" class="stop-area" :href="areaHref(stop)">{{ stop.area }}</a>
        <span v-else class="stop-area">{{ stop.area }}</span>
      </header>
      <div v-if="stop.walk" class="walk">
        <code>{{ stop.walk }}</code>
        <button
          v-if="!stop.walk.startsWith('From')"
          type="button"
          class="copy"
          :aria-label="`Copy the walk to ${stop.area}`"
          @click="copyWalk(stop.walk)"
        >
          {{ copied === stop.walk ? 'Copied' : 'Copy' }}
        </button>
      </div>
      <ul class="items">
        <li v-for="item in stop.items" :key="item.vnum + (item.keep ? '-keep' : '')" class="item">
          <span class="slot">{{ slotLabel[item.slot] ?? item.slot }}</span>
          <div class="main">
            <div class="name-line">
              <span v-if="item.count" class="count">{{ item.count }}×</span>
              <a class="name" :href="itemHref(item)">{{ item.name }}</a>
            </div>
            <div class="stats">{{ item.stats }}</div>
            <div class="source">
              {{ item.source }}<template v-if="item.at">, at level {{ item.at }}</template>
            </div>
            <div v-if="item.note" class="note">{{ item.note }}</div>
            <div v-if="badges(item).length" class="badges">
              <span
                v-for="badge in badges(item)"
                :key="badge.text"
                class="badge"
                :class="badge.kind"
                :title="badge.title"
              >{{ badge.text }}</span>
            </div>
          </div>
          <span class="level" :title="`Item level ${item.level}; wearable from level ${wearAt(item)}`">
            <span class="level-num">L{{ item.level }}</span>
            <span class="level-wear">wear {{ wearAt(item) }}</span>
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.leveling-gear {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stop {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
}

.stop-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 10px;
  padding: 12px 16px 0;
}

.stop-level {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.stop-area {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

a.stop-area {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

a.stop-area:hover {
  text-decoration: underline;
}

.walk {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 8px 16px 0;
}

.walk code {
  flex: 1;
  min-width: 0;
  padding: 4px 8px;
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 20px;
  color: var(--vp-c-text-1);
  overflow-wrap: anywhere;
}

.copy {
  flex: none;
  padding: 3px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.copy:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.items {
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
}

/* .vp-doc styles every li; reset them here */
.items .item {
  display: grid;
  grid-template-columns: 4.5rem minmax(0, 1fr) auto;
  gap: 4px 12px;
  margin: 0;
  padding: 10px 16px;
  border-top: 1px solid var(--vp-c-divider);
  line-height: 20px;
}

.slot {
  padding-top: 1px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.name-line {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 6px;
}

.count {
  font-weight: 600;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.name {
  font-weight: 600;
}

.stats {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.source,
.note {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.note {
  font-style: italic;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
}

.badge {
  padding: 0 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.badge.good {
  border-color: var(--vp-c-yellow-2);
  background-color: var(--vp-c-yellow-soft);
  color: var(--vp-c-yellow-1);
}

.badge.neutral,
.badge.some {
  border-color: var(--vp-c-indigo-2);
  background-color: var(--vp-c-indigo-soft);
  color: var(--vp-c-indigo-1);
}

.badge.evil,
.badge.warn {
  border-color: var(--vp-c-red-2);
  background-color: var(--vp-c-red-soft);
  color: var(--vp-c-red-1);
}

.level {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.level-num {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.level-wear {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.empty {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

@media (max-width: 480px) {
  .items .item {
    grid-template-columns: minmax(0, 1fr) auto;
    padding: 10px 12px;
  }

  .slot {
    grid-column: 1 / -1;
  }

  .stop-head,
  .walk {
    margin-left: 0;
    margin-right: 0;
    padding-left: 12px;
    padding-right: 12px;
  }

  .walk {
    margin: 8px 0 0;
  }
}
</style>
