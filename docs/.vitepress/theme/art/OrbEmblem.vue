<script setup lang="ts">
// Tools: a scrying orb on a stand, mist turning slowly inside it
</script>

<template>
  <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="au-orb-fill" cx=".42" cy=".38" r=".7">
        <stop offset="0" stop-color="#3fb1f2" stop-opacity=".55" />
        <stop offset=".6" stop-color="#1c3a63" />
        <stop offset="1" stop-color="#0b1324" />
      </radialGradient>
      <clipPath id="au-orb-clip"><circle cx="32" cy="28" r="15" /></clipPath>
    </defs>
    <path d="M20,53 H44" stroke="#f2b33f" stroke-width="2" stroke-linecap="round" />
    <path d="M23,52 L26,45 H38 L41,52 Z" fill="#203453" stroke="#f2b33f" stroke-width="1.2" stroke-linejoin="round" />
    <circle cx="32" cy="28" r="15" fill="url(#au-orb-fill)" />
    <g clip-path="url(#au-orb-clip)" fill="none" stroke-linecap="round">
      <g class="mist one">
        <path d="M18,31 C24,21 32,37 46,25" stroke="#a9d5ef" stroke-opacity=".6" stroke-width="1.8" />
      </g>
      <g class="mist two">
        <path d="M20,22 C27,31 36,17 44,32" stroke="#3fb1f2" stroke-opacity=".7" stroke-width="1.4" />
      </g>
      <circle class="core" cx="32" cy="28" r="3.2" fill="#e9f6ff" fill-opacity=".8" stroke="none" />
    </g>
    <circle cx="32" cy="28" r="15" fill="none" stroke="#a9d5ef" stroke-opacity=".8" stroke-width="1.2" />
    <ellipse cx="26" cy="21" rx="4.2" ry="2.2" transform="rotate(-35 26 21)" fill="#fff" fill-opacity=".45" />
    <path d="M25,45 Q22,41 23.5,38 M39,45 Q42,41 40.5,38" fill="none" stroke="#f2b33f" stroke-width="1.4" stroke-linecap="round" />
  </svg>
</template>

<style scoped>
.mist {
  transform-origin: 32px 28px;
}

.one {
  animation: au-turn 16s linear infinite;
}

.two {
  animation: au-turn 23s linear infinite reverse;
}

.core {
  transform-origin: 32px 28px;
  animation: au-pulse 5s ease-in-out infinite alternate;
}

@keyframes au-turn {
  to { transform: rotate(360deg); }
}

@keyframes au-pulse {
  from { transform: scale(.7); opacity: .5; }
  to { transform: scale(1.25); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .one, .two, .core { animation: none; }
}
</style>
