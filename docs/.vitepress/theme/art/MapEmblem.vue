<script setup lang="ts">
// Quests: a folded map whose dotted trail draws itself to an X, which then
// pulses like a waypoint
const trail = 'M13,45 C18,38 24,45 28,37 S35,27 40,31 S45,25 47,22';
</script>

<template>
  <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <defs>
      <mask id="au-map-trail">
        <path class="reveal" :d="trail" pathLength="1" fill="none" stroke="#fff" stroke-width="5" />
      </mask>
    </defs>
    <path d="M8,16 L22,12 V48 L8,52 Z" fill="#e8d9b5" />
    <path d="M22,12 L38,16 V52 L22,48 Z" fill="#d6c193" />
    <path d="M38,16 L56,12 V48 L38,52 Z" fill="#e8d9b5" />
    <path d="M8,16 L22,12 L38,16 L56,12 V48 L38,52 L22,48 L8,52 Z" fill="none" stroke="#7a5a32" stroke-width="1" stroke-linejoin="round" />
    <path d="M11,27 l3,-4.5 l3,4.5 M16,26 l2.5,-3.5 l2.5,3.5" fill="none" stroke="#7a5a32" stroke-width="1" stroke-linejoin="round" />
    <path d="M27,46 q2,-1.6 4,0 t4,0" fill="none" stroke="#3f7fae" stroke-width="1.1" stroke-linecap="round" />
    <path :d="trail" fill="none" stroke="#8a3f17" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="0.1 3" mask="url(#au-map-trail)" />
    <circle class="ping" cx="47" cy="21" r="3.5" fill="none" stroke="#e8743b" stroke-width="1.2" />
    <path class="mark" d="M44.5,18.5 L49.5,23.5 M49.5,18.5 L44.5,23.5" stroke="#c4421a" stroke-width="2.2" stroke-linecap="round" />
  </svg>
</template>

<style scoped>
.reveal {
  stroke-dasharray: 1;
  animation: au-draw 1.8s ease-in-out .3s both;
}

.mark {
  transform-origin: 47px 21px;
  animation: au-pop .4s cubic-bezier(.3, 1.6, .5, 1) 2s both;
}

.ping {
  transform-origin: 47px 21px;
  opacity: 0;
  animation: au-ping 3.2s ease-out 2.4s infinite;
}

@keyframes au-draw {
  from { stroke-dashoffset: 1; }
}

@keyframes au-pop {
  from { transform: scale(0); }
}

@keyframes au-ping {
  0% { transform: scale(.8); opacity: .9; }
  60%, 100% { transform: scale(2.4); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .reveal, .mark, .ping { animation: none; }
}
</style>
