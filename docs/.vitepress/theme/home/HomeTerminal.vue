<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import MudText from '../tools/ui/MudText.vue';
import { prefersReducedMotion, useActive } from './lib/motion';
import { beats, prompt, startHp } from './terminal-script';

// A MUD client window that plays terminal-script.ts: commands typed a key at
// a time, the game's answers a line at a time, then round again. It runs
// only while it is on screen in a visible tab. Before the script starts, and
// for anyone who prefers reduced motion, it shows the last scene whole.

type Step =
  | { kind: 'prompt'; hp: number }
  | { kind: 'key'; char: string }
  | { kind: 'enter' }
  | { kind: 'line'; text: string; delay: number }
  | { kind: 'clear' }
  | { kind: 'wait'; ms: number };

function buildSteps(): Step[] {
  const steps: Step[] = [];
  let hp = startHp;
  for (const beat of beats) {
    if (beat.clear) steps.push({ kind: 'wait', ms: 1400 }, { kind: 'clear' });
    steps.push({ kind: 'prompt', hp }, { kind: 'wait', ms: 900 });
    for (const char of beat.command ?? '') steps.push({ kind: 'key', char });
    steps.push({ kind: 'wait', ms: 260 }, { kind: 'enter' });
    // Room text arrives in one burst; combat comes a round at a time
    const fighting = beat.hp !== undefined;
    for (const text of beat.output ?? []) {
      steps.push({ kind: 'line', text, delay: fighting ? 520 : 40 });
    }
    hp = beat.hp ?? hp;
  }
  steps.push({ kind: 'prompt', hp }, { kind: 'wait', ms: 6000 }, { kind: 'clear' });
  return steps;
}

/** The last scene as it looks when it has finished playing. */
function finalScreen(): { lines: string[]; current: string } {
  const lines: string[] = [];
  let hp = startHp;
  for (const beat of beats) {
    if (beat.clear) lines.length = 0;
    lines.push(prompt(hp) + (beat.command ?? ''), ...(beat.output ?? []));
    hp = beat.hp ?? hp;
  }
  return { lines, current: prompt(hp) };
}

const steps = buildSteps();
const final = finalScreen();

const lines = ref<string[]>(final.lines);
const current = ref<string | null>(final.current);
const root = ref<HTMLElement | null>(null);
const paused = ref(true);

let index = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
let started = false;
// A steady but human typing rhythm, the same on every loop
let keyCount = 0;
const keyDelay = () => 70 + ((keyCount++ * 37) % 90);

function run() {
  timer = undefined;
  if (paused.value) return;
  const step = steps[index];
  index = (index + 1) % steps.length;
  let delay = 0;

  switch (step.kind) {
    case 'prompt':
      current.value = prompt(step.hp);
      break;
    case 'key':
      current.value += step.char;
      delay = keyDelay();
      break;
    case 'enter':
      lines.value.push(current.value ?? '');
      current.value = null;
      delay = 120;
      break;
    case 'line':
      lines.value.push(step.text);
      delay = step.delay;
      break;
    case 'clear':
      lines.value = [];
      current.value = null;
      delay = 500;
      break;
    case 'wait':
      delay = step.ms;
      break;
  }
  // Keep only what the window can show
  if (lines.value.length > 40) lines.value.splice(0, lines.value.length - 40);
  timer = setTimeout(run, delay);
}

useActive(root, active => {
  if (prefersReducedMotion()) return;
  paused.value = !active;
  if (!active) {
    clearTimeout(timer);
    timer = undefined;
    return;
  }
  if (!started) {
    // Start from an empty window the first time it comes into view
    started = true;
    lines.value = [];
    current.value = null;
  }
  if (!timer) timer = setTimeout(run, 300);
}, '0px 0px -10% 0px');

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <figure ref="root" class="au-term" :class="{ 'is-paused': paused }">
    <div class="bar" aria-hidden="true">
      <span class="dots"><i /><i /><i /></span>
      <span class="host">tharel.net 5005</span>
      <span class="status"><i />connected</span>
    </div>
    <div class="screen" aria-hidden="true">
      <div v-for="(line, i) in lines" :key="i" class="line">
        <MudText :text="line || ' '" />
      </div>
      <div v-if="current !== null" class="line">
        <MudText :text="current" /><span class="cursor" />
      </div>
    </div>
    <figcaption class="au-term-caption">
      A sample session: the Market Square room in Naerlan, the school command,
      then a fight with a scrawny goblin in Survival Training that ends in a new level.
    </figcaption>
  </figure>
</template>

<style scoped>
.au-term {
  /* The terminal is dark in both site themes, so it takes the dark mode
     color codes from mud-colors.css whatever the page theme is */
  --au-mud-red: #e86e75;
  --au-mud-red-bright: #ff7b7b;
  --au-mud-green: #8cc265;
  --au-mud-green-bright: #9fe87a;
  --au-mud-yellow: #d2b45a;
  --au-mud-yellow-bright: #ffe066;
  --au-mud-blue: #6d9cf5;
  --au-mud-blue-bright: #93b8ff;
  --au-mud-magenta: #c678dd;
  --au-mud-magenta-bright: #ee9bff;
  --au-mud-cyan: #4fb3bf;
  --au-mud-cyan-bright: #7ce3ee;
  --au-mud-white: #c8c8cc;
  --au-mud-white-bright: #ffffff;
  --au-mud-dark-grey: #8e8e96;
  position: relative;
  margin: 0;
  overflow: hidden;
  border: 1px solid rgba(63, 177, 242, 0.35);
  border-radius: 14px;
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(63, 177, 242, 0.08), transparent 70%),
    linear-gradient(180deg, #0b1324, #070c16);
  box-shadow: 0 24px 60px -24px rgba(7, 12, 22, 0.7), 0 0 0 4px rgba(63, 177, 242, 0.05);
}

.bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(169, 213, 239, 0.12);
  font-family: var(--au-font-mono, 'JetBrains Mono', monospace);
  font-size: 12px;
  color: #8fa9bf;
  background: rgba(20, 32, 58, 0.6);
}

.dots {
  display: inline-flex;
  gap: 6px;
}

.dots i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #273549;
}

.host {
  flex: 1;
  text-align: center;
  color: #a9d5ef;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.status i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #8cc265;
  box-shadow: 0 0 8px #8cc265;
}

.screen {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  height: calc(21 * 1.6em + 32px);
  padding: 16px 18px;
  overflow: hidden;
  font-family: var(--au-font-mono, 'JetBrains Mono', monospace);
  font-size: 13px;
  line-height: 1.6;
  color: #c8d6e2;
}

.line {
  min-height: 1.6em;
}

.screen :deep(.au-mud) {
  font-family: inherit;
  color: inherit;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.cursor {
  display: inline-block;
  width: 0.6em;
  height: 1.15em;
  margin-left: 1px;
  vertical-align: text-bottom;
  background: #3fb1f2;
  animation: au-term-blink 1.1s steps(1) infinite;
}

.is-paused .cursor {
  animation-play-state: paused;
}

@keyframes au-term-blink {
  50% { opacity: 0; }
}

.au-term-caption {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (max-width: 640px) {
  .screen {
    height: calc(24 * 1.55em + 28px);
    padding: 14px;
    font-size: 11.5px;
    line-height: 1.55;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cursor {
    animation: none;
  }
}
</style>
