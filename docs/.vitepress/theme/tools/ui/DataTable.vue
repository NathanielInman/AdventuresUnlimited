<script setup lang="ts" generic="Row extends Record<string, any>">
import { computed, ref, watch } from 'vue';

// A table that sorts by clicking a column header and scrolls inside its own
// box, with the header row pinned. Custom cells go in slots named after the
// column key: <template #cell-short="{ row, value }">...</template>.

export interface Column<R = any> {
  key: string;
  label: string;
  /** Numbers should be right-aligned; that is the default for numeric sorts */
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  /** What to sort by, when it isn't row[key] */
  sortValue?: (row: R) => number | string;
  /** How to print the value when there's no slot for this column */
  format?: (value: any, row: R) => string;
  /** CSS width, e.g. '6rem' */
  width?: string;
  /** Keep the cell on one line */
  nowrap?: boolean;
}

export interface SortState {
  key: string;
  dir: 'asc' | 'desc';
}

const props = withDefaults(
  defineProps<{
    columns: Column<Row>[];
    rows: Row[];
    /** A unique key per row: a property name or a function */
    rowKey: string | ((row: Row) => string | number);
    /** Describes the table for screen readers, and labels the scroll box */
    caption: string;
    /** Show the caption above the table instead of hiding it */
    showCaption?: boolean;
    /** Initial sort, or bind with v-model:sort to keep it in the URL */
    sort?: SortState | null;
    /** Height before the table scrolls; 'none' to never scroll vertically */
    maxHeight?: string;
    /** Rows to mark as matches: a bar on the left and a tinted background */
    highlight?: (row: Row) => boolean;
    emptyText?: string;
  }>(),
  { sort: null, maxHeight: '32rem', emptyText: 'Nothing matches.', showCaption: false }
);
const emit = defineEmits<{ 'update:sort': [value: SortState | null] }>();

const sortState = ref<SortState | null>(props.sort);

watch(
  () => props.sort,
  value => (sortState.value = value)
);

const keyOf = (row: Row): string | number =>
  typeof props.rowKey === 'function' ? props.rowKey(row) : row[props.rowKey];

const sorted = computed(() => {
  const state = sortState.value;
  const column = state && props.columns.find(c => c.key === state.key);

  if (!state || !column) return props.rows;
  const valueOf = column.sortValue ?? ((row: Row) => row[column.key]);
  const sign = state.dir === 'asc' ? 1 : -1;

  return [...props.rows].sort((a, b) => {
    const x = valueOf(a);
    const y = valueOf(b);

    if (typeof x === 'number' && typeof y === 'number') return (x - y) * sign;
    return String(x ?? '').localeCompare(String(y ?? ''), 'en', { numeric: true }) * sign;
  });
});

function toggleSort(column: Column<Row>) {
  const current = sortState.value;
  const next: SortState =
    current?.key === column.key
      ? { key: column.key, dir: current.dir === 'asc' ? 'desc' : 'asc' }
      : { key: column.key, dir: column.align === 'right' ? 'desc' : 'asc' };

  sortState.value = next;
  emit('update:sort', next);
}

function ariaSort(column: Column<Row>) {
  if (!column.sortable) return undefined;
  if (sortState.value?.key !== column.key) return 'none';
  return sortState.value.dir === 'asc' ? 'ascending' : 'descending';
}

function cellText(column: Column<Row>, row: Row) {
  const value = row[column.key];

  return column.format ? column.format(value, row) : (value ?? '');
}

const scroller = ref<HTMLElement | null>(null);

/** Scroll the box so the row with this key is in view. */
function scrollToRow(key: string | number) {
  const box = scroller.value;
  const row = box?.querySelector<HTMLElement>(`[data-row-key="${CSS.escape(String(key))}"]`);
  const head = box?.querySelector('thead');

  if (!box || !row) return;
  const headHeight = head?.offsetHeight ?? 0;
  const boxRect = box.getBoundingClientRect();
  const rowRect = row.getBoundingClientRect();
  const hidden = rowRect.top < boxRect.top + headHeight || rowRect.bottom > boxRect.bottom;

  if (hidden) {
    const top = box.scrollTop + rowRect.top - boxRect.top - headHeight - 8;

    box.scrollTo({ top, behavior: 'smooth' });
  }
}

defineExpose({ scrollToRow });
</script>

<template>
  <div
    ref="scroller"
    class="au-table-wrap"
    :style="{ maxHeight }"
    role="region"
    :aria-label="caption"
    tabindex="0"
  >
    <table class="au-table">
      <caption :class="{ 'au-visually-hidden': !showCaption }">{{ caption }}</caption>
      <colgroup>
        <col v-for="column in columns" :key="column.key" :style="{ width: column.width }">
      </colgroup>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
            :class="[`align-${column.align ?? 'left'}`]"
            :aria-sort="ariaSort(column)"
          >
            <button
              v-if="column.sortable"
              type="button"
              class="sort"
              @click="toggleSort(column)"
            >
              <span>{{ column.label }}</span>
              <svg class="arrow" :class="{ on: sortState?.key === column.key, desc: sortState?.key === column.key && sortState.dir === 'desc' }" viewBox="0 0 10 10" width="10" height="10" aria-hidden="true">
                <path d="M5 2 L8.5 7 H1.5 Z" fill="currentColor" />
              </svg>
            </button>
            <template v-else>{{ column.label }}</template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in sorted"
          :key="keyOf(row)"
          :data-row-key="keyOf(row)"
          :class="{ highlighted: highlight?.(row) }"
          :aria-current="highlight?.(row) ? 'true' : undefined"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :class="[`align-${column.align ?? 'left'}`, { nowrap: column.nowrap }]"
          >
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">{{ cellText(column, row) }}</slot>
          </td>
        </tr>
        <tr v-if="!sorted.length">
          <td class="empty" :colspan="columns.length">{{ emptyText }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.au-table-wrap {
  overflow: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  overscroll-behavior-x: contain;
}

/* Beat .vp-doc table styles, which assume a plain markdown table */
.au-table.au-table {
  display: table;
  width: 100%;
  margin: 0;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 14px;
  line-height: 22px;
}

.au-table caption:not(.au-visually-hidden) {
  padding: 10px 14px;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
}

.au-table tr {
  border: 0;
  background-color: transparent;
  transition: background-color 0.2s;
}

.au-table th,
.au-table td {
  padding: 8px 14px;
  border: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  vertical-align: top;
}

.au-table tbody tr:last-child td {
  border-bottom: 0;
}

.au-table th {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--vp-c-bg-soft);
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  text-align: left;
}

.au-table .align-right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.au-table .align-center {
  text-align: center;
}

.au-table .nowrap {
  white-space: nowrap;
}

.sort {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
}

.align-right .sort {
  flex-direction: row-reverse;
}

.sort:hover {
  color: var(--vp-c-text-1);
}

.arrow {
  opacity: 0.3;
  transition: transform 0.2s, opacity 0.2s;
}

.arrow.on {
  opacity: 1;
  color: var(--vp-c-brand-1);
}

.arrow.desc {
  transform: rotate(180deg);
}

.au-table tbody tr:hover {
  background-color: var(--vp-c-default-soft);
}

/* Matches get a bar on the left as well as the tint, so the mark isn't
   carried by color alone */
.au-table tbody tr.highlighted {
  background-color: var(--vp-c-brand-soft);
}

.au-table tbody tr.highlighted td:first-child {
  box-shadow: inset 4px 0 0 var(--vp-c-brand-1);
  font-weight: 600;
}

.empty {
  padding: 24px 14px;
  text-align: center;
  color: var(--vp-c-text-2);
}
</style>
