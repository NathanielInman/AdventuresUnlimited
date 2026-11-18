<script setup lang="ts">
import type { SourceLine } from './model';

// One line of "Where to find it": text with some parts linked
defineProps<{ parts: SourceLine }>();
</script>

<template>
  <template v-for="(part, index) in parts" :key="index">
    <a v-if="typeof part !== 'string' && part.href" :href="part.href">{{ part.text }}</a>
    <template v-else-if="typeof part !== 'string'">{{ part.text }}</template>
    <template v-else>{{ part }}</template>
  </template>
</template>
