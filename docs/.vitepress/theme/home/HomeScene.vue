<script setup lang="ts">
import { art } from './art/scene';

// The night over Naerlan behind the home page title. Pure decoration: every
// layer is aria-hidden and the page reads the same without it. Each layer
// is its own element so the browser can move and fade it on the compositor
// (parallax, twinkling, flicker) without repainting the drawing. HomeHero
// sets --au-mx and --au-sy, which drive the parallax, and the is-paused
// class, which stops everything while the hero is off screen.
</script>

<template>
  <div class="scene" aria-hidden="true">
    <div class="city-glow" />

    <div class="depth stars">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMin slice">
        <g fill="none" stroke="#cfe9fb" stroke-linecap="round">
          <path :d="art.stars.small" stroke-width="1.5" stroke-opacity=".55" />
          <path :d="art.stars.medium" stroke-width="2.1" stroke-opacity=".8" />
        </g>
      </svg>
      <svg class="twinkle a" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMin slice">
        <path :d="art.stars.twinkleA" fill="none" stroke="#e9f6ff" stroke-linecap="round" stroke-width="2.6" />
      </svg>
      <svg class="twinkle b" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMin slice">
        <path :d="art.stars.twinkleB" fill="none" stroke="#e9f6ff" stroke-linecap="round" stroke-width="2.8" />
      </svg>
      <svg class="twinkle c" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMin slice">
        <path :d="art.stars.twinkleC" fill="none" stroke="#e9f6ff" stroke-linecap="round" stroke-width="2.4" />
        <path :d="art.stars.glints" fill="#e9f6ff" />
      </svg>
    </div>

    <div class="shooting-star one"><span /></div>
    <div class="shooting-star two"><span /></div>

    <div class="depth moon-depth">
      <div class="moon">
        <svg viewBox="-160 -160 320 320">
          <defs>
            <radialGradient id="au-home-moon-glow">
              <stop offset="0" stop-color="#a9d5ef" stop-opacity=".5" />
              <stop offset=".3" stop-color="#3fb1f2" stop-opacity=".16" />
              <stop offset="1" stop-color="#3fb1f2" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="au-home-moon-face" cx=".38" cy=".34" r=".75">
              <stop offset="0" stop-color="#fbfdff" />
              <stop offset=".6" stop-color="#e2f1fb" />
              <stop offset="1" stop-color="#b7d7ee" />
            </radialGradient>
          </defs>
          <circle r="160" fill="url(#au-home-moon-glow)" />
          <circle r="44" fill="url(#au-home-moon-face)" />
          <g fill="#8fb6d4" opacity=".32">
            <path d="M-20,-22 c8,-6 20,-4 22,4 c2,8 -8,12 -16,10 c-8,-2 -12,-8 -6,-14 Z" />
            <path d="M8,4 c10,-4 22,2 20,12 c-2,8 -14,10 -20,6 c-6,-4 -8,-14 0,-18 Z" />
            <path d="M-26,10 c5,-2 10,2 9,7 c-1,4 -7,5 -10,2 c-3,-3 -2,-7 1,-9 Z" />
            <circle cx="20" cy="-20" r="4" />
            <circle cx="-6" cy="28" r="3" />
          </g>
        </svg>
      </div>
    </div>

    <div class="flight">
      <div class="dragon">
        <svg viewBox="0 0 160 80">
          <g fill="#050a14" stroke="#3fb1f2" stroke-opacity=".35" stroke-width=".6" stroke-linejoin="round">
            <path class="wing far" :d="art.dragon.wingFar" opacity=".85" />
            <path :d="art.dragon.body" />
            <path class="wing near" :d="art.dragon.wingNear" />
          </g>
        </svg>
      </div>
    </div>

    <div class="depth far">
      <svg viewBox="0 0 2400 500" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="au-home-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#253c60" />
            <stop offset="1" stop-color="#1a2b47" />
          </linearGradient>
        </defs>
        <path :d="art.far.fill" fill="url(#au-home-far)" />
        <path :d="art.far.lit" fill="#3a5a86" opacity=".55" />
        <path :d="art.far.snow" fill="#cfe6f6" opacity=".5" />
        <path :d="art.far.rim" fill="none" stroke="#7cc8f4" stroke-opacity=".38" stroke-width="1.6" />
      </svg>
    </div>

    <div class="mist back" />

    <div class="depth mid">
      <svg viewBox="0 0 2400 380" preserveAspectRatio="xMidYMax slice">
        <path :d="art.mid.fill" fill="#15233d" />
        <path :d="art.mid.rim" fill="none" stroke="#3fb1f2" stroke-opacity=".16" stroke-width="1.2" />
      </svg>
    </div>

    <div class="depth city-depth">
      <div class="city">
        <svg viewBox="0 0 1000 440">
          <defs>
            <linearGradient id="au-home-city" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#14223b" />
              <stop offset=".75" stop-color="#0c1629" />
            </linearGradient>
            <linearGradient id="au-home-gate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#f2b33f" />
              <stop offset="1" stop-color="#e8743b" />
            </linearGradient>
            <linearGradient id="au-home-road" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#f2b33f" stop-opacity=".28" />
              <stop offset=".35" stop-color="#a9d5ef" stop-opacity=".14" />
              <stop offset="1" stop-color="#a9d5ef" stop-opacity=".06" />
            </linearGradient>
          </defs>
          <path :d="art.city.body" fill="url(#au-home-city)" />
          <path :d="art.city.road" fill="url(#au-home-road)" />
          <path :d="art.city.gate" fill="url(#au-home-gate)" />
          <path :d="art.city.windows[0]" fill="#f2b33f" />
        </svg>
        <svg v-for="group in 3" :key="group" class="windows" :class="`w${group}`" viewBox="0 0 1000 440">
          <path :d="art.city.windows[group]" fill="#f7c35a" />
        </svg>
        <span
          v-for="([x, y], index) in art.city.torches"
          :key="index"
          class="torch"
          :style="{ left: `${x / 10}%`, top: `${(y / 440) * 100}%` }"
        />
      </div>
    </div>

    <div class="mist front" />

    <div class="depth near">
      <svg viewBox="0 0 2400 240" preserveAspectRatio="xMidYMax slice">
        <path :d="art.near.fill" fill="#080f1d" />
      </svg>
    </div>

    <svg class="edge" viewBox="0 0 1200 40" preserveAspectRatio="none">
      <path d="M0,40 V22 C160,8 300,30 460,20 S760,4 920,16 S1120,30 1200,14 V40 Z" />
    </svg>
  </div>
</template>

<style scoped>
.scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  background:
    radial-gradient(ellipse 60% 40% at 50% 100%, rgba(63, 177, 242, 0.14), transparent 70%),
    linear-gradient(180deg, var(--au-night-0, #070c16) 0%, var(--au-night-1, #14203a) 55%, var(--au-night-2, #273549) 100%);
}

/* Warm light from the city's lanterns, low on the horizon */
.city-glow {
  position: absolute;
  left: 50%;
  bottom: calc(var(--scene-h) * 0.35);
  width: min(900px, 120vw);
  height: calc(var(--scene-h) * 0.9);
  transform: translateX(-50%);
  background: radial-gradient(ellipse 50% 50% at 50% 60%, rgba(242, 179, 63, 0.16), rgba(232, 116, 59, 0.05) 50%, transparent 100%);
}

svg {
  display: block;
  overflow: visible;
}

/* Parallax: each layer moves with the pointer (--au-mx, -1 to 1) and lags
   behind the page as it scrolls (--au-sy, pixels scrolled), by its depth. */
.depth {
  position: absolute;
  left: -48px;
  right: -48px;
  transform: translate3d(calc(var(--au-mx, 0) * var(--dx) * -1px), calc(var(--au-sy, 0) * var(--dy) * 1px), 0);
  will-change: transform;
}

.stars {
  --dx: 6;
  --dy: 0.24;
  top: 0;
  bottom: 0;
}

.stars svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.twinkle {
  animation: au-home-twinkle 4.2s ease-in-out infinite;
}

.twinkle.b {
  animation-duration: 5.8s;
  animation-delay: -2.1s;
}

.twinkle.c {
  animation-duration: 7.3s;
  animation-delay: -4.4s;
}

@keyframes au-home-twinkle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}

.moon-depth {
  --dx: 10;
  --dy: 0.12;
  inset: 0;
}

.moon {
  position: absolute;
  top: 11%;
  right: max(9%, calc(50% - 640px));
  width: 300px;
  height: 300px;
  margin: -110px -100px 0 0;
}

.moon svg {
  width: 100%;
  height: 100%;
}

/* Something crosses the sky now and then: a dragon, low on the left and
   climbing past the moon, once a minute or so. */
.flight {
  position: absolute;
  inset: 0;
  opacity: 0;
  animation: au-home-flight 70s linear 4s infinite;
}

.dragon {
  position: absolute;
  left: 50%;
  top: 30%;
  width: clamp(84px, 9vw, 140px);
  animation: au-home-glide 5.5s ease-in-out infinite alternate;
}

.dragon svg {
  width: 100%;
  overflow: visible;
}

.wing {
  transform-box: fill-box;
  animation: au-home-beat 1.25s ease-in-out infinite;
}

.wing.near {
  transform-origin: 100% 100%;
}

.wing.far {
  transform-origin: 100% 100%;
  animation-delay: -0.08s;
}

@keyframes au-home-flight {
  0% { transform: translate(-64%, 10%); opacity: 1; }
  40% { transform: translate(66%, -22%); opacity: 1; }
  40.1%, 100% { transform: translate(66%, -22%); opacity: 0; }
}

@keyframes au-home-glide {
  from { transform: translateY(-6px) rotate(-7deg); }
  to { transform: translateY(6px) rotate(-11deg); }
}

@keyframes au-home-beat {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(-0.4); }
}

.shooting-star {
  position: absolute;
  width: 180px;
  height: 2px;
  transform: rotate(158deg);
}

.shooting-star.one {
  top: 12%;
  left: 30%;
}

.shooting-star.two {
  top: 22%;
  left: 74%;
}

.shooting-star span {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(233, 246, 255, 0), rgba(233, 246, 255, 0.9));
  opacity: 0;
  animation: au-home-meteor 17s ease-out 9s infinite;
}

.shooting-star.two span {
  animation-duration: 29s;
  animation-delay: 21s;
}

@keyframes au-home-meteor {
  0% { transform: translateX(-60px) scaleX(0.3); opacity: 0; }
  1% { opacity: 1; }
  5% { transform: translateX(260px) scaleX(1); opacity: 0; }
  100% { transform: translateX(260px); opacity: 0; }
}

.far {
  --dx: 12;
  --dy: 0.16;
  bottom: calc(var(--scene-h) * 0.2);
  height: calc(var(--scene-h) * 1.05);
}

.mid {
  --dx: 20;
  --dy: 0.1;
  bottom: 0;
  height: calc(var(--scene-h) * 0.62);
}

.far svg,
.mid svg,
.near svg {
  width: 100%;
  height: 100%;
}

.city-depth {
  --dx: 26;
  --dy: 0.05;
  bottom: 0;
  height: calc(var(--scene-h) * 0.86);
}

.city {
  position: absolute;
  bottom: 0;
  left: 50%;
  height: 100%;
  aspect-ratio: 1000 / 440;
  transform: translateX(-50%);
}

.city svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.windows {
  filter: drop-shadow(0 0 3px rgba(242, 179, 63, 0.9));
  animation: au-home-flicker 3.7s steps(1, end) infinite;
}

.windows.w2 {
  animation-duration: 5.3s;
  animation-delay: -1.7s;
}

.windows.w3 {
  animation-duration: 7.9s;
  animation-delay: -3.2s;
}

@keyframes au-home-flicker {
  0% { opacity: 1; }
  13% { opacity: 0.72; }
  17% { opacity: 1; }
  41% { opacity: 0.86; }
  46% { opacity: 0.62; }
  52% { opacity: 1; }
  77% { opacity: 0.8; }
  83% { opacity: 1; }
}

.torch {
  position: absolute;
  width: 14px;
  height: 14px;
  margin: -7px 0 0 -7px;
  border-radius: 50%;
  background: radial-gradient(circle, #fff3c4 0, #f2b33f 30%, rgba(232, 116, 59, 0.5) 55%, rgba(232, 116, 59, 0) 72%);
  animation: au-home-torch 1.9s ease-in-out infinite;
}

.torch + .torch {
  animation-duration: 2.3s;
  animation-delay: -0.7s;
}

@keyframes au-home-torch {
  0%, 100% { opacity: 1; transform: scale(1); }
  20% { opacity: 0.75; transform: scale(0.88); }
  35% { opacity: 0.95; transform: scale(1.06); }
  60% { opacity: 0.7; transform: scale(0.9); }
  80% { opacity: 1; transform: scale(1.04); }
}

.mist {
  position: absolute;
  left: -20%;
  width: 140%;
  border-radius: 50%;
  animation: au-home-mist 46s ease-in-out infinite alternate;
}

.mist.back {
  bottom: calc(var(--scene-h) * 0.32);
  height: calc(var(--scene-h) * 0.42);
  background: radial-gradient(ellipse 50% 50% at 50% 50%, rgba(169, 213, 239, 0.13), transparent 70%);
}

.mist.front {
  bottom: calc(var(--scene-h) * 0.02);
  height: calc(var(--scene-h) * 0.34);
  background: radial-gradient(ellipse 45% 50% at 40% 55%, rgba(169, 213, 239, 0.12), transparent 72%);
  animation-duration: 34s;
  animation-direction: alternate-reverse;
}

@keyframes au-home-mist {
  from { transform: translateX(-6%); }
  to { transform: translateX(6%); }
}

.near {
  --dx: 34;
  --dy: 0.02;
  bottom: 0;
  height: calc(var(--scene-h) * 0.42);
}

/* The page itself, rising in front of the scene as a low hill */
.edge {
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: clamp(18px, 3vw, 40px);
  fill: var(--vp-c-bg);
}

.scene.is-paused *,
.scene.is-paused {
  animation-play-state: paused !important;
}

@media (max-width: 1199px) {
  .moon {
    top: 38%;
    right: 6%;
    width: 200px;
    height: 200px;
    margin: -100px -100px 0 0;
  }
}

/* On a phone the title fills the width, so the moon rises over the city */
@media (max-width: 640px) {
  .moon {
    top: auto;
    right: 6%;
    bottom: calc(var(--scene-h) * 0.8);
    margin: 0 -64px -100px 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .twinkle,
  .windows,
  .torch,
  .mist,
  .dragon,
  .wing,
  .shooting-star span {
    animation: none;
  }

  .flight {
    display: none;
  }

  .depth {
    transform: none;
  }
}
</style>
