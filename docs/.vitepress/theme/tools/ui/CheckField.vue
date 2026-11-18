<script setup lang="ts">
import { useId } from 'vue';

// A labeled checkbox, or an on/off switch with `switch`.
defineProps<{
  label: string;
  modelValue: boolean;
  hint?: string;
  switch?: boolean;
}>();
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();

const id = useId();
</script>

<template>
  <div class="au-check" :class="{ 'is-switch': $props.switch }">
    <input
      :id="id"
      type="checkbox"
      class="box"
      :role="$props.switch ? 'switch' : undefined"
      :checked="modelValue"
      :aria-describedby="hint ? `${id}-hint` : undefined"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    >
    <div class="text">
      <label :for="id">{{ label }}</label>
      <p v-if="hint" :id="`${id}-hint`" class="au-hint">{{ hint }}</p>
    </div>
  </div>
</template>

<style scoped>
.au-check {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  min-height: 24px;
}

.text {
  min-width: 0;
}

label {
  display: block;
  font-size: 14px;
  line-height: 22px;
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.box {
  flex: none;
  appearance: none;
  position: relative;
  width: 18px;
  height: 18px;
  margin: 2px 0 0;
  border: 1.5px solid var(--vp-c-text-3);
  border-radius: 4px;
  background-color: var(--vp-input-bg-color);
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.box:hover {
  border-color: var(--vp-c-brand-2);
}

.box:checked {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-1);
}

/* Check mark: a rotated L, so the state is a shape and not only a color */
.box:checked::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid var(--vp-c-white);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.dark .box:checked::after {
  border-color: var(--vp-c-black);
}

.is-switch .box {
  width: 40px;
  height: 22px;
  margin-top: 0;
  border-radius: 11px;
  border-color: var(--vp-input-border-color);
  background-color: var(--vp-input-switch-bg-color);
}

.is-switch .box::after,
.is-switch .box:checked::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border: 0;
  border-radius: 50%;
  background-color: var(--vp-c-neutral-inverse);
  box-shadow: var(--vp-shadow-1);
  transform: none;
  transition: transform 0.2s;
}

.is-switch .box:checked {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-1);
}

.is-switch .box:checked::after {
  background-color: var(--vp-c-white);
  transform: translateX(18px);
}
</style>
