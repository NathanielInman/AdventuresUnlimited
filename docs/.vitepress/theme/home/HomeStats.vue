<script setup lang="ts">
import { ref } from 'vue';
import { withBase } from 'vitepress';
import { pageHref } from './lib/links';
import { prefersReducedMotion, useActive } from './lib/motion';
import { data } from './stats.data';
import './home.css';

// A band of numbers counted from the site's own pages and data at build
// time (stats.data.ts). They count up once, the first time the band comes
// into view; the page is built with the real numbers in place.
const stats = [
  { value: data.items, label: 'items in the search', link: '/tools/items' },
  { value: data.areas, label: 'areas with directions', link: '/world/areas' },
  { value: data.spells, label: 'spells', link: '/classes/spells' },
  { value: data.skills, label: 'skills', link: '/classes/skills' },
  { value: data.races, label: 'races', link: '/classes/' },
  { value: data.classes, label: 'classes', link: '/classes/max-stats' }
];

const format = (value: number) => value.toLocaleString('en-US');
const shown = ref(stats.map(stat => format(stat.value)));
const root = ref<HTMLElement | null>(null);
let state: 'waiting' | 'counting' | 'done' = 'waiting';

function countUp() {
  state = 'counting';
  const start = performance.now();
  const duration = 1800;
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - t) ** 4;
    shown.value = stats.map(stat => format(Math.round(stat.value * eased)));
    if (t < 1) requestAnimationFrame(tick);
    else state = 'done';
  };
  requestAnimationFrame(tick);
}

useActive(root, active => {
  if (state !== 'waiting' || prefersReducedMotion()) return;
  if (!active) {
    // Off screen: wind the numbers back so they can count up on arrival
    shown.value = stats.map(() => '0');
    return;
  }
  countUp();
}, '0px 0px -15% 0px');
</script>

<template>
  <section ref="root" class="au-stats" aria-labelledby="au-home-stats">
    <svg class="ridge" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,60 V44 L70,30 L120,38 L190,16 L240,30 L300,22 L380,40 L460,34 L520,12 L560,24 L640,30 L720,20 L790,36 L860,28 L930,8 L980,26 L1060,34 L1130,22 L1200,32 V60 Z" />
    </svg>
    <div class="au-home-section inner">
      <h2 id="au-home-stats" class="heading">Tharel by the numbers</h2>
      <ul class="list">
        <li v-for="(stat, i) in stats" :key="stat.label">
          <a :href="withBase(pageHref(stat.link))">
            <span class="number">
              <span class="sizer" aria-hidden="true">{{ format(stat.value) }}</span>
              <span class="count" aria-hidden="true">{{ shown[i] }}</span>
              <span class="au-stats-sr">{{ format(stat.value) }}</span>
            </span>
            <span class="label">{{ stat.label }}</span>
          </a>
        </li>
      </ul>
      <p class="source">Counted from this site's pages and item data when it was last built.</p>
    </div>
  </section>
</template>

<style scoped>
.au-stats {
  position: relative;
  margin-top: 140px;
  padding: 40px 0 56px;
  color: #e9f6ff;
  background:
    radial-gradient(1.5px 1.5px at 8% 30%, rgba(207, 233, 251, 0.8), transparent),
    radial-gradient(1px 1px at 22% 70%, rgba(207, 233, 251, 0.6), transparent),
    radial-gradient(1.5px 1.5px at 37% 18%, rgba(207, 233, 251, 0.7), transparent),
    radial-gradient(1px 1px at 55% 60%, rgba(207, 233, 251, 0.6), transparent),
    radial-gradient(1.5px 1.5px at 68% 26%, rgba(207, 233, 251, 0.8), transparent),
    radial-gradient(1px 1px at 82% 74%, rgba(207, 233, 251, 0.6), transparent),
    radial-gradient(1.5px 1.5px at 93% 22%, rgba(207, 233, 251, 0.7), transparent),
    radial-gradient(ellipse 70% 90% at 50% 100%, rgba(63, 177, 242, 0.14), transparent 70%),
    linear-gradient(180deg, var(--au-night-1, #14203a), var(--au-night-0, #070c16));
}

/* Mountains rising out of the band into the page above */
.ridge {
  position: absolute;
  left: 0;
  bottom: calc(100% - 1px);
  width: 100%;
  height: clamp(24px, 4vw, 56px);
  fill: var(--au-night-1, #14203a);
}

.heading {
  margin: 0;
  font-family: var(--au-font-display, 'Cinzel', serif);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-align: center;
  text-transform: uppercase;
  color: #a9d5ef;
}

.list {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}

.list li {
  margin: 0;
}

.list a {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 6px;
  border-radius: 12px;
  color: inherit;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.25s;
}

.list a:hover {
  background: rgba(63, 177, 242, 0.1);
}

.list a:focus-visible {
  outline: 2px solid #f2b33f;
  outline-offset: 2px;
}

.number {
  display: grid;
  font-family: var(--au-font-display, 'Cinzel', serif);
  font-size: clamp(30px, 4vw, 46px);
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

/* The final number holds the width so nothing shifts while counting */
.sizer,
.count {
  grid-area: 1 / 1;
}

.sizer {
  visibility: hidden;
}

.count {
  background: linear-gradient(180deg, #ffffff 20%, #a9d5ef 70%, #3fb1f2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.au-stats-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.label {
  font-size: 13px;
  line-height: 1.4;
  color: #b9d3e6;
}

.source {
  margin: 24px 0 0;
  font-size: 12px;
  text-align: center;
  color: #8fa9bf;
}

@media (max-width: 900px) {
  .list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .au-stats {
    margin-top: 100px;
  }

  .list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
