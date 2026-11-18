<script setup lang="ts">
// The default layout with the site's art added through its slots: the night
// sky behind every page but the home page (which draws its own), a section
// band above each doc page's title, a skyline under it, and the 404 scene.
import { useData, useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { computed, nextTick, onMounted, onUnmounted, watch } from 'vue';
import DocSkyline from './components/DocSkyline.vue';
import NotFound from './components/NotFound.vue';
import SectionBand from './components/SectionBand.vue';
import { createEffects, type Effects } from './components/effects';
import { sectionOf } from './components/sections';

const { page, frontmatter } = useData();
const route = useRoute();
const section = computed(() => sectionOf(page.value.relativePath));

let effects: Effects | undefined;

onMounted(() => {
  effects = createEffects();
  effects.refresh(false);
});

watch(() => route.path, async () => {
  await nextTick();
  effects?.refresh(true);
});

onUnmounted(() => effects?.destroy());
</script>

<template>
  <div v-if="frontmatter.layout !== 'home'" class="au-sky" aria-hidden="true" />
  <DefaultTheme.Layout>
    <template #doc-before>
      <SectionBand v-if="section" :key="section.id" :section="section" />
    </template>
    <template #doc-after>
      <DocSkyline />
    </template>
    <template #not-found>
      <NotFound />
    </template>
  </DefaultTheme.Layout>
</template>
