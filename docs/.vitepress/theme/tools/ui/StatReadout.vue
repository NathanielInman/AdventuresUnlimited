<script setup lang="ts">
import { computed } from 'vue';
import { formatNumber } from '../lib/format';

// A big total with its unit, e.g. "19,285 diamonds". Numbers get thousands
// separators; strings show as given.
const props = withDefaults(
  defineProps<{
    label: string;
    value: number | string;
    unit?: string;
    hint?: string;
    /** Larger type for the main result of a tool */
    primary?: boolean;
  }>(),
  {}
);

const shown = computed(() =>
  typeof props.value === 'number' ? formatNumber(props.value) : props.value
);
</script>

<template>
  <div class="au-stat" :class="{ primary }">
    <div class="label">{{ label }}</div>
    <div class="value">
      <span class="number">{{ shown }}</span>
      <span v-if="unit" class="unit">{{ unit }}</span>
    </div>
    <p v-if="hint" class="au-hint">{{ hint }}</p>
  </div>
</template>

<style scoped>
.au-stat {
  min-width: 0;
}

.label {
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  color: var(--vp-c-text-2);
}

.value {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 6px;
}

.number {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.primary .number {
  font-size: 32px;
  line-height: 40px;
  color: var(--vp-c-brand-1);
}

.unit {
  font-size: 15px;
  color: var(--vp-c-text-2);
}
</style>
