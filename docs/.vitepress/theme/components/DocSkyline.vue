<script setup lang="ts">
// A mountain skyline under each page, with the site's footer note. VitePress
// hides its own footer on pages with a sidebar, so this is where doc pages
// get it.
import { useData } from 'vitepress';

const { theme } = useData();

const far = 'M0,44.3 L12,39.7 L25,35.4 L38,31.7 L50,27.7 L62,22.6 L75,19.0 L88,13.3 L100,9.2 L112,6.5 L125,10.6 L138,12.9 L150,14.5 L162,18.5 L175,22.6 L188,26.0 L200,29.8 L212,32.8 L225,32.2 L238,30.9 L250,29.7 L262,28.8 L275,28.6 L288,26.9 L300,24.2 L312,25.1 L325,25.4 L338,26.9 L350,29.4 L362,32.6 L375,35.4 L388,37.2 L400,38.8 L412,37.8 L425,34.2 L438,32.2 L450,29.2 L462,26.5 L475,24.5 L488,24.1 L500,21.8 L512,18.1 L525,18.1 L538,21.8 L550,25.9 L562,29.4 L575,32.0 L588,34.9 L600,39.0 L612,37.9 L625,34.5 L638,29.1 L650,25.2 L662,19.7 L675,13.5 L688,9.0 L700,10.6 L712,15.3 L725,19.6 L738,24.3 L750,27.6 L762,32.5 L775,37.9 L788,42.6 L800,46.0';
const near = 'M0,58.0 L50,56.5 L100,55.8 L150,52.5 L200,48.8 L250,50.7 L300,51.9 L350,54.2 L400,57.5 L450,55.0 L500,52.2 L550,49.4 L600,45.5 L650,48.7 L700,53.1 L750,56.1 L800,57.7';
const castle = 'M97,12 V-5 h1.5 v-1.5 h1.5 v1.5 h1.5 v-1.5 h1.5 V-1 h2 v-2 h2 v2 h2 v-2 h2 v2 h2 v-2 h2 v2 h2 v-2 h2 V-8 l2.5,-4 l2.5,4 V12 Z';
const stars = [
  [40, -4, 1.1], [170, -10, 0.9], [236, 2, 1.2], [330, -8, 0.8], [402, 6, 1],
  [455, -12, 1.2], [520, -2, 0.8], [640, -6, 1], [735, -11, 0.9], [778, 4, 1.1]
];
</script>

<template>
  <div class="au-skyline" data-au-ambient>
    <svg viewBox="0 -16 800 88" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <g class="stars">
        <circle v-for="([x, y, r], i) in stars" :key="i" :cx="x" :cy="y" :r="r" :class="`tw tw${i % 3}`" />
      </g>
      <g class="moon">
        <circle cx="580" cy="-1" r="16" class="moon-glow" />
        <path d="M580,-8 a7,7 0 1 0 6,10.5 a6,6.5 0 1 1 -6,-10.5 Z" class="moon-face" />
      </g>
      <path :d="`${far} V72 H0 Z`" class="far" />
      <path :d="castle" class="keep" />
      <circle cx="109.5" cy="3" r="1.3" class="window" />
      <path :d="far" class="ridge" />
      <path :d="`${near} V72 H0 Z`" class="near" />
    </svg>
    <p v-if="theme.footer?.message" class="note">{{ theme.footer.message }}</p>
    <p v-if="theme.footer?.copyright" class="note small">{{ theme.footer.copyright }}</p>
  </div>
</template>

<style scoped>
.au-skyline {
  margin-top: 56px;
  text-align: center;
}

svg {
  display: block;
  width: 100%;
  height: 72px;
}

.far {
  fill: var(--au-skyline-far);
}

.near {
  fill: var(--au-skyline-near);
}

.keep {
  fill: var(--au-skyline-keep);
}

.ridge {
  fill: none;
  stroke: var(--au-skyline-ridge);
  stroke-width: 1.2;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}

.stars {
  fill: var(--au-skyline-star);
}

.moon-glow {
  fill: var(--au-skyline-moon-glow);
}

.moon-face {
  fill: var(--au-skyline-moon);
}

.window {
  fill: var(--au-amber);
  animation: au-flicker 3.4s steps(1) infinite;
}

.tw0 { animation: au-twinkle 4.2s ease-in-out infinite; }
.tw1 { animation: au-twinkle 5.6s ease-in-out 1.3s infinite; }
.tw2 { animation: au-twinkle 3.6s ease-in-out 2.1s infinite; }

@keyframes au-twinkle {
  0%, 100% { opacity: 1; }
  50% { opacity: .25; }
}

@keyframes au-flicker {
  0%, 100% { opacity: 1; }
  20% { opacity: .7; }
  24% { opacity: 1; }
  61% { opacity: .8; }
  64% { opacity: 1; }
}

.note {
  margin: 14px 0 0;
  font-size: 13px;
  line-height: 20px;
  color: var(--vp-c-text-2);
}

.note.small {
  margin-top: 2px;
  font-size: 12px;
}

@media (prefers-reduced-motion: reduce) {
  .window, .tw0, .tw1, .tw2 { animation: none; }
}

@media print {
  .au-skyline {
    display: none;
  }
}
</style>
