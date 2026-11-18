// House and manor prices, from the game's help files (area/help.are in the
// MUD source: HOUSE, UPGRADE_HOUSE, MANOR_HOUSE, MANOR_TOOLS and HENCHMEN).
// Every price is in diamonds; gold is diamonds at GOLD_PER_DIAMOND.
import { formatNumber } from '../lib/format';

export const GOLD_PER_DIAMOND = 110;

export type LocationType = 'house' | 'manor';

/** The settings, under the old calculator's query names so old links load. */
export const housingDefaults = {
  locationType: 'house',
  isPublic: false,
  healingRate: 100,
  hasPortal: false,
  /** Price of the lock tier in diamonds, 0 (easy) to 1000 (impossible) */
  doorLock: 0,
  /** Price of the door in diamonds: 0 wood, 50 stone, 100 metal */
  doorType: 0,
  entryDoors: 1,
  lockLevel: 50,
  furnitureItems: 0,
  fireplaceItems: 0,
  fountainItems: 0,
  liquidFountainItems: 0,
  insidePortalItems: 0,
  guests: 0,
  troughItems: 0,
  crucibleItems: 0,
  anvilItems: 0,
  workbenchItems: 0,
  forgeItems: 0,
  henchmenNumber: 2,
  henchmenLevel: 75,
  sanctuary: false,
  haste: false,
  phase: false,
  protection: false,
  sneak: false,
  fly: false,
  invisibility: false,
  criticalStrike: false,
  counter: false,
  dirtKick: false,
  disarm: false,
  berserk: false,
  bash: false,
  trip: false,
  resistMonk: false,
  resistMagic: false,
  resistPierce: false,
  resistSlash: false,
  resistBash: false,
  resistWood: false,
  resistSilver: false,
  resistIron: false,
  resistLight: false,
  resistPoison: false,
  resistHoly: false,
  resistEnergy: false,
  resistDisease: false,
  resistFire: false,
  resistCold: false,
  resistLightning: false,
  resistAcid: false
};

export type HousingState = typeof housingDefaults;
export type UpgradeKey = {
  [K in keyof HousingState]: HousingState[K] extends boolean ? K : never;
}[keyof HousingState] & string;

export const HEAL_STEP = 10;

export const healRules = {
  house: { base: 100, cap: 300, pricePerStep: 125 },
  manor: { base: 150, cap: 400, publicCap: 300, pricePerStep: 250 }
};

export const PORTAL_PRICE = 400;

export const doorOptions = [
  { label: 'Wood', value: 0 },
  { label: 'Stone', value: 50 },
  { label: 'Metal', value: 100 }
];

/** Lock tiers, 200 diamonds a step up from easy (the game's EX_* flags) */
export const lockTiers = ['Easy', 'Hard', 'Infuriating', 'Implausible', 'Improbable', 'Impossible'];
export const LOCK_TIER_PRICE = 200;
export const lockLevelRule = { min: 50, max: 110, pricePerLevel: 10 };
export const MAX_ENTRY_DOORS = 2;

export interface CountItem {
  key: keyof HousingState & string;
  label: string;
  price: number;
  /** Which property type offers it */
  for: LocationType[];
  /** Takes an object slot (tools don't) */
  object: boolean;
  hint?: string;
}

export const furnishings: CountItem[] = [
  { key: 'furnitureItems', label: 'Furniture', price: 25, for: ['house', 'manor'], object: true },
  { key: 'fireplaceItems', label: 'Fireplaces', price: 50, for: ['house', 'manor'], object: true },
  { key: 'fountainItems', label: 'Water fountains', price: 150, for: ['house', 'manor'], object: true },
  {
    key: 'liquidFountainItems',
    label: 'Other fountains',
    price: 200,
    for: ['house'],
    object: true,
    hint: 'Any drink but water'
  },
  {
    key: 'insidePortalItems',
    label: 'Inside portals',
    price: 50,
    for: ['manor'],
    object: true,
    hint: 'Between rooms, one per direction'
  }
];

export const tools: CountItem[] = [
  { key: 'troughItems', label: 'Troughs', price: 50, for: ['house', 'manor'], object: false },
  { key: 'crucibleItems', label: 'Crucibles', price: 100, for: ['house', 'manor'], object: false },
  { key: 'anvilItems', label: 'Anvils', price: 250, for: ['house', 'manor'], object: false },
  { key: 'workbenchItems', label: 'Workbenches', price: 250, for: ['house', 'manor'], object: false },
  { key: 'forgeItems', label: 'Forges', price: 500, for: ['house', 'manor'], object: false }
];
export const MAX_TOOLS = 10;

/** Objects a property holds, counting the ones it comes with */
export const objectRules = {
  house: { limit: 10, included: 2, includedText: 'key and pit' },
  manor: { limit: 15, included: 2, includedText: 'pit and invitation' }
};

export const GUEST_PRICE = 100;
export const MAX_GUESTS = 2;

export const henchmenRules = {
  included: 2,
  max: 6,
  extraPrice: 200,
  minLevel: 75,
  maxLevel: 110,
  levelStep: 5,
  levelStepPrice: 100
};

export interface Upgrade {
  key: UpgradeKey;
  label: string;
  price: number;
}

export interface UpgradeGroup {
  title: string;
  upgrades: Upgrade[];
}

export const upgradeGroups: UpgradeGroup[] = [
  {
    title: 'Affects',
    upgrades: [
      { key: 'sanctuary', label: 'Sanctuary', price: 125 },
      { key: 'haste', label: 'Haste', price: 100 },
      { key: 'phase', label: 'Phase', price: 100 },
      { key: 'protection', label: 'Protection (good or evil)', price: 50 },
      { key: 'sneak', label: 'Sneak', price: 25 },
      { key: 'fly', label: 'Fly', price: 25 },
      { key: 'invisibility', label: 'Invisibility', price: 25 }
    ]
  },
  {
    title: 'Offense',
    upgrades: [
      { key: 'criticalStrike', label: 'Critical strike', price: 100 },
      { key: 'counter', label: 'Counter', price: 100 },
      { key: 'dirtKick', label: 'Dirt kick', price: 75 },
      { key: 'disarm', label: 'Disarm', price: 75 },
      { key: 'berserk', label: 'Berserk', price: 50 },
      { key: 'bash', label: 'Bash', price: 25 },
      { key: 'trip', label: 'Trip', price: 10 }
    ]
  },
  {
    title: 'Major resistances',
    upgrades: [
      { key: 'resistMonk', label: 'Monk', price: 100 },
      { key: 'resistMagic', label: 'Magic', price: 100 },
      { key: 'resistPierce', label: 'Pierce', price: 50 },
      { key: 'resistSlash', label: 'Slash', price: 50 },
      { key: 'resistBash', label: 'Bash', price: 50 }
    ]
  },
  {
    title: 'Minor resistances',
    upgrades: [
      { key: 'resistWood', label: 'Wood', price: 25 },
      { key: 'resistSilver', label: 'Silver', price: 25 },
      { key: 'resistIron', label: 'Iron', price: 25 },
      { key: 'resistLight', label: 'Light', price: 25 },
      { key: 'resistPoison', label: 'Poison', price: 25 },
      { key: 'resistHoly', label: 'Holy', price: 25 },
      { key: 'resistEnergy', label: 'Energy', price: 25 },
      { key: 'resistDisease', label: 'Disease', price: 25 },
      { key: 'resistFire', label: 'Fire', price: 25 },
      { key: 'resistCold', label: 'Cold', price: 25 },
      { key: 'resistLightning', label: 'Lightning', price: 25 },
      { key: 'resistAcid', label: 'Acid', price: 25 }
    ]
  }
];

export const allUpgrades = upgradeGroups.flatMap(group => group.upgrades);

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const whole = (value: number, min: number, max: number) => clamp(Math.floor(value), min, max);

/** Heal rate range for a setup */
export function healRange(type: LocationType, isPublic: boolean) {
  if (type === 'house') return { min: healRules.house.base, max: healRules.house.cap };
  return { min: healRules.manor.base, max: isPublic ? healRules.manor.publicCap : healRules.manor.cap };
}

/**
 * The setup as the game allows it: values from a link that are out of range
 * are pulled back in. Each pull that changes a price comes back as a note
 * for the field it belongs to.
 */
export interface Setup {
  type: LocationType;
  isPublic: boolean;
  /** Henchmen and guests only exist in a private manor */
  hasHenchmen: boolean;
  heal: number;
  hasPortal: boolean;
  lockTier: number;
  doorType: number;
  entryDoors: number;
  lockLevel: number;
  counts: Record<string, number>;
  henchmen: number;
  henchmenLevel: number;
  guests: number;
  upgrades: Upgrade[];
  notes: Partial<Record<keyof HousingState, string>>;
}

export function normalize(state: HousingState): Setup {
  const type: LocationType = state.locationType === 'manor' ? 'manor' : 'house';
  const isPublic = type === 'manor' && state.isPublic;
  const notes: Setup['notes'] = {};
  const range = healRange(type, isPublic);
  const heal = clamp(Math.round(state.healingRate / HEAL_STEP) * HEAL_STEP, range.min, range.max);

  if (state.healingRate > range.max) {
    const who = type === 'house' ? 'A house' : isPublic ? 'A public manor' : 'A manor';

    notes.healingRate = `The link asked for ${state.healingRate}%. ${who} tops out at ${range.max}%.`;
  }

  const counts: Record<string, number> = {};
  const { limit, included } = objectRules[type];

  for (const item of [...furnishings, ...tools]) {
    const max = item.object ? limit - included : MAX_TOOLS;
    const value = item.for.includes(type) ? whole(Number(state[item.key]), 0, max) : 0;

    counts[item.key] = value;
  }

  const doorType = type === 'house' ? (doorOptions.find(o => o.value === state.doorType) ?? doorOptions[0]).value : 0;
  const lockTier = type === 'house' ? whole(Math.round(state.doorLock / LOCK_TIER_PRICE), 0, lockTiers.length - 1) : 0;
  const lockLevel = type === 'house' ? whole(state.lockLevel, lockLevelRule.min, lockLevelRule.max) : lockLevelRule.min;
  const entryDoors = type === 'house' ? whole(state.entryDoors, 1, MAX_ENTRY_DOORS) : 1;

  const hasHenchmen = type === 'manor' && !isPublic;
  const henchmen = whole(state.henchmenNumber, henchmenRules.included, henchmenRules.max);
  const levelSteps = Math.floor((state.henchmenLevel - henchmenRules.minLevel) / henchmenRules.levelStep);
  const henchmenLevel = clamp(
    henchmenRules.minLevel + levelSteps * henchmenRules.levelStep,
    henchmenRules.minLevel,
    henchmenRules.maxLevel
  );

  return {
    type,
    isPublic,
    hasHenchmen,
    heal,
    hasPortal: state.hasPortal,
    lockTier,
    doorType,
    entryDoors,
    lockLevel,
    counts,
    henchmen,
    henchmenLevel,
    guests: hasHenchmen ? whole(state.guests, 0, MAX_GUESTS) : 0,
    upgrades: hasHenchmen ? allUpgrades.filter(upgrade => state[upgrade.key]) : [],
    notes
  };
}

export interface CostLine {
  key: string;
  label: string;
  /** How the price was reached, e.g. "20 steps of 125" */
  detail?: string;
  diamonds: number;
}

export interface Pricing {
  setup: Setup;
  lines: CostLine[];
  diamonds: number;
  gold: number;
  objects: { used: number; free: number; limit: number; includedText: string; over: boolean };
  /** Diamonds for one henchman's upgrades */
  upgradesEach: number;
}

const times = (count: number, price: number) => `${formatNumber(count)} × ${formatNumber(price)}`;

export function priceSetup(state: HousingState): Pricing {
  const setup = normalize(state);
  const lines: CostLine[] = [];
  const add = (line: CostLine) => {
    if (line.diamonds > 0) lines.push(line);
  };
  const type = setup.type;
  const heal = healRules[type];
  const healSteps = (setup.heal - heal.base) / HEAL_STEP;

  add({
    key: 'heal',
    label: `Heal rate ${heal.base}% to ${setup.heal}%`,
    detail: times(healSteps, heal.pricePerStep),
    diamonds: healSteps * heal.pricePerStep
  });
  if (setup.hasPortal) add({ key: 'portal', label: 'Portal', diamonds: PORTAL_PRICE });

  if (type === 'house') {
    const door = doorOptions.find(option => option.value === setup.doorType) ?? doorOptions[0];

    add({
      key: 'door',
      label: `${door.label} door${setup.entryDoors > 1 ? 's' : ''}`,
      detail: setup.entryDoors > 1 ? times(setup.entryDoors, door.value) : undefined,
      diamonds: door.value * setup.entryDoors
    });
    add({
      key: 'lock',
      label: `${lockTiers[setup.lockTier]} lock`,
      detail: times(setup.lockTier, LOCK_TIER_PRICE),
      diamonds: setup.lockTier * LOCK_TIER_PRICE
    });
    const levels = setup.lockLevel - lockLevelRule.min;

    add({
      key: 'lockLevel',
      label: `Lock level ${lockLevelRule.min} to ${setup.lockLevel}`,
      detail: times(levels, lockLevelRule.pricePerLevel),
      diamonds: levels * lockLevelRule.pricePerLevel
    });
  }

  for (const item of [...furnishings, ...tools]) {
    const count = setup.counts[item.key];

    add({ key: item.key, label: item.label, detail: times(count, item.price), diamonds: count * item.price });
  }

  if (setup.guests) {
    add({ key: 'guests', label: 'Permanent guests', detail: times(setup.guests, GUEST_PRICE), diamonds: setup.guests * GUEST_PRICE });
  }

  const upgradesEach = setup.upgrades.reduce((sum, upgrade) => sum + upgrade.price, 0);

  if (setup.hasHenchmen) {
    const extra = setup.henchmen - henchmenRules.included;
    const levelSteps = (setup.henchmenLevel - henchmenRules.minLevel) / henchmenRules.levelStep;

    add({
      key: 'henchmen',
      label: 'Extra henchmen',
      detail: times(extra, henchmenRules.extraPrice),
      diamonds: extra * henchmenRules.extraPrice
    });
    add({
      key: 'henchmenLevel',
      label: `Henchmen level ${henchmenRules.minLevel} to ${setup.henchmenLevel}`,
      detail: `${levelSteps} × ${henchmenRules.levelStepPrice} × ${setup.henchmen} henchmen`,
      diamonds: levelSteps * henchmenRules.levelStepPrice * setup.henchmen
    });
    add({
      key: 'upgrades',
      label: 'Henchmen upgrades',
      detail: `${setup.upgrades.length} of ${allUpgrades.length}, ${times(setup.henchmen, upgradesEach)}`,
      diamonds: upgradesEach * setup.henchmen
    });
  }

  const diamonds = lines.reduce((sum, line) => sum + line.diamonds, 0);
  const rule = objectRules[type];
  const used =
    furnishings.reduce((sum, item) => sum + setup.counts[item.key], 0) + (setup.hasPortal ? 1 : 0);
  const free = rule.limit - rule.included;

  return {
    setup,
    lines,
    diamonds,
    gold: diamonds * GOLD_PER_DIAMOND,
    objects: { used, free, limit: rule.limit, includedText: rule.includedText, over: used > free },
    upgradesEach
  };
}

const everyUpgrade = Object.fromEntries(allUpgrades.map(upgrade => [upgrade.key, true]));

/** Ready-made setups. Starter is a house as it comes. */
export const presets: { key: string; label: string; state: Partial<HousingState> }[] = [
  { key: 'starter', label: 'Starter house', state: {} },
  {
    key: 'maxHouse',
    label: 'Maxed house',
    state: {
      locationType: 'house',
      healingRate: 300,
      hasPortal: true,
      doorType: 100,
      doorLock: 1000,
      lockLevel: 110,
      furnitureItems: 5,
      fireplaceItems: 1,
      fountainItems: 1,
      troughItems: 1,
      crucibleItems: 1,
      anvilItems: 1,
      workbenchItems: 1,
      forgeItems: 1
    }
  },
  {
    key: 'maxManor',
    label: 'Maxed manor',
    state: {
      locationType: 'manor',
      healingRate: 400,
      hasPortal: true,
      furnitureItems: 10,
      fireplaceItems: 1,
      fountainItems: 1,
      troughItems: 1,
      crucibleItems: 1,
      anvilItems: 1,
      workbenchItems: 1,
      forgeItems: 1,
      guests: 2,
      henchmenNumber: 6,
      henchmenLevel: 110,
      ...everyUpgrade
    }
  }
];
