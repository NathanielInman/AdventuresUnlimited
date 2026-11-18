<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';

// Copies the page address, which holds the tool's settings, to the clipboard.
withDefaults(defineProps<{ label?: string }>(), { label: 'Copy link' });

const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  const url = location.href;

  try {
    await navigator.clipboard.writeText(url);
  } catch {
    // Older browsers, or a page not served over https
    const input = document.createElement('textarea');

    input.value = url;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
  }
  copied.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = false), 2000);
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <button type="button" class="au-button" @click="copy">
    <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16">
      <path
        v-if="copied"
        d="M5 12.5l4.5 4.5L19 7.5"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <g v-else fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
        <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
      </g>
    </svg>
    <span>{{ copied ? 'Link copied' : label }}</span>
    <span class="au-visually-hidden" aria-live="polite">{{ copied ? 'Link copied to the clipboard' : '' }}</span>
  </button>
</template>
