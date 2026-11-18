// What the home page's terminal plays, in AU color codes (lib/mud-color.ts).
// The rooms, mobs and messages are the game's own, from the area files and
// the server source: Market Square (room 3014 in naerlan.are), the school
// command, the Goblin's Lair in Survival Training (room 3710) and its
// scrawny goblin, fight.c's damage words for each hit (a hit of 24 or less
// ends in a full stop, more in an exclamation mark) and update.c's level
// message. The descriptions are rewrapped to fit the window.

export interface Beat {
  /** Typed after a prompt, a key at a time */
  command?: string;
  /** Printed after the command, a line at a time */
  output?: string[];
  /** Wipe the window before this beat, as a scene change */
  clear?: boolean;
  /** Hit points shown in the prompt after this beat, if they changed */
  hp?: number;
}

export const prompt = (hp: number) => `{c<{x${hp}hp 100m 100mv{c>{x `;
export const startHp = 20;

export const beats: Beat[] = [
  {
    command: 'look',
    output: [
      '{WMarket Square{x',
      'The Market Square of Naerlan is no different that any other',
      'central point in any city within Tharel.  It is teeming with',
      'life as merchants, citizens and travelers all congregate to',
      'do business or simply chat.  A stone statue stands within a',
      'large basin at the heart of the square, watching over',
      'proceedings.',
      '{G[Exits:{x north east south west up{G]{x',
      '{yA Quaestor patrols the streets, looking for delinquents.{x',
      '{yA Naerlan guard wanders through the city at a leisurely pace.{x'
    ]
  },
  {
    command: 'school',
    output: [
      'Jarrel appears from a puff of {Yyellow{x smoke.',
      'Jarrel quickly grabs your hand.',
      '',
      '{GThe Main Foyer{x',
      'This large room is the entry hall to Jarrel Whitefire\'s',
      'training academy.  He and the former members of his',
      'adventuring troupe have settled down in this fair city to',
      'teach aspiring adventurers the ways of the sword and that of',
      'sorcery.',
      '{G[Exits:{x north south{G]{x'
    ]
  },
  {
    clear: true,
    command: 'look',
    output: [
      '{gThe Goblin\'s Lair{x',
      'It is actually quite difficult not to feel pity for the',
      'scrawny little goblin that lives here.  There are no',
      'belongings of any kind, well nothing except for a thin',
      'woolen blanket that he covers himself with when he goes to',
      'sleep.',
      '{G[Exits:{x south down{G]{x',
      '{gA {Dscrawny {glittle goblin stands here, trying to look inconspicuous.{x'
    ]
  },
  {
    command: 'kill goblin',
    hp: 19,
    output: [
      'Your slash {rwounds{x a {Dscrawny{x goblin for {R24{x hp.',
      'A {Dscrawny{x goblin\'s claw {rpokes{x you for {R1{x hp.',
      'Your slash {rmauls{x a {Dscrawny{x goblin for {R27{x hp!',
      'Your slash {rdecimates{x a {Dscrawny{x goblin for {R33{x hp!',
      'A {Dscrawny{x goblin\'s claw {wmisses{x you.',
      'Your slash {rinjures{x a {Dscrawny{x goblin for {R18{x hp.',
      '{RA scrawny goblin is DEAD!!{x',
      'You receive {W36{x experience points.',
      '{YYou raise a level!{x'
    ]
  }
];
