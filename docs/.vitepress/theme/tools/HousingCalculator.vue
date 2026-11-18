<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { formatNumber } from './lib/format';
import { useQueryState } from './lib/query-state';
import {
  CheckField,
  FieldGrid,
  RangeField,
  SegmentedField,
  SelectField,
  ToolPanel
} from './ui';
import CostSummary from './housing/CostSummary.vue';
import CountStepper from './housing/CountStepper.vue';
import UpgradeGroup from './housing/UpgradeGroup.vue';
import {
  HEAL_STEP,
  MAX_ENTRY_DOORS,
  MAX_GUESTS,
  MAX_TOOLS,
  doorOptions,
  furnishings,
  healRange,
  healRules,
  henchmenRules,
  housingDefaults,
  lockLevelRule,
  lockTiers,
  LOCK_TIER_PRICE,
  presets,
  priceSetup,
  tools,
  upgradeGroups,
  type HousingState,
  type UpgradeKey
} from './housing/pricing';

const { state, reset, set } = useQueryState({ ...housingDefaults });

const pricing = computed(() => priceSetup(state));
const setup = computed(() => pricing.value.setup);
const isHouse = computed(() => setup.value.type === 'house');

const typeOptions = [
  { label: 'House', value: 'house' },
  { label: 'Manor', value: 'manor' }
];
const accessOptions = [
  { label: 'Private', value: 'private' },
  { label: 'Public', value: 'public' }
];
const lockOptions = lockTiers.map((label, tier) => ({
  label: tier ? `${label} (+${formatNumber(tier * LOCK_TIER_PRICE)})` : `${label} (default)`,
  value: tier * LOCK_TIER_PRICE
}));
const doorSegments = doorOptions.map(option => ({ label: option.label, value: option.value }));

const access = computed({
  get: () => (state.isPublic ? 'public' : 'private'),
  set: value => (state.isPublic = value === 'public')
});

// The slider shows the rate the setup is priced at. Back at the starting
// rate it stores the default, so switching between house and manor lands on
// the other's starting rate instead of buying heal rate by accident.
const heal = computed({
  get: () => setup.value.heal,
  set: value => {
    state.healingRate = value === healRange(setup.value.type, setup.value.isPublic).min
      ? housingDefaults.healingRate
      : value;
  }
});
const healBounds = computed(() => healRange(setup.value.type, setup.value.isPublic));
const healHint = computed(() => {
  if (isHouse.value) {
    return `Starts at ${healRules.house.base}%. ${healRules.house.pricePerStep} diamonds per ${HEAL_STEP}%.`;
  }
  return `The heal room starts at ${healRules.manor.base}%. ${healRules.manor.pricePerStep} diamonds per ${HEAL_STEP}%, up to ${healRules.manor.cap}% (${healRules.manor.publicCap}% in a public manor).`;
});

// Number and range fields want plain numbers, normalized the way they're priced
const lockLevel = computed({
  get: () => setup.value.lockLevel,
  set: value => (state.lockLevel = value)
});
const henchmenLevel = computed({
  get: () => setup.value.henchmenLevel,
  set: value => (state.henchmenLevel = value)
});

const visibleFurnishings = computed(() => furnishings.filter(item => item.for.includes(setup.value.type)));
const objects = computed(() => pricing.value.objects);
const objectsLeft = computed(() => objects.value.free - objects.value.used);

function setCount(key: keyof HousingState, value: number) {
  (state as Record<string, unknown>)[key] = value;
}

function setUpgrade(key: UpgradeKey, value: boolean) {
  state[key] = value;
}

const allPicked = computed(() => setup.value.upgrades.length === upgradeGroups.flatMap(g => g.upgrades).length);

function pickAll(value: boolean) {
  for (const group of upgradeGroups) for (const upgrade of group.upgrades) state[upgrade.key] = value;
}

function applyPreset(patch: Partial<HousingState>) {
  reset();
  set(patch, { push: true });
}

// On narrow screens the summary sits below the form, so a bar at the bottom
// of the screen keeps the total in view until the summary scrolls in
const summary = ref<HTMLElement | null>(null);
const summaryVisible = ref(true);
let observer: IntersectionObserver | undefined;

onMounted(() => {
  if (!summary.value || typeof IntersectionObserver === 'undefined') return;
  observer = new IntersectionObserver(([entry]) => {
    // Hidden once the summary is on screen or scrolled past
    summaryVisible.value = entry.isIntersecting || entry.boundingClientRect.top < 0;
  });
  observer.observe(summary.value);
});

onBeforeUnmount(() => observer?.disconnect());

const summaryTitle = 'Total';
</script>

<template>
  <div class="au-tool housing">
    <div class="toolbar">
      <SegmentedField v-model="state.locationType" label="Property" :options="typeOptions" />
      <div class="presets" role="group" aria-label="Start from a preset">
        <span class="presets-label" aria-hidden="true">Start from</span>
        <button
          v-for="preset in presets"
          :key="preset.key"
          type="button"
          class="au-button"
          @click="applyPreset(preset.state)"
        >
          {{ preset.label }}
        </button>
      </div>
    </div>

    <div class="layout">
      <div class="form">
        <ToolPanel :title="isHouse ? 'House' : 'Manor'">
          <SegmentedField v-if="!isHouse" v-model="access" label="Access" :options="accessOptions" />
          <div class="au-field">
            <RangeField
              v-model="heal"
              label="Heal rate"
              :min="healBounds.min"
              :max="healBounds.max"
              :step="HEAL_STEP"
              unit="%"
              :hint="healHint"
            />
            <p v-if="state.healingRate > healBounds.max && setup.notes.healingRate" class="field-note">
              <span class="note-icon" aria-hidden="true">i</span>
              <span>{{ setup.notes.healingRate }} Priced at {{ setup.heal }}%.</span>
            </p>
          </div>
          <CheckField
            v-model="state.hasPortal"
            label="Portal"
            hint="To another property you own. 400 diamonds, and it takes an object slot."
          />
          <CountStepper
            v-if="setup.hasHenchmen"
            :model-value="setup.guests"
            label="Permanent guests"
            :min="0"
            :max="MAX_GUESTS"
            hint="100 each, up to two."
            @update:model-value="state.guests = $event"
          />
        </ToolPanel>

        <ToolPanel v-if="isHouse" title="Door and lock">
          <FieldGrid min="14rem">
            <SegmentedField v-model="state.doorType" label="Door" :options="doorSegments" />
            <CountStepper
              class="doors"
              :model-value="setup.entryDoors"
              label="Entry doors"
              :min="1"
              :max="MAX_ENTRY_DOORS"
              hint="Priced per door. A corner lot has two."
              @update:model-value="state.entryDoors = $event"
            />
            <SelectField
              :model-value="setup.lockTier * LOCK_TIER_PRICE"
              label="Lock"
              :options="lockOptions"
              hint="200 diamonds per step up."
              @update:model-value="state.doorLock = Number($event)"
            />
            <RangeField
              v-model="lockLevel"
              label="Lock level"
              :min="lockLevelRule.min"
              :max="lockLevelRule.max"
              hint="Starts at 50. 10 diamonds a level."
            />
          </FieldGrid>
        </ToolPanel>

        <ToolPanel
          title="Furnishings"
          :description="`A ${setup.type} holds ${objects.limit} objects, counting the ${objects.includedText} it comes with.`"
        >
          <div class="meter-wrap">
            <div class="meter-text">
              <span>Object slots</span>
              <span class="meter-count">
                {{ objects.used }} of {{ objects.free }} used<span v-if="objects.over">, {{ objects.used - objects.free }} over</span>
              </span>
            </div>
            <div
              class="meter"
              :class="{ over: objects.over }"
              role="meter"
              aria-label="Object slots used"
              :aria-valuenow="objects.used"
              aria-valuemin="0"
              :aria-valuemax="objects.free"
              :aria-valuetext="`${objects.used} of ${objects.free} object slots used`"
            >
              <span :style="{ width: `${Math.min(100, (objects.used / objects.free) * 100)}%` }" />
            </div>
          </div>
          <div class="counts">
            <CountStepper
              v-for="item in visibleFurnishings"
              :key="item.key"
              class="count-row"
              :model-value="setup.counts[item.key]"
              :label="item.label"
              :min="0"
              :max="objects.free"
              :hint="`${item.price} each${item.hint ? `. ${item.hint}` : ''}`"
              @update:model-value="setCount(item.key, $event)"
            />
          </div>
          <p v-if="objects.over" class="field-issue" role="status">
            <span class="issue-icon" aria-hidden="true">!</span>
            <span>
              That's {{ objects.used }} objects{{ state.hasPortal ? ' with the portal' : '' }}, and a {{ setup.type }}
              has room for {{ objects.free }} besides its {{ objects.includedText }}. Take out {{ objects.used - objects.free }}.
            </span>
          </p>
          <p v-else-if="objectsLeft === 0" class="field-ok">Every object slot is taken.</p>
        </ToolPanel>

        <ToolPanel
          title="Tools"
          description="Tools don't use object slots. The room they go in has to be described as a workspace."
        >
          <div class="counts">
            <CountStepper
              v-for="item in tools"
              :key="item.key"
              class="count-row"
              :model-value="setup.counts[item.key]"
              :label="item.label"
              :min="0"
              :max="MAX_TOOLS"
              :hint="`${item.price} each`"
              @update:model-value="setCount(item.key, $event)"
            />
          </div>
        </ToolPanel>

        <ToolPanel
          v-if="setup.hasHenchmen"
          title="Henchmen"
          description="Two come with the manor, at level 75 with 10,000 hp, dark vision, regeneration, detect invisibility, detect hidden, dodge, parry and kick. Weapons are free."
        >
          <div class="henchmen">
            <CountStepper
              :model-value="setup.henchmen"
              label="Henchmen"
              :min="henchmenRules.included"
              :max="henchmenRules.max"
              hint="200 each past two. One more per rank past Lord/Lady, so six at Duke/Duchess."
              @update:model-value="state.henchmenNumber = $event"
            />
            <RangeField
              v-model="henchmenLevel"
              label="Level"
              :min="henchmenRules.minLevel"
              :max="henchmenRules.maxLevel"
              :step="henchmenRules.levelStep"
              hint="100 diamonds per 5 levels, for each henchman."
            />
          </div>
          <div class="upgrades-head">
            <div>
              <h3 class="subhead">Upgrades</h3>
              <p class="au-hint">
                Prices are per henchman, and every henchman gets the same set:
                {{ formatNumber(pricing.upgradesEach) }} each, {{ formatNumber(pricing.upgradesEach * setup.henchmen) }} for {{ setup.henchmen }}.
              </p>
            </div>
            <button type="button" class="au-button" @click="pickAll(!allPicked)">
              {{ allPicked ? 'Clear all' : 'Pick all' }}
            </button>
          </div>
          <div class="upgrades">
            <UpgradeGroup
              v-for="group in upgradeGroups"
              :key="group.title"
              :group="group"
              :values="state"
              @update="setUpgrade"
            />
          </div>
        </ToolPanel>

        <p v-else-if="!isHouse" class="aside-note">
          Henchmen and permanent guests only matter in a private manor, where the guards keep out anyone
          without an invitation. A public manor leaves them out.
        </p>

        <div
          class="bar"
          :class="{ hidden: summaryVisible }"
          aria-hidden="true"
        >
          <span class="bar-label">{{ summaryTitle }}</span>
          <span class="bar-total">
            <strong>{{ formatNumber(pricing.diamonds) }}</strong> diamonds
            <span class="bar-gold">{{ formatNumber(pricing.gold) }} gold</span>
          </span>
        </div>
      </div>

      <div ref="summary" class="summary-col">
        <CostSummary :pricing="pricing" :title="summaryTitle" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.housing {
  container-type: inline-size;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px 24px;
  margin-bottom: 16px;
}

.presets {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.presets-label {
  margin-right: 4px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0 24px;
}

.form {
  min-width: 0;
}

.form > :first-child {
  margin-top: 0;
}

.summary-col {
  min-width: 0;
  margin-top: 16px;
}

@container (min-width: 720px) {
  .layout {
    grid-template-columns: minmax(0, 1fr) 19rem;
    align-items: start;
  }

  .summary-col {
    position: sticky;
    top: calc(var(--vp-nav-height) + 24px);
    margin-top: 0;
  }

  .bar {
    display: none !important;
  }
}

.subhead.subhead {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: normal;
  color: var(--vp-c-text-1);
}

.henchmen {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.upgrades-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
  padding-top: 8px;
  border-top: 1px solid var(--vp-c-divider);
}

.upgrades-head > div {
  min-width: 0;
}

.upgrades-head .au-button {
  flex: none;
}

.upgrades-head .au-hint {
  margin-top: 2px;
}

/* Segmented controls keep their natural width inside panels and grids */
.housing :deep(.au-segmented .options) {
  align-self: flex-start;
}

.counts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(15rem, 100%), 1fr));
  gap: 0 28px;
  margin-top: -8px;
}

.count-row {
  padding: 10px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.upgrades {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(14rem, 100%), 1fr));
  gap: 24px 28px;
  align-items: start;
}

.meter-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.meter-text {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: var(--vp-c-text-1);
}

.meter-count {
  font-weight: 400;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.meter {
  height: 6px;
  overflow: hidden;
  border-radius: 3px;
  background-color: var(--vp-c-default-soft);
}

.meter span {
  display: block;
  height: 100%;
  border-radius: 3px;
  background-color: var(--vp-c-brand-1);
  transition: width 0.2s;
}

.meter.over span {
  background-color: var(--vp-c-warning-1);
}

.field-issue.field-issue,
.field-note.field-note,
.field-ok.field-ok {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: var(--vp-c-text-1);
}

.field-note.field-note {
  margin-top: 4px;
  font-size: 13px;
  line-height: 18px;
  color: var(--vp-c-text-2);
}

.field-ok.field-ok {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.issue-icon,
.note-icon {
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
  line-height: 1;
}

.note-icon {
  width: 18px;
  height: 18px;
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
  font-style: italic;
  font-family: Georgia, serif;
}

.aside-note.aside-note {
  margin: 16px 0;
  padding: 0 4px;
  font-size: 14px;
  line-height: 22px;
  color: var(--vp-c-text-2);
}

/* Total pinned to the bottom of the screen on narrow layouts */
.bar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 2px 12px;
  padding: 10px 24px calc(10px + env(safe-area-inset-bottom));
  border-top: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.06);
  font-size: 14px;
  color: var(--vp-c-text-2);
  transition: opacity 0.2s, visibility 0.2s;
}

.bar.hidden {
  visibility: hidden;
  opacity: 0;
}

.bar-label {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.bar-total {
  font-variant-numeric: tabular-nums;
}

.bar-total strong {
  font-size: 18px;
  color: var(--vp-c-brand-1);
}

.bar-gold {
  margin-left: 8px;
}
</style>
