<script setup lang="ts">
// Classes: a mage's staff whose crystal glows and breathes, with motes of
// light circling it
const runes = [
  'M24.6,44.6 l3.2,2.2',
  'M28,39.5 l3.2,2.2',
  'M31.4,34.4 l3.2,2.2'
];
</script>

<template>
  <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="au-staff-glow">
        <stop offset="0" stop-color="#a9e3ff" stop-opacity=".9" />
        <stop offset=".35" stop-color="#3fb1f2" stop-opacity=".35" />
        <stop offset="1" stop-color="#3fb1f2" stop-opacity="0" />
      </radialGradient>
    </defs>
    <circle class="glow" cx="45" cy="15" r="15" fill="url(#au-staff-glow)" />
    <path d="M17,57 L41,21" stroke="#c08a52" stroke-width="3.2" stroke-linecap="round" />
    <path d="M17,57 L41,21" stroke="#7a5a32" stroke-width="1" stroke-linecap="round" stroke-opacity=".6" />
    <path v-for="(d, i) in runes" :key="i" :d="d" stroke="#6cc4f5" stroke-width="1.2" stroke-linecap="round" />
    <path d="M41,21 Q35,14 41,7.5 M41,21 Q49,20 51,11" fill="none" stroke="#c08a52" stroke-width="2" stroke-linecap="round" />
    <path d="M45,6 L49.5,14 L45,22 L40.5,14 Z" fill="#a9e3ff" stroke="#e9f6ff" stroke-width=".8" stroke-linejoin="round" />
    <path d="M45,6 L45,22 L49.5,14 Z" fill="#3fb1f2" fill-opacity=".55" />
    <g class="motes">
      <circle cx="45" cy="4" r="1" fill="#e9f6ff" />
      <circle cx="55" cy="18" r=".8" fill="#f7cf73" />
      <circle cx="36" cy="20" r=".7" fill="#a9d5ef" />
    </g>
  </svg>
</template>

<style scoped>
.glow {
  transform-origin: 45px 15px;
  animation: au-breathe 4.5s ease-in-out infinite alternate;
}

.motes {
  transform-origin: 45px 14px;
  animation: au-orbit 12s linear infinite;
}

@keyframes au-breathe {
  from { transform: scale(.75); opacity: .55; }
  to { transform: scale(1.1); opacity: 1; }
}

@keyframes au-orbit {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .glow, .motes { animation: none; }
}
</style>
