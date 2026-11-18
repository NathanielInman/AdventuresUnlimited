// The tools, in menu order. config.mts builds the Tools nav menu and sidebar
// group from this list, and the overview page draws a card for each entry.
export interface ToolEntry {
  title: string;
  /** Site-relative link, as VitePress config wants it */
  link: string;
  summary: string;
}

export const toolCatalog: ToolEntry[] = [
  {
    title: 'Item search',
    link: '/tools/items',
    summary: 'Filter every object the game loads by type, slot, area and level, weight the stats you care about, see who carries or sells each one, and share a link to any item.'
  },
  {
    title: 'Damage strings',
    link: '/tools/damage-strings',
    summary: 'The damage range behind each combat message, for monks and for everyone else. Type a number or paste a line from combat to find its row.'
  },
  {
    title: 'Territory',
    link: '/tools/territory',
    summary: 'Paste your territory clan list and get back the areas nobody has conquered yet.'
  },
  {
    title: 'Housing',
    link: '/tools/housing',
    summary: 'Price a house or manor in diamonds and gold before you buy it. Every option lands in the URL, so you can send someone your exact build.'
  }
];
