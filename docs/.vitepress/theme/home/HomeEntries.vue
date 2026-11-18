<script setup lang="ts">
import { withBase } from 'vitepress';
import HomeIcon from './HomeIcon.vue';
import { entryGroups } from './entries';
import { pageHref } from './lib/links';
import { vReveal } from './lib/motion';
import './home.css';

// Illustrated ways into the site, grouped as guides, tools and reference.
// Cards and groups come from entries.ts.
</script>

<template>
  <section class="au-home-section au-entries" aria-labelledby="au-home-entries">
    <div v-reveal class="intro">
      <p class="au-home-kicker">Where to next</p>
      <h2 id="au-home-entries" class="au-home-heading">Pick a road out of Market Square</h2>
    </div>

    <div v-for="group in entryGroups" :key="group.id" class="group">
      <div v-reveal class="group-head">
        <h3 :id="`au-home-${group.id}`" class="group-title">{{ group.title }}</h3>
        <p class="group-blurb">{{ group.blurb }}</p>
      </div>
      <ul class="cards" :aria-labelledby="`au-home-${group.id}`">
        <li v-for="(entry, index) in group.entries" :key="entry.link" v-reveal="index * 70">
          <a class="au-entry" :href="withBase(pageHref(entry.link))">
            <span class="tile"><HomeIcon :name="entry.icon" /></span>
            <span class="text">
              <span class="title">{{ entry.title }}</span>
              <span class="summary">{{ entry.summary }}</span>
            </span>
            <svg class="arrow" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h9M8.5 4l4 4-4 4" />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.au-entries {
  padding-top: 72px;
}

.intro {
  text-align: center;
}

.group {
  margin-top: 48px;
}

.group-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.group-title {
  margin: 0;
  font-family: var(--au-font-display, 'Cinzel', serif);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-1);
}

.group-blurb {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(15.5rem, 100%), 1fr));
  gap: 16px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.cards li {
  margin: 0;
}

.au-entry {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  height: 100%;
  padding: 20px 20px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  color: inherit;
  text-decoration: none;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}

.au-entry:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 10px 30px -12px rgba(21, 112, 173, 0.45);
  transform: translateY(-2px);
}

.au-entry:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

/* A small piece of the night sky behind each icon */
.tile {
  position: relative;
  display: block;
  flex: none;
  width: 60px;
  height: 60px;
  padding: 9px;
  box-sizing: border-box;
  border-radius: 14px;
  background:
    radial-gradient(circle at 50% 120%, rgba(63, 177, 242, 0.35), transparent 65%),
    linear-gradient(160deg, #14203a, #070c16);
  box-shadow: inset 0 0 0 1px rgba(169, 213, 239, 0.18);
  transition: box-shadow 0.25s;
}

.au-entry:hover .tile,
.au-entry:focus-visible .tile {
  box-shadow: inset 0 0 0 1px rgba(169, 213, 239, 0.4), 0 0 22px rgba(63, 177, 242, 0.35);
}

.text {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.title {
  font-size: 17px;
  font-weight: 700;
  line-height: 1.35;
  color: var(--vp-c-text-1);
}

.summary {
  font-size: 14px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.arrow {
  position: absolute;
  top: 22px;
  right: 20px;
  width: 18px;
  height: 18px;
  fill: none;
  stroke: var(--vp-c-text-3);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: stroke 0.25s, transform 0.25s;
}

.au-entry:hover .arrow,
.au-entry:focus-visible .arrow {
  stroke: var(--vp-c-brand-1);
  transform: translateX(3px);
}

@media (max-width: 640px) {
  .au-entries {
    padding-top: 48px;
  }

  .au-entry {
    flex-direction: row;
    align-items: flex-start;
    gap: 14px;
    padding: 16px 40px 16px 16px;
  }

  .tile {
    width: 52px;
    height: 52px;
    padding: 8px;
  }

  .arrow {
    top: 18px;
    right: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .au-entry,
  .arrow {
    transition: none;
  }

  .au-entry:hover {
    transform: none;
  }
}
</style>
