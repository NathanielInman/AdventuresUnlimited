// Turns the item data (lib/items.ts) into what the item search shows: the
// stat bonuses the score weighs, the spells on magic items, readable labels
// and where to find each item. The data already reads the way the game does
// (scripts/generate-items.mjs decodes it like the loader and identify); the
// few things here that the data leaves out are worked out from the MUD source
// and say where they come from.

import { stripMudColors } from '../lib/mud-color';
import type { Item, Source } from '../lib/items';

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
  { key: 'str', apply: 'strength', label: 'Strength', short: 'str', weight: 7 },
  { key: 'dex', apply: 'dexterity', label: 'Dexterity', short: 'dex', weight: 7 },
  { key: 'int', apply: 'intelligence', label: 'Intelligence', short: 'int', weight: 7 },
  { key: 'wis', apply: 'wisdom', label: 'Wisdom', short: 'wis', weight: 7 },
  { key: 'con', apply: 'constitution', label: 'Constitution', short: 'con', weight: 7 },
  { key: 'hit', apply: 'hitroll', label: 'Hitroll', short: 'hit', weight: 4 },
  { key: 'dam', apply: 'damroll', label: 'Damroll', short: 'dam', weight: 7 },
  { key: 'hp', apply: 'hp', label: 'Hit points', short: 'hp', weight: 1 },
  { key: 'mana', apply: 'mana', label: 'Mana', short: 'mana', weight: 1 },
  { key: 'move', apply: 'move', label: 'Moves', short: 'move', weight: 0 }
] as const;

export type WeightKey = (typeof weightStats)[number]['key'];
export type Weights = Record<WeightKey, number>;

export const defaultWeights = Object.fromEntries(
  weightStats.map(stat => [stat.key, stat.weight])
) as Weights;

/** Wear slots in the order the game lists them. The keys are the slot filter's URL values. */
export const slotLabels: Record<string, string> = {
  finger: 'Finger',
  neck: 'Neck',
  symbol: 'Holy symbol',
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
  hip: 'Hip',
  wield: 'Wielded',
  hold: 'Held',
  float: 'Floating nearby'
};

// Wear flags that aren't slots, and the one whose filter value predates the
// game's own name for it
const notSlots = new Set(['take', 'nosac']);
const slotKey = (flag: string) => (flag === 'wearfloat' ? 'float' : flag);

// Apply names are src/tables.c apply_flags, as identify prints them
const applyLabels: Record<string, string> = {
  hp: 'Hit points',
  ac: 'Armor class',
  saves: 'Saves',
  savingrod: 'Saving rod',
  savingpetri: 'Saving petrification',
  savingbreath: 'Saving breath',
  savingspell: 'Saving spell',
  spellaffect: 'Spell affect',
  'dam-resist': 'Damage resistance',
  'dam-bonus': 'Damage bonus',
  weapon: 'Weapon'
};

const applyShort: Record<string, string> = {
  ac: 'AC',
  saves: 'saves',
  savingrod: 'saves',
  savingpetri: 'saves',
  savingbreath: 'saves',
  savingspell: 'saves',
  'dam-resist': 'dam resist',
  'dam-bonus': 'dam bonus'
};

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** "detect_invis" -> "detect invis", the way the game's help names affects. */
export const affectLabel = (name: string) => name.replace(/_/g, ' ');

export interface Affect {
  name: string;
  label: string;
  short: string;
  /** The modifier, or null for a weapon apply, which adds flags instead */
  amount: number | null;
  /** The weapon flags a weapon apply adds */
  text?: string;
  /** Index into weightStats, or -1 when the score ignores it */
  stat: number;
}

export interface ItemView {
  /** Unique: the vnum */
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
  /** Wear slots, as slotLabels keys */
  slots: string[];
  weaponClass: string;
  /** Spells, each once */
  spells: string[];
  spellLevel: number | null;
  affects: Affect[];
  /** Bonus per weighted stat, in weightStats order */
  stats: number[];
  /** Lowercase name, keywords and vnum for the text search */
  haystack: string;
  /** A reset, shop, script, quest or the game's code puts it in the world */
  placed: boolean;
  /** Immortal or test gear no player can use: above level 110, over 100 hit or dam, or 1,000+ average weapon damage */
  testGear: boolean;
  /** "Wrist", "Sword", "Haste, bless" */
  kind: string;
}

const groupOf = (type: string): TypeGroup =>
  (typeGroups.some(group => group.value === type) ? type : 'other') as TypeGroup;

export const diceAverage = ([count, sides]: [number, number]) => (count * (sides + 1)) / 2;

export function viewItem(item: Item): ItemView {
  const group = groupOf(item.type);
  const plain = stripMudColors(item.name).trim();
  const slots = (item.wear ?? []).filter(flag => !notSlots.has(flag)).map(slotKey);
  const weaponClass = item.weapon?.class ?? '';
  const spells = item.magic ? [...new Set(item.magic.spells)] : [];
  const stats = weightStats.map(() => 0);
  const affects: Affect[] = [];

  for (const [name, modifier] of item.apply ?? []) {
    const stat = weightStats.findIndex(entry => entry.apply === name);

    if (typeof modifier === 'number' && stat >= 0) stats[stat] += modifier;
    affects.push({
      name,
      label: applyLabels[name] ?? capitalize(name),
      short: stat >= 0 ? weightStats[stat].short : (applyShort[name] ?? name),
      amount: typeof modifier === 'number' ? modifier : null,
      text: typeof modifier === 'string' ? modifier : undefined,
      stat
    });
  }
  const hit = stats[weightStats.findIndex(entry => entry.key === 'hit')];
  const dam = stats[weightStats.findIndex(entry => entry.key === 'dam')];
  const average = item.weapon ? diceAverage(item.weapon.dice) : 0;
  const testGear = item.level > 110 || Math.abs(hit) > 100 || Math.abs(dam) > 100 || average > 1000;
  const typeLabel = capitalize(item.type.replace(/_/g, ' '));
  let kind = typeLabel;

  if (group === 'weapon') kind = capitalize(weaponClass === 'none' || !weaponClass ? 'weapon' : weaponClass);
  else if (spells.length) kind = typeLabel;
  else if (slots.length) kind = slots.map(slot => slotLabels[slot] ?? capitalize(slot)).join(', ');

  return {
    id: String(item.vnum),
    item,
    vnum: String(item.vnum),
    areaKey: item.areaKey,
    areaName: item.areaName,
    name: item.name,
    plain,
    level: item.level,
    group,
    type: item.type,
    typeLabel,
    slots,
    weaponClass,
    spells,
    spellLevel: item.magic?.level ?? null,
    affects,
    stats,
    haystack: [plain, item.kw, item.vnum].join(' ').toLowerCase(),
    placed: Boolean(item.src?.length),
    testGear,
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

  for (const affect of view.affects) {
    if (affect.amount !== null) totals.set(affect.short, (totals.get(affect.short) ?? 0) + affect.amount);
  }
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

// Copies differ from the area file in two ways, both in src/db.c
// create_object. Weapons, armor and jewelry of metal or mineral above level 5
// spawn at a random condition from 25 up to the listed one (shop copies get
// the listed one). Weapons and armor with no world limit pass each dice and
// armor value through number_median, which moves a value under 100 up or
// down by one some of the time and never leaves it below 1.

/** True when copies spawn in a random condition, worse than the listed one. */
export function conditionVaries(item: Item): boolean {
  return (
    (item.mat === 'metal' || item.mat === 'mineral') &&
    item.level > 5 &&
    ['weapon', 'jewelry', 'armor'].includes(item.type)
  );
}

/** The lowest and highest a value can roll on a copy, or null when every copy matches the data. */
export function medianRange(item: Item, value: number): [number, number] | null {
  if (item.limit !== undefined || !['weapon', 'armor'].includes(item.type)) return null;
  const low = Math.max(1, value < 100 ? value - 1 : value);
  const high = Math.max(1, value < 100 ? value + 1 : value);

  return low === value && high === value ? null : [low, high];
}

/** identify's craftsmanship word for a weapon (src/act_info.c identify_object); bows and crossbows get none. */
export function craftsmanship(item: Item): string | null {
  const weapon = item.weapon;

  if (!weapon || /bow/.test(weapon.class)) return null;
  const ave = Math.trunc(((1 + weapon.dice[1]) * weapon.dice[0]) / 2);
  const level = item.level;
  const at = (times: number, over: number) => Math.trunc((level * times) / over);

  if (ave > at(55, 40)) return 'supreme';
  if (ave > at(66, 50)) return 'finely crafted';
  if (ave > at(253, 200)) return 'excellent';
  if (ave > at(121, 100)) return 'well made';
  if (ave > at(231, 200)) return 'average';
  if (ave > at(11, 10)) return 'acceptable';
  if (ave > at(209, 200)) return 'tolerable';
  if (ave > at(99, 100)) return 'inferior';
  if (ave > at(187, 200)) return 'inadequate';
  if (ave > at(88, 100)) return 'poor';
  return 'defective';
}

// Where to find it: one readable line per source

export interface SourceLink {
  text: string;
  href?: string;
}

/** A line of parts, some of them links. */
export type SourceLine = (string | SourceLink)[];

const triggerText: Record<string, string> = {
  act: 'reacting to something in the room',
  bribe: 'when paid',
  death: 'when it dies',
  entry: 'when it arrives',
  fight: 'during a fight',
  give: 'when given the right thing',
  greet: 'when someone arrives',
  grall: 'when someone arrives',
  kill: 'when attacked',
  hpcnt: 'when hurt badly enough',
  random: 'now and then',
  speech: 'when someone says the right words',
  exit: 'when someone leaves',
  exall: 'when someone leaves',
  delay: 'after a delay',
  surr: 'when someone surrenders',
  command: 'on a command',
  wear: 'when worn',
  remove: 'when removed',
  sac: 'when sacrificed',
  examine: 'when examined',
  zap: 'when zapped',
  drop: 'when dropped',
  use: 'when used',
  sleep: 'when someone sleeps',
  rest: 'when someone rests'
};

/** "spell_create_food" -> "the create food spell", "do_chop" -> "the chop command". */
export function codeLabel(fn: string): string {
  if (fn.startsWith('spell_')) return `the ${fn.slice(6).replace(/_/g, ' ')} spell`;
  if (fn.startsWith('do_')) return `the ${fn.slice(3).replace(/_/g, ' ')} command`;
  return `the game itself (${fn})`;
}

export const formatCoins = (cost: number) => {
  const gold = Math.floor(cost / 100);
  const silver = cost % 100;

  return `${gold.toLocaleString('en-US')} gold${silver ? `, ${silver} silver` : ''}`;
};

export interface SourceContext {
  /** Link to an item by vnum */
  itemHref: (vnum: number) => string;
  /** Link to an area on the areas page, by area key */
  areaHref: (key: string) => string | null;
}

/** Turns the item's sources into lines, grouped by kind. */
export interface SourceEntry {
  kind: Source['k'];
  line: SourceLine;
  /** Rooms, when there's more than one */
  rooms?: SourceLine[];
}

export function sourceLines(item: Item, context: SourceContext): SourceEntry[] {
  const { mobs, rooms, objs, areas } = item.refs;
  const plain = (text: string) => stripMudColors(text).trim();
  const lines: SourceEntry[] = [];

  const areaPart = (key: string): SourceLine => {
    const name = areas[key] ?? key;
    const href = context.areaHref(key);

    return [' (', href ? { text: name, href } : name, ')'];
  };

  /** One room inline, "in Room (Area)"; more go in a list under the line. */
  const roomParts = (vnums: number[]): { inline: SourceLine; list?: SourceLine[] } => {
    const known = vnums.filter(vnum => rooms[vnum]);

    if (!known.length) return { inline: [] };
    const roomLine = (vnum: number): SourceLine => [plain(rooms[vnum][0]), ...areaPart(rooms[vnum][1])];

    if (known.length === 1) return { inline: [' in ', ...roomLine(known[0])] };
    const keys = new Set(known.map(vnum => rooms[vnum][1]));

    // Rooms all in one area name it once, on the line
    if (keys.size === 1) {
      const [key] = keys;
      const href = context.areaHref(key);

      return {
        inline: [` in ${known.length} rooms of `, href ? { text: areas[key] ?? key, href } : (areas[key] ?? key)],
        list: known.map(vnum => [plain(rooms[vnum][0])])
      };
    }
    return { inline: [` in ${known.length} rooms`], list: known.map(roomLine) };
  };

  const mobName = (vnum: number) => plain(mobs[vnum]?.[0] ?? `mob ${vnum}`);
  const limitText = (source: Source) => (source.max !== undefined ? `, at most ${source.max} in the world` : '');

  for (const source of item.src ?? []) {
    const { inline: where, list: rooms } = roomParts(source.rooms ?? []);

    switch (source.k) {
      case 'floor':
        lines.push({ kind: source.k, line: ['On the ground', ...where], rooms });
        break;
      case 'carried':
      case 'worn':
        lines.push({
          kind: source.k,
          line: [
            `${source.k === 'worn' ? 'Worn' : 'Carried'} by ${mobName(source.mob!)}`,
            ...where,
            limitText(source)
          ],
          rooms
        });
        break;
      case 'shop':
        lines.push({
          kind: source.k,
          line: [
            `Sold by ${mobName(source.mob!)}`,
            ...where,
            source.price !== undefined ? ` for ${formatCoins(source.price)}` : ''
          ],
          rooms
        });
        break;
      case 'container': {
        const [name] = objs[source.obj!] ?? [`object ${source.obj}`];

        lines.push({
          kind: source.k,
          line: [
            source.n ? `${source.n} at a time inside ` : 'Inside ',
            { text: plain(name), href: context.itemHref(source.obj!) },
            limitText(source)
          ]
        });
        break;
      }
      case 'script': {
        const when = triggerText[source.trig ?? ''] ?? '';
        let who: SourceLine;

        if (source.mob !== undefined) who = [`a script on ${mobName(source.mob)}`, ...where];
        else if (source.obj !== undefined) {
          const [name] = objs[source.obj] ?? [`object ${source.obj}`];

          who = ['a script on ', { text: plain(name), href: context.itemHref(source.obj) }];
        } else who = ['a script', ...where];
        lines.push({ kind: source.k, line: ['Made by ', ...who, when ? `, ${when}` : ''], rooms });
        break;
      }
      case 'quest':
        lines.push({
          kind: source.k,
          line: [
            source.qp
              ? `Bought from a questmaster for ${source.qp.toLocaleString('en-US')} quest points`
              : 'A quest item: a questmaster sends you to find it'
          ]
        });
        break;
      case 'random':
        lines.push({
          kind: source.k,
          line: [`A random drop: any mob of level 10 or more can carry it, about one reset in ${source.per!.toLocaleString('en-US')}`]
        });
        break;
      case 'code':
        lines.push({ kind: source.k, line: [`Made by ${codeLabel(source.fn!)}`] });
        break;
    }
  }
  return lines;
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
