// The home page's ways in, one illustrated card each. The tools come from the
// same catalog as the Tools menu and the tools overview, so a new tool shows
// up here with its title and summary; it only needs an icon below.
import { toolCatalog } from '../tools/lib/catalog';

export type IconName =
  | 'summit' | 'staff' | 'terminal'
  | 'search' | 'slash' | 'banner' | 'house'
  | 'compass' | 'blades' | 'anvil' | 'chest';

export interface Entry {
  title: string;
  link: string;
  summary: string;
  icon: IconName;
}

export interface EntryGroup {
  id: string;
  title: string;
  blurb: string;
  entries: Entry[];
}

const toolIcons: Record<string, IconName> = {
  '/tools/items': 'search',
  '/tools/damage-strings': 'slash',
  '/tools/territory': 'banner',
  '/tools/housing': 'house'
};

export const entryGroups: EntryGroup[] = [
  {
    id: 'guides',
    title: 'Guides',
    blurb: 'Routes and setups from people who have played them.',
    entries: [
      {
        title: 'Speed leveling',
        link: '/guides/speed-leveling',
        summary: 'Where to level and what to wear at each stage from 1 to hero, for good, neutral and evil characters.',
        icon: 'summit'
      },
      {
        title: 'Monk',
        link: '/classes/monk',
        summary: 'Mantras, fightstyles, stances, techniques and the combos that tie them together.',
        icon: 'staff'
      },
      {
        title: 'TinTin++',
        link: '/guides/tintin/',
        summary: 'Prompts, logging, and the crafting and training loops for the TinTin++ client.',
        icon: 'terminal'
      }
    ]
  },
  {
    id: 'tools',
    title: 'Tools',
    blurb: 'Calculators that keep their settings in the link, so you can share what you see.',
    entries: toolCatalog.map(tool => ({
      title: tool.title,
      link: tool.link,
      summary: tool.summary,
      icon: toolIcons[tool.link] ?? 'search'
    }))
  },
  {
    id: 'world',
    title: 'Reference',
    blurb: 'The world, the classes and the trades, with directions from Market Square.',
    entries: [
      {
        title: 'Areas',
        link: '/world/areas',
        summary: 'Every area by level, with speedwalks from Market Square and which ones you can mine.',
        icon: 'compass'
      },
      {
        title: 'Classes',
        link: '/classes/',
        summary: 'Which race can take which class, max stats, and the level each skill and spell arrives.',
        icon: 'blades'
      },
      {
        title: 'Crafting',
        link: '/crafting/',
        summary: 'Where the tradesguilds are, material qualities, and the poisons, runes and effects a weapon can carry.',
        icon: 'anvil'
      },
      {
        title: 'Quests',
        link: '/quests',
        summary: 'Quest masters by alignment and level, the quest items, and what your quest points buy.',
        icon: 'chest'
      }
    ]
  }
];
