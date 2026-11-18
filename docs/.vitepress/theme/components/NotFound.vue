<script setup lang="ts">
// The 404 page: a road that ends at a rockfall under the night sky, a torch
// guttering on the wall, and the game's own answer to a blocked exit
import { withBase } from 'vitepress';

const stars = [
  [42, 30, 1.2], [96, 62, 0.9], [150, 22, 1.4], [212, 48, 0.8], [268, 18, 1.1],
  [318, 56, 0.9], [372, 28, 1.3], [430, 70, 0.8], [520, 40, 1], [560, 86, 0.9],
  [60, 96, 0.8], [250, 92, 1], [128, 120, 0.7], [470, 18, 0.9], [586, 20, 1.1]
];
const embers = [
  { x: 0, delay: '0s', dur: '3.2s' },
  { x: 5, delay: '1.1s', dur: '2.7s' },
  { x: -4, delay: '2s', dur: '3.6s' }
];

function openSearch() {
  document.querySelector<HTMLButtonElement>('.VPNavBarSearch .DocSearch-Button')?.click();
}
</script>

<template>
  <div class="au-404">
    <svg class="scene" viewBox="0 0 600 240" aria-hidden="true" focusable="false" data-au-ambient>
      <defs>
        <linearGradient id="au-404-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#070c16" />
          <stop offset=".6" stop-color="#14203a" />
          <stop offset="1" stop-color="#273549" />
        </linearGradient>
        <radialGradient id="au-404-moon">
          <stop offset="0" stop-color="#3fb1f2" stop-opacity=".45" />
          <stop offset=".4" stop-color="#3fb1f2" stop-opacity=".1" />
          <stop offset="1" stop-color="#3fb1f2" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="au-404-torch">
          <stop offset="0" stop-color="#f2b33f" stop-opacity=".55" />
          <stop offset="1" stop-color="#f2b33f" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="au-404-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#a9d5ef" stop-opacity="0" />
          <stop offset="1" stop-color="#a9d5ef" stop-opacity=".16" />
        </linearGradient>
        <clipPath id="au-404-frame"><rect width="600" height="240" rx="16" /></clipPath>
      </defs>
      <g clip-path="url(#au-404-frame)">
        <rect width="600" height="240" fill="url(#au-404-sky)" />
        <g fill="#cfe9fb">
          <circle v-for="([x, y, r], i) in stars" :key="i" :cx="x" :cy="y" :r="r" :class="`tw tw${i % 3}`" />
        </g>
        <circle cx="500" cy="52" r="70" fill="url(#au-404-moon)" />
        <path d="M500,36 a16,16 0 1 0 13,25 a13,15 0 1 1 -13,-25 Z" fill="#e6f4fd" />

        <path d="M0,150 L40,128 L70,138 L120,96 L160,124 L200,112 L250,140 L300,118 L350,134 L420,92 L470,122 L520,110 L600,140 V240 H0 Z" fill="#203453" />
        <path d="M0,150 L40,128 L70,138 L120,96 L160,124 L200,112 L250,140 L300,118 L350,134 L420,92 L470,122 L520,110 L600,140" fill="none" stroke="#3fb1f2" stroke-opacity=".3" stroke-width="1.2" stroke-linejoin="round" />
        <path d="M0,182 Q120,158 240,172 T600,166 V240 H0 Z" fill="#15233c" />

        <!-- The road, running up into the rockfall -->
        <path d="M232,240 C262,214 286,204 298,186 L318,186 C326,204 352,220 392,240 Z" fill="#273549" />
        <path d="M300,232 C302,218 306,204 308,190" stroke="#a9d5ef" stroke-opacity=".25" stroke-width="2" stroke-dasharray="6 8" fill="none" />

        <!-- Rockfall -->
        <g fill="#0f1a2e" stroke="#a9d5ef" stroke-opacity=".35" stroke-width="1.2" stroke-linejoin="round">
          <path d="M262,190 L272,160 L292,150 L306,164 L300,190 Z" />
          <path d="M296,190 L304,156 L326,142 L346,160 L344,190 Z" />
          <path d="M338,190 L344,168 L362,164 L372,190 Z" />
          <path d="M282,192 L290,174 L306,176 L312,192 Z" />
          <path d="M318,192 L326,178 L342,180 L346,192 Z" />
        </g>
        <path d="M250,192 H384" stroke="#0b1324" stroke-width="4" stroke-linecap="round" />

        <!-- Signpost -->
        <g>
          <path d="M224,206 V150" stroke="#8a5a32" stroke-width="4" stroke-linecap="round" />
          <path d="M206,156 H244 L252,164 L244,172 H206 Z" fill="#c08a52" stroke="#7a5a32" stroke-width="1.2" stroke-linejoin="round" />
          <path d="M214,160 L238,168 M238,160 L214,168" stroke="#7a3214" stroke-width="2.2" stroke-linecap="round" />
        </g>

        <!-- Torch on the rocks -->
        <g>
          <circle class="torch-glow" cx="384" cy="150" r="44" fill="url(#au-404-torch)" />
          <path d="M384,190 L380,162 H388 Z" fill="#8a5a32" />
          <path class="flame" d="M384,140 C378,148 378,156 384,162 C390,156 390,148 384,140 Z" fill="#f2b33f" />
          <path class="flame inner" d="M384,149 C381,153 381,158 384,161 C387,158 387,153 384,149 Z" fill="#fff3c9" />
          <circle
            v-for="(e, i) in embers"
            :key="i"
            class="ember"
            :cx="384 + e.x"
            cy="146"
            r="1.2"
            fill="#e8743b"
            :style="{ animationDelay: e.delay, animationDuration: e.dur }"
          />
        </g>

        <g class="mist"><rect x="-80" y="176" width="760" height="64" fill="url(#au-404-mist)" /></g>
        <path d="M0,214 Q150,200 300,212 T600,206 V240 H0 Z" fill="#0b1324" />
      </g>
      <rect x=".5" y=".5" width="599" height="239" rx="16" fill="none" stroke="#3fb1f2" stroke-opacity=".3" />
    </svg>

    <p class="code">404</p>
    <h1 class="title">No exit that way</h1>

    <div class="terminal" role="img" aria-label="You type north, and the game answers: Alas, you cannot go that way.">
      <p class="cmd" aria-hidden="true"><span class="prompt">&gt;</span> <span class="typed">north</span></p>
      <p class="reply" aria-hidden="true">Alas, you cannot go that way.<span class="cursor" /></p>
    </div>

    <p class="hint">The page you were after isn't here. It may have moved when the site was reorganized.</p>

    <div class="actions">
      <a class="action brand" :href="withBase('/')">Back to the start</a>
      <button type="button" class="action" @click="openSearch">Search the site</button>
    </div>
  </div>
</template>

<style scoped>
.au-404 {
  max-width: 640px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  text-align: center;
}

.scene {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 10px 40px var(--au-medallion-shadow);
}

.code {
  margin-top: 32px;
  font-family: var(--au-font-display);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: .4em;
  color: var(--au-ember-ink);
}

.title {
  margin-top: 4px;
  font-family: var(--au-font-display);
  font-size: 30px;
  font-weight: 700;
  line-height: 40px;
  color: var(--vp-c-text-1);
}

.terminal {
  display: inline-block;
  min-width: min(100%, 360px);
  margin-top: 24px;
  padding: 14px 20px;
  border: 1px solid color-mix(in srgb, var(--au-glow) 40%, transparent);
  border-radius: 10px;
  background-color: var(--au-night-0);
  font-family: var(--au-font-mono);
  font-size: 15px;
  line-height: 24px;
  text-align: left;
  color: #cfe9fb;
}

.terminal p {
  margin: 0;
}

.prompt {
  color: var(--au-glow);
}

.typed {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  white-space: nowrap;
  width: 5ch;
  color: var(--au-amber);
  animation: au-type .6s steps(5) .6s both;
}

.reply {
  animation: au-appear .01s 1.5s both;
}

.cursor {
  display: inline-block;
  width: .6em;
  height: 1.1em;
  margin-left: 4px;
  vertical-align: -0.2em;
  background-color: var(--au-glow);
  animation: au-blink 1.1s steps(1) infinite;
}

.hint {
  margin-top: 20px;
  font-size: 15px;
  line-height: 24px;
  color: var(--vp-c-text-2);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.action {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 20px;
  border: 1px solid var(--vp-button-alt-border);
  border-radius: 20px;
  background-color: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background-color .25s, border-color .25s, box-shadow .25s;
}

.action:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 16px color-mix(in srgb, var(--au-glow) 30%, transparent);
}

.action.brand {
  border-color: var(--vp-button-brand-border);
  background-color: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}

.action.brand:hover {
  background-color: var(--vp-button-brand-hover-bg);
}

.action:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.tw0 { animation: au-twinkle 3.4s ease-in-out infinite; }
.tw1 { animation: au-twinkle 4.8s ease-in-out 1s infinite; }
.tw2 { animation: au-twinkle 6s ease-in-out 2.2s infinite; }

.flame {
  transform-origin: 384px 162px;
  animation: au-flame .9s ease-in-out infinite alternate;
}

.flame.inner {
  animation-duration: .6s;
}

.torch-glow {
  transform-origin: 384px 150px;
  animation: au-glow 1.7s ease-in-out infinite alternate;
}

.ember {
  opacity: 0;
  animation: au-rise 3s ease-out infinite;
}

.mist {
  animation: au-drift 16s ease-in-out infinite alternate;
}

@keyframes au-type {
  from { width: 0; }
}

@keyframes au-appear {
  from { opacity: 0; }
}

@keyframes au-blink {
  0%, 55% { opacity: 1; }
  56%, 100% { opacity: 0; }
}

@keyframes au-twinkle {
  0%, 100% { opacity: 1; }
  50% { opacity: .2; }
}

@keyframes au-flame {
  from { transform: scale(.92, .88) skewX(-3deg); }
  to { transform: scale(1.05, 1.08) skewX(3deg); }
}

@keyframes au-glow {
  from { opacity: .7; transform: scale(.94); }
  to { opacity: 1; transform: scale(1.04); }
}

@keyframes au-rise {
  0% { opacity: 0; transform: translate(0, 0); }
  15% { opacity: 1; }
  100% { opacity: 0; transform: translate(6px, -46px); }
}

@keyframes au-drift {
  from { transform: translateX(-40px); }
  to { transform: translateX(40px); }
}

@media (prefers-reduced-motion: reduce) {
  .typed, .reply, .cursor, .tw0, .tw1, .tw2, .flame, .torch-glow, .ember, .mist {
    animation: none;
  }
}
</style>
