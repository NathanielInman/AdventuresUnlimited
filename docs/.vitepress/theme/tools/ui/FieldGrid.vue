<script setup lang="ts">
// Lays fields out in as many columns as fit, each at least `min` wide.
withDefaults(defineProps<{ min?: string }>(), { min: '12rem' });
</script>

<template>
  <div class="au-grid" :style="{ '--au-grid-min': min }"><slot /></div>
</template>

<style scoped>
.au-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(var(--au-grid-min), 100%), 1fr));
  gap: 16px 20px;
  align-items: start;
}
</style>
