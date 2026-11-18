<script setup lang="ts">
// Crafting: a hammer that strikes the anvil every few seconds, throwing sparks
const sparks = [
  { dx: '-11px', dy: '-9px', r: 1.1, fill: '#f7cf73' },
  { dx: '-5px', dy: '-13px', r: 0.8, fill: '#f2b33f' },
  { dx: '6px', dy: '-12px', r: 1, fill: '#e8743b' },
  { dx: '12px', dy: '-6px', r: 0.8, fill: '#f7cf73' },
  { dx: '-14px', dy: '-3px', r: 0.7, fill: '#e8743b' }
];
</script>

<template>
  <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <ellipse class="flash" cx="35" cy="34" rx="8" ry="2" fill="#f2b33f" />
    <path
      d="M7,35 Q14,35 18,34 H50 V38 Q50,40 47,40 H41 Q38,41 38,44 V46 H44 Q46,46 46,48 V51 H18 V48 Q18,46 20,46 H26 V44 Q26,41 23,40 H19 Q12,40 7,35 Z"
      fill="#203453"
      stroke="#a9d5ef"
      stroke-width="1.2"
      stroke-linejoin="round"
    />
    <path d="M19,35 H49" stroke="#e9f6ff" stroke-opacity=".55" stroke-linecap="round" />
    <g class="hammer">
      <rect x="37" y="24.6" width="20" height="2.8" rx="1.4" fill="#c08a52" />
      <rect x="31" y="21.5" width="8" height="12.5" rx="1.2" fill="#a9d5ef" stroke="#e9f6ff" stroke-width=".8" />
      <path d="M33,23.5 V32" stroke="#e9f6ff" stroke-opacity=".7" stroke-linecap="round" />
    </g>
    <circle
      v-for="(s, i) in sparks"
      :key="i"
      class="spark"
      cx="36"
      cy="33"
      :r="s.r"
      :fill="s.fill"
      :style="{ '--dx': s.dx, '--dy': s.dy }"
    />
  </svg>
</template>

<style scoped>
.hammer {
  transform-origin: 57px 26px;
  transform: rotate(32deg);
  animation: au-strike 5.5s infinite;
}

.spark,
.flash {
  opacity: 0;
}

.spark {
  animation: au-spark 5.5s ease-out infinite;
}

.flash {
  animation: au-flash 5.5s ease-out infinite;
}

@keyframes au-strike {
  0% { transform: rotate(32deg); animation-timing-function: ease-in-out; }
  60% { transform: rotate(38deg); animation-timing-function: cubic-bezier(.6, 0, 1, .6); }
  68% { transform: rotate(0deg); animation-timing-function: ease-out; }
  73% { transform: rotate(6deg); animation-timing-function: ease-in-out; }
  100% { transform: rotate(32deg); }
}

@keyframes au-spark {
  0%, 67% { opacity: 0; transform: translate(0, 0); }
  68% { opacity: 1; transform: translate(0, 0); }
  88%, 100% { opacity: 0; transform: translate(var(--dx), var(--dy)); }
}

@keyframes au-flash {
  0%, 67% { opacity: 0; }
  69% { opacity: .75; }
  84%, 100% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .hammer, .spark, .flash { animation: none; }
}
</style>
