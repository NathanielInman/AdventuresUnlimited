<script setup lang="ts">
import { ref, useId, watch } from 'vue';

// A labeled number input. Emits while typing whenever the text is a number
// inside min..max, and clamps to the range when the field loses focus.
const props = withDefaults(
  defineProps<{
    label: string;
    modelValue: number;
    min?: number;
    max?: number;
    step?: number;
    /** Short unit shown inside the field, e.g. "hp" or "%" */
    unit?: string;
    hint?: string;
  }>(),
  { min: -Infinity, max: Infinity, step: 1 }
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

const clamp = (value: number) => Math.min(props.max, Math.max(props.min, value));

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
</script>

<template>
  <div class="au-field">
    <label class="au-label" :for="id">{{ label }}</label>
    <div class="au-unit-wrap">
      <input
        :id="id"
        class="au-control"
        type="number"
        inputmode="decimal"
        :value="text"
        :min="Number.isFinite(min) ? min : undefined"
        :max="Number.isFinite(max) ? max : undefined"
        :step="step"
        :aria-describedby="hint ? `${id}-hint` : undefined"
        @input="onInput"
        @change="onChange"
      >
      <span v-if="unit" class="au-unit" aria-hidden="true">{{ unit }}</span>
    </div>
    <p v-if="hint" :id="`${id}-hint`" class="au-hint">{{ hint }}</p>
  </div>
</template>
