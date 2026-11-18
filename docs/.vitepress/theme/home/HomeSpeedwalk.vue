<script setup lang="ts">
import { ref } from 'vue';
import { prefersReducedMotion, useActive } from './lib/motion';

// The speedwalk convention drawn out: from Market Square, 4e9n is 4 rooms
// east and then 9 north. The walk draws itself while the figure is on
// screen; with reduced motion it is simply drawn.
const root = ref<HTMLElement | null>(null);
const walking = ref(false);

useActive(root, active => {
  walking.value = active && !prefersReducedMotion();
});

const step = 16;
const origin = { x: 22, y: 172 };
const corner = { x: origin.x + 4 * step, y: origin.y };
const end = { x: corner.x, y: origin.y - 9 * step };
const walk = `M${origin.x} ${origin.y} H${corner.x} V${end.y}`;
const dots: { x: number; y: number }[] = [];
for (let x = 0; x <= 6; x++) {
  for (let y = 0; y <= 10; y++) dots.push({ x: origin.x - step + x * step, y: origin.y - y * step });
}
</script>

<template>
  <figure ref="root" class="au-speedwalk" :class="{ walking }">
    <svg viewBox="0 0 120 196" aria-hidden="true">
      <circle v-for="(dot, i) in dots" :key="i" :cx="dot.x" :cy="dot.y" r="1.2" class="grid" />
      <path :d="walk" class="walk" pathLength="13" />
      <circle :cx="origin.x" :cy="origin.y" r="6" class="start" />
      <circle :cx="end.x" :cy="end.y" r="4.5" class="end" />
      <text :x="origin.x + 2 * step" :y="origin.y + 16" class="label">4e</text>
      <text :x="corner.x + 10" :y="origin.y - 4.5 * step" class="label">9n</text>
    </svg>
    <figcaption>
      <code>4e9n</code>
      <span>Start in Market Square, walk 4 rooms east, then 9 north.</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.au-speedwalk {
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 20px 0 0;
  padding: 14px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
}

svg {
  flex: none;
  width: 80px;
  height: auto;
  overflow: visible;
}

.grid {
  fill: var(--vp-c-text-3);
  opacity: 0.6;
}

.walk {
  fill: none;
  stroke: var(--vp-c-brand-1);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 13 13;
}

.walking .walk {
  animation: au-walk 6s ease-in-out infinite;
}

.start {
  fill: var(--vp-c-brand-1);
  stroke: var(--vp-c-bg-soft);
  stroke-width: 3;
}

.end {
  fill: none;
  stroke: var(--vp-c-brand-1);
  stroke-width: 2;
}

.label {
  font-family: var(--au-font-mono, 'JetBrains Mono', monospace);
  font-size: 13px;
  font-weight: 700;
  fill: var(--vp-c-text-2);
}

@keyframes au-walk {
  0% { stroke-dashoffset: 13; }
  55%, 85% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -13; }
}

figcaption {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

figcaption code {
  align-self: flex-start;
  padding: 2px 8px;
  border-radius: 6px;
  font-family: var(--au-font-mono, 'JetBrains Mono', monospace);
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
</style>
