<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue';
import { alignmentChoice, alignmentLabels, type AlignmentChoice } from './leveling/alignment';
import { alignments } from './leveling/data';
import { useQueryState } from './lib/query-state';
import { SegmentedField } from './ui';

// The alignment switch at the top of the speed leveling guide. It filters
// every <LevelingGear /> on the page, and hides the notes in the page text
// that are marked for another alignment ({.au-for-good} and so on).

const STORAGE_KEY = 'au-leveling-align';

const { state } = useQueryState({ align: 'all' });

const options = [
  { label: 'All', value: 'all' },
  ...alignments.map(alignment => ({ label: alignmentLabels[alignment], value: alignment }))
];

const valid = (value: string): value is AlignmentChoice =>
  options.some(option => option.value === value);

function apply(value: string) {
  const choice = valid(value) ? value : 'all';

  alignmentChoice.value = choice;
  if (import.meta.env.SSR) return;
  if (choice === 'all') delete document.documentElement.dataset.auAlign;
  else document.documentElement.dataset.auAlign = choice;
}

watch(() => state.align, value => {
  apply(value);
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage can be blocked; the choice still works for this visit
  }
});

onMounted(() => {
  // The URL wins; without one, come back to the last alignment picked here
  if (!new URLSearchParams(location.search).has('align')) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved && valid(saved)) state.align = saved;
    } catch {
      // No storage: start from "All"
    }
  }
  apply(state.align);
});

onBeforeUnmount(() => {
  alignmentChoice.value = 'all';
  delete document.documentElement.dataset.auAlign;
});
</script>

<template>
  <div class="au-tool leveling-alignment">
    <SegmentedField
      v-model="state.align"
      label="Your alignment"
      :options="options"
    />
    <p class="hint">
      {{ state.align === 'all'
        ? 'Showing every alignment. Pick yours to hide what doesn\'t apply.'
        : `Showing the route and gear for ${state.align} characters.` }}
    </p>
  </div>
</template>

<style scoped>
.leveling-alignment {
  position: sticky;
  top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px));
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 4px 16px;
  margin: 16px -16px 24px;
  padding: 10px 16px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
}

/* Under 1280px VitePress pins a 48px "Menu / On this page" bar below its
   nav, and under 960px the nav itself scrolls away */
@media (max-width: 1279px) {
  .leveling-alignment {
    top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px);
  }
}

@media (max-width: 959px) {
  .leveling-alignment {
    top: calc(var(--vp-layout-top-height, 0px) + 48px);
  }
}

/* Full width on phones, where the page has a 24px gutter */
@media (max-width: 767px) {
  .leveling-alignment {
    margin-right: -24px;
    margin-left: -24px;
    padding: 8px 24px 10px;
  }
}

/* Keep the bar short on phones; the choice speaks for itself there */
@media (max-width: 639px) {
  .hint {
    display: none;
  }
}

.hint {
  flex: 1 1 14rem;
  margin: 0 0 6px;
  font-size: 13px;
  line-height: 18px;
  color: var(--vp-c-text-2);
}
</style>

<style>
/* Page text marked for one alignment, e.g. "- **Good:** ... {.au-for-good}",
   hides when another alignment is picked */
html[data-au-align='good'] .vp-doc :is(.au-for-neutral, .au-for-evil):not(.au-for-good),
html[data-au-align='neutral'] .vp-doc :is(.au-for-good, .au-for-evil):not(.au-for-neutral),
html[data-au-align='evil'] .vp-doc :is(.au-for-good, .au-for-neutral):not(.au-for-evil) {
  display: none;
}
</style>
