# Calculators

The item search, damage strings, territory and housing calculators: a Vue 3 app (Pug templates, Stylus, PrimeVue 3) that the docs site serves at [/AdventuresUnlimited/tools/](https://nathanielinman.github.io/AdventuresUnlimited/tools/).

```sh
npm ci
npm start        # dev server at http://localhost:5173/
npm run build    # production build in dist/, base /AdventuresUnlimited/tools/
npm run preview  # serve the build at http://localhost:4173/AdventuresUnlimited/tools/
```

Set `TOOLS_BASE` to build for another path. The Pages workflow (`.github/workflows/pages.yml`) builds this app and copies `dist/` into the docs site as `tools/`.

Item data lives in `src/items/`, one JSON file per area file. Link to an item with `#/items?vnum=N&area=KEY`, where KEY is the JSON file's name without `.json`; the same vnum shows up in more than one area, and `area` picks the right one.
