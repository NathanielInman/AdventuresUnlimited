# Tools

How the calculators under `docs/tools/` are built. `DamageStrings.vue` is the reference: copy its shape.

## A tool page

1. The page, `docs/tools/<name>.md`: an `# H1`, a short intro in plain prose, the component tag, and any notes after it. Add `aside: false` front matter when the tool wants the full width.
2. The component, `theme/tools/<ToolName>.vue`. Every `.vue` file directly in this folder is registered globally under its file name as an async component (see `theme/index.ts`), so the page only needs `<ToolName />`. Each loads as its own chunk, only on pages that use it.
3. Add the tag to MD033's `allowed_elements` in `.markdownlint-cli2.jsonc`. `ItemSearch`, `TerritoryCalculator` and `HousingCalculator` are already there; use those names or add yours.
4. The nav menu, the sidebar group and the overview cards come from `lib/catalog.ts`. Links are `/tools/<name>`; the site doesn't use clean URLs, so the built page is `tools/<name>.html`.

Wrap the component in `<div class="au-tool">` (spacing and the focus ring). Plain `<script setup lang="ts">` and scoped CSS with VitePress tokens (`--vp-c-bg-soft`, `--vp-c-divider`, `--vp-c-brand-1`, `--vp-c-text-2`, `--vp-font-family-mono`). Results update live; no submit buttons. Pages are prerendered, so touch `window`, `location` or `document` only in `onMounted` or event handlers.

## UI kit (`ui/`)

`import { ToolPanel, FieldGrid, NumberField } from './ui';`. All fields take `label` (tied to the input) and optional `hint`, and work with `v-model`.

| Component | Props | Notes |
| --- | --- | --- |
| `ToolPanel` | `title?`, `description?`, `as?` (`h2`) | Card. Slot `#actions` puts buttons top right. Children stack 20px apart |
| `FieldGrid` | `min?` (`12rem`) | Responsive columns for fields. Give a wide field `style="grid-column: 1 / -1"` |
| `NumberField` | `modelValue: number`, `min?`, `max?`, `step?`, `unit?` | Clamps to the range on blur |
| `SelectField` | `modelValue`, `options: (string \| number \| { label, value })[]` | Native select |
| `SegmentedField` | same as SelectField, `hideLabel?` | Two to four choices as a button row (radio group) |
| `CheckField` | `modelValue: boolean`, `switch?` | Checkbox, or on/off switch with `switch` |
| `RangeField` | `modelValue`, `min`, `max`, `step?`, `unit?`, `format?` | Slider with the value beside the label |
| `LevelRangeField` | `modelValue: [min, max]`, `label?` (`Level`), `min?` (0), `max?` (110) | Two number boxes and a two-thumb slider. Needs about 16rem; give it a full row |
| `TextAreaField` | `modelValue: string`, `rows?`, `mono?`, `readonly?`, `placeholder?` | For pasted game output |
| `StatReadout` | `label`, `value: number \| string`, `unit?`, `primary?` | Big total: "19,285 diamonds". Put several in `<div class="au-stats">` |
| `DataTable` | `columns`, `rows`, `rowKey`, `caption`, `sort?` / `v-model:sort`, `maxHeight?` (`32rem`), `highlight?`, `showCaption?`, `emptyText?` | Sorts on header click, scrolls in its own box with a pinned header. Column: `{ key, label, align?, sortable?, sortValue?, format?, width?, nowrap? }`. Right-align numbers. Custom cells: `<template #cell-<key>="{ row, value }">`. `ref.scrollToRow(key)` |
| `CopyLinkButton` | `label?` | Copies the address bar, which holds the state |
| `MudText` | `text` | Renders AU color codes |

Buttons: `<button class="au-button">` (add `brand` for the main one). `au-visually-hidden` hides text but keeps it for screen readers. A highlight or a selected state needs a shape or text as well as a color (`DataTable` adds a left bar).

## Shared logic (`lib/`)

- `query-state.ts`: `const { state, ready, reset, set, hrefFor } = useQueryState({ vnum: '', level: [0, 110], showArmor: true })`. Defaults set each key's type (string, number, boolean, number[], string[]). SSR renders the defaults; on mount the URL wins; changes are written back with `history.replaceState`, leaving defaults out of the URL. Arrays read `a=1,2` and old `a=1&a=2`. Links like `<a :href="hrefFor({ vnum: '307' })">` work without a reload, and so does the back button. `set(patch, { push: true })` adds a history entry. Keep the old app's query names so old links keep working.
- `format.ts`: `formatNumber(19285)` "19,285", `formatSigned(6)` "+6", `formatCount(2, 'diamond')`, `formatRange(1, 5)` "1-5".
- `mud-color.ts`: `parseMudColors(text)` gives `{ text, code, className }` segments; `stripMudColors(text)` gives the plain text. Lowercase codes are normal colors, uppercase bright (bold), `{D` dark grey, `{x` resets, `{{` is a literal brace, per `colour()` in the MUD's `src/comm.c`. Colors live in `ui/mud-colors.css`, tuned for both themes.
- `items.ts`: `loadAllItems(): Promise<Item[]>` and `loadArea(key)`, each item with `areaKey` (the JSON basename), `areaName` and `refs` (its file's lookup tables). `areaKeys` lists the keys without loading anything. The JSON in `data/items/` loads lazily, one chunk per area, so call these from `onMounted` and show a loading state until they resolve. The data's shape is below.
- `catalog.ts`: the tool list. `legacy-links.ts`: maps old `#/items?...` links to the new pages (used in config and the theme).

## Item data

`data/items/*.json` is written by `scripts/generate-items.mjs`; never edit it by hand. Run `node scripts/generate-items.mjs ~/Sites/adventuresunlimited-code` after the MUD's areas change. It boots the files in `area/area.lst` in order with the same parsing rules as the C loader (`src/db.c`, `src/db2.c`), takes the flag, apply, spell and type names from the C tables, and writes one file per area, keyed by the camelCase of the area's name. Two area files with the same name (Naerlan Housing, Manor Houses of Tharel) share a key. Vnums are unique across the data, as the game requires.

Each file is `{ name, files, items, mobs, rooms, objs, areas }`. `mobs`, `rooms` and `objs` map a vnum to `[name, areaKey]` for whatever this file's sources mention, and `areas` maps those keys to area names. An item has these keys; the ones marked "optional" are left out when empty or at the usual value:

| Key | What it holds |
| --- | --- |
| `vnum`, `level` | Numbers |
| `kw` | Keywords, identify's "Object" line |
| `name`, `desc` | Short description and the long one seen on the ground (optional), with color codes |
| `type` | identify's type name: `armor`, `weapon`, `drink`, `room_key`... |
| `lb` | Weight in pounds as identify prints it: the area file's tenths of a pound divided by 10, rounded down |
| `cost` | Value, 100 to the gold. A shop copy is worth exactly this; a copy off a mob is worth a little less |
| `mat`, `sub` | Material group and the material identify prints (optional) |
| `qual` | Quality word (`masterful` down to `crude`) |
| `cond` | Condition word when not `mint` (optional) |
| `wear`, `flags` | Wear flags (with `take`) and extra flags by name (optional) |
| `limit` | Most copies in the world (optional, unlimited when missing) |
| `rarity` | Percent chance a reset loads it (optional) |
| `apply` | `[name, modifier]` pairs in identify's order, names from `apply_flags` (`hp`, `savingrod`, `dam-bonus`...). A `weapon` apply's modifier is the weapon flags it adds (optional) |
| `aff` | Permanent affects from the affect bitvectors, e.g. `haste`, `detect_invis` (optional) |
| `weapon` | `{ class, dice: [count, sides], attack, dam, flags? }`: attack noun and damage class from `attack_table` |
| `ac` | Armor class `[pierce, bash, slash, magic]` |
| `magic` | `{ level, spells }` for potions, pills and scrolls; wands and staves add `charges` and `max`. Unknown and `reserved` spells are dropped |
| `container` | `{ cap, maxw, flags?, key?, mult? }`: capacity (value 0), maximum weight (value 3), key vnum, weight multiplier when not 100 |
| `drink` | `{ liquid, color, max, left, poison? }` for drink containers and fountains |
| `light` | Hours, or `"infinite"` for -1 and 999 |
| `furniture` | `{ people, maxw, heal, mana, flags? }` |
| `info` | `[label, value]` pairs for the extra lines identify prints for gems, jewelry, runes, lockpicks and the like |
| `val` | The five raw values, for types identify says nothing more about |
| `src` | Where to find it (optional, missing when nothing places it) |

A source is `{ k, ... }`:

| `k` | Other keys |
| --- | --- |
| `floor` | `rooms` |
| `carried`, `worn` | `mob`, `rooms` (where the mob resets), `max` (the reset's world limit) |
| `shop` | `mob`, `rooms`, `price` (what the shop asks, same units as `cost`) |
| `container` | `obj` (the container's vnum), `n` (copies per container), `max` |
| `script` | `trig` and one of `mob` (plus `rooms`), `obj` or `rooms`: a mob program with `mob oload`, run directly or through `mob call` |
| `quest` | `qp` (a questmaster sells it) or `target: true` (a quest sends you to find it) |
| `random` | `per`: about one mob reset in this many carries it (`random_eq` in `src/db.c`) |
| `code` | `fn`: the C function that creates it, like `spell_create_food` |

## Checking your work

```sh
lowprio npm run docs:build && npx markdownlint-cli2
lowprio npx vitepress preview docs --port 4321   # restart it after each build
```

Screenshots: install `playwright-core` in your scratch dir (not the repo) and drive the system Chrome at `/usr/bin/google-chrome-stable`. Shoot 1280 and 375 wide, light and dark (`colorScheme` plus `localStorage['vitepress-theme-appearance']`), check `document.documentElement.scrollWidth - innerWidth` is 0, and look at every image.
