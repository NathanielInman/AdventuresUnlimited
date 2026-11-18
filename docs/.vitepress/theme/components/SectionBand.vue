<script setup lang="ts">
// The slim band above a page's title: the section's emblem in a night-sky
// medallion, its name and a short line. Decorative, so screen readers skip
// it; the nav and sidebar already say where the page is.
import type { Component } from 'vue';
import AnvilEmblem from '../art/AnvilEmblem.vue';
import BladesEmblem from '../art/BladesEmblem.vue';
import CompassEmblem from '../art/CompassEmblem.vue';
import MapEmblem from '../art/MapEmblem.vue';
import OrbEmblem from '../art/OrbEmblem.vue';
import ScrollEmblem from '../art/ScrollEmblem.vue';
import StaffEmblem from '../art/StaffEmblem.vue';
import type { Section, SectionId } from './sections';

defineProps<{ section: Section }>();

const emblems: Record<SectionId, Component> = {
  guides: ScrollEmblem,
  world: CompassEmblem,
  classes: StaffEmblem,
  crafting: AnvilEmblem,
  tools: OrbEmblem,
  quests: MapEmblem,
  combat: BladesEmblem
};
</script>

<template>
  <div class="au-band" :class="`au-band--${section.id}`" aria-hidden="true" data-au-ambient>
    <div class="medallion">
      <component :is="emblems[section.id]" class="emblem" />
    </div>
    <div class="words">
      <span class="name">{{ section.name }}</span>
      <span class="tagline">{{ section.tagline }}</span>
    </div>
    <span class="rule" />
  </div>
</template>

<style scoped>
.au-band {
  --accent: var(--au-glow-ink);
  display: flex;
  align-items: center;
  gap: 14px;
  margin: -8px 0 22px;
  user-select: none;
}

.au-band--guides,
.au-band--quests {
  --accent: var(--au-amber-ink);
}

.au-band--crafting,
.au-band--combat {
  --accent: var(--au-ember-ink);
}

.medallion {
  position: relative;
  flex: none;
  width: 56px;
  height: 56px;
  overflow: hidden;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 30%, var(--au-night-2), var(--au-night-1) 55%, var(--au-night-0));
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent),
    0 2px 10px var(--au-medallion-shadow);
  animation: au-medallion-in .6s cubic-bezier(.2, .8, .2, 1) both;
}

.medallion::after {
  content: '';
  position: absolute;
  inset: 3px;
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  border-radius: 50%;
  pointer-events: none;
}

.emblem {
  display: block;
  width: 100%;
  height: 100%;
}

.words {
  display: flex;
  flex-direction: column;
  min-width: 0;
  line-height: 1.25;
}

.name {
  font-family: var(--au-font-display);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--accent);
}

.tagline {
  font-size: 13px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rule {
  position: relative;
  flex: 1;
  min-width: 24px;
  height: 1px;
  margin-left: 6px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 60%, transparent), transparent);
}

.rule::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -6px;
  width: 7px;
  height: 7px;
  background-color: var(--accent);
  transform: rotate(45deg);
}

@keyframes au-medallion-in {
  from { opacity: 0; transform: scale(.85) rotate(-12deg); }
}

@media (max-width: 480px) {
  .au-band {
    gap: 12px;
  }

  .medallion {
    width: 48px;
    height: 48px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .medallion { animation: none; }
}

@media print {
  .au-band {
    display: none;
  }
}
</style>
