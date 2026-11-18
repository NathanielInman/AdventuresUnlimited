// Numbers for the home page, counted at build time from the pages and data
// they describe, so they stay true as those change. VitePress runs load()
// in Node during the build and ships only the returned object; the item
// index itself never reaches the browser from here.
import { readFileSync } from 'node:fs';
import { defineLoader } from 'vitepress';

export interface HomeStats {
  /** Objects in the item search (data/item-index.json) */
  items: number;
  /** Rows in the areas table (world/areas.md) */
  areas: number;
  /** Races and classes in the table on classes/index.md */
  races: number;
  classes: number;
  /** Rows in the skills and spells tables */
  skills: number;
  spells: number;
}

declare const data: HomeStats;
export { data };

const files = {
  items: '../tools/data/item-index.json',
  areas: '../../../world/areas.md',
  classes: '../../../classes/index.md',
  skills: '../../../classes/skills.md',
  spells: '../../../classes/spells.md'
};

/** Body rows of the first markdown table on a page (header and divider left out). */
function tableRows(markdown: string): string[][] {
  const lines = markdown.split('\n');
  const start = lines.findIndex((line, i) => line.startsWith('|') && /^\|\s*:?-+/.test(lines[i + 1] ?? ''));
  if (start < 0) return [];
  const rows: string[][] = [lines[start].split('|').slice(1, -1)];
  for (const line of lines.slice(start + 2)) {
    if (!line.startsWith('|')) break;
    rows.push(line.split('|').slice(1, -1));
  }
  return rows;
}

export default defineLoader({
  watch: Object.values(files),
  load(watched): HomeStats {
    const read = (key: keyof typeof files) => {
      const name = files[key].replace(/^(\.\.\/)+/, '');
      const path = watched.find(file => file.endsWith(name));
      if (!path) throw new Error(`stats.data.ts: ${files[key]} is missing`);
      return readFileSync(path, 'utf8');
    };
    const count = (key: keyof typeof files) => tableRows(read(key)).length - 1;
    const races = tableRows(read('classes'));

    return {
      items: (JSON.parse(read('items')) as { items: unknown[] }).items.length,
      areas: count('areas'),
      races: races.length - 1,
      classes: races[0].length - 1,
      skills: count('skills'),
      spells: count('spells')
    };
  }
});
