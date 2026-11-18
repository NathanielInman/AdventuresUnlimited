import { onBeforeUnmount, onMounted, reactive, ref, watch, type Ref } from 'vue';

// Keeps a tool's settings in the query string, so any view can be shared by
// copying the address bar.
//
//   const { state, reset, hrefFor } = useQueryState({
//     vnum: '', area: '', level: [0, 110], showArmor: true, page: 1
//   });
//
// The defaults set each key's type: string, number, boolean, number[] or
// string[] (an empty array default means string[]). Server rendering and the
// first client render use the defaults; on mount the state is read from
// location.search. After that every change is written back with
// history.replaceState (debounced), and keys still at their default are left
// out of the URL. Unknown query keys are kept as they are.
//
// Arrays are written comma-separated (level=10,50) and read from either form,
// so old links with repeated keys (level=10&level=50) still work.
//
// Navigation: plain links such as <a :href="hrefFor({ vnum: '307' })"> work.
// VitePress handles the click without a reload, and the theme announces the
// route change (see theme/index.ts), so the state is read from the URL
// again. The browser's back button does the same. Use set(patch, { push:
// true }) to change state and add a history entry from code.

export type QueryValue = string | number | boolean | number[] | string[];
export type QueryDefaults = Record<string, QueryValue>;

/** Event the theme fires after each client-side route change. */
export const ROUTE_CHANGE_EVENT = 'au-tools:route-change';

const WRITE_DELAY = 250;

export interface QueryState<T extends QueryDefaults> {
  /** Reactive settings. Bind controls straight to its keys. */
  state: T;
  /** True once the URL has been read on the client. */
  ready: Ref<boolean>;
  /** Put every key back to its default. */
  reset: () => void;
  /** Change several keys at once; push adds a history entry. */
  set: (patch: Partial<T>, options?: { push?: boolean }) => void;
  /** A relative href ("?vnum=307") for the current state with patch applied. */
  hrefFor: (patch: Partial<T>) => string;
}

function clone<T extends QueryDefaults>(defaults: T): T {
  const copy = {} as T;

  for (const key in defaults) {
    const value = defaults[key];

    copy[key] = (Array.isArray(value) ? [...value] : value) as T[typeof key];
  }
  return copy;
}

function parseValue(fallback: QueryValue, raw: string[]): QueryValue {
  if (Array.isArray(fallback)) {
    const parts = raw.flatMap(value => value.split(',')).filter(value => value !== '');
    const numeric = fallback.length > 0 && typeof fallback[0] === 'number';

    if (!numeric) return parts;
    const numbers = parts.map(Number);

    return numbers.every(Number.isFinite) ? numbers : [...(fallback as number[])];
  }
  const value = raw[raw.length - 1];

  if (typeof fallback === 'number') {
    const number = Number(value);

    return value !== '' && Number.isFinite(number) ? number : fallback;
  }
  if (typeof fallback === 'boolean') {
    if (value === 'true' || value === '1') return true;
    if (value === 'false' || value === '0') return false;
    return fallback;
  }
  return value;
}

function serialize(value: QueryValue): string {
  return Array.isArray(value) ? value.join(',') : String(value);
}

function sameValue(a: QueryValue, b: QueryValue): boolean {
  return serialize(a) === serialize(b);
}

/** Read the settings from a query string, falling back to the defaults. */
export function parseQuery<T extends QueryDefaults>(defaults: T, search: string): T {
  const params = new URLSearchParams(search);
  const result = clone(defaults);

  for (const key in defaults) {
    const raw = params.getAll(key);

    if (raw.length) result[key] = parseValue(defaults[key], raw) as T[typeof key];
  }
  return result;
}

/** The query string for some settings, keeping unrelated keys from search. */
export function buildQuery<T extends QueryDefaults>(
  defaults: T,
  values: T,
  search = ''
): string {
  const params = new URLSearchParams(search);

  for (const key in defaults) {
    params.delete(key);
    if (!sameValue(values[key], defaults[key])) params.set(key, serialize(values[key]));
  }
  // Commas are safe in a query string and much easier to read than %2C
  const query = params.toString().replace(/%2C/gi, ',');

  return query ? `?${query}` : '';
}

export function useQueryState<T extends QueryDefaults>(defaults: T): QueryState<T> {
  const state = reactive(clone(defaults)) as T;
  const ready = ref(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  const currentSearch = () => (import.meta.env.SSR ? '' : location.search);

  const write = (push = false) => {
    clearTimeout(timer);
    const url = location.pathname + buildQuery(defaults, state, location.search) + location.hash;

    if (url === location.pathname + location.search + location.hash) return;
    if (push) {
      // VitePress keeps the scroll position in history.state; save it the way
      // its own router does before adding the entry
      history.replaceState({ ...history.state, scrollPosition: window.scrollY }, '');
      history.pushState({}, '', url);
    } else {
      history.replaceState(history.state, '', url);
    }
  };

  const read = () => {
    Object.assign(state, parseQuery(defaults, location.search));
  };

  const stopWatch = watch(
    () => serialize(Object.values(state).map(serialize)),
    () => {
      if (!ready.value) return;
      clearTimeout(timer);
      timer = setTimeout(() => write(), WRITE_DELAY);
    }
  );

  onMounted(() => {
    read();
    ready.value = true;
    window.addEventListener('popstate', read);
    window.addEventListener(ROUTE_CHANGE_EVENT, read);
  });

  onBeforeUnmount(() => {
    stopWatch();
    // A pending write would land on the next page's URL
    clearTimeout(timer);
    window.removeEventListener('popstate', read);
    window.removeEventListener(ROUTE_CHANGE_EVENT, read);
  });

  return {
    state,
    ready,
    reset: () => Object.assign(state, clone(defaults)),
    set: (patch, options = {}) => {
      Object.assign(state, patch);
      if (options.push && ready.value) write(true);
    },
    hrefFor: patch => {
      const next = { ...clone(state), ...patch } as T;

      return buildQuery(defaults, next, currentSearch()) || '?';
    }
  };
}
