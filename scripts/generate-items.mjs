#!/usr/bin/env node
// Regenerates the item search data in docs/.vitepress/theme/tools/data/items/
// from the MUD's own source tree:
//
//   node scripts/generate-items.mjs ~/Sites/adventuresunlimited-code
//
// It boots the area files the way src/db.c boot_db does: it reads
// area/area.lst word by word and loads each file in that order, section by
// section, with the same field order and version checks as new_load_area,
// load_mobiles and load_objects (src/db2.c), load_rooms, load_resets,
// load_shops, load_specials and load_mobprogs (src/db.c). Files that aren't
// in area.lst never load in the game, so they never reach the data. The flag,
// apply, item type, weapon, attack, liquid and spell names come from the C
// tables (src/merc.h, src/tables.c, src/const.c, src/bit.c), read at run time,
// so a renamed flag in the source shows up here on the next run.
//
// Every object the game loads is written out, decoded the way identify
// (identify_object in src/act_info.c) prints it, plus where the world puts it:
// room resets, shopkeepers, mob programs, quest rewards and game code. The
// schema is documented in docs/.vitepress/theme/tools/README.md.
//
// One JSON file per area, keyed by the camelCase of the area's name (the keys
// the guides link to). Stale files from earlier runs are deleted.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.argv[2];

if (!root) {
  console.error('Usage: node scripts/generate-items.mjs <path to adventuresunlimited-code>');
  process.exit(1);
}

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, '../docs/.vitepress/theme/tools/data/items');
const srcDir = path.join(root, 'src');
const areaDir = path.join(root, 'area');
const readSource = name => fs.readFileSync(path.join(srcDir, name), 'latin1');

// ---------------------------------------------------------------------------
// C source: comments, #defines and tables
// ---------------------------------------------------------------------------

/** Drops C comments, leaving string and character literals alone. */
function stripComments(text) {
  let out = '';
  let i = 0;

  while (i < text.length) {
    const c = text[i];
    const next = text[i + 1];

    if (c === '"' || c === "'") {
      let j = i + 1;

      while (j < text.length && text[j] !== c) j += text[j] === '\\' ? 2 : 1;
      out += text.slice(i, j + 1);
      i = j + 1;
    } else if (c === '/' && next === '*') {
      const end = text.indexOf('*/', i + 2);

      i = end < 0 ? text.length : end + 2;
      out += ' ';
    } else if (c === '/' && next === '/') {
      while (i < text.length && text[i] !== '\n') i++;
    } else {
      out += c;
      i++;
    }
  }
  return out;
}

const mercH = stripComments(readSource('merc.h'));
const rawDefines = new Map();

for (const match of mercH.matchAll(/^[ \t]*#define[ \t]+(\w+)[ \t]+([^\n]+)$/gm)) {
  if (!rawDefines.has(match[1])) rawDefines.set(match[1], match[2].trim());
}

const defineCache = new Map();

/** The value of a merc.h constant: numbers, letter bits (A, aa), | + - * << and parentheses. */
function define(name) {
  if (defineCache.has(name)) return defineCache.get(name);
  const raw = rawDefines.get(name);

  if (raw === undefined) throw new Error(`merc.h has no #define ${name}`);
  defineCache.set(name, NaN);
  const value = evaluate(raw);

  defineCache.set(name, value);
  return value;
}

function evaluate(expression) {
  const tokens = expression.match(/0x[0-9a-f]+|\d+|\w+|<<|>>|[()|+\-*~&]/gi) ?? [];
  let at = 0;
  const peek = () => tokens[at];
  const take = () => tokens[at++];

  function primary() {
    const token = take();

    if (token === '(') {
      const value = or();

      take();
      return value;
    }
    if (token === '-') return -primary();
    if (token === '~') return ~primary();
    if (/^0x/i.test(token)) return Number.parseInt(token, 16) | 0;
    if (/^\d+$/.test(token)) return Number(token);
    return define(token);
  }
  function product() {
    let value = primary();

    while (peek() === '*') {
      take();
      value *= primary();
    }
    return value;
  }
  function sum() {
    let value = product();

    while (peek() === '+' || peek() === '-') value = take() === '+' ? value + product() : value - product();
    return value;
  }
  function shift() {
    let value = sum();

    while (peek() === '<<') {
      take();
      value = value << sum();
    }
    return value;
  }
  function and() {
    let value = shift();

    while (peek() === '&') {
      take();
      value &= shift();
    }
    return value;
  }
  function or() {
    let value = and();

    while (peek() === '|') {
      take();
      value |= and();
    }
    return value;
  }
  return or();
}

const tablesC = stripComments(readSource('tables.c'));
const constC = stripComments(readSource('const.c'));
const bitC = stripComments(readSource('bit.c'));

/** A FLAG_TYPE table from tables.c: [{ name, bit, settable }] in table order. */
function flagTable(name) {
  const block = new RegExp(`(?:FLAG_TYPE|struct\\s+flag_type)\\s+${name}\\s*\\[\\s*\\]\\s*=\\s*\\{([\\s\\S]*?)\\n\\s*\\}\\s*;`).exec(tablesC);

  if (!block) throw new Error(`tables.c has no table ${name}`);
  const entries = [];

  for (const entry of block[1].matchAll(/\{\s*"([^"]*)"\s*,\s*([^,{}]+?)\s*,\s*(\w+)\s*\}/g)) {
    entries.push({ name: entry[1], bit: evaluate(entry[2]), settable: entry[3] === 'TRUE' });
  }
  entries.stat = statTables.has(name);
  return entries;
}

// bit.c flag_stat_table: stat tables hold one value, the rest are bit sets
const statTables = new Set(
  [.../flag_stat_table\[\]\s*=\s*\{([\s\S]*?)\n\}\s*;/.exec(bitC)[1].matchAll(/\{\s*(\w+)\s*,\s*TRUE\s*\}/g)].map(m => m[1])
);

/** bit.c flag_string: the names of the set bits, or of the one stat value; "none" when empty. */
function flagString(table, bits) {
  const names = [];

  for (const entry of table) {
    if (!table.stat && (bits & entry.bit) !== 0) names.push(entry.name);
    else if (entry.bit === bits) {
      names.push(entry.name);
      break;
    }
  }
  return names.length ? names.join(' ') : 'none';
}

const flagList = (table, bits) => {
  const text = flagString(table, bits);

  return text === 'none' ? [] : text.split(' ');
};

const tables = Object.fromEntries(
  [
    'affect_flags', 'extra_flags', 'wear_flags', 'apply_flags', 'container_flags', 'weapon_class',
    'weapon_type2', 'furniture_flags', 'gem_types', 'size_flags', 'jewelry_types', 'rune_flags',
    'thrown_class', 'mprog_flags', 'location_flags', 'portal_flags'
  ].map(name => [name, flagTable(name)])
);

// The "furniture_flags" names use underscores in the table; flag_string
// prints them that way too.

// const.c item_table: the type names identify prints (item_name)
const itemTable = [...(/item_table\s*\[\]\s*=\s*\{([\s\S]*?)\n\}\s*;/.exec(constC)[1]).matchAll(/\{\s*(\w+)\s*,\s*"([^"]*)"\s*\}/g)]
  .map(m => ({ type: define(m[1]), name: m[2] }));

const attackTable = [...(/attack_table\s*\[\w*\]\s*=\s*\{([\s\S]*?)\n\}\s*;/.exec(constC)[1]).matchAll(/\{\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*(-?\w+)\s*\}/g)]
  .map(m => ({ name: m[1], noun: m[2], damage: m[3] === '-1' ? 'none' : m[3].replace(/^DAM_/, '').toLowerCase() }));

const liqTable = [...(/liq_table\s*\[\]\s*=\s*\{([\s\S]*?)\n\}\s*;/.exec(constC)[1]).matchAll(/\{\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*\{/g)]
  .map(m => ({ name: m[1], color: m[2] }));

const weaponTable = [...(/weapon_table\s*\[\]\s*=\s*\{([\s\S]*?)\n\}\s*;/.exec(constC)[1]).matchAll(/\{\s*"([^"]*)"\s*,\s*\w+\s*,\s*(WEAPON_\w+)/g)]
  .map(m => ({ name: m[1], type: define(m[2]) }));

const MAX_SKILL = define('MAX_SKILL');
const skillBlock = /skill_table\s*\[MAX_SKILL\]\s*=\s*\{([\s\S]*?)\n\}\s*;/.exec(constC)[1];
const skillNames = [...skillBlock.matchAll(/\{\s*"([^"]*)"\s*,\s*\{/g)].map(m => m[1]).slice(0, MAX_SKILL);

// ---------------------------------------------------------------------------
// The game's lookups (lookup.c, handler.c, magic.c), prefix matches included
// ---------------------------------------------------------------------------

const lower = text => text.toLowerCase();

/** db.c str_prefix: false when a is a prefix of b, ignoring case. */
const strPrefix = (a, b) => !lower(b).startsWith(lower(a));
const firstMatches = (a, b) => a.length > 0 && b.length > 0 && lower(a[0]) === lower(b[0]);

function itemLookup(word) {
  const entry = itemTable.find(item => firstMatches(word, item.name) && !strPrefix(word, item.name));

  return entry ? entry.type : -1;
}

const itemName = type => itemTable.find(item => item.type === type)?.name ?? 'none';

function weaponType(word) {
  const entry = weaponTable.find(weapon => firstMatches(word, weapon.name) && !strPrefix(word, weapon.name));

  if (entry) return entry.type;
  if (!strPrefix(word, 'shortbow')) return define('WEAPON_SHORTBOW');
  if (!strPrefix(word, 'longbow')) return define('WEAPON_LONGBOW');
  if (!strPrefix(word, 'lightcrossbow')) return define('WEAPON_LIGHTCROSSBOW');
  if (!strPrefix(word, 'heavycrossbow')) return define('WEAPON_HEAVYCROSSBOW');
  return define('WEAPON_EXOTIC');
}

function attackLookup(word) {
  const index = attackTable.findIndex(attack => firstMatches(word, attack.name) && !strPrefix(word, attack.name));

  return index < 0 ? 0 : index;
}

function liqLookup(word) {
  return liqTable.findIndex(liquid => firstMatches(word, liquid.name) && !strPrefix(word, liquid.name));
}

function skillLookup(word) {
  return skillNames.findIndex(name => firstMatches(word, name) && !strPrefix(word, name));
}

/** lookup.c flag_lookup: a prefix match, used for mprog triggers. */
function flagLookup(word, table) {
  const entry = table.find(flag => firstMatches(word, flag.name) && !strPrefix(word, flag.name));

  return entry ? entry : null;
}

/** interp.c one_argument: the next word, lowercased, quotes allowed. */
function oneArgument(text) {
  let i = 0;

  while (i < text.length && isSpace(text[i])) i++;
  let end = ' ';

  if (text[i] === "'" || text[i] === '"') end = text[i++];
  let word = '';

  while (i < text.length) {
    if (text[i] === end) {
      i++;
      break;
    }
    word += lower(text[i]);
    i++;
  }
  while (i < text.length && isSpace(text[i])) i++;
  return [word, text.slice(i)];
}

// ---------------------------------------------------------------------------
// An area file read like the C stdio calls in db.c read it
// ---------------------------------------------------------------------------

const EOF = null;
const isSpace = c => c !== EOF && ' \t\n\v\f\r'.includes(c);
const isDigit = c => c !== EOF && c >= '0' && c <= '9';
const isAlpha = c => c !== EOF && ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z'));

class AreaReader {
  constructor(text, file) {
    this.text = text;
    this.file = file;
    this.at = 0;
  }

  getc() {
    return this.at < this.text.length ? this.text[this.at++] : (this.at++, EOF);
  }

  ungetc(c) {
    if (c !== EOF) this.at--;
    else this.at = Math.min(this.at, this.text.length + 1) - 1;
  }

  fail(message) {
    const line = this.text.slice(0, this.at).split('\n').length;

    throw new Error(`${this.file}:${line}: ${message}`);
  }

  letter() {
    let c;

    do c = this.getc();
    while (isSpace(c));
    return c;
  }

  number() {
    let c;

    do c = this.getc();
    while (isSpace(c));
    let sign = false;

    if (c === '+') c = this.getc();
    else if (c === '-') {
      sign = true;
      c = this.getc();
    }
    if (!isDigit(c)) this.fail('Fread_number: bad format.');
    let number = 0;

    while (isDigit(c)) {
      number = (number * 10 + Number(c)) | 0;
      c = this.getc();
    }
    if (sign) number = -number | 0;
    if (c === '|') number = (number + this.number()) | 0;
    else if (c !== ' ') this.ungetc(c);
    return number;
  }

  flag() {
    let c;

    do c = this.getc();
    while (isSpace(c));
    let negative = false;

    if (c === '-') {
      negative = true;
      c = this.getc();
    }
    let number = 0;

    if (!isDigit(c)) {
      while (isAlpha(c)) {
        const bit = c <= 'Z' ? 2 ** (c.charCodeAt(0) - 65) : 2 ** (26 + c.charCodeAt(0) - 97);

        number = (number + bit) | 0;
        c = this.getc();
      }
    }
    while (isDigit(c)) {
      number = (number * 10 + Number(c)) | 0;
      c = this.getc();
    }
    if (c === '|') number = (number + this.flag()) | 0;
    else if (c !== ' ') this.ungetc(c);
    return negative ? -number | 0 : number;
  }

  /** fread_string: up to the next ~, newlines kept as \n. */
  string() {
    let c;

    do c = this.getc();
    while (isSpace(c));
    if (c === '~') return '';
    let out = c === '\r' ? '' : c;

    for (;;) {
      c = this.getc();
      if (c === EOF) this.fail('Fread_string: EOF');
      if (c === '~') return out;
      if (c !== '\r') out += c;
    }
  }

  stringEol() {
    let c;

    do c = this.getc();
    while (isSpace(c));
    let out = '';

    while (c !== EOF && c !== '\n' && c !== '\r') {
      out += c;
      c = this.getc();
    }
    return out;
  }

  word() {
    let c;

    do c = this.getc();
    while (isSpace(c));
    let end = ' ';
    let word = '';

    if (c === "'" || c === '"') end = c;
    else word = c ?? '';
    for (;;) {
      c = this.getc();
      if (c === EOF) {
        if (end === ' ') return word;
        this.fail('Fread_word: EOF');
      }
      if (end === ' ' ? isSpace(c) : c === end) {
        if (end === ' ') this.ungetc(c);
        return word;
      }
      word += c;
    }
  }

  toEol() {
    let c;

    do c = this.getc();
    while (c !== EOF && c !== '\n' && c !== '\r');
    do c = this.getc();
    while (c === '\n' || c === '\r');
    this.ungetc(c);
  }

  /** ext_bits.c fread_xbv: names up to ~, kept when the table knows them (exact, any case). */
  xbv(table) {
    let rest = this.string();
    const bits = new Set();

    for (;;) {
      const [word, after] = oneArgument(rest);

      rest = after;
      if (!word) break;
      const entry = table.find(flag => lower(flag.name) === word);

      if (entry) bits.add(entry.bit);
      else unknownBits.add(`${table === tables.extra_flags ? 'extra' : 'affect'} '${word}' (${this.file})`);
    }
    return bits;
  }
}

const unknownBits = new Set();

/** ext_bits.c xbv_string: the names of the set bits in table order. */
const xbvNames = (table, bits) => table.filter(flag => bits.has(flag.bit)).map(flag => flag.name);

// ---------------------------------------------------------------------------
// Booting the areas (db.c boot_db)
// ---------------------------------------------------------------------------

const MAX_TRADE = define('MAX_TRADE');
const MAX_RACE = define('MAX_RACE');
const MAX_CLASS = define('MAX_CLASS');
const MAX_RELIGION = define('MAX_RELIGION');
const MAX_MOB_SPELLS = define('MAX_MOB_SPELLS');

const areas = [];
const objects = new Map();
const mobs = new Map();
const rooms = new Map();
const progs = new Map();
const shops = new Map();
const specials = new Map();

function loadArea(r, file) {
  const area = {
    file, name: 'New Area', version: 0, location: 0, objects: []
  };

  for (;;) {
    const word = r.at >= r.text.length ? 'End' : r.word();

    switch (lower(word)) {
      case 'areaflags': r.stringEol(); break;
      case 'name': area.name = r.string(); break;
      case 'security': r.number(); break;
      case 'version': area.version = r.number(); break;
      case 'vnums': r.number(); r.number(); break;
      case 'builders': r.string(); break;
      case 'credits': area.credits = r.string(); break;
      case 'location': area.location = r.number(); break;
      case 'clan': case 'conquer': case 'display': case 'jurisdiction':
      case 'orbvnum': case 'orblocation': case 'original':
        r.number(); break;
      case 'conquered_by': r.string(); break;
      case 'gem': case 'lumber': case 'level': case 'minevnum': case 'ore': r.number(); r.number(); break;
      case 'mcoord': r.number(); r.number(); r.number(); break;
      case 'gmtype': case 'ortype': for (let i = 0; i < 5; i++) r.string(); break;
      case 'end':
        areas.push(area);
        return area;
      default: break;
    }
  }
}

function loadHelps(r) {
  for (;;) {
    r.number();
    const keyword = r.string();

    if (keyword.startsWith('$')) break;
    r.string();
  }
}

function readProg(r, owner) {
  const word = r.word();
  const trigger = flagLookup(word, tables.mprog_flags);

  if (!trigger) r.fail('MOBprogs: invalid trigger.');
  owner.progs.push({ trigger: trigger.name, vnum: r.number(), phrase: r.string() });
}

function loadMobiles(r, area) {
  for (;;) {
    if (r.letter() !== '#') r.fail('Load_mobiles: # not found.');
    const vnum = r.number();

    if (vnum === 0) break;
    if (mobs.has(vnum)) r.fail(`Load_mobiles: vnum ${vnum} duplicated.`);
    const mob = { vnum, area, progs: [] };

    r.string();
    mob.name = r.string();
    r.string();
    r.string();
    r.string();
    // act and affect flags
    if (area.version < 4) r.flag();
    else r.string();
    if (area.version < 4) r.flag();
    else r.string();
    if (area.version > 0 && area.version < 4) r.flag();
    r.number();
    r.number();
    mob.level = r.number();
    r.number();
    for (let dice = 0; dice < 3; dice++) {
      r.number();
      r.letter();
      r.number();
      r.letter();
      r.number();
    }
    r.word();
    for (let i = 0; i < 4; i++) r.number();
    for (let i = 0; i < 4; i++) r.flag();
    r.word();
    r.word();
    r.word();
    r.number();
    r.flag();
    r.flag();
    r.word();
    r.word();
    if (area.version > 9) {
      for (let i = 0; i < MAX_RACE + MAX_CLASS + 13 + MAX_RELIGION; i++) r.number();
      r.string();
    }
    for (;;) {
      const letter = r.letter();

      if (letter === 'F') {
        r.word();
        r.flag();
      } else if (letter === 'M') readProg(r, mob);
      else if (letter === 'P') r.string();
      else if (letter === 'S') {
        for (let i = 0; i < MAX_MOB_SPELLS; i++) if (r.word() === 'End') break;
      } else {
        r.ungetc(letter);
        break;
      }
    }
    mobs.set(vnum, mob);
  }
}

function loadObjects(r, area) {
  for (;;) {
    if (r.letter() !== '#') r.fail('Load_objects: # not found.');
    const vnum = r.number();

    if (vnum === 0) break;
    if (objects.has(vnum)) r.fail(`Load_objects: vnum ${vnum} duplicated.`);
    const obj = { vnum, area, progs: [], affects: [] };

    obj.keywords = r.string();
    obj.short = r.string();
    obj.long = r.string();
    obj.material = r.string();
    obj.submaterial = area.version > 5 ? r.string() : '';
    obj.type = itemLookup(r.word());
    if (area.version < 7) {
      const bits = r.flag();

      obj.extra = new Set(Array.from({ length: 32 }, (_, bit) => bit).filter(bit => bits & (1 << bit)));
    } else obj.extra = r.xbv(tables.extra_flags);
    obj.wear = r.flag();
    obj.quality = area.version > 7 ? r.number() : null;
    obj.rarity = area.version > 10 ? r.number() : -1;
    obj.oldOwner = area.version > 8 ? r.string() : '';

    const v = [0, 0, 0, 0, 0];
    const type = obj.type;
    const is = name => type === define(name);

    if (is('ITEM_WEAPON')) {
      v[0] = weaponType(r.word());
      v[1] = r.number();
      v[2] = r.number();
      v[3] = attackLookup(r.word());
      v[4] = r.flag();
    } else if (is('ITEM_CONTAINER')) {
      v[0] = r.number();
      v[1] = r.flag();
      v[2] = r.number();
      v[3] = r.number();
      v[4] = r.number();
    } else if (is('ITEM_DRINK_CON') || is('ITEM_FOUNTAIN')) {
      v[0] = r.number();
      v[1] = r.number();
      v[2] = liqLookup(r.word());
      v[3] = r.number();
      v[4] = r.number();
    } else if (is('ITEM_WAND') || is('ITEM_STAFF')) {
      v[0] = r.number();
      v[1] = r.number();
      v[2] = r.number();
      v[3] = skillLookup(r.word());
      v[4] = r.number();
    } else if (is('ITEM_POTION') || is('ITEM_PILL') || is('ITEM_SCROLL')) {
      v[0] = r.number();
      for (let i = 1; i < 5; i++) v[i] = skillLookup(r.word());
    } else for (let i = 0; i < 5; i++) v[i] = r.flag();
    obj.values = v;

    if (area.version > 2) {
      obj.furniture = [r.number(), r.number(), r.flag(), r.number(), r.number()];
    } else {
      obj.furniture = is('ITEM_FURNITURE') ? [...v] : [1, 0, define('STAND_ON'), 0, 0];
    }
    obj.level = r.number();
    obj.weight = r.number();
    obj.cost = r.number();
    obj.totalAllowed = area.version > 0 ? r.number() : 0;
    if (area.version > 0) r.number();
    const condition = { P: 100, G: 90, A: 75, W: 50, D: 25, B: 10, R: 0 }[r.letter()];

    obj.condition = condition ?? 100;

    for (;;) {
      const letter = r.letter();

      if (letter === 'A') {
        const affect = { location: r.number(), modifier: r.number(), bits: new Set() };

        if (area.version > 3) affect.bits = r.xbv(tables.affect_flags);
        obj.affects.unshift(affect);
      } else if (letter === 'F') {
        r.letter();
        const affect = { location: r.number(), modifier: r.number() };

        if (area.version < 4) {
          const bits = r.flag();

          affect.bits = new Set(Array.from({ length: 32 }, (_, bit) => bit).filter(bit => bits & (1 << bit)));
        } else affect.bits = r.xbv(tables.affect_flags);
        obj.affects.unshift(affect);
      } else if (letter === 'E') {
        r.string();
        r.string();
      } else if (letter === 'M') readProg(r, obj);
      else {
        r.ungetc(letter);
        break;
      }
    }
    objects.set(vnum, obj);
    area.objects.push(obj);
  }
}

function loadRooms(r, area) {
  for (;;) {
    if (r.letter() !== '#') r.fail('Load_rooms: # not found.');
    const vnum = r.number();

    if (vnum === 0) break;
    if (rooms.has(vnum)) r.fail(`Load_rooms: vnum ${vnum} duplicated.`);
    const room = { vnum, area, progs: [], resets: [] };

    room.name = r.string();
    r.string();
    r.number();
    r.flag();
    r.number();
    if (area.version > 1) r.flag();
    for (;;) {
      const letter = r.letter();

      if (letter === 'S') break;
      switch (letter) {
        case 'A':
          if (area.version < 4) r.flag();
          else r.string();
          break;
        case 'H': case 'M': r.number(); break;
        case 'B': r.number(); r.number(); r.number(); r.string(); break;
        case 'C': case 'O': case 'R': r.string(); break;
        case 'D':
          r.number();
          r.string();
          r.string();
          if (area.version > 0) {
            r.number();
            r.number();
            r.flag();
          } else r.number();
          r.number();
          r.number();
          break;
        case 'E': r.string(); r.string(); break;
        case 'P': readProg(r, room); break;
        case 'T': r.number(); r.number(); r.number(); break;
        default: r.fail(`Load_rooms: vnum ${vnum} has flag not 'DES'.`);
      }
    }
    rooms.set(vnum, room);
  }
}

function loadResets(r) {
  let rVnum = -1;

  for (;;) {
    const letter = r.letter();

    if (letter === 'S') break;
    if (letter === '*') {
      r.toEol();
      continue;
    }
    r.number();
    const reset = { command: letter, arg1: r.number(), arg2: r.number() };

    reset.arg3 = letter === 'G' || letter === 'R' ? 0 : r.number();
    reset.arg4 = letter === 'P' || letter === 'M' ? r.number() : 0;
    r.toEol();
    if (letter === 'M' || letter === 'O') rVnum = reset.arg3;
    else if (letter === 'D' || letter === 'R') rVnum = reset.arg1;
    if (rVnum === -1) r.fail('load_resets : rVnum == -1');
    // new_reset drops a reset whose room isn't loaded yet
    if (letter !== 'D') rooms.get(rVnum)?.resets.push(reset);
  }
}

function loadShops(r) {
  for (;;) {
    const keeper = r.number();

    if (keeper === 0) break;
    const shop = { keeper, buy: [] };

    for (let i = 0; i < MAX_TRADE; i++) shop.buy.push(r.number());
    shop.profitBuy = r.number();
    shop.profitSell = r.number();
    r.number();
    r.number();
    r.toEol();
    if (!mobs.has(keeper)) r.fail(`load_shops: no mob ${keeper}`);
    shops.set(keeper, shop);
  }
}

function loadSpecials(r) {
  for (;;) {
    const letter = r.letter();

    if (letter === 'S') return;
    if (letter === 'M') specials.set(r.number(), r.word());
    else if (letter !== '*') r.fail(`Load_specials: letter '${letter}' not *MS.`);
    r.toEol();
  }
}

function loadMobprogs(r, area) {
  for (;;) {
    if (r.letter() !== '#') r.fail('Load_mobprogs: # not found.');
    const vnum = r.number();

    if (vnum === 0) break;
    if (progs.has(vnum)) r.fail(`Load_mobprogs: vnum ${vnum} duplicated.`);
    progs.set(vnum, { vnum, area, code: r.string() });
  }
}

const listReader = new AreaReader(fs.readFileSync(path.join(areaDir, 'area.lst'), 'latin1'), 'area.lst');
const bootFiles = [];

for (;;) {
  const word = listReader.word();

  if (!word || word.startsWith('$')) break;
  bootFiles.push(word);
}

for (const file of bootFiles) {
  if (file.startsWith('-')) continue;
  const reader = new AreaReader(fs.readFileSync(path.join(areaDir, file), 'latin1'), file);
  let area = areas.at(-1);

  for (;;) {
    if (reader.letter() !== '#') reader.fail('Boot_db: # not found.');
    const word = reader.word();

    if (word.startsWith('$')) break;
    switch (lower(word)) {
      case 'areadata': area = loadArea(reader, file); break;
      case 'helps': loadHelps(reader); break;
      case 'mobiles': loadMobiles(reader, area); break;
      case 'mobprogs': loadMobprogs(reader, area); break;
      case 'objects': loadObjects(reader, area); break;
      case 'resets': loadResets(reader); break;
      case 'rooms': loadRooms(reader, area); break;
      case 'shops': loadShops(reader); break;
      case 'specials': loadSpecials(reader); break;
      default: reader.fail(`Boot_db: bad section name ${word}.`);
    }
  }
}

// fix_mobprogs: every prog a mob, object or room names must exist
for (const owner of [...mobs.values(), ...objects.values(), ...rooms.values()]) {
  for (const prog of owner.progs) if (!progs.has(prog.vnum)) throw new Error(`Fix_mobprogs: code vnum ${prog.vnum} not found.`);
}

// ---------------------------------------------------------------------------
// Area keys: the camelCase of the area name, as the old generator made them
// ---------------------------------------------------------------------------

const camelize = name =>
  (name.replace(/['’]/g, '').match(/[A-Za-z0-9]+/g) ?? []).reduce(
    (key, word, index) => (index === 0 ? word.toLowerCase() : key + word[0].toUpperCase() + word.slice(1)),
    ''
  );

// Keys that camelize() wouldn't give. Two files that share an area name
// (Naerlan Housing, Manor Houses of Tharel) share one key and one file.
const keyOverrides = {};

for (const area of areas) area.key = keyOverrides[area.file] ?? camelize(area.name);

// ---------------------------------------------------------------------------
// Decoding: what identify prints
// ---------------------------------------------------------------------------

const qualityWord = quality => {
  if (quality > 95) return 'masterful';
  if (quality > 90) return 'perfect';
  if (quality > 80) return 'first rate';
  if (quality > 70) return 'impeccable';
  if (quality > 60) return 'fine';
  if (quality > 50) return 'standard';
  if (quality > 40) return 'sound';
  if (quality > 30) return 'imperfect';
  if (quality > 20) return 'deficient';
  if (quality > 10) return 'faulty';
  return 'crude';
};

const conditionWord = condition => {
  if (condition >= define('COND_ITEM_MINT')) return 'mint';
  if (condition >= define('COND_ITEM_EXCELLENT')) return 'excellent';
  if (condition >= define('COND_ITEM_FAIR')) return 'fair';
  if (condition >= define('COND_ITEM_MEDIOCRE')) return 'mediocre';
  if (condition >= define('COND_ITEM_DAMAGED')) return 'damaged';
  return 'ruined';
};

const spellName = sn => (sn > 0 && sn < MAX_SKILL && skillNames[sn] ? skillNames[sn] : null);

function arrowFlags(bits) {
  return ['FLAMING', 'FROST', 'SHOCKING', 'POISON', 'BARBED']
    .filter(name => bits & define(`ARROW_${name}`))
    .map(name => name.toLowerCase());
}

const T = name => define(`ITEM_${name}`);

function decode(obj) {
  const v = obj.values;
  const type = obj.type;
  const out = {
    vnum: obj.vnum,
    kw: obj.keywords,
    name: obj.short
  };

  if (obj.long) out.desc = obj.long;
  out.type = itemName(type);
  out.level = obj.level;
  // identify prints obj->weight / 10
  out.lb = Math.trunc(obj.weight / 10);
  out.cost = obj.cost;
  if (obj.material) out.mat = obj.material;
  if (obj.submaterial) out.sub = obj.submaterial;
  // An area older than version 8 rolls quality 40-60 per copy
  out.qual = obj.quality === null ? null : qualityWord(obj.quality);
  // Left out when mint, the usual case
  if (obj.condition < define('COND_ITEM_MINT')) out.cond = conditionWord(obj.condition);
  const wear = flagList(tables.wear_flags, obj.wear);

  if (wear.length) out.wear = wear;
  const extra = xbvNames(tables.extra_flags, obj.extra);

  if (extra.length) out.flags = extra;
  if (obj.totalAllowed !== -1) out.limit = obj.totalAllowed;
  if (obj.rarity > 0) out.rarity = obj.rarity;
  if (obj.oldOwner) out.owner = obj.oldOwner;

  // Affects, in identify's order (the loader prepends each one)
  const applies = [];
  const permanent = [];

  for (const affect of obj.affects) {
    if (affect.location !== define('APPLY_NONE') && affect.modifier !== 0 && affect.location !== define('APPLY_OBJECT')) {
      const name = flagString(tables.apply_flags, affect.location);

      applies.push([
        name,
        affect.location === define('APPLY_WEAPON') ? flagString(tables.weapon_type2, affect.modifier) : affect.modifier
      ]);
    }
    for (const name of xbvNames(tables.affect_flags, affect.bits)) if (!permanent.includes(name)) permanent.push(name);
  }
  if (applies.length) out.apply = applies;
  if (permanent.length) out.aff = permanent;

  if (type === T('WEAPON')) {
    const attack = attackTable[v[3]] ?? attackTable[0];

    out.weapon = {
      class: flagString(tables.weapon_class, v[0]),
      dice: [v[1], v[2]],
      attack: attack.noun,
      dam: attack.damage
    };
    const flags = flagList(tables.weapon_type2, v[4]);

    if (flags.length) out.weapon.flags = flags;
  } else if (type === T('ARMOR')) {
    out.ac = v.slice(0, 4);
  } else if ([T('SCROLL'), T('POTION'), T('PILL')].includes(type)) {
    const spells = v.slice(1).map(spellName).filter(Boolean);

    if (spells.length) out.magic = { level: v[0], spells };
  } else if ([T('WAND'), T('STAFF')].includes(type)) {
    const spell = spellName(v[3]);

    if (spell) out.magic = { level: v[0], spells: [spell], charges: v[2], max: v[1] };
  } else if (type === T('CONTAINER')) {
    out.container = { cap: v[0], maxw: v[3] };
    const flags = flagList(tables.container_flags, v[1]);

    if (flags.length) out.container.flags = flags;
    if (v[2] > 0) out.container.key = v[2];
    if (v[4] !== 100) out.container.mult = v[4];
  } else if (type === T('DRINK_CON') || type === T('FOUNTAIN')) {
    const liquid = liqTable[v[2]];

    out.drink = { liquid: liquid?.name ?? 'unknown', color: liquid?.color ?? '', max: v[0], left: v[1] };
    if (v[3]) out.drink.poison = true;
  } else if (type === T('LIGHT')) {
    // create_object turns 999 into -1, and identify calls -1 infinite
    out.light = v[2] === -1 || v[2] === 999 ? 'infinite' : v[2];
  } else if (type === T('FURNITURE')) {
    const [people, maxw, bits, heal, mana] = obj.furniture;

    out.furniture = { people, maxw, heal, mana };
    const flags = flagList(tables.furniture_flags, bits);

    if (flags.length) out.furniture.flags = flags;
  } else {
    const info = identifyInfo(obj);

    if (info.length) out.info = info;
    else if (v.some(Boolean)) out.val = v;
  }
  return out;
}

/** The extra identify lines for the rarer types, as [label, value] pairs. */
function identifyInfo(obj) {
  const v = obj.values;
  const type = obj.type;
  const info = [];

  if (type === T('GEM')) {
    info.push(['Type', flagString(tables.gem_types, v[0])], ['Size', flagString(tables.size_flags, v[1])], ['Uses', v[2]]);
  } else if (type === T('LOCKPICK')) {
    let chance = 'good';

    if (v[0] < 1) chance = 'none';
    else if (v[0] <= 5) chance = 'poor';
    else if (v[0] <= 10) chance = 'standard';
    info.push(['Chance', chance]);
  } else if (type === T('MIRROR')) {
    info.push(['Remaining charges', v[0]], ['Total charges', v[1]]);
  } else if (type === T('JEWELRY')) {
    info.push(['Type', flagString(tables.jewelry_types, v[0])]);
    if (v[0] === define('JEWELRY_POWERSTONE')) {
      const words = ['Not Configured', 'strong', 'strong', 'potent', 'mighty', 'robust', 'incredible', 'powerful'];

      info.push(['Power level', words[Math.min(Math.max(Math.trunc((v[1] + 299) / 300), 0), 7)]]);
      info.push(['Percent full', Math.trunc((v[2] * 100) / (1 + v[1]))]);
    } else if (v[0] === define('JEWELRY_TALISMAN')) {
      info.push(['Rune type', flagString(tables.rune_flags, v[1])], ['Large', v[2]], ['Medium', v[3]], ['Small', v[4]]);
    } else if (v[0] === define('JEWELRY_GATEKEY')) {
      info.push(['Stones', v[2]]);
    }
  } else if (type === T('ARROW') || type === T('BOLT')) {
    // identify uses arrow_bit_name for both
    if (v[0]) info.push(['Flags', arrowFlags(v[0]).join(' ') || 'none']);
  } else if (type === T('THROWN')) {
    info.push(['Class', flagString(tables.thrown_class, v[0])]);
  } else if (type === T('RUNE')) {
    info.push(['Type', flagString(tables.rune_flags, v[0])], ['Size', flagString(tables.size_flags, v[1])]);
  } else if (type === T('TINDERBOX')) {
    info.push(['Uses', v[0]]);
  } else if (type === T('BEACON')) {
    const room = rooms.get(v[1]);
    const location = room ? room.area.location : 0;

    info.push(['Target', location ? `${flagString(tables.location_flags, location)} Tharel` : 'Somewhere in Tharel']);
  } else if (type === T('CLANORB') && v[0] === define('CLANORB_FLAG')) {
    info.push(['Area', rooms.get(v[1])?.area.name ?? 'Somewhere in Tharel']);
  }
  return info;
}

// ---------------------------------------------------------------------------
// Where each object comes from
// ---------------------------------------------------------------------------

// Each source names mobs, rooms and objects by vnum; the area file's own
// lookup tables give their names and areas. Sources that differ only in the
// room merge into one with a list of rooms.
const sources = new Map();
const addSource = (vnum, source) => {
  if (!objects.has(vnum)) return;
  if (!sources.has(vnum)) sources.set(vnum, new Map());
  const { room, ...rest } = source;
  const key = JSON.stringify(rest);
  const list = sources.get(vnum);

  if (!list.has(key)) list.set(key, { ...rest, rooms: [] });
  if (room !== undefined && !list.get(key).rooms.includes(room)) list.get(key).rooms.push(room);
};

// Where each mob is reset, for scripts that run on a mob
const mobRooms = new Map();

for (const room of rooms.values()) {
  for (const reset of room.resets) {
    if (reset.command !== 'M' || !mobs.has(reset.arg1) || !rooms.has(reset.arg3)) continue;
    if (!mobRooms.has(reset.arg1)) mobRooms.set(reset.arg1, []);
    if (!mobRooms.get(reset.arg1).includes(reset.arg3)) mobRooms.get(reset.arg1).push(reset.arg3);
  }
}
const resetLimit = (arg2, zeroUnlimited) => {
  if (arg2 > 50) return 6;
  if (arg2 === -1 || (zeroUnlimited && arg2 === 0)) return null;
  return arg2;
};

// reset_room, statically: M sets the mob that G and E give to, O puts an
// object on the floor, P puts one inside the first copy of another object
for (const room of rooms.values()) {
  let lastMob = null;

  for (const reset of room.resets) {
    switch (reset.command) {
      case 'M':
        lastMob = mobs.has(reset.arg1) && rooms.has(reset.arg3) ? { mob: mobs.get(reset.arg1), room: rooms.get(reset.arg3) } : lastMob;
        break;
      case 'O': {
        const target = rooms.get(reset.arg3);

        if (target) addSource(reset.arg1, { k: 'floor', room: target.vnum });
        break;
      }
      case 'P': {
        const container = objects.get(reset.arg3);

        if (!container) break;
        const source = { k: 'container', obj: container.vnum };
        const limit = resetLimit(reset.arg2, false);

        if (reset.arg4 > 1) source.n = reset.arg4;
        if (limit !== null) source.max = limit;
        addSource(reset.arg1, source);
        break;
      }
      case 'G':
      case 'E': {
        if (!lastMob) break;
        const { mob, room: mobRoom } = lastMob;
        const shop = shops.get(mob.vnum);
        const base = { mob: mob.vnum, room: mobRoom.vnum };

        if (shop && reset.command === 'G') {
          const obj = objects.get(reset.arg1);
          let price = Math.trunc((obj?.cost ?? 0) * shop.profitBuy / 100);

          if (obj && (obj.type === T('WAND') || obj.type === T('STAFF'))) {
            price = obj.values[1] === 0 ? Math.trunc(price / 4) : Math.trunc((price * obj.values[2]) / obj.values[1]);
          }
          addSource(reset.arg1, { k: 'shop', ...base, price });
        } else {
          const source = { k: reset.command === 'E' ? 'worn' : 'carried', ...base };
          const limit = shop ? null : resetLimit(reset.arg2, true);

          if (limit !== null) source.max = limit;
          addSource(reset.arg1, source);
        }
        break;
      }
      default:
        break;
    }
  }
}

// Mob programs: "mob oload <vnum>" in a prog that a mob, object or room
// runs, directly or through "mob call"
const callers = new Map();

for (const prog of progs.values()) {
  for (const match of prog.code.matchAll(/\bmob\s+call\s+(\d+)/gi)) {
    const callee = Number(match[1]);

    if (!callers.has(callee)) callers.set(callee, new Set());
    callers.get(callee).add(prog.vnum);
  }
}

const runners = new Map();

for (const [kind, list] of [['mob', mobs], ['obj', objects], ['room', rooms]]) {
  for (const owner of list.values()) {
    for (const prog of owner.progs) {
      if (!runners.has(prog.vnum)) runners.set(prog.vnum, []);
      runners.get(prog.vnum).push({ kind, owner, trigger: prog.trigger });
    }
  }
}

/** Who runs a prog, following "mob call" back to the progs that call it. */
function runnersOf(vnum, seen = new Set()) {
  if (seen.has(vnum)) return [];
  seen.add(vnum);
  const direct = runners.get(vnum) ?? [];
  const called = [...(callers.get(vnum) ?? [])].flatMap(caller => runnersOf(caller, seen));

  return [...direct, ...called];
}

let scriptLoads = 0;

for (const prog of progs.values()) {
  const loads = [...prog.code.matchAll(/\bmob\s+oload\s+(\d+)/gi)].map(match => Number(match[1]));

  if (!loads.length) continue;
  for (const runner of runnersOf(prog.vnum)) {
    const { kind, owner, trigger } = runner;

    for (const vnum of loads) {
      scriptLoads++;
      if (kind === 'room') addSource(vnum, { k: 'script', trig: trigger, room: owner.vnum });
      else if (kind === 'obj') addSource(vnum, { k: 'script', trig: trigger, obj: owner.vnum });
      else {
        const where = mobRooms.get(owner.vnum) ?? [];

        if (!where.length) addSource(vnum, { k: 'script', trig: trigger, mob: owner.vnum });
        for (const room of where) addSource(vnum, { k: 'script', trig: trigger, mob: owner.vnum, room });
      }
    }
  }
}

// Game code: quest rewards and quest targets in quest.c, the random drops in
// db.c random_eq, and other create_object(get_obj_index(CONSTANT)) calls
const questC = stripComments(readSource('quest.c'));

for (const match of questC.matchAll(/questpoints\s*>=\s*(\d+)\s*\)[\s\S]{0,400}?create_object\s*\(\s*get_obj_index\s*\(\s*(\w+)\s*\)/g)) {
  addSource(define(match[2]), { k: 'quest', qp: Number(match[1]) });
}
for (const match of questC.matchAll(/objvnum\s*=\s*(QUEST_OBJQUEST\d+)/g)) {
  addSource(define(match[1]), { k: 'quest', target: true });
}

const dbC = stripComments(readSource('db.c'));
const localDefines = new Map([...dbC.matchAll(/^[ \t]*#define[ \t]+(\w+)[ \t]+(\d+)/gm)].map(m => [m[1], Number(m[2])]));
const spawnTable = /random_object_spawn_table\[\]\s*=\s*\{([\s\S]*?)\n\}\s*;/.exec(dbC)[1];

for (const match of spawnTable.matchAll(/\{\s*(\d+)\s*,\s*(\w+)\s*\}/g)) {
  const vnum = localDefines.get(match[2]) ?? define(match[2]);

  addSource(vnum, { k: 'random', per: Math.round(1000000 / Number(match[1])) });
}

const codeFiles = fs.readdirSync(srcDir).filter(name => name.endsWith('.c') && name !== 'quest.c');

for (const name of codeFiles) {
  const code = stripComments(readSource(name));
  const fileDefines = new Map([...code.matchAll(/^[ \t]*#define[ \t]+(\w+)[ \t]+(\d+)/gm)].map(m => [m[1], Number(m[2])]));
  // Split the file into functions: a definition starts in the first column
  // ("void do_skin( CHAR_DATA *ch, ... )") and runs to the next one
  const lines = code.split('\n');
  const bodies = new Map();
  let current = null;

  for (const line of lines) {
    const header = /^[A-Za-z_][\w \t*]*?\b(\w+)\s*\([^;]*$/.exec(line);

    if (header && !/^(if|while|for|switch|return|else)\b/.test(line) && !line.includes('=')) current = header[1];
    if (current) bodies.set(current, `${bodies.get(current) ?? ''}${line}\n`);
  }
  for (const [fn, body] of bodies) {
    if (!/create_object\s*\(/.test(body) || fn === 'random_eq') continue;
    for (const match of body.matchAll(/get_obj_index\s*\(\s*([A-Za-z_]\w*|\d+)\s*\)/g)) {
      let vnum = null;

      if (/^\d+$/.test(match[1])) vnum = Number(match[1]);
      else if (fileDefines.has(match[1])) vnum = fileDefines.get(match[1]);
      else if (rawDefines.has(match[1])) {
        try {
          vnum = define(match[1]);
        } catch {
          vnum = null;
        }
      }
      if (vnum !== null && Number.isFinite(vnum)) addSource(vnum, { k: 'code', fn });
    }
  }
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

fs.mkdirSync(outDir, { recursive: true });
const byKey = new Map();

for (const area of areas) {
  if (!area.objects.length) continue;
  if (!byKey.has(area.key)) byKey.set(area.key, { name: area.name, files: [], items: [], mobs: {}, rooms: {}, objs: {}, areas: {} });
  const entry = byKey.get(area.key);

  if (entry.name !== area.name) throw new Error(`Area key ${area.key} is shared by ${entry.name} and ${area.name}`);
  entry.files.push(area.file);
  for (const obj of area.objects) {
    const item = decode(obj);
    const found = [...(sources.get(obj.vnum)?.values() ?? [])];

    for (const source of found) {
      if (!source.rooms.length) delete source.rooms;
      for (const room of source.rooms ?? []) entry.rooms[room] = [rooms.get(room).name, rooms.get(room).area.key];
      if (source.mob) entry.mobs[source.mob] = [mobs.get(source.mob).name, mobs.get(source.mob).area.key];
      if (source.obj) entry.objs[source.obj] = [objects.get(source.obj).short, objects.get(source.obj).area.key];
    }
    for (const table of [entry.rooms, entry.mobs, entry.objs]) {
      for (const [, key] of Object.values(table)) entry.areas[key] = areas.find(other => other.key === key).name;
    }
    if (found.length) item.src = found;
    entry.items.push(item);
  }
}

const written = new Set();
let bytes = 0;

for (const [key, entry] of byKey) {
  const text = `${JSON.stringify(entry)}\n`;

  fs.writeFileSync(path.join(outDir, `${key}.json`), text);
  written.add(`${key}.json`);
  bytes += Buffer.byteLength(text);
}
for (const file of fs.readdirSync(outDir)) {
  if (file.endsWith('.json') && !written.has(file)) fs.rmSync(path.join(outDir, file));
}

// A report, for checking a run against the last one
const all = [...byKey.values()].flatMap(entry => entry.items);
const byType = {};

for (const item of all) byType[item.type] = (byType[item.type] ?? 0) + 1;
const placed = all.filter(item => item.src?.length).length;

console.log(`${bootFiles.length} files in area.lst, ${areas.length} areas, ${byKey.size} with objects`);
console.log(`${all.length} objects, ${placed} placed by a reset, script or the game code, ${all.length - placed} not placed`);
console.log(`${scriptLoads} script loads, ${(bytes / 1024 / 1024).toFixed(2)} MB written`);
console.log(Object.entries(byType).sort((a, b) => b[1] - a[1]).map(([type, count]) => `${type} ${count}`).join(', '));
if (unknownBits.size) console.log(`Unknown flag names the loader skips: ${[...unknownBits].join('; ')}`);
