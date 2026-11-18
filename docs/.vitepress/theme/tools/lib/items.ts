// Lazy access to the item data in ../data/items/*.json (one file per area,
// about 4 MB in all). The glob is not eager, so each file becomes its own
// chunk that is only fetched when one of these functions runs; nothing here
// lands in the docs bundle. Call them from onMounted, never during setup, so
// prerendering stays fast and other pages never pay for the data.

/** One item as the area files describe it. Numbers are mostly strings. */
export interface RawItem {
  name: string;
  /** Area display name, e.g. "Eastern Moors" */
  area: string;
  score: number;
  vnum: string;
  names: string[];
  /** Short description with color codes, e.g. "{YKi-Rin's Mace{x" */
  short: string;
  long: string;
  material: string[];
  submaterial: string[];
  itemType: string;
  extraflags: string[];
  wearFlags: string[];
  quality: number;
  rarity: string;
  oldowner: string;
  values: string[];
  /** e.g. "weapon class: (mace)", "damage : (4d12)" */
  valueFlags: string[];
  furniture: { maxPeople: string; maxWeight: string; healBonus: string; manaBonus: string; flags: string[] };
  level?: string;
  weight?: string;
  cost?: string;
  totalAllowed?: string;
  totalCurrent?: string;
  condition?: string | number;
  affects?: { name: string; amount: string }[];
  bugged?: boolean;
}

export interface Item extends RawItem {
  /** The area file's basename, e.g. "easternMoors". The same vnum can appear
   * in more than one file, so links use vnum plus areaKey. */
  areaKey: string;
}

const files = import.meta.glob<RawItem[]>('../data/items/*.json', { import: 'default' });

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
    cache.set(key, load().then(list => list.map(item => ({ ...item, areaKey: key }))));
  }
  return cache.get(key)!;
}

/** Every item in every area, in area key order. */
export async function loadAllItems(): Promise<Item[]> {
  const areas = await Promise.all(areaKeys.map(loadArea));

  return areas.flat();
}
