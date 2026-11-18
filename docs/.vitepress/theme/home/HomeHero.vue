<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { withBase } from 'vitepress';
import HomeScene from './HomeScene.vue';
import CopyAddress from './CopyAddress.vue';
import { prefersReducedMotion, useActive } from './lib/motion';
import { pageHref } from './lib/links';
import './home.css';

// The home page's first screen: the title over a night scene, the address
// to connect to and the three places most people want first.

const hero = ref<HTMLElement | null>(null);
const paused = ref(false);

// Parallax. Pointer position and scroll offset go into CSS variables that
// HomeScene's layers read; a requestAnimationFrame loop eases toward the
// pointer and stops as soon as it has caught up, so an idle page runs no
// script at all.
let target = 0;
let current = 0;
let frame = 0;
let listening = false;

function render() {
  frame = 0;
  const el = hero.value;
  if (!el) return;
  current += (target - current) * 0.08;
  if (Math.abs(target - current) < 0.001) current = target;
  el.style.setProperty('--au-mx', current.toFixed(3));
  // Past 480px the hero is mostly gone, so the layers stop moving
  el.style.setProperty('--au-sy', String(Math.round(Math.min(window.scrollY, 480))));
  if (current !== target) frame = requestAnimationFrame(render);
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(render);
}

function onPointer(event: PointerEvent) {
  target = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - 0.5) * 2));
  schedule();
}

function listen(on: boolean) {
  if (on === listening) return;
  listening = on;
  const method = on ? 'addEventListener' : 'removeEventListener';
  window[method]('scroll', schedule, { passive: true });
  if (window.matchMedia('(pointer: fine)').matches) {
    window[method]('pointermove', onPointer as EventListener, { passive: true });
  }
}

useActive(hero, active => {
  paused.value = !active;
  if (prefersReducedMotion()) return;
  listen(active);
  if (active) schedule();
});

onBeforeUnmount(() => {
  listen(false);
  if (frame) cancelAnimationFrame(frame);
});

const actions = [
  { text: 'Speed leveling guide', link: '/guides/speed-leveling', primary: true },
  { text: 'Search items', link: '/tools/items' },
  { text: 'Browse the areas', link: '/world/areas' }
];
</script>

<template>
  <section ref="hero" class="au-hero" aria-labelledby="au-home-title">
    <HomeScene :class="{ 'is-paused': paused }" />

    <div class="content">
      <p class="eyebrow">A fan reference for the MUD of Tharel</p>
      <h1 id="au-home-title" class="title">Adventures Unlimited</h1>
      <p class="tagline">
        Guides, reference tables and calculators for a fantasy text MUD.
        Pick a class, find the gear, then walk out of Market Square and into the world.
      </p>

      <CopyAddress class="connect" />

      <nav class="actions" aria-label="Start here">
        <a
          v-for="action in actions"
          :key="action.link"
          class="action"
          :class="{ primary: action.primary }"
          :href="withBase(pageHref(action.link))"
        >{{ action.text }}</a>
      </nav>
    </div>
  </section>
</template>

<style scoped>
.au-hero {
  --scene-h: clamp(250px, 40vh, 400px);
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  min-height: clamp(620px, calc(100svh - var(--vp-nav-height)), 900px);
  overflow: hidden;
  color: #e9f6ff;
  background: var(--au-night-0, #070c16);
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: clamp(32px, 7vh, 88px) 24px calc(var(--scene-h) + 24px);
  text-align: center;
}

.eyebrow {
  margin: 0;
  font-family: var(--au-font-display, 'Cinzel', serif);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #a9d5ef;
  text-wrap: balance;
}

.title {
  margin: 14px 0 0;
  font-family: var(--au-font-display, 'Cinzel', serif);
  font-size: clamp(36px, 6vw, 68px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: 0.03em;
  background: linear-gradient(180deg, #ffffff 10%, #a9d5ef 60%, #3fb1f2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 18px rgba(63, 177, 242, 0.35));
}

/* A thin rule with a diamond, like the README banner */
.title::after {
  content: '';
  display: block;
  width: min(260px, 60%);
  height: 12px;
  margin: 16px auto 0;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M6 0l6 6-6 6-6-6z' fill='%233fb1f2'/%3E%3C/svg%3E") center / 11px 11px no-repeat,
    linear-gradient(90deg, rgba(63, 177, 242, 0), #3fb1f2 50%, rgba(63, 177, 242, 0)) center / 100% 1.5px no-repeat;
}

.tagline {
  max-width: 600px;
  margin: 20px 0 0;
  font-size: clamp(16px, 2.2vw, 19px);
  line-height: 1.6;
  color: #cfe3f2;
}

.connect {
  margin-top: 28px;
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
  min-height: 44px;
  padding: 0 22px;
  border: 1px solid rgba(169, 213, 239, 0.45);
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  color: #e9f6ff;
  background: rgba(7, 12, 22, 0.45);
  backdrop-filter: blur(4px);
  text-decoration: none;
  transition: border-color 0.25s, background-color 0.25s, transform 0.25s;
}

.action:hover {
  border-color: #a9d5ef;
  background: rgba(20, 32, 58, 0.75);
  transform: translateY(-1px);
}

.action.primary {
  border-color: #3fb1f2;
  color: #06101e;
  background: #3fb1f2;
  box-shadow: 0 0 24px rgba(63, 177, 242, 0.35);
}

.action.primary:hover {
  background: #6cc4f5;
}

.action:focus-visible {
  outline: 2px solid #f2b33f;
  outline-offset: 3px;
}

@media (max-width: 640px) {
  .content {
    padding-top: 32px;
  }

  .eyebrow {
    font-size: 11px;
    letter-spacing: 0.18em;
  }

  .tagline {
    font-size: 16px;
  }

  .actions {
    gap: 10px;
    width: 100%;
    max-width: 360px;
  }

  .action {
    flex: 1 1 auto;
    justify-content: center;
    padding: 0 16px;
  }

  .action.primary {
    flex-basis: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .action {
    transition: none;
  }

  .action:hover {
    transform: none;
  }
}
</style>
