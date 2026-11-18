// Motion helpers for the home page. Everything here runs only in the
// browser (inside onMounted or a directive hook), so the page still renders
// at build time, and every effect stands down for prefers-reduced-motion.
import { onBeforeUnmount, onMounted, type Directive, type Ref } from 'vue';

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Tells `onChange` whether `target` is worth animating: on screen (within
 * `rootMargin`) and in a visible tab. Called once on mount and again on
 * every change, so callers can start and stop their own loops.
 */
export function useActive(
  target: Ref<HTMLElement | null | undefined>,
  onChange: (active: boolean) => void,
  rootMargin = '0px'
) {
  let onScreen = false;
  let active: boolean | null = null;
  let observer: IntersectionObserver | null = null;

  const update = () => {
    const next = onScreen && !document.hidden;
    if (next === active) return;
    active = next;
    onChange(next);
  };

  onMounted(() => {
    const el = target.value;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      onScreen = true;
    } else {
      observer = new IntersectionObserver(entries => {
        onScreen = entries[entries.length - 1].isIntersecting;
        update();
      }, { rootMargin });
      observer.observe(el);
    }
    document.addEventListener('visibilitychange', update);
    update();
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    document.removeEventListener('visibilitychange', update);
  });
}

let revealObserver: IntersectionObserver | null = null;

/**
 * v-reveal: fades and lifts an element in the first time it scrolls into
 * view. Elements already on screen when the page loads are left alone, and
 * nothing is hidden before the script runs, so the page reads fine without
 * it. The binding value is an optional delay in milliseconds.
 */
export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    revealObserver ??= new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        revealObserver?.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8% 0px' });

    if (binding.value) el.style.setProperty('--au-reveal-delay', `${binding.value}ms`);
    el.classList.add('au-reveal');
    revealObserver.observe(el);
  },
  beforeUnmount(el) {
    revealObserver?.unobserve(el);
  }
};
