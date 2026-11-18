import { defineConfig } from 'vitepress';
import { toolCatalog } from './theme/tools/lib/catalog';
import { legacyToolHref } from './theme/tools/lib/legacy-links';
import { tablePlugin } from './markdown';

const base = '/AdventuresUnlimited/';
const repo = 'https://github.com/NathanielInman/AdventuresUnlimited';

// Nav menu and sidebar group for the tools, from the same list the tools
// overview page draws its cards from
const tools = [
  { text: 'Overview', link: '/tools/' },
  ...toolCatalog.map(tool => ({ text: tool.title, link: tool.link }))
];

// The calculators used to be a hash-routed app (/#/items?vnum=123, later
// /tools/#/items?vnum=123). This runs first on every page and sends those old
// links on to the tool's page with the same query. Links followed inside the
// site are handled by the router hook in theme/index.ts.
const forwardOldToolLinks = `(function () {
  var target = (${legacyToolHref.toString()})('${base}', location.pathname, location.hash);
  if (target) location.replace(target);
})();`;

export default defineConfig({
  title: 'Adventures Unlimited',
  description: 'Guides, reference tables and calculators for Adventures Unlimited, a fantasy MUD set in the world of Tharel.',
  lang: 'en-US',
  base,
  srcExclude: ['monk.md', 'tintin.md', 'speedleveling.md'],
  lastUpdated: true,
  markdown: {
    config: md => {
      md.use(tablePlugin);
    }
  },
  head: [
    ['link', { rel: 'icon', href: `${base}logo.svg`, type: 'image/svg+xml' }],
    ['link', { rel: 'icon', href: `${base}favicon.ico`, sizes: '32x32' }],
    ['meta', { name: 'theme-color', content: '#14203a' }],
    // Cinzel for display type and JetBrains Mono for code, as in the README
    // banner. display=swap keeps text visible while they load.
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap'
    }],
    ['script', {}, forwardOldToolLinks]
  ],
  themeConfig: {
    logo: { src: '/logo.svg', alt: '' },
    nav: [
      { text: 'Guides', link: '/guides/speed-leveling', activeMatch: '^/guides/' },
      { text: 'World', link: '/world/areas', activeMatch: '^/world/' },
      { text: 'Classes', link: '/classes/', activeMatch: '^/classes/' },
      { text: 'Crafting', link: '/crafting/', activeMatch: '^/crafting/' },
      { text: 'Tools', items: tools, activeMatch: '^/tools/' }
    ],
    sidebar: [
      {
        text: 'Guides',
        items: [
          { text: 'Speed leveling', link: '/guides/speed-leveling' },
          { text: 'Monk', link: '/classes/monk' },
          {
            text: 'TinTin++',
            link: '/guides/tintin/',
            collapsed: false,
            items: [
              { text: 'Crafting loops', link: '/guides/tintin/crafting-loops' },
              { text: 'Training loops', link: '/guides/tintin/training-loops' }
            ]
          }
        ]
      },
      {
        text: 'World',
        items: [
          { text: 'Areas', link: '/world/areas' },
          { text: 'Trainers', link: '/world/trainers' },
          { text: 'Temples', link: '/world/temples' },
          { text: 'Entitlement and housing', link: '/world/housing' },
          { text: 'Pets', link: '/world/pets' }
        ]
      },
      {
        text: 'Classes',
        items: [
          { text: 'Races and classes', link: '/classes/' },
          { text: 'Max stats', link: '/classes/max-stats' },
          { text: 'Skills', link: '/classes/skills' },
          { text: 'Spells', link: '/classes/spells' },
          { text: 'Specializations', link: '/classes/specializations' },
          { text: 'Monk', link: '/classes/monk' }
        ]
      },
      {
        text: 'Crafting',
        items: [
          { text: 'Tradesguilds', link: '/crafting/' },
          { text: 'Materials', link: '/crafting/materials' },
          { text: 'Weapon effects', link: '/crafting/weapon-effects' }
        ]
      },
      { text: 'Quests', link: '/quests' },
      { text: 'Combat', link: '/mechanics/combat' },
      { text: 'Tools', items: tools }
    ],
    outline: { level: [2, 3] },
    search: { provider: 'local' },
    editLink: {
      pattern: `${repo}/edit/master/docs/:path`,
      text: 'Suggest a change to this page'
    },
    lastUpdated: { text: 'Last updated' },
    socialLinks: [{ icon: 'github', link: repo }],
    footer: {
      message: 'A fan project, not affiliated with the game\'s staff. Released under the MIT License.',
      copyright: 'Copyright © 2020-2026 Nathaniel Inman'
    }
  }
});
