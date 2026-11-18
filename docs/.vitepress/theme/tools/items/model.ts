// Turns the raw area-file items (lib/items.ts) into what the item search
// shows: numbers instead of strings, the stat bonuses the score weighs, the
// spells on magic items, and the labels the game itself uses. Where the item
// data disagrees with the MUD source (src/act_info.c identify_object, which
// prints what lore and identify show), the source wins and the comment says so.

import { stripMudColors } from '../lib/mud-color';
import type { Item } from '../lib/items';

/** The type chips, in the order the old calculator listed them. */
export const typeGroups = [
  { value: 'armor', label: 'Armor' },
  { value: 'weapon', label: 'Weapons' },
  { value: 'staff', label: 'Staves' },
  { value: 'wand', label: 'Wands' },
  { value: 'pill', label: 'Pills' },
  { value: 'potion', label: 'Potions' },
  { value: 'scroll', label: 'Scrolls' },
  { value: 'other', label: 'Other' }
] as const;

export type TypeGroup = (typeof typeGroups)[number]['value'];

export const magicGroups = ['staff', 'wand', 'pill', 'potion', 'scroll'] as const;

/** The ten stats the score weighs, with the old calculator's defaults. */
export const weightStats = [
  { key: 'str', affect: 'strength', label: 'Strength', short: 'str', weight: 7 },
  { key: 'dex', affect: 'dexterity', label: 'Dexterity', short: 'dex', weight: 7 },
  { key: 'int', affect: 'intelligence', label: 'Intelligence', short: 'int', weight: 7 },
  { key: 'wis', affect: 'wisdom', label: 'Wisdom', short: 'wis', weight: 7 },
  { key: 'con', affect: 'constitution', label: 'Constitution', short: 'con', weight: 7 },
  { key: 'hit', affect: 'hitroll', label: 'Hitroll', short: 'hit', weight: 4 },
  { key: 'dam', affect: 'damroll', label: 'Damroll', short: 'dam', weight: 7 },
  { key: 'hp', affect: 'health', label: 'Hit points', short: 'hp', weight: 1 },
  { key: 'mana', affect: 'mana', label: 'Mana', short: 'mana', weight: 1 },
  { key: 'move', affect: 'move', label: 'Moves', short: 'move', weight: 0 }
] as const;

export type WeightKey = (typeof weightStats)[number]['key'];
export type Weights = Record<WeightKey, number>;

export const defaultWeights = Object.fromEntries(
  weightStats.map(stat => [stat.key, stat.weight])
) as Weights;

// Area files in the source tree that the game doesn't boot: they're missing
// from area/area.lst, which db.c reads at startup. Several reuse vnums of
// areas that do load (Golem Settlement and The Giants Outpost share 24), and
// the game exits on a duplicate vnum, so these are old or unfinished copies.
// Their items can't turn up in play.
export const unloadedAreas = new Set([
  'arachnos',
  'dividedSouls',
  'dwarvenCatacombs',
  'dwarvenKingdom',
  'elementalCanyon',
  'godQuest',
  'golemSettlement',
  'haonDor',
  'highTower',
  'plains',
  'ruinedThalos',
  'sandsOfSorrow',
  'theHallOfUhrbak'
]);

/** Wear slots in the order the game lists them, with readable names. */
export const slotLabels: Record<string, string> = {
  finger: 'Finger',
  neck: 'Neck',
  body: 'Body',
  head: 'Head',
  legs: 'Legs',
  feet: 'Feet',
  hands: 'Hands',
  arms: 'Arms',
  shield: 'Shield',
  about: 'About the body',
  waist: 'Waist',
  wrist: 'Wrist',
  belt: 'Belt',
  wield: 'Wielded',
  hold: 'Held',
  float: 'Floating nearby'
};

// The generator numbered the saving throws one off: APPLY 21 is savingrod in
// src/tables.c apply_flags, not savingpara (which is 20, the same as saves),
// and so on up. All of them change the same saving throw. Hit points are
// "hp" in the game.
const affectLabels: Record<string, string> = {
  health: 'Hit points',
  hitroll: 'Hitroll',
  damroll: 'Damroll',
  ac: 'Armor class',
  saves: 'Saves',
  'saving para': 'Saving rod',
  'saving rod': 'Saving petrification',
  'saving petri': 'Saving breath',
  'saving breath': 'Saving spell',
  'saving spell': 'Spell affect',
  'damage resistance': 'Damage resistance',
  'damage bonus': 'Damage bonus'
};

const affectShort: Record<string, string> = {
  ac: 'AC',
  saves: 'saves',
  'saving para': 'saves',
  'saving rod': 'saves',
  'saving petri': 'saves',
  'saving breath': 'saves',
  'damage resistance': 'dam resist',
  'damage bonus': 'dam bonus'
};

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export interface Affect {
  name: string;
  label: string;
  short: string;
  amount: number;
  /** Index into weightStats, or -1 when the score ignores it */
  stat: number;
}

export interface ItemView {
  /** Unique: area key plus vnum */
  id: string;
  item: Item;
  vnum: string;
  areaKey: string;
  areaName: string;
  /** Short description with color codes */
  name: string;
  /** Short description as plain text, for sorting */
  plain: string;
  level: number;
  group: TypeGroup;
  type: string;
  typeLabel: string;
  /** Wear slots, without "takeable" */
  slots: string[];
  weaponClass: string;
  spells: string[];
  spellLevel: number | null;
  affects: Affect[];
  /** Bonus per weighted stat, in weightStats order */
  stats: number[];
  /** Lowercase name, keywords and vnum for the text search */
  haystack: string;
  /** The game boots this item's area */
  loaded: boolean;
  /** "Wrist", "Sword", "Haste, bless" */
  kind: string;
}

const groupOf = (type: string): TypeGroup =>
  (typeGroups.some(group => group.value === type) ? type : 'other') as TypeGroup;

/** The value inside "label: (value)". */
export function flagValue(item: Item, prefix: string): string | null {
  const flag = item.valueFlags.find(text => text.startsWith(prefix));
  const match = flag && /\((.*)\)\s*$/.exec(flag);

  return match ? match[1] : null;
}

const cleanSpell = (raw: string) => raw.replace(/^'|'$/g, '').trim();
const isSpell = (name: string) =>
  name !== '' && name !== 'reserved' && name !== 'undefined' && !/^-?\d+$/.test(name);

function spellsOf(item: Item): string[] {
  const spells = item.valueFlags
    .map(text => /^spell\d?: \((.*)\)\s*$/.exec(text))
    .filter((match): match is RegExpExecArray => match !== null)
    .map(match => cleanSpell(match[1]))
    .filter(isSpell);

  return [...new Set(spells)];
}

/** Reads an area-file flag field (fread_flag): letters A-Z, a-f are bits, digits a number. */
export function readFlag(text: string | undefined): number {
  if (!text) return 0;
  if (/^-?\d+$/.test(text)) return Number(text);
  let value = 0;

  for (const char of text) {
    if (char >= 'A' && char <= 'Z') value += 2 ** (char.charCodeAt(0) - 65);
    else if (char >= 'a' && char <= 'z') value += 2 ** (26 + char.charCodeAt(0) - 97);
  }
  // All 32 bits set is -1 in the game's int
  return value >= 2 ** 32 - 1 ? -1 : value;
}

export function viewItem(item: Item): ItemView {
  const group = groupOf(item.itemType);
  const plain = stripMudColors(item.short).trim();
  const slots = item.wearFlags.filter(flag => flag !== 'takeable');
  const weaponClass = group === 'weapon' ? (flagValue(item, 'weapon class') ?? '') : '';
  const spells = (magicGroups as readonly string[]).includes(group) ? spellsOf(item) : [];
  const spellLevel = spells.length ? Number(flagValue(item, 'level')) : null;
  const stats = weightStats.map(() => 0);
  const affects: Affect[] = [];

  for (const affect of item.affects ?? []) {
    const amount = Number(affect.amount);

    // The game skips APPLY_NONE and zero modifiers when it lists affects
    if (affect.name === 'none' || !amount) continue;
    const stat = weightStats.findIndex(entry => entry.affect === affect.name);

    if (stat >= 0) stats[stat] += amount;
    affects.push({
      name: affect.name,
      label: affectLabels[affect.name] ?? capitalize(affect.name),
      short: stat >= 0 ? weightStats[stat].short : (affectShort[affect.name] ?? affect.name),
      amount,
      stat
    });
  }
  const level = Number(item.level);
  const typeLabel = capitalize(item.itemType.replace(/_/g, ' '));
  let kind = typeLabel;

  if (group === 'weapon') kind = capitalize(weaponClass || 'weapon');
  else if (spells.length) kind = typeLabel;
  else if (slots.length) kind = slots.map(slot => slotLabels[slot] ?? capitalize(slot)).join(', ');

  return {
    id: `${item.areaKey}:${item.vnum}`,
    item,
    vnum: item.vnum,
    areaKey: item.areaKey,
    areaName: item.area,
    name: item.short,
    plain,
    level: Number.isFinite(level) ? level : 0,
    group,
    type: item.itemType,
    typeLabel,
    slots,
    weaponClass,
    spells,
    spellLevel: Number.isFinite(spellLevel) ? spellLevel : null,
    affects,
    stats,
    haystack: [plain, ...item.names, item.vnum].join(' ').toLowerCase(),
    loaded: !unloadedAreas.has(item.areaKey),
    kind
  };
}

export function scoreOf(view: ItemView, weights: number[]): number {
  let score = 0;

  for (let i = 0; i < weights.length; i++) score += view.stats[i] * weights[i];
  return score;
}

/** "+20 dam, +15 hit, +200 hp": the bonuses in a fixed, useful order. */
const shortOrder = ['dam', 'hit', 'hp', 'mana', 'move', 'str', 'dex', 'int', 'wis', 'con', 'AC', 'saves'];

export function bonusSummary(view: ItemView): string {
  const totals = new Map<string, number>();

  for (const affect of view.affects) totals.set(affect.short, (totals.get(affect.short) ?? 0) + affect.amount);
  const rank = (key: string) => {
    const index = shortOrder.indexOf(key);

    return index < 0 ? shortOrder.length : index;
  };

  return [...totals]
    .filter(([, amount]) => amount !== 0)
    .sort((a, b) => rank(a[0]) - rank(b[0]))
    .map(([key, amount]) => `${amount > 0 ? '+' : ''}${amount} ${key}`)
    .join(', ');
}

// Condition: the area file stores a letter, which db2.c load_objects turns
// into a number (P 100, G 90, A 75, W 50, D 25, B 10, R 0), and identify
// prints that as mint, excellent, fair, mediocre, damaged or ruined. The item
// data used made-up words for the letters instead (masterful for P).
const conditionNames: Record<string, string> = {
  masterful: 'mint',
  exceptional: 'excellent',
  outstanding: 'fair',
  adequate: 'mediocre',
  incompetent: 'damaged',
  atrocious: 'ruined',
  abysmal: 'ruined',
  100: 'mint'
};

export function conditionOf(item: Item): string | null {
  return item.condition === undefined ? null : (conditionNames[String(item.condition)] ?? null);
}

/** The quality word identify prints for an item's quality number. */
export function qualityOf(quality: number): string {
  if (quality > 95) return 'masterful';
  if (quality > 90) return 'perfect';
  if (quality > 80) return 'first rate';
  if (quality > 70) return 'impeccable';
  if (quality > 60) return 'fine';
  if (quality > 50) return 'standard';
  if (quality > 40) return 'sound';
  if (quality > 30) return 'imperfect';
  if (quality > 20) return 'deficient';
  if (quality > 10) return 'faulty';
  return 'crude';
}

// Area links: the areas page gives each row an explicit anchor. The page's
// source comes in raw so the links follow it when an area is added.
export interface AreaInfo {
  slug: string;
  levels: string;
}

export function parseAreaAnchors(markdown: string): Map<string, AreaInfo> {
  const anchors = new Map<string, AreaInfo>();
  const row = /^\|\s*([^|]*?)\s*\|\s*<a id="([^"]+)"><\/a>/gm;

  for (const match of markdown.matchAll(row)) anchors.set(match[2], { slug: match[2], levels: match[1] });
  return anchors;
}

/** "The Giants Outpost" -> "giants-outpost", the areas page's anchor style. */
export function areaSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/^the\s+/, '')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Sort key for an area name, ignoring a leading "The". */
export const areaSortName = (name: string) => name.replace(/^the\s+/i, '').toLowerCase();
