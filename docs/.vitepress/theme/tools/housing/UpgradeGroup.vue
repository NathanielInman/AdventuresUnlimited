<script setup lang="ts">
import { computed, ref, useId, watchEffect } from 'vue';
import { formatNumber } from '../lib/format';
import type { UpgradeGroup, UpgradeKey } from './pricing';

// One group of henchman upgrades: a checkbox per upgrade with its price, and
// a checkbox in the legend that picks the whole group.
const props = defineProps<{
  group: UpgradeGroup;
  values: Record<string, boolean>;
}>();
const emit = defineEmits<{ update: [key: UpgradeKey, value: boolean] }>();

const id = useId();
const picked = computed(() => props.group.upgrades.filter(upgrade => props.values[upgrade.key]));
const all = computed(() => picked.value.length === props.group.upgrades.length);
const some = computed(() => picked.value.length > 0 && !all.value);
const subtotal = computed(() => picked.value.reduce((sum, upgrade) => sum + upgrade.price, 0));

const allBox = ref<HTMLInputElement | null>(null);

watchEffect(() => {
  if (allBox.value) allBox.value.indeterminate = some.value;
});

function setAll(value: boolean) {
  for (const upgrade of props.group.upgrades) emit('update', upgrade.key, value);
}
</script>

<template>
  <fieldset class="group">
    <legend class="au-visually-hidden">{{ group.title }}</legend>
    <div class="head">
      <input
        :id="`${id}-all`"
        ref="allBox"
        type="checkbox"
        class="box"
        :checked="all"
        :aria-describedby="`${id}-sub`"
        @change="setAll(($event.target as HTMLInputElement).checked)"
      >
      <label class="title" :for="`${id}-all`">{{ group.title }}</label>
      <span :id="`${id}-sub`" class="sub">
        {{ picked.length }} of {{ group.upgrades.length }}<span v-if="subtotal">, {{ formatNumber(subtotal) }}</span>
      </span>
    </div>
    <ul class="list">
      <li v-for="upgrade in group.upgrades" :key="upgrade.key" class="item">
        <input
          :id="`${id}-${upgrade.key}`"
          type="checkbox"
          class="box"
          :checked="values[upgrade.key]"
          @change="emit('update', upgrade.key, ($event.target as HTMLInputElement).checked)"
        >
        <label :for="`${id}-${upgrade.key}`">{{ upgrade.label }}</label>
        <span class="price">{{ formatNumber(upgrade.price) }}</span>
      </li>
    </ul>
  </fieldset>
</template>

<style scoped>
.group {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.sub {
  margin-left: auto;
  font-size: 13px;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.list.list {
  margin: 0;
  padding: 4px 0 0;
  list-style: none;
}

.item.item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 4px 0;
}

.item label {
  flex: 1;
  min-width: 0;
  font-size: 14px;
  line-height: 22px;
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.price {
  font-size: 13px;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.box {
  flex: none;
  appearance: none;
  position: relative;
  width: 18px;
  height: 18px;
  margin: 0;
  border: 1.5px solid var(--vp-c-text-3);
  border-radius: 4px;
  background-color: var(--vp-input-bg-color);
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.box:hover {
  border-color: var(--vp-c-brand-2);
}

.box:checked,
.box:indeterminate {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-1);
}

/* A check mark, or a bar for part of the group: shapes, not only color */
.box:checked::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid var(--vp-c-white);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.box:indeterminate::after {
  content: '';
  position: absolute;
  left: 3px;
  top: 6.5px;
  width: 9px;
  height: 2px;
  background-color: var(--vp-c-white);
}

.dark .box:checked::after {
  border-color: var(--vp-c-black);
}

.dark .box:indeterminate::after {
  background-color: var(--vp-c-black);
}
</style>
