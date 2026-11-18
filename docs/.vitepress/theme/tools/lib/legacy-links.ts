// The calculators used to be a hash-routed app, first at the site root and
// then under tools/, so old links look like /AdventuresUnlimited/#/items?vnum=1
// or /AdventuresUnlimited/tools/#/home?isPublic=true. This maps one of those to
// its page here, keeping the query, or returns null if it isn't an old link.
//
// config.mts inlines this function into every page's <head> with toString(),
// so it has to stay self-contained: no imports, no outside variables.
export function legacyToolHref(base: string, pathname: string, hash: string): string | null {
  if (hash.indexOf('#/') !== 0) return null;
  const path = pathname.replace(/index\.html$/, '');

  if (path !== base && path !== base + 'tools/') return null;
  const pages: Record<string, string> = {
    items: 'items.html',
    damageStrings: 'damage-strings.html',
    territory: 'territory.html',
    home: 'housing.html'
  };
  const route = hash.slice(2);
  const split = route.indexOf('?');
  const name = split < 0 ? route : route.slice(0, split);
  const query = split < 0 ? '' : route.slice(split);
  const page = Object.prototype.hasOwnProperty.call(pages, name) ? pages[name] : '';

  return base + 'tools/' + page + query;
}
