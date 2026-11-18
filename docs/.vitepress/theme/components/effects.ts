// The theme's client-side touches, run after each page renders:
// - a short fade in when the route changes (the first load uses CSS)
// - big blocks below the fold fade up as they scroll into view
// - markdown tables that fit their column stop being scroll boxes, so their
//   header row can stick under the nav; the rest get a scroll hint
// - looping art pauses while it is off screen or the tab is hidden
// Motion is skipped for prefers-reduced-motion; the tables are layout, so
// they run either way. Nothing here touches window at module load.

const REVEAL = [
  '.vp-doc > div > table',
  '.vp-doc > div > .custom-block',
  '.vp-doc > div > details',
  ".vp-doc > div > div[class*='language-']"
].join(',');

const TABLES = '.vp-doc > div > table';

export interface Effects {
  /** Run after a page's content is in the DOM; `navigated` is false on first load */
  refresh(navigated: boolean): void;
  destroy(): void;
}

export function createEffects(): Effects {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');

  const ambient = new IntersectionObserver(entries => {
    for (const entry of entries) entry.target.classList.toggle('au-paused', !entry.isIntersecting);
  });

  const pending = new Set<Element>();
  const show = (el: Element) => {
    el.classList.add('au-in');
    reveal.unobserve(el);
    pending.delete(el);
  };
  const reveal = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) show(entry.target);
  }, { rootMargin: '0px 0px -6% 0px' });

  // A fast scroll or a jump to an anchor can carry a block past the screen
  // between two observer checks, which would leave it hidden above the
  // reader; anything whose top has passed the bottom of the screen shows
  let catchUp = 0;
  const onScroll = () => {
    if (catchUp || !pending.size) return;
    catchUp = requestAnimationFrame(() => {
      catchUp = 0;
      for (const el of pending) if (el.getBoundingClientRect().top < window.innerHeight) show(el);
    });
  };

  const onVisibility = () => root.classList.toggle('au-tab-hidden', document.hidden);

  function fitTables() {
    // The speed leveling guide's alignment bar sticks under the nav too, so
    // table headers stick under it
    const bar = document.querySelector<HTMLElement>('.vp-doc .leveling-alignment');
    root.style.setProperty('--au-sticky-extra', bar ? `${bar.offsetHeight}px` : '0px');

    // Tables that still need a sideways scroll get .au-overflows: a hint over
    // them and a first column that stays put while they scroll
    const tables = [...document.querySelectorAll<HTMLElement>(TABLES)];
    for (const table of tables) table.classList.remove('au-fits', 'au-overflows');
    const fits = tables.map(table => table.scrollWidth <= table.clientWidth + 1);
    tables.forEach((table, i) => table.classList.add(fits[i] ? 'au-fits' : 'au-overflows'));
  }

  // Re-measure when the window resizes or a tool finishes loading and
  // changes the page's height, at most once a frame
  let frame = 0;
  const resized = new ResizeObserver(() => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(fitTables);
  });

  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('scroll', onScroll, { passive: true });
  resized.observe(document.body);
  onVisibility();

  return {
    refresh(navigated) {
      fitTables();

      ambient.disconnect();
      for (const el of document.querySelectorAll('[data-au-ambient]')) ambient.observe(el);

      reveal.disconnect();
      pending.clear();
      if (reduced.matches) return;

      if (navigated) {
        document.querySelector('.VPDoc .content-container')?.animate(
          [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }],
          { duration: 320, easing: 'cubic-bezier(.2, .8, .2, 1)' }
        );
      }

      const fold = window.innerHeight;
      for (const el of document.querySelectorAll(REVEAL)) {
        if (el.getBoundingClientRect().top < fold) continue;
        el.classList.add('au-reveal');
        pending.add(el);
        reveal.observe(el);
      }
    },
    destroy() {
      ambient.disconnect();
      reveal.disconnect();
      pending.clear();
      resized.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(catchUp);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('scroll', onScroll);
    }
  };
}
