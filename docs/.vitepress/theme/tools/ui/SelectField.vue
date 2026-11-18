<script setup lang="ts">
import { computed, useId } from 'vue';

export type SelectOption = string | number | { label: string; value: string | number };

// A labeled native select. Options can be plain values or { label, value }.
const props = defineProps<{
  label: string;
  modelValue: string | number;
  options: SelectOption[];
  hint?: string;
}>();
const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>();

const id = useId();
const normalized = computed(() =>
  props.options.map(option =>
    typeof option === 'object' ? option : { label: String(option), value: option }
  )
);

function onChange(event: Event) {
  const index = (event.target as HTMLSelectElement).selectedIndex;

  emit('update:modelValue', normalized.value[index].value);
}
</script>

<template>
  <div class="au-field">
    <label class="au-label" :for="id">{{ label }}</label>
    <select
      :id="id"
      class="au-control select"
      :aria-describedby="hint ? `${id}-hint` : undefined"
      @change="onChange"
    >
      <option
        v-for="option in normalized"
        :key="option.value"
        :value="option.value"
        :selected="option.value === modelValue"
      >
        {{ option.label }}
      </option>
    </select>
    <p v-if="hint" :id="`${id}-hint`" class="au-hint">{{ hint }}</p>
  </div>
</template>

<style scoped>
.select {
  appearance: none;
  padding-right: 36px;
  background-image: linear-gradient(45deg, transparent 50%, var(--vp-c-text-2) 50%),
    linear-gradient(135deg, var(--vp-c-text-2) 50%, transparent 50%);
  background-position: calc(100% - 18px) 50%, calc(100% - 13px) 50%;
  background-size: 5px 5px;
  background-repeat: no-repeat;
  cursor: pointer;
}
</style>
