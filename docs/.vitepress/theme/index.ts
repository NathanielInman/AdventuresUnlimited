import { defineAsyncComponent, type Component } from 'vue';
import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import { legacyToolHref } from './tools/lib/legacy-links';
import { ROUTE_CHANGE_EVENT } from './tools/lib/query-state';
import Layout from './Layout.vue';
import './custom.css';
import './tools/ui/tools.css';
import './tools/ui/mud-colors.css';

// Every .vue file directly in tools/ is a tool, registered globally under its
// file name, so a page only needs the tag: <DamageStrings /> in
// docs/tools/damage-strings.md. Each one loads as its own chunk when a page
// uses it, so the tools add nothing to the other pages. (A new tag also needs
// adding to MD033's allowed_elements in .markdownlint-cli2.jsonc.)
const tools = import.meta.glob<{ default: Component }>('./tools/*.vue');

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    for (const [path, load] of Object.entries(tools)) {
      app.component(path.replace(/^.*\/|\.vue$/g, ''), defineAsyncComponent(load));
    }

    if (import.meta.env.SSR) return;

    // Old calculator links (#/items?vnum=1) followed inside the site; the
    // inline script in config.mts handles them on a full page load
    router.onBeforeRouteChange = href => {
      const url = new URL(href, location.origin);
      const target = legacyToolHref(siteData.value.base, url.pathname, url.hash);

      if (target === null) return;
      router.go(target);
      return false;
    };

    // Lets the tools read their settings again when a link changes only the
    // query string, which VitePress handles without remounting the page
    router.onAfterRouteChange = () => {
      window.dispatchEvent(new Event(ROUTE_CHANGE_EVENT));
    };
  }
} satisfies Theme;
