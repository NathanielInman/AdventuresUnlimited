<script setup lang="ts">
import { computed } from 'vue';

// Several on/off choices as a row of chips, with an "All" chip in front.
// An empty list means all. Clicking a chip while all are on picks just that
// one; clicking more adds them; turning the last one off, or picking every
// one, goes back to all.
const props = defineProps<{
  label: string;
  modelValue: string[];
  options: readonly { value: string; label: string; count?: number }[];
}>();
const emit = defineEmits<{ 'update:modelValue': [value: string[]] }>();

const all = computed(() => props.modelValue.length === 0);
const isOn = (value: string) => !all.value && props.modelValue.includes(value);

function toggle(value: string) {
  const next = all.value
    ? [value]
    : isOn(value)
      ? props.modelValue.filter(entry => entry !== value)
      : [...props.modelValue, value];
  const ordered = props.options.map(option => option.value).filter(entry => next.includes(entry));

  emit('update:modelValue', ordered.length === props.options.length ? [] : ordered);
}
</script>

<template>
  <fieldset class="au-field chips">
    <legend class="au-label">{{ label }}</legend>
    <div class="row">
      <button
        type="button"
        class="chip"
        :class="{ on: all }"
        :aria-pressed="all"
        @click="emit('update:modelValue', [])"
      >
        <svg v-if="all" class="tick" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        All
      </button>
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        class="chip"
        :class="{ on: isOn(option.value) }"
        :aria-pressed="isOn(option.value)"
        @click="toggle(option.value)"
      >
        <svg v-if="isOn(option.value)" class="tick" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {{ option.label }}
        <span v-if="option.count !== undefined" class="count">{{ option.count.toLocaleString('en-US') }}</span>
      </button>
    </div>
  </fieldset>
</template>

<style scoped>
.chips {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

legend.au-label {
  margin-bottom: 6px;
  padding: 0;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 34px;
  padding: 0 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 17px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s, color 0.2s;
}

.chip:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-text-1);
}

/* On: tinted, outlined in the brand color and ticked */
.chip.on {
  padding-left: 10px;
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-text-1);
}

.tick {
  color: var(--vp-c-brand-1);
}

.count {
  font-size: 12px;
  font-weight: 400;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}
</style>
