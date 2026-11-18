<script setup lang="ts">
import { computed, useId } from 'vue';
import { formatNumber } from '../lib/format';

// A labeled slider with its current value beside the label.
const props = withDefaults(
  defineProps<{
    label: string;
    modelValue: number;
    min: number;
    max: number;
    step?: number;
    /** Appended to the shown value, e.g. "%" or " levels" */
    unit?: string;
    /** Replaces the shown value entirely, e.g. v => `${v / 10} hours` */
    format?: (value: number) => string;
    hint?: string;
  }>(),
  { step: 1, unit: '' }
);
const emit = defineEmits<{ 'update:modelValue': [value: number] }>();

const id = useId();
const shown = computed(() =>
  props.format ? props.format(props.modelValue) : `${formatNumber(props.modelValue)}${props.unit}`
);
const fill = computed(
  () => `${((props.modelValue - props.min) / (props.max - props.min || 1)) * 100}%`
);
</script>

<template>
  <div class="au-field">
    <div class="au-label">
      <label :for="id">{{ label }}</label>
      <output class="au-label-value" :for="id">{{ shown }}</output>
    </div>
    <input
      :id="id"
      class="au-slider"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      :aria-valuetext="shown"
      :aria-describedby="hint ? `${id}-hint` : undefined"
      :style="{ '--au-fill': fill }"
      @input="emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
    >
    <p v-if="hint" :id="`${id}-hint`" class="au-hint">{{ hint }}</p>
  </div>
</template>

<style>
/* Unscoped so LevelRangeField can reuse the thumb styles */
.au-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 24px;
  margin: 0;
  background: transparent;
  cursor: pointer;
}

.au-slider::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(
    to right,
    var(--vp-c-brand-1) var(--au-fill, 0%),
    var(--vp-c-default-soft) var(--au-fill, 0%)
  );
}

.au-slider::-moz-range-track {
  height: 4px;
  border-radius: 2px;
  background: var(--vp-c-default-soft);
}

.au-slider::-moz-range-progress {
  height: 4px;
  border-radius: 2px;
  background: var(--vp-c-brand-1);
}

.au-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  margin-top: -7px;
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 50%;
  background: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-1);
}

.au-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 50%;
  background: var(--vp-c-bg);
}

.au-slider:focus-visible {
  outline: none;
}

.au-slider:focus-visible::-webkit-slider-thumb {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.au-slider:focus-visible::-moz-range-thumb {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
</style>
