<script setup lang="ts">
import { computed, useId } from 'vue';
import type { SelectOption } from './SelectField.vue';

// A small set of exclusive choices shown as one row of buttons (a radio
// group underneath), e.g. house or manor, or which table to show.
const props = defineProps<{
  label: string;
  modelValue: string | number;
  options: SelectOption[];
  /** Hide the label visually; it is still read out */
  hideLabel?: boolean;
}>();
const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>();

const name = useId();
const normalized = computed(() =>
  props.options.map(option =>
    typeof option === 'object' ? option : { label: String(option), value: option }
  )
);
</script>

<template>
  <fieldset class="au-field au-segmented">
    <legend class="au-label" :class="{ 'au-visually-hidden': hideLabel }">{{ label }}</legend>
    <div class="options">
      <label
        v-for="option in normalized"
        :key="option.value"
        class="option"
        :class="{ active: option.value === modelValue }"
      >
        <input
          type="radio"
          class="au-visually-hidden"
          :name="name"
          :value="option.value"
          :checked="option.value === modelValue"
          @change="emit('update:modelValue', option.value)"
        >
        <span>{{ option.label }}</span>
      </label>
    </div>
  </fieldset>
</template>

<style scoped>
.au-segmented {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

legend.au-label {
  margin-bottom: 6px;
  padding: 0;
}

.options {
  display: inline-flex;
  flex-wrap: wrap;
  max-width: 100%;
  padding: 3px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg-alt);
}

.option {
  position: relative;
  padding: 5px 14px;
  border-radius: 7px;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
}

.option:hover {
  color: var(--vp-c-text-1);
}

/* Selected: raised and bold, not only a different color */
.option.active {
  background-color: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-1);
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.option:has(input:focus-visible) {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
}
</style>
