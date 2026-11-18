<script setup lang="ts">
import { ref, useId, watch } from 'vue';

// A count as one row of a list: label and price on the left, a number box
// with minus and plus buttons on the right. Clamps to min..max.
const props = withDefaults(
  defineProps<{
    label: string;
    modelValue: number;
    min?: number;
    max?: number;
    hint?: string;
  }>(),
  { min: 0, max: Infinity }
);
const emit = defineEmits<{ 'update:modelValue': [value: number] }>();

const id = useId();
const text = ref(String(props.modelValue));

watch(
  () => props.modelValue,
  value => {
    if (Number(text.value) !== value) text.value = String(value);
  }
);

const clamp = (value: number) => Math.min(props.max, Math.max(props.min, Math.floor(value)));

function onInput(event: Event) {
  text.value = (event.target as HTMLInputElement).value;
  const value = Number(text.value);

  if (text.value.trim() !== '' && Number.isFinite(value) && value === clamp(value)) {
    emit('update:modelValue', value);
  }
}

function onChange() {
  const value = Number(text.value);
  const next = text.value.trim() !== '' && Number.isFinite(value) ? clamp(value) : props.modelValue;

  text.value = String(next);
  if (next !== props.modelValue) emit('update:modelValue', next);
}

function step(by: number) {
  const next = clamp(props.modelValue + by);

  if (next !== props.modelValue) emit('update:modelValue', next);
}
</script>

<template>
  <div class="count">
    <div class="text">
      <label class="label" :for="id">{{ label }}</label>
      <p v-if="hint" :id="`${id}-hint`" class="au-hint">{{ hint }}</p>
    </div>
    <div class="stepper">
      <button
        type="button"
        class="step"
        :disabled="modelValue <= min"
        :aria-label="`One fewer: ${label}`"
        @click="step(-1)"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">
          <path d="M3.5 8h9" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
        </svg>
      </button>
      <input
        :id="id"
        class="value"
        type="number"
        inputmode="numeric"
        :value="text"
        :min="min"
        :max="Number.isFinite(max) ? max : undefined"
        step="1"
        :aria-describedby="hint ? `${id}-hint` : undefined"
        @input="onInput"
        @change="onChange"
      >
      <button
        type="button"
        class="step"
        :disabled="modelValue >= max"
        :aria-label="`One more: ${label}`"
        @click="step(1)"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">
          <path d="M3.5 8h9M8 3.5v9" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.count {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
}

.text {
  min-width: 0;
}

.label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: var(--vp-c-text-1);
}

.stepper {
  flex: none;
  display: flex;
  align-items: stretch;
  height: 36px;
  border: 1px solid var(--vp-input-border-color);
  border-radius: 8px;
  background-color: var(--vp-input-bg-color);
  transition: border-color 0.2s;
}

.stepper:hover {
  border-color: var(--vp-c-brand-2);
}

.step {
  display: grid;
  place-items: center;
  width: 34px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
}

.step:first-child {
  border-radius: 7px 0 0 7px;
}

.step:last-child {
  border-radius: 0 7px 7px 0;
}

.step:hover:not(:disabled) {
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

.step:disabled {
  color: var(--vp-c-text-3);
  opacity: 0.5;
  cursor: default;
}

.value {
  width: 3rem;
  padding: 0;
  border: 0;
  border-inline: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-1);
  font: inherit;
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  text-align: center;
  appearance: textfield;
  -moz-appearance: textfield;
}

.value::-webkit-inner-spin-button,
.value::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
