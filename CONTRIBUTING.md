# Contributing

Corrections are the most useful thing you can send. The game changes, the snapshot these pages came from is old, and I can't check every number myself.

## Reporting a wrong number

[Open a data correction](https://github.com/NathanielInman/AdventuresUnlimited/issues/new?template=data-correction.yml) with the page, what it says now, what it should say and how you checked it in game. The command you typed and what the game printed beats "I think this is wrong". If you'd rather fix it yourself, every page on the docs site has an edit link at the bottom that opens a pull request.

## Writing style

Pages follow these rules:

- Sentence-case headings. Area, city, NPC, class and race names keep the game's capitals.
- No hand-written tables of contents. GitHub and the docs site build their own outlines.
- Tables: right-align numbers (`---:`), center checkmarks (`:---:`), one empty marker (`-`) per table, thousands separators from 1,000 up, and units in the header ("Cost (gold)") rather than every cell. Don't pad table source with alignment spaces.
- Directions and speedwalks go in code spans: `4e9n5w`. They start from Market Square in Naerlan.
- Callouts use GitHub alerts (`> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`).
- `<details>` is only for secondary material like long URL lists or script bodies, never a main table.
- Code fences always name a language: `text` for TinTin++, `sh` for shell.
- Link between pages with relative paths (`../world/areas.md#hagarth`) so they work on GitHub and the docs site. Areas have anchors: the name lowercased, a leading "The" and apostrophes dropped, everything else turned into hyphens.
- Keep `{{` and `}}` inside code spans or fences, and don't write a bare `<` outside code. VitePress treats both as markup and the build breaks.
- No em or en dashes. Use a hyphen, a colon or parentheses.

`npx markdownlint-cli2` and the link checker run on every push and pull request, so most of this gets caught for you.

## Running the site locally

You need Node 22 or newer.

```sh
npm ci
npm run docs:dev      # docs at http://localhost:5173/AdventuresUnlimited/
npm run docs:build    # what CI deploys
npx markdownlint-cli2 # lint README.md and docs/
```

The calculators are docs pages too: each one is a Vue component in `docs/.vitepress/theme/tools/`, and [its README](docs/.vitepress/theme/tools/README.md) explains how they fit together.
