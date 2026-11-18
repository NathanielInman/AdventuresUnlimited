<script setup lang="ts">
import type { IconName } from './entries';

// Line drawings for the home page cards, drawn for a night-colored tile.
// Each one moves a little while its card is hovered or focused (styles
// below, keyed to .au-entry from HomeEntries.vue).
defineProps<{ name: IconName }>();
</script>

<template>
  <svg class="au-icon" :class="`au-icon-${name}`" viewBox="0 0 48 48" aria-hidden="true">
    <g v-if="name === 'summit'">
      <path class="ln" d="M5 41 L19 17 L26 28 L31 21 L43 41 Z" />
      <path class="trail" d="M13 41 L25 36 L17 31 L23 25" />
      <path class="ln" d="M19 17 V6" />
      <path class="flag fill-ac" d="M19 6.5 L28 9 L19 12 Z" />
    </g>

    <g v-else-if="name === 'staff'">
      <path class="arc" d="M7 21 A17 17 0 0 1 21 7" />
      <path class="arc" d="M41 27 A17 17 0 0 1 27 41" />
      <g class="spin">
        <path class="ln thick" d="M11 37 L37 11" />
        <path class="ac" d="M13.5 31.5 L16.5 34.5 M31.5 13.5 L34.5 16.5" />
      </g>
    </g>

    <g v-else-if="name === 'terminal'">
      <rect class="ln" x="6" y="9" width="36" height="30" rx="4" />
      <path class="ln dim" d="M6 15 H42" />
      <path class="gl" d="M12 21 L16 24.5 L12 28" />
      <rect class="cursor fill-ac" x="19" y="26" width="6" height="2.5" rx="1" />
      <path class="typed ln dim" d="M12 33.5 H32" />
    </g>

    <g v-else-if="name === 'search'">
      <g class="gem">
        <path class="ac" d="M9 19 L14 13 H24 L29 19 L19 32 Z" />
        <path class="ac dim" d="M9 19 H29 M16 13 L14.5 19 L19 32 L23.5 19 L22 13" />
      </g>
      <path class="sparkle fill-pale" d="M12 7 l1 2.5 l2.5 1 l-2.5 1 l-1 2.5 l-1 -2.5 l-2.5 -1 l2.5 -1 Z" />
      <g class="glass">
        <circle class="ln" cx="29" cy="27" r="8" />
        <path class="ln thick" d="M35 33 L41 39" />
      </g>
    </g>

    <g v-else-if="name === 'slash'">
      <path class="swing" d="M7 18 Q22 3 41 17" />
      <g class="sword">
        <path class="ln thick" d="M15 33 L36 12 L38 10" />
        <path class="ac" d="M11 28.5 L19.5 37" />
        <path class="ln" d="M15 33 L9.5 38.5" />
      </g>
      <path class="impact fill-ac" d="M41 17 l1.2 3 l3 1.2 l-3 1.2 l-1.2 3 l-1.2 -3 l-3 -1.2 l3 -1.2 Z" />
    </g>

    <g v-else-if="name === 'banner'">
      <path class="ln" d="M3 42 Q24 30 45 42" />
      <path class="ln" d="M21 36 V7" />
      <path class="flag fill-ac" d="M21 8.5 C26 6 31 11.5 38 9 V20 C31 22.5 26 17 21 19.5 Z" />
    </g>

    <g v-else-if="name === 'house'">
      <circle class="smoke s1" cx="33" cy="8" r="2" />
      <circle class="smoke s2" cx="35" cy="4" r="1.5" />
      <path class="ln" d="M31 17.5 V11 H35 V21" />
      <path class="ln" d="M9 24 L24 11 L39 24 M12 22 V40 H36 V22" />
      <path class="ln" d="M21 40 V31 H27 V40" />
      <rect class="window" x="15" y="26" width="4.5" height="4.5" rx=".5" />
      <rect class="window" x="29" y="26" width="4.5" height="4.5" rx=".5" />
    </g>

    <g v-else-if="name === 'compass'">
      <circle class="ln" cx="24" cy="24" r="17" />
      <path class="ln dim" d="M24 4 V9 M24 39 V44 M4 24 H9 M39 24 H44" />
      <g class="needle">
        <path class="fill-ac" d="M24 11 L28 24 H20 Z" />
        <path class="fill-pale" d="M24 37 L20 24 H28 Z" />
        <circle class="fill-night" cx="24" cy="24" r="1.6" />
      </g>
    </g>

    <g v-else-if="name === 'blades'">
      <g class="blade left">
        <path class="ln thick" d="M9 9 L33 33" />
        <path class="ac" d="M29 37 L37 29" />
        <path class="ln" d="M33 33 L39 39" />
      </g>
      <g class="blade right">
        <path class="ln thick" d="M39 9 L15 33" />
        <path class="ac" d="M11 29 L19 37" />
        <path class="ln" d="M15 33 L9 39" />
      </g>
      <path class="glint fill-pale" d="M24 17 l1.3 5.7 l5.7 1.3 l-5.7 1.3 l-1.3 5.7 l-1.3 -5.7 l-5.7 -1.3 l5.7 -1.3 Z" />
    </g>

    <g v-else-if="name === 'anvil'">
      <g class="hammer">
        <path class="ln" d="M34 5 L24 15" />
        <path class="fill-pale" d="M19.5 12 L23 8.5 L28.5 14 L25 17.5 Z" />
      </g>
      <path class="spark k1" d="M19 18 L15 14" />
      <path class="spark k2" d="M21 17 L21 11" />
      <path class="spark k3" d="M17 20 L11 19" />
      <path class="ln" d="M7 22 H37 L42 26 H31 L29 31 H33 V37 H15 V31 H19 L17 26 H11 Z" />
    </g>

    <g v-else-if="name === 'chest'">
      <path class="rays" d="M24 17 V5 M16 18 L11 9 M32 18 L37 9" />
      <g class="lid">
        <path class="ln" d="M9 24 V19 Q9 13 24 13 Q39 13 39 19 V24 Z" />
      </g>
      <rect class="ln" x="9" y="24" width="30" height="15" rx="2" />
      <path class="ln dim" d="M17 24 V39 M31 24 V39" />
      <rect class="fill-ac" x="21.5" y="22" width="5" height="6" rx="1" />
    </g>
  </svg>
</template>

<style>
.au-icon {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.au-icon .ln { stroke: #cfe6f6; }
.au-icon .dim { opacity: 0.5; }
.au-icon .thick { stroke-width: 3; }
.au-icon .ac { stroke: #f2b33f; }
.au-icon .gl { stroke: #3fb1f2; }
.au-icon .fill-ac { fill: #f2b33f; }
.au-icon .fill-pale { fill: #e9f6ff; }
.au-icon .fill-night { fill: #0b1528; }

.au-icon g,
.au-icon path,
.au-icon rect,
.au-icon circle {
  transform-box: fill-box;
}

/* Resting details */
.au-icon .trail { stroke: #f2b33f; stroke-dasharray: 2 3; }
.au-icon .arc { stroke: #3fb1f2; opacity: 0.45; }
.au-icon .swing { stroke: #3fb1f2; stroke-dasharray: 44; stroke-dashoffset: 30; opacity: 0.6; }
.au-icon .impact,
.au-icon .sparkle,
.au-icon .glint { opacity: 0; transform-origin: center; }
.au-icon .window { fill: #f2b33f; opacity: 0.45; }
.au-icon .smoke { fill: #a9d5ef; opacity: 0; }
.au-icon .spark { stroke: #f2b33f; opacity: 0; }
.au-icon .rays { stroke: #f2b33f; opacity: 0; }
.au-icon .typed { transform-origin: left center; transform: scaleX(0.35); }
.au-icon .flag { transform-origin: left center; }
.au-icon .spin { transform-origin: center; }
.au-icon .needle { transform-origin: center; }
.au-icon .glass { transform-origin: center; }
.au-icon .hammer { transform-origin: 100% 0; }
.au-icon .lid { transform-origin: 0 100%; }
.au-icon .blade.left { transform-origin: 100% 100%; }
.au-icon .blade.right { transform-origin: 0 100%; }
.au-icon .sword { transform-origin: 0 100%; }

@media (prefers-reduced-motion: no-preference) {
  .au-icon * {
    transition: transform 0.45s cubic-bezier(0.3, 0.7, 0.3, 1), opacity 0.35s ease;
  }

  /* summit: the flag flies and the trail climbs */
  .au-entry:is(:hover, :focus-visible) .au-icon .trail { animation: au-icon-march 1.2s linear infinite; }
  .au-entry:is(:hover, :focus-visible) .au-icon .flag { animation: au-icon-wave 1.1s ease-in-out infinite; }
  /* staff: one full spin */
  .au-entry:is(:hover, :focus-visible) .au-icon .spin { transform: rotate(180deg); transition-duration: 0.9s; }
  .au-entry:is(:hover, :focus-visible) .au-icon .arc { opacity: 0.9; }
  /* terminal: a line types out under a blinking cursor */
  .au-entry:is(:hover, :focus-visible) .au-icon .cursor { animation: au-icon-blink 0.9s steps(1) infinite; }
  .au-entry:is(:hover, :focus-visible) .au-icon .typed { transform: scaleX(1); transition-duration: 1.2s; }
  /* search: the glass sweeps over the gem, which catches the light */
  .au-entry:is(:hover, :focus-visible) .au-icon .glass { animation: au-icon-sweep 1.8s ease-in-out infinite; }
  .au-entry:is(:hover, :focus-visible) .au-icon .sparkle { animation: au-icon-pop 1.8s ease-in-out infinite; }
  /* damage: the blade swings and lands */
  .au-entry:is(:hover, :focus-visible) .au-icon .swing { stroke-dashoffset: 0; opacity: 1; transition-duration: 0.35s; }
  .au-entry:is(:hover, :focus-visible) .au-icon .sword { transform: rotate(-10deg); }
  .au-entry:is(:hover, :focus-visible) .au-icon .impact { animation: au-icon-pop 0.9s ease-out 0.2s infinite; }
  /* territory and housing */
  .au-entry:is(:hover, :focus-visible) .au-icon .window { opacity: 1; }
  .au-entry:is(:hover, :focus-visible) .au-icon .smoke { animation: au-icon-smoke 2.2s ease-out infinite; }
  .au-entry:is(:hover, :focus-visible) .au-icon .smoke.s2 { animation-delay: 1.1s; }
  /* areas: the needle swings and settles */
  .au-entry:is(:hover, :focus-visible) .au-icon .needle { animation: au-icon-swing 1.6s ease-out; }
  /* classes: the blades part and a glint crosses them */
  .au-entry:is(:hover, :focus-visible) .au-icon .blade.left { transform: rotate(-8deg); }
  .au-entry:is(:hover, :focus-visible) .au-icon .blade.right { transform: rotate(8deg); }
  .au-entry:is(:hover, :focus-visible) .au-icon .glint { animation: au-icon-pop 1.4s ease-in-out 0.2s infinite; }
  /* crafting: the hammer falls, the sparks fly */
  .au-entry:is(:hover, :focus-visible) .au-icon .hammer { animation: au-icon-strike 0.9s ease-in infinite; }
  .au-entry:is(:hover, :focus-visible) .au-icon .spark { animation: au-icon-spark 0.9s ease-out infinite; }
  /* quests: the lid lifts on something bright */
  .au-entry:is(:hover, :focus-visible) .au-icon .lid { transform: translate(0, -3px) rotate(-12deg); }
  .au-entry:is(:hover, :focus-visible) .au-icon .rays { opacity: 1; animation: au-icon-glow 1.4s ease-in-out infinite alternate; }
}

@keyframes au-icon-march { to { stroke-dashoffset: -10; } }
@keyframes au-icon-wave {
  0%, 100% { transform: skewY(0deg) scaleX(1); }
  50% { transform: skewY(8deg) scaleX(0.86); }
}
@keyframes au-icon-blink { 50% { opacity: 0; } }
@keyframes au-icon-sweep {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-9px, -6px); }
}
@keyframes au-icon-pop {
  0%, 100% { opacity: 0; transform: scale(0.3); }
  45% { opacity: 1; transform: scale(1.15); }
  70% { opacity: 0.6; transform: scale(0.9); }
}
@keyframes au-icon-smoke {
  0% { opacity: 0; transform: translate(0, 4px) scale(0.6); }
  30% { opacity: 0.7; }
  100% { opacity: 0; transform: translate(3px, -6px) scale(1.4); }
}
@keyframes au-icon-swing {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(50deg); }
  50% { transform: rotate(-28deg); }
  72% { transform: rotate(12deg); }
  88% { transform: rotate(-4deg); }
  100% { transform: rotate(0deg); }
}
@keyframes au-icon-strike {
  0%, 100% { transform: rotate(-28deg); }
  55% { transform: rotate(-28deg); }
  70% { transform: rotate(4deg); }
  80% { transform: rotate(0deg); }
}
@keyframes au-icon-spark {
  0%, 68% { opacity: 0; transform: translate(0, 0); }
  74% { opacity: 1; }
  100% { opacity: 0; transform: translate(-2px, -3px); }
}
@keyframes au-icon-glow {
  from { opacity: 0.5; }
  to { opacity: 1; }
}
</style>
