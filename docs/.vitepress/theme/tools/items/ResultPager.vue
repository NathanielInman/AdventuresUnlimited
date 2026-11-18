<script setup lang="ts">
import { computed } from 'vue';
import { formatNumber } from '../lib/format';

// Previous / next for a long result list, with "26-50 of 1,204 items".
// Page numbers start at 1. The buttons are links so a page can be opened in
// a new tab; hrefFor builds them from the tool's query state.
const props = defineProps<{
  page: number;
  pageSize: number;
  total: number;
  hrefFor: (page: number) => string;
  /** What is counted, plural: "items" */
  noun?: string;
}>();
const emit = defineEmits<{ go: [page: number] }>();

const pages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)));
const first = computed(() => (props.total ? (props.page - 1) * props.pageSize + 1 : 0));
const last = computed(() => Math.min(props.total, props.page * props.pageSize));

function go(event: MouseEvent, page: number) {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return;
  event.preventDefault();
  emit('go', page);
}
</script>

<template>
  <nav class="pager" aria-label="Result pages">
    <p class="range">
      <strong>{{ formatNumber(first) }}-{{ formatNumber(last) }}</strong>
      of {{ formatNumber(total) }} {{ noun ?? 'results' }}
    </p>
    <div v-if="pages > 1" class="buttons">
      <a
        v-if="page > 1"
        class="au-button"
        :href="hrefFor(page - 1)"
        rel="prev"
        @click="go($event, page - 1)"
      >
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        Previous
      </a>
      <span v-else class="au-button disabled" aria-disabled="true">
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        Previous
      </span>
      <span class="where">Page {{ page }} of {{ formatNumber(pages) }}</span>
      <a
        v-if="page < pages"
        class="au-button"
        :href="hrefFor(page + 1)"
        rel="next"
        @click="go($event, page + 1)"
      >
        Next
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </a>
      <span v-else class="au-button disabled" aria-disabled="true">
        Next
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </span>
    </div>
  </nav>
</template>

<style scoped>
.pager {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 16px;
}

.range.range {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.range strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Beat .vp-doc a: these are buttons */
.buttons a.au-button {
  text-decoration: none;
}

.where {
  font-size: 14px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

.disabled,
.disabled:hover {
  opacity: 0.45;
  cursor: default;
  border-color: var(--vp-button-alt-border);
  background-color: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
}
</style>
