<script setup lang="ts">
import { computed, useId } from 'vue';

// A min/max pair, such as a level range: two number boxes with a two-thumb
// slider between them. Each thumb is its own native range input, so arrow
// keys work on both. The thumbs can't cross.
const props = withDefaults(
  defineProps<{
    label?: string;
    modelValue: [number, number] | number[];
    min?: number;
    max?: number;
    step?: number;
    hint?: string;
  }>(),
  { label: 'Level', min: 0, max: 110, step: 1 }
);
const emit = defineEmits<{ 'update:modelValue': [value: [number, number]] }>();

const id = useId();
const low = computed(() => props.modelValue[0] ?? props.min);
const high = computed(() => props.modelValue[1] ?? props.max);
const span = computed(() => props.max - props.min || 1);
const lowPct = computed(() => ((low.value - props.min) / span.value) * 100);
const highPct = computed(() => ((high.value - props.min) / span.value) * 100);

const clamp = (value: number) => Math.min(props.max, Math.max(props.min, value));

function setLow(raw: string) {
  const value = Number(raw);

  if (raw === '' || !Number.isFinite(value)) return;
  emit('update:modelValue', [Math.min(clamp(value), high.value), high.value]);
}

function setHigh(raw: string) {
  const value = Number(raw);

  if (raw === '' || !Number.isFinite(value)) return;
  emit('update:modelValue', [low.value, Math.max(clamp(value), low.value)]);
}

const valueOf = (event: Event) => (event.target as HTMLInputElement).value;
</script>

<template>
  <fieldset class="au-field au-level-range" :aria-describedby="hint ? `${id}-hint` : undefined">
    <legend class="au-label">
      <span>{{ label }}</span>
      <span class="au-label-value">{{ low }} to {{ high }}</span>
    </legend>
    <div class="row">
      <input
        class="au-control number"
        type="number"
        inputmode="numeric"
        :aria-label="`${label} from`"
        :min="min"
        :max="max"
        :step="step"
        :value="low"
        @change="setLow(valueOf($event)); ($event.target as HTMLInputElement).value = String(low)"
      >
      <div class="track" :style="{ '--au-low': `${lowPct}%`, '--au-high': `${highPct}%` }">
        <input
          class="au-slider thumb"
          type="range"
          :aria-label="`${label} from`"
          :min="min"
          :max="max"
          :step="step"
          :value="low"
          @input="setLow(valueOf($event)); ($event.target as HTMLInputElement).value = String(low)"
        >
        <input
          class="au-slider thumb"
          type="range"
          :aria-label="`${label} to`"
          :min="min"
          :max="max"
          :step="step"
          :value="high"
          @input="setHigh(valueOf($event)); ($event.target as HTMLInputElement).value = String(high)"
        >
      </div>
      <input
        class="au-control number"
        type="number"
        inputmode="numeric"
        :aria-label="`${label} to`"
        :min="min"
        :max="max"
        :step="step"
        :value="high"
        @change="setHigh(valueOf($event)); ($event.target as HTMLInputElement).value = String(high)"
      >
    </div>
    <p v-if="hint" :id="`${id}-hint`" class="au-hint">{{ hint }}</p>
  </fieldset>
</template>

<style scoped>
.au-level-range {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

legend.au-label {
  width: 100%;
  margin-bottom: 6px;
  padding: 0;
}

.row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.number {
  flex: none;
  width: 3.75rem;
  padding-left: 8px;
  padding-right: 8px;
  text-align: right;
}

.track {
  position: relative;
  flex: 1;
  min-width: 40px;
  height: 24px;
}

/* The shared track, filled between the two thumbs */
.track::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(
    to right,
    var(--vp-c-default-soft) var(--au-low),
    var(--vp-c-brand-1) var(--au-low),
    var(--vp-c-brand-1) var(--au-high),
    var(--vp-c-default-soft) var(--au-high)
  );
}

/* Stack both sliders on the track; only their thumbs take the pointer */
.thumb {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.thumb::-webkit-slider-runnable-track {
  background: transparent;
}

.thumb::-moz-range-track,
.thumb::-moz-range-progress {
  background: transparent;
}

.thumb::-webkit-slider-thumb {
  position: relative;
  pointer-events: auto;
}

.thumb::-moz-range-thumb {
  pointer-events: auto;
}
</style>
