<script setup lang="ts">
// Combat: two crossed swords, a glint running down each blade now and then
// and a spark where they meet
const swords = [
  { angle: -40, delay: '0s' },
  { angle: 40, delay: '.35s' }
];
</script>

<template>
  <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <g v-for="s in swords" :key="s.angle" :transform="`rotate(${s.angle} 32 30)`">
      <path d="M32,5 L34.3,9.5 V40 H29.7 V9.5 Z" fill="#cfe3f2" stroke="#a9d5ef" stroke-width=".8" stroke-linejoin="round" />
      <path d="M32,11 V38" stroke="#3fb1f2" stroke-opacity=".7" />
      <path class="glint" d="M32,7 V40" pathLength="1" stroke="#fff" stroke-width="1.6" stroke-linecap="round" :style="{ animationDelay: s.delay }" />
      <rect x="24" y="40" width="16" height="3" rx="1.5" fill="#f2b33f" />
      <rect x="30.6" y="43" width="2.8" height="9" rx="1" fill="#8a5a32" />
      <circle cx="32" cy="54" r="2.4" fill="#f2b33f" />
    </g>
    <path class="clash" d="M32,23 L33.4,28.6 L39,30 L33.4,31.4 L32,37 L30.6,31.4 L25,30 L30.6,28.6 Z" fill="#f7cf73" />
  </svg>
</template>

<style scoped>
.glint {
  stroke-dasharray: .14 1.2;
  stroke-dashoffset: .14;
  opacity: 0;
  animation: au-glint 7s ease-in-out infinite;
}

.clash {
  transform-origin: 32px 30px;
  transform: scale(0);
  animation: au-clash 7s ease-out infinite;
}

@keyframes au-glint {
  0%, 70% { stroke-dashoffset: .14; opacity: 0; }
  71% { opacity: .9; }
  84% { stroke-dashoffset: -1; opacity: .9; }
  85%, 100% { stroke-dashoffset: -1; opacity: 0; }
}

@keyframes au-clash {
  0%, 68% { transform: scale(0) rotate(0deg); opacity: 0; }
  70% { transform: scale(1) rotate(20deg); opacity: 1; }
  80%, 100% { transform: scale(.2) rotate(45deg); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .glint, .clash { animation: none; }
}
</style>
