// Lazy access to the item data written by scripts/generate-items.mjs:
// ../data/items/*.json (one file per area, about 4.6 MB in all, everything
// identify knows) and ../data/item-index.json (one file, the few fields a
// list of items needs). The glob is not eager, so each area file becomes its
// own chunk that is only fetched when one of these functions runs, and the
// index is a plain asset fetched as JSON; nothing here lands in the docs
// bundle. Call them from onMounted, never during setup, so prerendering stays
// fast and other pages never pay for the data. The schema is in ../README.md.

import indexUrl from '../data/item-index.json?url';

/** [name, area key] for a mob, room or object a source names. */
export type Ref = [string, string];

export interface Source {
  /** floor, carried, worn, shop, container, script, quest, random or code */
  k: 'floor' | 'carried' | 'worn' | 'shop' | 'container' | 'script' | 'quest' | 'random' | 'code';
  /** Mob vnum: who carries, wears or sells it, or runs the script */
  mob?: number;
  /** Room vnums: where the object or the mob is reset, or the room that runs the script */
  rooms?: number[];
  /** Object vnum: the container it resets inside, or the object that runs the script */
  obj?: number;
  /** World limit on copies from this reset */
  max?: number;
  /** Copies put in each container */
  n?: number;
  /** Shop price, in the same units as cost */
  price?: number;
  /** Script trigger, e.g. "speech", "death" */
  trig?: string;
  /** Quest points it costs from a questmaster */
  qp?: number;
  /** An object a questmaster's quest sends you to find */
  target?: boolean;
  /** Random drops: about one mob reset in this many */
  per?: number;
  /** The C function that makes it */
  fn?: string;
}

/** One object as the game loads it, decoded the way identify prints it. */
export interface RawItem {
  vnum: number;
  /** Keywords (identify's "Object" line) */
  kw: string;
  /** Short description with color codes, e.g. "{YKi-Rin's Mace{x" */
  name: string;
  /** Long description, seen on the ground */
  desc?: string;
  /** identify's type name: "armor", "weapon", "drink", "room_key"... */
  type: string;
  level: number;
  /** Pounds as identify prints them (the area file's tenths, divided by 10) */
  lb: number;
  /** Value: 100 is one gold */
  cost: number;
  /** Material group, e.g. "metal" */
  mat?: string;
  /** Material identify prints, e.g. "steel" */
  sub?: string;
  /** Quality word, e.g. "standard" */
  qual: string | null;
  /** Condition word when not mint */
  cond?: string;
  /** Wear flags, take included */
  wear?: string[];
  /** Extra flags */
  flags?: string[];
  /** Most copies in the world at once */
  limit?: number;
  /** Percent chance a reset loads it */
  rarity?: number;
  owner?: string;
  /** Applies in identify's order: [name, modifier]; "weapon" applies carry weapon flags */
  apply?: [string, number | string][];
  /** Permanent affects, e.g. "haste", "detect_invis" */
  aff?: string[];
  weapon?: { class: string; dice: [number, number]; attack: string; dam: string; flags?: string[] };
  /** Armor class: pierce, bash, slash, magic */
  ac?: [number, number, number, number];
  /** Potions, pills, scrolls (level, spells) and wands, staves (plus charges, max) */
  magic?: { level: number; spells: string[]; charges?: number; max?: number };
  container?: { cap: number; maxw: number; flags?: string[]; key?: number; mult?: number };
  drink?: { liquid: string; color: string; max: number; left: number; poison?: boolean };
  /** Light: hours, or "infinite" */
  light?: number | 'infinite';
  furniture?: { people: number; maxw: number; heal: number; mana: number; flags?: string[] };
  /** identify's extra lines for the rarer types, e.g. [["Type", "ruby"], ["Uses", 3]] */
  info?: [string, string | number][];
  /** Raw values for types identify says nothing more about */
  val?: number[];
  /** Where the game puts it; missing when nothing does */
  src?: Source[];
  /** Every source is in an area players can't reach */
  unreachable?: true;
}

/** How players get to an area: by walking from a start room, only by special means, or not at all. */
export type Reach = 'walk' | 'special' | 'none';

export interface AreaFile {
  name: string;
  /** The area files behind it, e.g. ["eiren.are"] */
  files: string[];
  items: RawItem[];
  mobs: Record<string, Ref>;
  rooms: Record<string, Ref>;
  objs: Record<string, Ref>;
  /** Names of the areas the tables above point to */
  areas: Record<string, string>;
  reach: Reach;
  /** For special reach, the ways in, e.g. ["a portal in Naerlan"] */
  via?: string[];
  /** Keys in areas that players can't reach (optional) */
  unreachable?: string[];
}

/** The lookup tables an item's sources point into. */
export type Refs = Pick<AreaFile, 'mobs' | 'rooms' | 'objs' | 'areas' | 'unreachable'>;

export interface Item extends RawItem {
  /** The area's key, its JSON basename, e.g. "easternMoors" */
  areaKey: string;
  areaName: string;
  areaReach: Reach;
  /** How players get into the area, when it takes special means */
  areaVia?: string[];
  refs: Refs;
}

const files = import.meta.glob<AreaFile>('../data/items/*.json', { import: 'default' });

const loaders = new Map(
  Object.entries(files).map(([path, load]) => [path.replace(/^.*\/|\.json$/g, ''), load])
);

/** Every area key there is item data for, sorted. Costs nothing to call. */
export const areaKeys: string[] = [...loaders.keys()].sort();

const cache = new Map<string, Promise<Item[]>>();

/** One area's items, or an empty list for an unknown key. */
export function loadArea(key: string): Promise<Item[]> {
  const load = loaders.get(key);

  if (!load) return Promise.resolve([]);
  if (!cache.has(key)) {
    cache.set(
      key,
      load().then(area => {
        const refs: Refs = { mobs: area.mobs, rooms: area.rooms, objs: area.objs, areas: area.areas, unreachable: area.unreachable };

        return area.items.map(item => ({
          ...item,
          areaKey: key,
          areaName: area.name,
          areaReach: area.reach,
          areaVia: area.via,
          refs
        }));
      })
    );
  }
  return cache.get(key)!;
}

/** Every item in every area, in area key order. */
export async function loadAllItems(): Promise<Item[]> {
  const areas = await Promise.all(areaKeys.map(loadArea));

  return areas.flat();
}

/** The fields of an item that a list of items needs, from the index. */
export type IndexItem = Pick<RawItem, 'vnum' | 'kw' | 'name' | 'type' | 'level' | 'wear' | 'apply' | 'magic' | 'unreachable'> & {
  weapon?: { class: string; dice: [number, number] };
  areaKey: string;
  areaName: string;
  areaReach: Reach;
  /** Some reset, shop, script, quest or code puts it in the world */
  placed: boolean;
};

interface IndexFile {
  /** [key, name, reach] for each area, sorted by key */
  areas: [string, string, Reach][];
  /** Index items with `a`, the area's position in areas, `p: 0` when not placed and `u: 1` when unreachable */
  items: (Omit<IndexItem, 'areaKey' | 'areaName' | 'areaReach' | 'placed' | 'unreachable'> & { a: number; p?: 0; u?: 1 })[];
}

export interface IndexArea {
  name: string;
  reach: Reach;
}

export interface ItemIndex {
  /** Area key to name and reach, sorted by key */
  areas: Map<string, IndexArea>;
  items: IndexItem[];
}

let index: Promise<ItemIndex> | null = null;

/** Every item, slimmed down for lists: one request of about 300 KB compressed. */
export function loadItemIndex(): Promise<ItemIndex> {
  index ??= fetch(indexUrl)
    .then(response => {
      if (!response.ok) throw new Error(`${indexUrl}: ${response.status}`);
      return response.json() as Promise<IndexFile>;
    })
    .then(data => {
      // Filled in place: copying 11,000 objects costs more than it's worth
      const items = data.items as unknown as (IndexItem & { a: number; p?: 0; u?: 1 })[];

      for (const item of items) {
        [item.areaKey, item.areaName, item.areaReach] = data.areas[item.a];
        item.placed = item.p !== 0;
        if (item.u) item.unreachable = true;
      }
      return { areas: new Map(data.areas.map(([key, name, reach]) => [key, { name, reach }])), items };
    })
    .catch(error => {
      index = null;
      throw error;
    });
  return index;
}
