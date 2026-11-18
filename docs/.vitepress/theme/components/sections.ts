// The site's top-level sections, keyed by the first folder of a page's path
// (or the page itself for the single-page ones). Each gets an emblem and a
// short line in the band above its pages' titles.

export type SectionId = 'guides' | 'world' | 'classes' | 'crafting' | 'tools' | 'quests' | 'combat';

export interface Section {
  id: SectionId;
  name: string;
  tagline: string;
}

const sections: Record<string, Section> = {
  guides: { id: 'guides', name: 'Guides', tagline: 'Routes, scripts and know-how' },
  world: { id: 'world', name: 'World', tagline: 'The lands of Tharel' },
  classes: { id: 'classes', name: 'Classes', tagline: 'Races, classes and their arts' },
  crafting: { id: 'crafting', name: 'Crafting', tagline: 'Ore, anvil and enchantment' },
  tools: { id: 'tools', name: 'Tools', tagline: 'Calculators and search' },
  'quests.md': { id: 'quests', name: 'Quests', tagline: 'Masters, tasks and rewards' },
  mechanics: { id: 'combat', name: 'Combat', tagline: 'How a fight is decided' }
};

/** The section a page belongs to, from VitePress's page.relativePath */
export function sectionOf(relativePath: string): Section | null {
  return sections[relativePath.split('/')[0]] ?? null;
}
