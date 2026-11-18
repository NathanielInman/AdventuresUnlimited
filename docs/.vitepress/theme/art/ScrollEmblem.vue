<script setup lang="ts">
// Guides: a scroll that unrolls when the section opens, its lines written in
// one after another and a wax seal pressed on last. It plays once.
const lines = [
  { y: 24, x2: 45 },
  { y: 28.5, x2: 45 },
  { y: 33, x2: 43 },
  { y: 37.5, x2: 36 }
];
</script>

<template>
  <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <g class="sheet">
      <rect x="13" y="17" width="38" height="30" fill="#e8d9b5" />
      <path d="M13,17 H51 M13,47 H51" stroke="#c9b083" stroke-width="1" />
    </g>
    <path
      v-for="(line, i) in lines"
      :key="i"
      class="line"
      :d="`M18,${line.y} H${line.x2}`"
      pathLength="1"
      stroke="#7a5a32"
      stroke-width="1.6"
      stroke-linecap="round"
      :style="{ animationDelay: `${1.2 + i * 0.22}s` }"
    />
    <g class="seal">
      <circle cx="44" cy="42" r="3.4" fill="#e8743b" />
      <circle cx="44" cy="42" r="2" fill="none" stroke="#f7cf73" stroke-width=".7" />
    </g>
    <g>
      <rect x="9" y="14" width="5" height="36" rx="2.5" fill="#c08a52" stroke="#7a5a32" stroke-width=".8" />
      <circle cx="11.5" cy="13" r="2" fill="#f2b33f" />
      <circle cx="11.5" cy="51" r="2" fill="#f2b33f" />
    </g>
    <g class="roller">
      <rect x="50" y="14" width="5" height="36" rx="2.5" fill="#c08a52" stroke="#7a5a32" stroke-width=".8" />
      <circle cx="52.5" cy="13" r="2" fill="#f2b33f" />
      <circle cx="52.5" cy="51" r="2" fill="#f2b33f" />
    </g>
  </svg>
</template>

<style scoped>
.sheet {
  transform-origin: 13px 32px;
  animation: au-unroll 1.1s cubic-bezier(.3, .7, .3, 1) .2s both;
}

.roller {
  animation: au-roll 1.1s cubic-bezier(.3, .7, .3, 1) .2s both;
}

.line {
  stroke-dasharray: 1;
  animation: au-write .5s ease-out both;
}

.seal {
  transform-origin: 44px 42px;
  animation: au-seal .45s cubic-bezier(.3, 1.6, .5, 1) 2.2s both;
}

@keyframes au-unroll {
  from { transform: scaleX(0.04); }
}

@keyframes au-roll {
  from { transform: translateX(-37px); }
}

@keyframes au-write {
  from { stroke-dashoffset: 1; }
}

@keyframes au-seal {
  from { transform: scale(0); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .sheet, .roller, .line, .seal { animation: none; }
}
</style>
