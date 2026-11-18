import { stripMudColors } from '../lib/mud-color';
import { territoryAreas, type TerritoryArea } from './areas';

// Reads what the game prints for `territory` (do_territory() in the MUD's
// src/guild.c). Every list prints one area per line as "[%3d] " plus the
// area's name; what follows depends on the command:
//
//   territory clan, as a member  [  1] Eastern Moors
//   territory clan, as a leader  [  1] Eastern Moors   <flag room> ( by <player> )
//   territory all                [  1] Eastern Moors
//   territory list (immortals)   [  1] Eastern Moors   <clan> ( <player> )
//
// Names are padded to 30 columns (25 for `all`), so a long name runs straight
// into what follows it. That's why names are matched against the known list
// rather than cut at a fixed column.

export type PasteKind = 'clan' | 'all' | 'list';

export interface Holding {
  area: TerritoryArea;
  /** Clan name, from `territory list` only */
  clan?: string;
  /** Who planted the flag (leaders and immortals see this) */
  by?: string;
  /** The room the flag stands in (leaders see this) */
  flagRoom?: string;
}

export interface ParsedTerritory {
  kind: PasteKind;
  /** Areas in the paste, keyed by area name */
  holdings: Map<string, Holding>;
  /** Names on numbered lines that aren't in the area list */
  unknown: string[];
  /** Numbered lines read */
  lineCount: number;
}

const byLength = [...territoryAreas].sort((a, b) => b.name.length - a.name.length);

function matchArea(rest: string): { area: TerritoryArea; tail: string } | null {
  const lower = rest.toLowerCase();

  for (const area of byLength) {
    const name = area.name.toLowerCase();

    if (lower.startsWith(name) && (lower.length === name.length || /\s/.test(lower[name.length]))) {
      return { area, tail: rest.slice(name.length).trim() };
    }
  }
  return null;
}

/** The name on a line nothing matched: up to the padding, or the whole line. */
function guessName(rest: string): string {
  const withoutOwner = rest.replace(/\(\s*(?:by\s+)?[^()]*\)\s*$/i, '');

  return withoutOwner.split(/\s{2,}/)[0].trim() || rest.trim();
}

export function parseTerritory(text: string): ParsedTerritory {
  const plain = stripMudColors(text);
  const kind: PasteKind = /Conquerable Areas/i.test(plain)
    ? 'all'
    : /Controlling Clan/i.test(plain)
      ? 'list'
      : 'clan';
  const holdings = new Map<string, Holding>();
  const unknown: string[] = [];
  let lineCount = 0;

  for (const line of plain.split(/\r?\n|\r/)) {
    const numbered = /^\s*\[\s*\d+\]\s?(.*)$/.exec(line);

    if (!numbered) continue;
    const rest = numbered[1].trim();

    if (!rest) continue;
    lineCount++;
    const match = matchArea(rest);

    if (!match) {
      const name = guessName(rest);

      if (!unknown.includes(name)) unknown.push(name);
      continue;
    }
    const { area, tail } = match;
    const holding: Holding = { area };
    const leader = /^(.*?)\s*\(\s*by\s+(.*?)\s*\)$/i.exec(tail);
    const immortal = /^(.*?)\s*\(\s*(.*?)\s*\)$/.exec(tail);

    if (kind === 'list' && immortal) {
      if (immortal[1].trim()) holding.clan = immortal[1].trim();
      if (immortal[2]) holding.by = immortal[2];
    } else if (leader) {
      if (leader[1]) holding.flagRoom = leader[1];
      if (leader[2]) holding.by = leader[2];
    }
    holdings.set(area.name, holding);
  }
  return { kind, holdings, unknown, lineCount };
}

const sampleAreas = [
  'Eastern Moors',
  'Woodfell Forest',
  'Hagarth',
  'The Bog of Durlah',
  'Darathorn\'s Pit',
  'Goblin Pass',
  'Necropolis',
  'Reskel',
  'The Hamlet of Elsfar',
  'Racomva',
  'Mines of Noal\'xyn',
  'Tekkit Hill'
];

/**
 * What a clan member sees for `territory clan`, built from the same format
 * strings as the game: a header, then "[%3d] %-30s" per area.
 */
export const sampleTerritory = [
  '      Area Name',
  '---------------',
  ...sampleAreas.map((name, i) => `[${String(i + 1).padStart(3)}] ${name.padEnd(30)}`)
].join('\n');
