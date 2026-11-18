<script setup lang="ts">
// A card that groups related controls or results. Children stack with
// a 20px gap; use FieldGrid inside for side-by-side fields.
withDefaults(
  defineProps<{
    title?: string;
    /** Heading tag for the title; h2 sits right under the page title */
    as?: 'h2' | 'h3' | 'h4';
    description?: string;
  }>(),
  { as: 'h2' }
);
</script>

<template>
  <section class="au-panel">
    <header v-if="title || $slots.actions" class="head">
      <div class="titles">
        <component :is="as" v-if="title" class="title">{{ title }}</component>
        <p v-if="description" class="au-hint">{{ description }}</p>
      </div>
      <div v-if="$slots.actions" class="actions"><slot name="actions" /></div>
    </header>
    <div class="body"><slot /></div>
  </section>
</template>

<style scoped>
.au-panel {
  margin: 16px 0;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
}

.head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px 16px;
  margin-bottom: 16px;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.titles {
  min-width: 0;
}

/* Beat .vp-doc h2/h3 margins and borders */
.title.title {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: normal;
  color: var(--vp-c-text-1);
}

.titles .au-hint {
  margin-top: 2px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 639px) {
  .au-panel {
    padding: 16px;
  }
}
</style>
