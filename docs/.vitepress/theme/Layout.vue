<script setup lang="ts">
// The default layout with the site's art added through its slots
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { computed } from 'vue';
import SectionBand from './components/SectionBand.vue';
import { sectionOf } from './components/sections';

const { page } = useData();
const section = computed(() => sectionOf(page.value.relativePath));
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <SectionBand v-if="section" :key="section.id" :section="section" />
    </template>
  </DefaultTheme.Layout>
</template>
