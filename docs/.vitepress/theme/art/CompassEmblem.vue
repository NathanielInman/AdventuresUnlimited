<script setup lang="ts">
// World: a compass rose that sways as if settling on north, inside a slowly
// turning ring of ticks
const diagonals = [45, 135, 225, 315];
const cardinals = [90, 180, 270];
</script>

<template>
  <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <circle cx="32" cy="32" r="24" fill="none" stroke="#a9d5ef" stroke-opacity=".3" />
    <circle class="ring" cx="32" cy="32" r="21" fill="none" stroke="#3fb1f2" stroke-opacity=".6" stroke-width="2" stroke-dasharray="0.8 3.5" />
    <g class="rose">
      <g v-for="a in diagonals" :key="a" :transform="`rotate(${a} 32 32)`">
        <path d="M32,20 L30,30 L32,32 Z" fill="#a9d5ef" fill-opacity=".75" />
        <path d="M32,20 L34,30 L32,32 Z" fill="#3fb1f2" fill-opacity=".55" />
      </g>
      <g v-for="a in cardinals" :key="a" :transform="`rotate(${a} 32 32)`">
        <path d="M32,13 L28.6,28.6 L32,32 Z" fill="#e9f6ff" />
        <path d="M32,13 L35.4,28.6 L32,32 Z" fill="#6cc4f5" />
      </g>
      <path d="M32,13 L28.6,28.6 L32,32 Z" fill="#f7cf73" />
      <path d="M32,13 L35.4,28.6 L32,32 Z" fill="#e8743b" />
    </g>
    <circle cx="32" cy="32" r="2.6" fill="#0b1324" stroke="#f2b33f" stroke-width="1.2" />
  </svg>
</template>

<style scoped>
.ring {
  transform-origin: 32px 32px;
  animation: au-ring 90s linear infinite;
}

.rose {
  transform-origin: 32px 32px;
  animation: au-sway 11s ease-in-out infinite;
}

@keyframes au-ring {
  to { transform: rotate(360deg); }
}

@keyframes au-sway {
  0%, 100% { transform: rotate(-9deg); }
  35% { transform: rotate(7deg); }
  60% { transform: rotate(-3deg); }
  80% { transform: rotate(2deg); }
}

@media (prefers-reduced-motion: reduce) {
  .ring, .rose { animation: none; }
}
</style>
