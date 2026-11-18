<script setup lang="ts">
import { useId } from 'vue';
import { formatNumber } from '../lib/format';
import { CopyLinkButton } from '../ui';
import { GOLD_PER_DIAMOND, type Pricing } from './pricing';

// The running total and what it's made of.
defineProps<{ pricing: Pricing; title: string }>();

const id = useId();
</script>

<template>
  <section class="summary" :aria-labelledby="`${id}-title`">
    <div class="head">
      <h2 :id="`${id}-title`" class="title">{{ title }}</h2>
      <CopyLinkButton />
    </div>
    <div class="totals">
      <p class="diamonds">
        <span class="number">{{ formatNumber(pricing.diamonds) }}</span>
        <span class="unit">diamonds</span>
      </p>
      <p class="gold">
        <span class="number">{{ formatNumber(pricing.gold) }}</span>
        <span class="unit">gold</span>
      </p>
    </div>
    <p v-if="pricing.objects.over" class="issue">
      <span class="issue-icon" aria-hidden="true">!</span>
      <span>Over the object limit: {{ pricing.objects.used }} of {{ pricing.objects.free }}.</span>
    </p>
    <table class="lines">
      <caption class="au-visually-hidden">Cost breakdown</caption>
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col" class="num">Diamonds</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="line in pricing.lines" :key="line.key">
          <th scope="row">
            <span class="label">{{ line.label }}</span>
            <span v-if="line.detail" class="detail">{{ line.detail }}</span>
          </th>
          <td class="num">{{ formatNumber(line.diamonds) }}</td>
        </tr>
        <tr v-if="!pricing.lines.length">
          <td colspan="2" class="empty">Nothing added yet. A plain {{ pricing.setup.type }} costs no upgrades.</td>
        </tr>
      </tbody>
      <tfoot v-if="pricing.lines.length">
        <tr>
          <th scope="row">Total</th>
          <td class="num">{{ formatNumber(pricing.diamonds) }}</td>
        </tr>
      </tfoot>
    </table>
    <p class="note">Gold at {{ GOLD_PER_DIAMOND }} per diamond.</p>
  </section>
</template>

<style scoped>
.summary {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
}

.head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
}

.title.title {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: normal;
  color: var(--vp-c-text-1);
}

.totals {
  margin: 12px 0 16px;
}

.totals p {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 6px;
  margin: 0;
}

.number {
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.01em;
}

.diamonds .number {
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
  color: var(--vp-c-brand-1);
}

.gold .number {
  font-size: 17px;
  font-weight: 600;
  line-height: 26px;
  color: var(--vp-c-text-1);
}

.unit {
  font-size: 15px;
  color: var(--vp-c-text-2);
}

.issue.issue {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 0 0 16px;
  font-size: 14px;
  line-height: 20px;
  color: var(--vp-c-text-1);
}

.issue-icon {
  flex: none;
  display: inline-grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--vp-c-warning-soft);
  color: var(--vp-c-warning-1);
  font-size: 13px;
  font-weight: 700;
}

/* Beat .vp-doc table styles */
.lines.lines {
  display: table;
  width: 100%;
  margin: 0;
  border-collapse: collapse;
  font-size: 14px;
  line-height: 20px;
}

.lines tr {
  border: 0;
  background-color: transparent;
}

.lines th,
.lines td {
  padding: 7px 0;
  border: 0;
  border-top: 1px solid var(--vp-c-divider);
  background-color: transparent;
  text-align: left;
  vertical-align: top;
}

.lines thead th {
  padding-top: 0;
  border-top: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.lines tbody th {
  font-weight: 400;
  color: var(--vp-c-text-1);
}

.lines .num {
  padding-left: 12px;
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.label {
  display: block;
}

.detail {
  display: block;
  font-size: 12px;
  line-height: 16px;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.lines tfoot th,
.lines tfoot td {
  border-top: 2px solid var(--vp-c-divider);
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.empty {
  color: var(--vp-c-text-2);
}

.note.note {
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 18px;
  color: var(--vp-c-text-2);
}
</style>
