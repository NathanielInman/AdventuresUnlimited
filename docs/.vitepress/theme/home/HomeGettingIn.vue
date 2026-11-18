<script setup lang="ts">
import HomeTerminal from './HomeTerminal.vue';
import { vReveal } from './lib/motion';
import './home.css';

// "Getting in": the prose from docs/index.md (the default slot) beside the
// living terminal. The prose keeps the site's normal text styles (vp-doc).
</script>

<template>
  <section class="au-home-section au-getting-in">
    <div v-reveal class="prose">
      <p class="au-home-kicker">Before you log in</p>
      <div class="vp-doc au-home-prose">
        <slot />
      </div>
    </div>
    <div v-reveal="120" class="terminal">
      <HomeTerminal />
    </div>
  </section>
</template>

<style scoped>
.au-getting-in {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  align-items: center;
  gap: 56px;
  padding-top: 112px;
}

@media (max-width: 900px) {
  .au-getting-in {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
    padding-top: 80px;
  }
}
</style>

<style>
/* Markdown from docs/index.md inside the home page sections */
.vp-doc.au-home-prose h2 {
  margin: 8px 0 0;
  padding: 0;
  border: 0;
  font-family: var(--au-font-display, 'Cinzel', serif);
  font-size: clamp(26px, 3.6vw, 36px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.01em;
}

.vp-doc.au-home-prose h2 .header-anchor {
  display: none;
}

.vp-doc.au-home-prose p {
  font-size: 16px;
  line-height: 1.7;
}
</style>
