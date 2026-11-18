<script setup lang="ts">
import { withBase } from 'vitepress';
import { toolCatalog } from './lib/catalog';

// A card per tool for the tools overview page, from lib/catalog.ts.
</script>

<template>
  <ul class="au-tool-cards">
    <li v-for="tool in toolCatalog" :key="tool.link">
      <a class="card" :href="withBase(`${tool.link}.html`)">
        <span class="title">{{ tool.title }}</span>
        <span class="summary">{{ tool.summary }}</span>
        <span class="more" aria-hidden="true">Open</span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.au-tool-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(16rem, 100%), 1fr));
  gap: 16px;
  margin: 24px 0;
  padding: 0;
  list-style: none;
}

.au-tool-cards li {
  margin: 0;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  padding: 20px 24px;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  color: inherit;
  text-decoration: none;
  transition: border-color 0.25s, background-color 0.25s;
}

.card:hover {
  border-color: var(--vp-c-brand-1);
}

.card:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: var(--vp-c-text-1);
}

.summary {
  flex: 1;
  margin-top: 8px;
  font-size: 14px;
  line-height: 22px;
  color: var(--vp-c-text-2);
}

.more {
  margin-top: 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.more::after {
  content: ' \2192';
}
</style>
