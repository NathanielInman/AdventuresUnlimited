<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';

// The game's address, styled as a client's connect line, with a button that
// copies it. Most clients take host and port as two fields, so the copy is
// "tharel.net 5005", which pastes straight into TinTin++'s #session too.
const address = 'tharel.net 5005';

const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  try {
    await navigator.clipboard.writeText(address);
  } catch {
    // Older browsers, or a page not served over https
    const input = document.createElement('textarea');
    input.value = address;
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
  <div class="au-connect">
    <span class="label">Connect</span>
    <code class="address"><span class="host">tharel.net</span> <span class="port">5005</span></code>
    <button type="button" class="copy" :aria-label="copied ? 'Copied' : `Copy ${address}`" @click="copy">
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
        <g v-else fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round">
          <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
          <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
        </g>
      </svg>
      <span class="copy-text">{{ copied ? 'Copied' : 'Copy' }}</span>
    </button>
    <span class="au-visually-hidden" aria-live="polite">{{ copied ? 'tharel.net 5005 copied to the clipboard' : '' }}</span>
  </div>
</template>

<style scoped>
.au-connect {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  max-width: 100%;
  padding: 6px 6px 6px 16px;
  border: 1px solid rgba(63, 177, 242, 0.5);
  border-radius: 12px;
  background: rgba(7, 12, 22, 0.72);
  box-shadow: 0 0 0 4px rgba(63, 177, 242, 0.06), 0 12px 32px rgba(0, 0, 0, 0.35);
}

.label {
  font-family: var(--au-font-display, 'Cinzel', serif);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #a9d5ef;
}

.address {
  padding: 0;
  font-family: var(--au-font-mono, 'JetBrains Mono', monospace);
  font-size: 16px;
  color: #e9f6ff;
  background: none;
  white-space: nowrap;
}

.port {
  color: #f2b33f;
}

.copy {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid rgba(169, 213, 239, 0.3);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #cfe3f2;
  background: rgba(63, 177, 242, 0.12);
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.copy:hover {
  border-color: #3fb1f2;
  background: rgba(63, 177, 242, 0.24);
}

.copy:focus-visible {
  outline: 2px solid #f2b33f;
  outline-offset: 2px;
}

.au-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (max-width: 400px) {
  .au-connect {
    gap: 10px;
    padding-left: 12px;
  }

  .label {
    display: none;
  }
}
</style>
