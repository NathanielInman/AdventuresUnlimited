<script setup lang="ts">
import { vReveal } from './lib/motion';
import './home.css';

// The closing note on the home page: the prose from docs/index.md (the
// default slot) beside a quill and an open scroll.
</script>

<template>
  <section v-reveal class="au-home-section au-note">
    <div class="card">
      <svg class="art" viewBox="0 0 96 96" aria-hidden="true">
        <path class="paper" d="M18 26 h48 a6 6 0 0 1 6 6 v40 a8 8 0 0 1 -8 8 h-44 a8 8 0 0 0 8 -8 v-40 a6 6 0 0 0 -6 -6 Z" />
        <path class="roll" d="M18 26 a6 6 0 0 0 -6 6 v6 h12 v-6 a6 6 0 0 0 -6 -6 Z" />
        <path class="lines" d="M32 42 h30 M32 50 h26 M32 58 h30 M32 66 h18" />
        <path class="quill" d="M86 8 C66 12 52 30 48 52 L52 54 C60 36 72 22 86 8 Z" />
        <path class="nib" d="M48 52 L46 60 L52 54 Z" />
      </svg>
      <div class="vp-doc au-home-prose">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.au-note {
  padding-top: 96px;
}

.card {
  display: flex;
  align-items: center;
  gap: 28px;
  max-width: 820px;
  margin: 0 auto;
  padding: 28px 32px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background: var(--vp-c-bg-soft);
}

.art {
  flex: none;
  width: 88px;
  height: 88px;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.paper,
.roll {
  stroke: var(--vp-c-text-2);
  stroke-width: 2;
}

.lines {
  stroke: var(--vp-c-text-3);
  stroke-width: 2;
}

.quill {
  fill: var(--vp-c-brand-soft);
  stroke: var(--vp-c-brand-1);
  stroke-width: 2;
}

.nib {
  fill: var(--vp-c-brand-1);
}

.card :deep(.au-home-prose h2) {
  font-size: clamp(22px, 3vw, 28px);
}

.card :deep(p) {
  margin: 10px 0 0;
}

@media (max-width: 640px) {
  .card {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 22px 20px;
  }

  .art {
    width: 64px;
    height: 64px;
  }
}
</style>
