<script setup lang="ts">
import { useId } from 'vue';

// A labeled multi-line text box, for pasting game output.
withDefaults(
  defineProps<{
    label: string;
    modelValue: string;
    rows?: number;
    placeholder?: string;
    hint?: string;
    /** Monospace text, for lists pasted from the game */
    mono?: boolean;
    readonly?: boolean;
  }>(),
  { rows: 8 }
);
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const id = useId();
</script>

<template>
  <div class="au-field">
    <label class="au-label" :for="id">{{ label }}</label>
    <textarea
      :id="id"
      class="au-control textarea"
      :class="{ mono }"
      :rows="rows"
      :value="modelValue"
      :placeholder="placeholder"
      :readonly="readonly"
      spellcheck="false"
      :aria-describedby="hint ? `${id}-hint` : undefined"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <p v-if="hint" :id="`${id}-hint`" class="au-hint">{{ hint }}</p>
  </div>
</template>

<style scoped>
.textarea {
  resize: vertical;
  min-height: 80px;
}

.mono {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 20px;
}
</style>
