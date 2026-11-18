// AU color codes, as the MUD's colour() in src/comm.c reads them: a brace and
// one letter. Lowercase letters are the normal ANSI colors, uppercase the
// bright ones, {D is dark grey, {x resets, and {{ prints a literal brace.
// Every other letter (the player-configurable channel colors such as {2 or
// {p) has no fixed color, so it renders as plain text.

export interface MudSegment {
  text: string;
  // The color code that set this segment's color, without the brace (null
  // for default text)
  code: string | null;
  // CSS class from mud-colors.css, or '' for default text
  className: string;
}

const COLORS: Record<string, string> = {
  r: 'mud-red',
  g: 'mud-green',
  y: 'mud-yellow',
  b: 'mud-blue',
  m: 'mud-magenta',
  c: 'mud-cyan',
  w: 'mud-white',
  R: 'mud-red mud-bright',
  G: 'mud-green mud-bright',
  Y: 'mud-yellow mud-bright',
  B: 'mud-blue mud-bright',
  M: 'mud-magenta mud-bright',
  C: 'mud-cyan mud-bright',
  W: 'mud-white mud-bright',
  D: 'mud-dark-grey'
};

// Codes that print something instead of changing color
const LITERALS: Record<string, string> = { '{': '{', '/': '\n', '-': '~', '*': '' };

/** Split a string with AU color codes into colored segments. */
export function parseMudColors(input: string): MudSegment[] {
  const segments: MudSegment[] = [];
  let code: string | null = null;
  let text = '';

  const flush = () => {
    if (!text) return;
    segments.push({ text, code, className: code ? COLORS[code] ?? '' : '' });
    text = '';
  };

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char !== '{' || i === input.length - 1) {
      text += char;
      continue;
    }
    const next = input[++i];

    if (next in LITERALS) {
      text += LITERALS[next];
    } else {
      flush();
      code = next in COLORS ? next : null;
    }
  }
  flush();
  return segments;
}

/** The text a player reads, with every color code removed. */
export function stripMudColors(input: string): string {
  return parseMudColors(input).map(segment => segment.text).join('');
}
