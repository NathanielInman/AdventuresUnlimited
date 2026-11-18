<script setup lang="ts">
import { computed } from 'vue';
import { parseMudColors } from '../lib/mud-color';

// Renders a string with AU color codes ({r, {Y, {x...) the way the game
// colors it. Colors come from mud-colors.css and suit both site themes.
const props = defineProps<{ text: string }>();

const segments = computed(() => parseMudColors(props.text));
</script>

<template>
  <span class="au-mud"><span
    v-for="(segment, index) in segments"
    :key="index"
    :class="segment.className || undefined"
  >{{ segment.text }}</span></span>
</template>
