// The old calculator wrote its whole filter state into every link:
//   #/items?levelRestriction=0&levelRestriction=100&showStaffs=true&...
//   &armorFilter=none&areaFilter=Eastern%20Moors&vnum=307&area=easternMoors
// vnum and area keep their names here. This reads the rest into the new
// names and returns the search string without the old keys.

import { typeGroups, type TypeGroup } from './model';

const showKeys: Record<string, TypeGroup> = {
  showArmor: 'armor',
  showWeapons: 'weapon',
  showStaffs: 'staff',
  showWands: 'wand',
  showPills: 'pill',
  showPotions: 'potion',
  showScrolls: 'scroll',
  showOther: 'other'
};

const filterKeys: Record<string, string> = {
  armorFilter: 'slot',
  weaponFilter: 'weapon',
  staffFilter: 'staff',
  wandFilter: 'wand',
  pillFilter: 'pill',
  potionFilter: 'potion',
  scrollFilter: 'scroll',
  otherFilter: 'other'
};

export interface LegacyQuery {
  /** New-style values to apply on top of the state */
  patch: Record<string, unknown>;
  /** The old area filter held the area's display name, not its key */
  areaName: string | null;
  /** location.search with the old keys removed */
  search: string;
}

export function readLegacyQuery(search: string): LegacyQuery | null {
  const params = new URLSearchParams(search);
  const patch: Record<string, unknown> = {};
  let areaName: string | null = null;
  let found = false;

  const levels = params.getAll('levelRestriction').map(Number).filter(Number.isFinite);

  if (params.has('levelRestriction')) {
    found = true;
    if (levels.length >= 2) patch.level = [Math.min(levels[0], levels[1]), Math.max(levels[0], levels[1])];
  }

  const shown = Object.keys(showKeys).filter(key => params.has(key));

  if (shown.length) {
    found = true;
    const types = typeGroups
      .map(group => group.value)
      .filter(group => {
        const key = Object.keys(showKeys).find(name => showKeys[name] === group)!;

        return params.get(key) !== 'false';
      });

    patch.types = types.length === typeGroups.length ? [] : types;
  }

  for (const [old, key] of Object.entries(filterKeys)) {
    if (!params.has(old)) continue;
    found = true;
    const value = params.get(old) ?? '';

    if (value && value !== 'none') patch[key] = value;
  }

  if (params.has('areaFilter')) {
    found = true;
    const value = params.get('areaFilter') ?? '';

    if (value && value !== 'none') areaName = value;
  }

  if (!found) return null;
  for (const key of ['levelRestriction', 'areaFilter', ...Object.keys(showKeys), ...Object.keys(filterKeys)]) {
    params.delete(key);
  }
  const rest = params.toString().replace(/%2C/gi, ',');

  return { patch, areaName, search: rest ? `?${rest}` : '' };
}
