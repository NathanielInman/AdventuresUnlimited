<script setup lang="ts">
import { computed, nextTick, useId, watch, ref } from 'vue';
import { damageRows, type DamageRow } from './damage-strings-data';
import { formatNumber, formatRange } from './lib/format';
import { stripMudColors } from './lib/mud-color';
import { useQueryState } from './lib/query-state';
import { CopyLinkButton, DataTable, MudText, SegmentedField, ToolPanel, type Column } from './ui';

type Kind = 'normal' | 'monk';

const { state } = useQueryState({ q: '', show: 'both' });

const showOptions = [
  { label: 'Both', value: 'both' },
  { label: 'Most classes', value: 'normal' },
  { label: 'Monk', value: 'monk' }
];

const kindName: Record<Kind, string> = { normal: 'most classes', monk: 'a monk' };

// What to look for in a pasted line: each message as a player reads it, and
// its main word on its own ("DEMOLISHES" out of "*** DEMOLISHES ***"), so
// typing just the verb works too
const longestWord = (text: string) =>
  (text.match(/[A-Za-z]+/g) ?? []).reduce((a, b) => (b.length > a.length ? b : a), '');

const patterns = damageRows.flatMap(row =>
  (['normal', 'monk'] as Kind[]).flatMap(kind =>
    [row[kind].others, row[kind].you].flatMap(message => {
      const plain = stripMudColors(message).trim();
      const word = longestWord(plain);

      return [plain, ...(word === plain ? [] : [word])].map(text => ({ row, kind, message, text }));
    })
  )
);

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const rowFor = (damage: number) =>
  damageRows.find(row => damage >= row.min && damage <= row.max) ?? null;

interface Lookup {
  damage: number | null;
  /** The message that matched, with its color codes */
  phrase: string | null;
  matches: { row: DamageRow; kind: Kind }[];
}

const lookup = computed<Lookup | null>(() => {
  const query = stripMudColors(state.q).trim();

  if (!query) return null;
  if (/^[\d,]+$/.test(query)) {
    const damage = Number(query.replace(/,/g, ''));
    const row = rowFor(damage);

    return { damage, phrase: null, matches: row ? [{ row, kind: 'normal' }, { row, kind: 'monk' }] : [] };
  }
  const hp = /\bfor\s+([\d,]+)\s*hp\b/i.exec(query);
  const damage = hp ? Number(hp[1].replace(/,/g, '')) : null;

  // The verb comes after the attack's name ("Your strike pokes..."), so the
  // match that starts last wins, and the longest one among those. Case
  // matters: "decimates" is 31-35 damage, "DECIMATES" 66-75.
  let best: { index: number; text: string; message: string } | null = null;

  for (const { text, message } of patterns) {
    const pattern = new RegExp(`(?<![A-Za-z])${escape(text)}(?![A-Za-z])`, 'g');

    for (const match of query.matchAll(pattern)) {
      const index = match.index ?? 0;

      if (!best || index > best.index || (index === best.index && text.length > best.text.length)) {
        best = { index, text, message };
      }
    }
  }
  if (best) {
    const phrase = best.text;
    const matches = patterns
      .filter(pattern => pattern.text === phrase)
      .map(({ row, kind }) => ({ row, kind }));
    const unique = matches.filter(
      (match, i) => matches.findIndex(m => m.row === match.row && m.kind === match.kind) === i
    );

    // The hp figure is exact, so it wins if the words point somewhere else
    // (an attack named like a verb, say)
    if (damage === null || unique.some(match => match.row === rowFor(damage))) {
      return { damage, phrase: best.message, matches: unique };
    }
  }
  if (damage !== null) {
    const row = rowFor(damage);

    return { damage, phrase: null, matches: row ? [{ row, kind: 'normal' }, { row, kind: 'monk' }] : [] };
  }
  return { damage: null, phrase: null, matches: [] };
});

const matchedRows = computed(() => new Set(lookup.value?.matches.map(match => match.row) ?? []));
const matchedKinds = computed(() => {
  const kinds = new Set(lookup.value?.matches.map(match => match.kind));

  return kinds.size === 2 ? null : [...kinds][0] ?? null;
});

// Show only the columns asked for, but always the one a pasted line matched
const visibleKinds = computed<Kind[]>(() => {
  if (state.show === 'normal') return matchedKinds.value === 'monk' ? ['normal', 'monk'] : ['normal'];
  if (state.show === 'monk') return matchedKinds.value === 'normal' ? ['normal', 'monk'] : ['monk'];
  return ['normal', 'monk'];
});

const columns = computed<Column<DamageRow>[]>(() => [
  { key: 'damage', label: 'Damage (hp)', align: 'right', width: '8.5rem', nowrap: true },
  ...visibleKinds.value.map(kind => ({
    key: kind,
    label: kind === 'normal' ? 'Most classes' : 'Monk'
  }))
]);

const isMatch = (row: DamageRow, kind: Kind) =>
  lookup.value?.matches.some(match => match.row === row && match.kind === kind) ?? false;

const table = ref<InstanceType<typeof DataTable> | null>(null);

watch(
  () => lookup.value?.matches[0]?.row.min,
  async min => {
    if (min === undefined) return;
    await nextTick();
    table.value?.scrollToRow(min);
  }
);

const inputId = useId();
</script>

<template>
  <div class="au-tool damage-strings">
    <ToolPanel title="Find a hit">
      <template #actions><CopyLinkButton /></template>
      <div class="lookup">
        <div class="au-field query">
          <label class="au-label" :for="inputId">Damage or message</label>
          <input
            :id="inputId"
            v-model="state.q"
            class="au-control"
            type="search"
            autocomplete="off"
            spellcheck="false"
            placeholder="97, or a line such as: Your slash *** DEMOLISHES *** the orc!"
            :aria-describedby="`${inputId}-result`"
          >
        </div>
        <SegmentedField v-model="state.show" label="Show" :options="showOptions" />
      </div>
      <p :id="`${inputId}-result`" class="result" aria-live="polite">
        <template v-if="!lookup">
          Type a damage number, or paste a line from combat to find its row.
        </template>
        <template v-else-if="!lookup.matches.length">
          No damage message matches that. Try a number, or paste the whole line.
        </template>
        <template v-else-if="lookup.phrase">
          <MudText :text="lookup.phrase" /> is
          <strong>{{ formatRange(lookup.matches[0].row.min, lookup.matches[0].row.max) }} damage</strong>
          {{ matchedKinds ? `from ${kindName[matchedKinds]}` : 'for everyone' }}<template v-if="lookup.damage !== null">,
            and the line says {{ formatNumber(lookup.damage) }}</template>.
        </template>
        <template v-else>
          <strong>{{ formatNumber(lookup.damage ?? 0) }} damage</strong> reads
          <MudText :text="lookup.matches[0].row.normal.others" /> for most classes and
          <MudText :text="lookup.matches[0].row.monk.others" /> for a monk.
        </template>
      </p>
    </ToolPanel>

    <DataTable
      ref="table"
      :columns="columns"
      :rows="damageRows"
      :row-key="row => row.min"
      :highlight="row => matchedRows.has(row)"
      caption="Damage messages by damage range"
      max-height="30rem"
    >
      <template #cell-damage="{ row }">{{ formatRange(row.min, row.max) }}</template>
      <template v-for="kind in visibleKinds" :key="kind" #[`cell-${kind}`]="{ row }">
        <span :class="{ 'cell-match': matchedKinds && isMatch(row, kind) }">
          <MudText :text="row[kind].others" />
          <span v-if="matchedKinds && isMatch(row, kind)" class="au-visually-hidden"> (match)</span>
        </span>
      </template>
    </DataTable>
  </div>
</template>

<style scoped>
.lookup {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 16px 20px;
}

.query {
  flex: 1 1 18rem;
}

.result {
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  color: var(--vp-c-text-2);
  overflow-wrap: anywhere;
}

.result .au-mud {
  white-space: pre-wrap;
}

.cell-match {
  margin: -3px -7px;
  padding: 2px 6px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
}

.result strong {
  color: var(--vp-c-text-1);
}
</style>
