// Site links as VitePress config writes them ('/tools/items', '/classes/'),
// turned into the file the build writes. The site has no clean URLs, so a
// page needs its .html; pass the result through withBase.
export function pageHref(link: string): string {
  return link.endsWith('/') ? link : `${link}.html`;
}
