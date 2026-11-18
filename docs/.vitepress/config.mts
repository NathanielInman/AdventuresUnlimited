import { defineConfig } from 'vitepress';

const base = '/AdventuresUnlimited/';
const repo = 'https://github.com/NathanielInman/AdventuresUnlimited';

// The calculators are a separate Vue app deployed under tools/. target: '_self'
// makes these full page loads instead of client-side routes, which would 404.
const tools = [
  { text: 'Item search', link: '/tools/#/items', target: '_self' },
  { text: 'Damage strings', link: '/tools/#/damageStrings', target: '_self' },
  { text: 'Territory', link: '/tools/#/territory', target: '_self' },
  { text: 'Housing', link: '/tools/#/home', target: '_self' }
];

// Before the docs site existed the calculators lived at the site root, so old
// bookmarks look like /AdventuresUnlimited/#/items?vnum=123. Send those on to
// the same hash under tools/.
const forwardOldToolLinks = `(function () {
  var b = '${base}', p = location.pathname;
  if (location.hash.indexOf('#/') === 0 && (p === b || p === b + 'index.html')) {
    location.replace(b + 'tools/' + location.hash);
  }
})();`;

export default defineConfig({
  title: 'Adventures Unlimited',
  description: 'Guides, reference tables and calculators for Adventures Unlimited, a fantasy MUD set in the world of Tharel.',
  lang: 'en-US',
  base,
  srcExclude: ['monk.md', 'tintin.md', 'speedleveling.md'],
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: `${base}favicon.ico` }],
    ['script', {}, forwardOldToolLinks]
  ],
  themeConfig: {
    nav: [
      { text: 'Guides', link: '/guides/speed-leveling', activeMatch: '^/guides/' },
      { text: 'World', link: '/world/areas', activeMatch: '^/world/' },
      { text: 'Classes', link: '/classes/', activeMatch: '^/classes/' },
      { text: 'Crafting', link: '/crafting/', activeMatch: '^/crafting/' },
      { text: 'Tools', items: tools }
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
      { text: 'Combat', link: '/mechanics/combat' }
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
