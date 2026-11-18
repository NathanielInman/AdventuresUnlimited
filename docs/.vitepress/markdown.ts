import type MarkdownIt from 'markdown-it';

// Build-time tweaks that let wide tables fit their column instead of hiding
// columns behind a sideways scroll:
//
// - Speedwalks (`4e9n5w6n...`) get a line break opportunity after every step
//   and after each `;`, so a long walk wraps inside its cell. <wbr> adds no
//   characters, so a copied walk is unchanged.
// - In a table where four or more columns hold only short values (a check
//   mark, a dash, a level) under longer headers, those headers stand on
//   end. The class tables (ten classes across) then fit a normal page.
// - Every body cell carries its column's header as data-label, so on a
//   phone a wide table can show each row as a card of labelled values.

type Token = ReturnType<MarkdownIt['parse']>[number];

const SPEEDWALK = /^\d+[neswud]/;
const SHORT_CELL = 4;
const MIN_SHORT_COLUMNS = 4;
const SHORT_VALUE = 10;

export function speedwalkBreaks(html: string): string {
  return html.replace(/(\d+[neswud])(?=\d)/g, '$1<wbr>').replace(/;/g, ';<wbr>');
}

// Visible text of a cell's inline markdown: link targets, emphasis and code
// marks dropped
function plainText(inline: Token): string {
  return (inline.children ?? [])
    .filter(child => child.type === 'text' || child.type === 'code_inline')
    .map(child => child.content)
    .join('')
    .trim();
}

function markTables(tokens: Token[], TokenClass: new (type: string, tag: string, nesting: number) => Token) {
  for (let start = 0; start < tokens.length; start++) {
    if (tokens[start].type !== 'table_open') continue;

    let end = start;
    while (end < tokens.length && tokens[end].type !== 'table_close') end++;

    const headers: Token[] = [];
    const longest: number[] = [];
    const cells: { open: Token; column: number }[] = [];
    let inBody = false;
    let column = 0;

    for (let i = start; i < end; i++) {
      const token = tokens[i];
      if (token.type === 'tbody_open') inBody = true;
      if (token.type === 'tr_open') column = 0;
      if (token.type === 'th_open') headers.push(tokens[i + 1]);
      if (token.type === 'td_open' && inBody) {
        cells.push({ open: token, column });
        const length = [...plainText(tokens[i + 1])].length;
        longest[column] = Math.max(longest[column] ?? 0, length);
      }
      if (token.type === 'th_close' || token.type === 'td_close') column++;
    }

    const labels = headers.map(plainText);
    for (const { open, column: index } of cells) if (labels[index]) open.attrSet('data-label', labels[index]);

    // When every value past the first column is short (a stat, a price), a
    // phone card lays them out two to a line
    const allShort = longest.every((length, index) => index === 0 || length <= SHORT_VALUE);
    if (allShort) for (const { open, column: index } of cells) if (index > 0) open.attrJoin('class', 'au-short');

    // The first column names the row, so it always stays across. A table
    // qualifies when enough short columns have headers wider than their
    // values; then every short column stands up, so the headers match.
    const short = headers
      .map((inline, index) => ({ inline, index }))
      .filter(({ index }) => index > 0 && longest[index] !== undefined && longest[index] <= SHORT_CELL);
    const cramped = short.filter(({ inline, index }) => [...plainText(inline)].length > longest[index] + 2);

    // VitePress writes its own <table> tag, so the marks go on the header
    // cells and the CSS finds the table with :has()
    if (cramped.length >= MIN_SHORT_COLUMNS) {
      for (const { inline } of short) {
        const open = new TokenClass('html_inline', '', 0);
        open.content = '<span class="au-upright">';
        const close = new TokenClass('html_inline', '', 0);
        close.content = '</span>';
        inline.children = [open, ...(inline.children ?? []), close];
        tokens[tokens.indexOf(inline) - 1].attrJoin('class', 'au-upright-cell');
      }
    }

    start = end;
  }
}

export function tablePlugin(md: MarkdownIt) {
  const code = md.renderer.rules.code_inline!;
  md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
    const html = code(tokens, idx, options, env, self);
    return SPEEDWALK.test(tokens[idx].content) ? speedwalkBreaks(html) : html;
  };

  md.core.ruler.push('au_tables', state => {
    markTables(state.tokens, state.Token as never);
  });
}
