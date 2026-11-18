// Every area file in this folder, keyed by its basename (e.g. "easternMoors").
// The key is what #/items?vnum=N&area=KEY uses, since the same vnum can appear
// in more than one area file.
const files = import.meta.glob('./*.json', { eager: true, import: 'default' });

export const itemsMap = Object.fromEntries(
  Object.entries(files).map(([path, list]) => {
    const areaKey = path.slice(2, -'.json'.length);

    list.forEach(item => { item.areaKey = areaKey; });
    return [areaKey, list];
  })
);

export const items = Object.values(itemsMap).flat();
