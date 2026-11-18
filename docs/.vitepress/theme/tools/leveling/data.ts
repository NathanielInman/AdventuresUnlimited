// Gear for the speed leveling guide (docs/guides/speed-leveling.md), one
// entry per stage. Each <LevelingGear stage="..." /> on the page shows one
// stage. Names, levels, stats and the zap flags are copied from the item data
// (data/items/*.json); recheck them there when the area files change.
//
// An item is for every alignment unless `for` says otherwise. `zaps` lists
// the alignments its anti-align flags knock it off (handler.c, equip_char).
// `keep` marks an item the player already has from an earlier stage.

export type Alignment = 'good' | 'neutral' | 'evil';

export const alignments: Alignment[] = ['good', 'neutral', 'evil'];

export type Slot =
  | 'light' | 'float' | 'head' | 'neck' | 'body' | 'about' | 'arms' | 'wrist'
  | 'hands' | 'finger' | 'waist' | 'legs' | 'feet' | 'shield' | 'held';

export interface GearItem {
  vnum: number;
  /** Item data file key, for the item search link */
  area: string;
  name: string;
  slot: Slot;
  /** Item level; a player can wear it from five levels below */
  level: number;
  count?: number;
  /** The item's applies, as identify lists them */
  stats: string;
  /** Who has it or sells it */
  source: string;
  zaps?: Alignment[];
  for?: Alignment[];
  /** Made of iron, which sylvan elves, heishan elves and frost giants can't wear */
  iron?: boolean;
  /** Most copies in the world */
  limit?: number;
  keep?: boolean;
  /** Player level to pick it up, when it differs from the stop's */
  at?: number;
  note?: string;
}

export interface GearStop {
  /** Player level, or range, to make the stop */
  at: string;
  area: string;
  /** Anchor on the areas page */
  anchor?: string;
  /** Speedwalk from Market Square in Naerlan */
  walk?: string;
  items: GearItem[];
}

export interface Stage {
  id: string;
  stops: GearStop[];
}

export const stages: Stage[] = [
  {
    id: 'survival',
    stops: [
      {
        at: '1',
        area: 'Survival Training',
        anchor: 'survival-training',
        walk: '2e1n',
        items: [
          { vnum: 3772, area: 'survivalTraining', name: 'a silver bracelet', slot: 'wrist', level: 8, count: 2, stats: '+1 wis, +1 int', source: 'Hidden on the floor of a sewer room: search for it, one per repop', note: 'Int and wis add mana and practices when you level, so wear these for each level-up and fight in the iron bracers. Wearable from level 3' },
          { vnum: 3780, area: 'survivalTraining', name: 'a leather girth', slot: 'waist', level: 6, stats: '+1 dam', source: 'Sold by Fthael for under a gold' },
          { vnum: 3776, area: 'survivalTraining', name: 'a jar of glowing bugs', slot: 'light', level: 1, stats: '+1 hit', source: 'Sold by Fthael' },
          { vnum: 3768, area: 'survivalTraining', name: 'a pair of rusty leg-guards', slot: 'legs', level: 6, stats: '+1 dam', source: 'Worn by the tired goblin miners', iron: true },
          { vnum: 3709, area: 'survivalTraining', name: 'a pair of clawed gloves', slot: 'hands', level: 0, stats: '+1 dam', source: 'Worn by the goblin guards' },
          { vnum: 3743, area: 'survivalTraining', name: 'a dented helmet', slot: 'head', level: 4, stats: '+1 dam', source: 'Worn by the muscular giant', iron: true },
          { vnum: 3745, area: 'survivalTraining', name: 'a pair of old boots', slot: 'feet', level: 4, stats: '+1 hit', source: 'Worn by the smiling warrior' },
          { vnum: 3755, area: 'survivalTraining', name: 'some rusty armguards', slot: 'arms', level: 5, stats: '+1 dam', source: 'Worn by the smiling warrior', iron: true },
          { vnum: 3746, area: 'survivalTraining', name: 'a rusty shield', slot: 'shield', level: 5, stats: '+1 dam', source: 'Worn by the smiling warrior' },
          { vnum: 3711, area: 'survivalTraining', name: 'a ragged cape', slot: 'about', level: 0, stats: '+1 dam', source: 'Worn by the water boy' }
        ]
      },
      {
        at: '2',
        area: 'Survival Training',
        anchor: 'survival-training',
        items: [
          { vnum: 3764, area: 'survivalTraining', name: 'a dented breastplate', slot: 'body', level: 7, stats: '+1 str', source: 'Worn by the angry goblin miner (it attacks first)', iron: true },
          { vnum: 3753, area: 'survivalTraining', name: 'an iron bracer', slot: 'wrist', level: 5, count: 2, stats: '+1 hit', source: 'Worn by the young acolytes', iron: true },
          { vnum: 3705, area: 'survivalTraining', name: 'a threadbare cloak', slot: 'neck', level: 0, count: 2, stats: '+1 dam', source: 'Worn by the goblin miners' }
        ]
      },
      {
        at: '3',
        area: 'Survival Training',
        anchor: 'survival-training',
        items: [
          { vnum: 3763, area: 'survivalTraining', name: 'a silver ring', slot: 'finger', level: 6, count: 2, stats: '+1 dam', source: 'The secret rings: hidden in a cave behind a hidden door at the bottom of the hole, one per repop' },
          { vnum: 3770, area: 'survivalTraining', name: 'a chunk of quartz', slot: 'float', level: 7, stats: '+1 hit', source: 'Worn by the diligent goblin miner' }
        ]
      }
    ]
  },
  {
    id: 'early-run',
    stops: [
      {
        at: '4',
        area: 'Lunatic\'s Alley',
        anchor: 'lunatics-alley',
        walk: '5w17s2e1n;open east;1e',
        items: [
          { vnum: 25388, area: 'lunaticsAlley', name: 'a small idol of Asteri', slot: 'held', level: 9, stats: '+1 str, +1 dam', source: 'Worn by Tol, who attacks on sight' },
          { vnum: 25387, area: 'lunaticsAlley', name: 'a pair of leather armbands', slot: 'arms', level: 8, stats: '+2 hit', source: 'Worn by the short clansmen and Tol' }
        ]
      },
      {
        at: '4-5',
        area: 'T\'leisins Pool',
        anchor: 'tleisins-pool',
        walk: '8w4s2w;search north;open n;1n2w2s',
        items: [
          { vnum: 12216, area: 'tleisinsPool', name: 'a pair of black fitted pants', slot: 'legs', level: 8, stats: '+2 dam', source: 'Worn by the T\'leisin gatherers in the pool' }
        ]
      },
      {
        at: '5',
        area: 'The Eastern Moors',
        anchor: 'eastern-moors',
        walk: '8e1n',
        items: [
          { vnum: 384, area: 'easternMoors', name: 'a pair of sturdy black boots', slot: 'feet', level: 10, stats: '+70 moves, +2 dam', source: 'Worn by the wandering explorers (level 5)', note: 'Beats the T\'leisin felt boots: +2 dam instead of +1, and 70 moves' }
        ]
      },
      {
        at: '5',
        area: 'Lunatic\'s Alley',
        anchor: 'lunatics-alley',
        items: [
          { vnum: 25382, area: 'lunaticsAlley', name: 'the shroud of deception', slot: 'head', level: 10, stats: '+3 hit', source: 'Worn by Kraeme (level 10). If you\'re strong; wearable from 5' }
        ]
      },
      {
        at: '5-6',
        area: 'MentMacro\'s Park, Naerlan',
        walk: '4e17s4w3e1n2u3s1d1s2e',
        items: [
          { vnum: 3267, area: 'naerlan', name: 'a rabbit\'s spirit', slot: 'float', level: 5, stats: '+3 hit, +2 dex', source: 'Carried by the rabbits; about two in three have one' },
          { vnum: 3272, area: 'naerlan', name: 'a feather necklace', slot: 'neck', level: 7, count: 2, stats: '+1 int, +2 hit', source: 'Worn by the singing birds; about one in two has one' }
        ]
      },
      {
        at: '6',
        area: 'Deltherian',
        anchor: 'deltherian',
        walk: '8e7n',
        items: [
          { vnum: 1993, area: 'deltherian', name: 'a mercenary battle standard', slot: 'light', level: 8, stats: '+1 con', source: 'Worn by the mercenary commander and captain (level 14)' }
        ]
      }
    ]
  },
  {
    id: 'ten',
    stops: [
      {
        at: '10',
        area: 'Hagarth',
        anchor: 'hagarth',
        walk: '4e17s4w9s2w2s1w1s',
        items: [
          { vnum: 6636, area: 'hagarth', name: 'a small jar of glow-moss', slot: 'light', level: 14, stats: '+3 hit', source: 'Sold by Daede for 5 gold; the dwarven miners wear them too' }
        ]
      },
      {
        at: '10',
        area: 'Naerlan',
        anchor: 'naerlan',
        walk: '5w7n2e1n1e;open east;1e1s',
        items: [
          { vnum: 3253, area: 'naerlan', name: 'a blue Elsfaren cape', slot: 'about', level: 15, stats: '+3 hit', source: 'Worn by Metes (level 15, hasted) in the Common Room', note: 'Replaces the river-troll hide from Grungel: +3 hit instead of +1 str, and no aggressive trolls' }
        ]
      },
      {
        at: '10',
        area: 'MentMacro\'s Park, Naerlan',
        walk: '4e17s4w3e1n2u3s1d1s2e1s1w1s2e;search south;1s',
        items: [
          { vnum: 3269, area: 'naerlan', name: 'a set of bear claws', slot: 'hands', level: 10, stats: '+2 dam, +1 dex', source: 'Worn by the very large bear in the hidden den' }
        ]
      },
      {
        at: '10',
        area: 'Shrine of Barbades',
        anchor: 'shrine-of-barbades',
        walk: '4e9n5w6n9e2n1w1n1w1u1w1n',
        items: [
          { vnum: 6208, area: 'shrineOfBarbades', name: 'a shining chest plate', slot: 'body', level: 15, stats: '+2 dam, +3 hit', source: 'Worn by the alert Sentinels' },
          { vnum: 6233, area: 'shrineOfBarbades', name: 'a golden helmet of courage', slot: 'head', level: 15, stats: '+1 dam, +2 hit', source: 'Worn by the alert Sentinels', zaps: ['evil'], for: ['good', 'neutral'], limit: 5 },
          { vnum: 25382, area: 'lunaticsAlley', name: 'the shroud of deception', slot: 'head', level: 10, stats: '+3 hit', source: 'Evil: keep the shroud from Lunatic\'s Alley, same +3 hit', for: ['evil'], keep: true }
        ]
      },
      {
        at: '10',
        area: 'Burrowholme',
        anchor: 'burrowholme',
        walk: '5w9n4e;open north;5n4w1n',
        items: [
          { vnum: 20730, area: 'burrowholme', name: 'a steel-banded shield', slot: 'shield', level: 13, stats: '+1 str, +1 hit', source: 'Worn by the Naerlanian guards' },
          { vnum: 20731, area: 'burrowholme', name: 'a steel-banded bracer', slot: 'wrist', level: 12, stats: '+1 hit, +1 dam', source: 'Worn by the Naerlanian guards' }
        ]
      },
      {
        at: '11',
        area: 'Naerlan',
        anchor: 'naerlan',
        items: [
          { vnum: 3364, area: 'naerlan', name: 'a copper ring', slot: 'finger', level: 16, count: 2, stats: '+1 dam, -1 saves, +2 hit', source: 'Worn by the Naerlan guards and patrol guards (level 15)' }
        ]
      }
    ]
  },
  {
    id: 'markov-gear',
    stops: [
      {
        at: '12',
        area: 'Burrowholme',
        anchor: 'burrowholme',
        items: [
          { vnum: 20717, area: 'burrowholme', name: 'a yellow cloak', slot: 'neck', level: 17, count: 2, stats: '+1 hit, +2 dam', source: 'Sold by Zel for 10 gold each' }
        ]
      },
      {
        at: '15',
        area: 'Haythor Dungeon',
        anchor: 'haythor-dungeon',
        walk: '8e7n1w1n1e2n3e1s1e1n1e2s1s2d1s1e1s',
        items: [
          { vnum: 18923, area: 'haythorDungeon', name: 'a ream bone bracer', slot: 'wrist', level: 20, count: 2, stats: '+1 hit, +3 dam', source: 'Worn by the large angry gargoyle; there is one, so it takes two visits' },
          { vnum: 18922, area: 'haythorDungeon', name: 'a pair of ream bone gauntlets', slot: 'hands', level: 20, stats: '+2 str, +2 dam', source: 'Worn by the same gargoyle' },
          { vnum: 18944, area: 'haythorDungeon', name: 'a leather belt with a skull insignia', slot: 'waist', level: 18, stats: '+3 dam, +2 hit', source: 'Worn by the tough orcs' }
        ]
      },
      {
        at: '17',
        area: 'Haythor Dungeon',
        anchor: 'haythor-dungeon',
        items: [
          { vnum: 18953, area: 'haythorDungeon', name: 'a pair of grey leather sandals', slot: 'feet', level: 22, stats: '+2 hit, +3 dam', source: 'Worn by the mean gargoyle (level 22)' }
        ]
      }
    ]
  },
  {
    id: 'avian-gear',
    stops: [
      {
        at: '23',
        area: 'The Avian Tree',
        anchor: 'avian-tree',
        walk: '4e9n5w6n9e2n1e1n',
        items: [
          { vnum: 20321, area: 'theAvianTree', name: 'an Aviak Wing Medallion', slot: 'neck', level: 26, count: 2, stats: '+50 moves, +3 hit, +1 dex', source: 'Worn by the hawk egrets' },
          { vnum: 20318, area: 'theAvianTree', name: 'an Aviak Talon Ring', slot: 'finger', level: 26, count: 2, stats: '+3 dam, +1 str', source: 'Worn by the hawk egrets' }
        ]
      },
      {
        at: '23',
        area: 'Mirage City',
        anchor: 'mirage-city',
        walk: '7e1d2s1e7s7e6n3e1n1e3s1e1s2e2n1e1n1e;go wall;3e1n1e1u1e1n1e;search up;1u1e;search;go pool;go mirage',
        items: [
          { vnum: 26933, area: 'mirageCity', name: 'a suit of silver armor', slot: 'body', level: 28, stats: '+4 dam', source: 'Worn by the heishan patrol guards and elite guards' },
          { vnum: 26938, area: 'mirageCity', name: 'silver greaves', slot: 'legs', level: 28, stats: '+5 hit, -1 int, +1 dex', source: 'Worn by the heishan patrol guards and elite guards' },
          { vnum: 26931, area: 'mirageCity', name: 'silver armguards', slot: 'arms', level: 28, stats: '+1 dam, +3 hit', source: 'Worn by the heishan patrol guards and elite guards' },
          { vnum: 26936, area: 'mirageCity', name: 'a silver bracer', slot: 'wrist', level: 28, stats: '+2 dam, +2 hit', source: 'Worn by the heishan patrol guards and elite guards' }
        ]
      },
      {
        at: '23',
        area: 'Mines of Noal\'xyn',
        anchor: 'mines-of-noalxyn',
        walk: '4e;open e;7e3s6e4s5e11e2e5s1e2s3w1s1w1s2w',
        items: [
          { vnum: 10044, area: 'minesOfNoalxyn', name: 'a spirit helmet', slot: 'head', level: 28, stats: '+2 hit, +4 dam', source: 'Worn by the good watchtower guard\'s spirit', zaps: ['evil', 'neutral'], for: ['good'], limit: 5 },
          { vnum: 10050, area: 'minesOfNoalxyn', name: 'a dark helmet', slot: 'head', level: 28, stats: '+4 dam, +2 hit', source: 'Worn by the evil watchtower guard\'s spirit', zaps: ['good', 'neutral'], for: ['evil'], limit: 5 }
        ]
      },
      {
        at: '23',
        area: 'Barreston',
        anchor: 'upper-barreston',
        walk: '5w9n4e6n6w3n2w3n2w',
        items: [
          { vnum: 12689, area: 'upperBarreston', name: 'an iron-plated helm', slot: 'head', level: 28, stats: '-2 AC, +4 hit', source: 'Worn by the alert Barreston gate guard (level 30) right where the walk ends', for: ['neutral'], iron: true, note: 'Both Noal\'xyn helmets zap neutral characters; this is the closest match' }
        ]
      },
      {
        at: '25',
        area: 'The Avian Tree',
        anchor: 'avian-tree',
        items: [
          { vnum: 20326, area: 'theAvianTree', name: 'Coatl gloves', slot: 'hands', level: 30, stats: '+5 hit, +2 dam', source: 'Worn by the coatl at the top of the tree', limit: 3 }
        ]
      },
      {
        at: '25',
        area: 'Mines of Noal\'xyn',
        anchor: 'mines-of-noalxyn',
        items: [
          { vnum: 10066, area: 'minesOfNoalxyn', name: 'lead boots', slot: 'feet', level: 30, stats: '+5 hit', source: 'Worn by Erilak, the slave overseer' },
          { vnum: 10076, area: 'minesOfNoalxyn', name: 'an iron tower shield', slot: 'shield', level: 30, stats: '+5 hit', source: 'Worn by Jeriehar and Jeroretlan', iron: true }
        ]
      }
    ]
  },
  {
    id: 'heishaer-gear',
    stops: [
      {
        at: '35',
        area: 'Eirenole',
        anchor: 'eirenole',
        walk: '4e9n5w6n6w3n2w3n2w1s1w1n10w3s5w4n3e11n6e8n1w4n2e1n;buy key;unlock north;open north;2n1e1n',
        items: [
          { vnum: 25173, area: 'eirenole', name: 'a green hunting cloak', slot: 'neck', level: 37, count: 2, stats: '+3 dam, +4 hit', source: 'Worn by the King\'s hunters and head hunter' }
        ]
      },
      {
        at: '35',
        area: 'Valeda',
        anchor: 'valeda',
        walk: '4e9n5w6n11e3n5e1n3e9n',
        items: [
          { vnum: 10845, area: 'valeda', name: 'a ruby ring, twisted with silver', slot: 'finger', level: 40, count: 2, stats: '+5 hit, +3 dam', source: 'Worn by the hurried pixie men (level 40)' },
          { vnum: 10870, area: 'valeda', name: 'a multicolored bag', slot: 'held', level: 39, stats: '+5 dam', source: 'Carried by the slender pixie tricksters' }
        ]
      },
      {
        at: '35',
        area: 'Schwartz Glacier',
        anchor: 'schwartz-glacier',
        walk: '4e17s4w7s2e1s2e1d2s1e1s2e5s1w2s2e1d2s1e4s5w',
        items: [
          { vnum: 3662, area: 'schwartzGlacier', name: 'a bright ball of snow', slot: 'light', level: 40, stats: '+2 dam, +4 hit', source: 'Sold by the clerk for about 52 gold' }
        ]
      },
      {
        at: '39',
        area: 'Valeda',
        anchor: 'valeda',
        items: [
          { vnum: 10834, area: 'valeda', name: 'a pair of brass-reinforced boots', slot: 'feet', level: 43, stats: '+2 str, +4 hit, +2 dam', source: 'Worn by the zipping pixie guards (level 43)' },
          { vnum: 10832, area: 'valeda', name: 'a zipping fly', slot: 'float', level: 43, stats: '+4 hit, +3 dam', source: 'Worn by the zipping pixie guards' }
        ]
      },
      {
        at: '40',
        area: 'Heishaer City',
        anchor: 'heishaer-city',
        walk: '7e1d2s1e7s7e6n3e1n1e3s1e1s2e2n2e;1d;search east;open east;1e',
        items: [
          { vnum: 13707, area: 'heishaerCity', name: 'a gold necklace', slot: 'neck', level: 45, count: 2, stats: '+6 dam, +6 hit', source: 'Hidden in a Kappa nest: search for it, one per repop' },
          { vnum: 13709, area: 'heishaerCity', name: 'a plain brown cape', slot: 'about', level: 41, stats: '-3 AC, +4 hit, +3 dam', source: 'Hidden in another Kappa nest' },
          { vnum: 13712, area: 'heishaerCity', name: 'a silver bracer', slot: 'wrist', level: 40, stats: '+3 dam, +4 hit', source: 'Hidden between the rocks near the paddlefish' }
        ]
      }
    ]
  },
  {
    id: 'castle-gear',
    stops: [
      {
        at: '45',
        area: 'Mystery Manor',
        anchor: 'mystery-manor',
        walk: '11e4n9e1s3e1n2e1n',
        items: [
          { vnum: 15074, area: 'mysteryManor', name: 'a burgundy velvet doublet', slot: 'body', level: 50, stats: '+4 hit, +7 dam', source: 'Worn by the spirit of Lord Ryger' },
          { vnum: 15073, area: 'mysteryManor', name: 'a garnet crusted shield', slot: 'shield', level: 50, stats: '+9 dam', source: 'Worn by the spirit of Lord Ryger', note: 'Replaces the royal Terrason shield, which zaps evil characters' },
          { vnum: 15096, area: 'mysteryManor', name: 'a falconer\'s lure', slot: 'wrist', level: 45, stats: '+10 hit', source: 'Worn by the falconer' },
          { vnum: 15079, area: 'mysteryManor', name: 'a long wooden ruler', slot: 'held', level: 46, stats: '+10 hit', source: 'Worn by the tutor' }
        ]
      },
      {
        at: '45',
        area: 'Heishaer City',
        anchor: 'heishaer-city',
        items: [
          { vnum: 13760, area: 'heishaerCity', name: 'an intricate bracer', slot: 'wrist', level: 50, stats: '+4 dam, +4 hit', source: 'Sold by Zamar for about 21 gold', note: 'Same stats as the royal Terrason bracers, without the anti-evil flag' }
        ]
      },
      {
        at: '45-48',
        area: 'Eirenole Castle',
        anchor: 'eirenole-castle',
        walk: '4e9n5w6n6w3n2w3n2w1s1w1n10w3s5w4n3e11n6e8n1w4n2e1n;buy key;unlock north;open north;2n7e1n',
        items: [
          { vnum: 15264, area: 'eirenoleCastle', name: 'forest green boots', slot: 'feet', level: 50, stats: '+6 hit, +4 dam, +3 dex', source: 'Worn by the fair-haired and Elsfaran hunters' }
        ]
      },
      {
        at: '48',
        area: 'Pyrainn Mountains',
        anchor: 'pyrainn-mountains',
        walk: '4e9n5w6n11e3n5e1n3e7n2w9n1w1n3w7n3w1s',
        items: [
          { vnum: 5724, area: 'pyrainnMountains', name: 'a finely crafted silvite ring', slot: 'finger', level: 52, count: 2, stats: '+4 dam, +4 hit, +1 dex, +1 str', source: 'Worn by Llander (level 50)' }
        ]
      },
      {
        at: '48-55',
        area: 'Eirenole Castle',
        anchor: 'eirenole-castle',
        items: [
          { vnum: 15239, area: 'eirenoleCastle', name: 'sleeves of chainmail', slot: 'arms', level: 53, stats: '+6 hit, +5 dam, +2 str', source: 'Worn by the watchtower guards', at: 48 },
          { vnum: 15237, area: 'eirenoleCastle', name: 'a royal blue tabard', slot: 'about', level: 52, stats: '+6 hit, +4 dam, +2 con', source: 'Worn by the royal herald', at: 48 },
          { vnum: 15242, area: 'eirenoleCastle', name: 'a plain leather sword sheath', slot: 'waist', level: 54, stats: '+7 hit, +7 dam', source: 'Worn by the watchtower guards', at: 49 },
          { vnum: 15257, area: 'eirenoleCastle', name: 'a coif of chainmail', slot: 'head', level: 55, stats: '+6 hit, +5 dam, +2 str', source: 'Worn by the vigilant watchtower guards', at: 50 },
          { vnum: 15234, area: 'eirenoleCastle', name: 'a white fur muff', slot: 'hands', level: 51, stats: '+5 hit, +4 dam, +3 wis', source: 'Worn by Queen Renisa', at: 51 }
        ]
      }
    ]
  },
  {
    id: 'kingdoms-gear',
    stops: [
      {
        at: '65',
        area: 'Tiny Rapids',
        anchor: 'tiny-rapids',
        walk: '4e9n5w6n6w3n2w3n2w1s1w1n10w3s9w1s3w1s4w1n10w1s1w3s6w',
        items: [
          { vnum: 17387, area: 'tinyRapids', name: 'sturdy knee-high leather boots', slot: 'feet', level: 68, stats: '+8 hit, +9 dam', source: 'Worn by the hunched warehouse worker' },
          { vnum: 17400, area: 'tinyRapids', name: 'supple leather gloves', slot: 'hands', level: 66, stats: '+2 con, +8 hit, +7 dam', source: 'Worn by the dignified and fun-loving patrons' }
        ]
      },
      {
        at: '65-70',
        area: 'Lost Kingdoms, west',
        anchor: 'lost-kingdoms',
        walk: '4e9n5w6n11e3n5e1n3e10n1e2n7e1n3e1n6e;go tree',
        items: [
          { vnum: 11752, area: 'lostKingdoms', name: 'a sandy shirt', slot: 'body', level: 71, stats: '+9 hit, +2 dex, +8 dam', source: 'Worn by the tanned heishan women and leather-skinned heishan men' },
          { vnum: 11753, area: 'lostKingdoms', name: 'sandy trousers', slot: 'legs', level: 71, stats: '+9 dam, +8 hit, -2 AC', source: 'Worn by the same heishan' },
          { vnum: 11756, area: 'lostKingdoms', name: 'a sandy cotton robe', slot: 'about', level: 70, stats: '+8 dam, +1 con, +9 hit', source: 'Worn by the lithe heishan girls' }
        ]
      },
      {
        at: '70',
        area: 'Tekkit Hill',
        anchor: 'tekkit-hill',
        walk: '11e2n5e1n11e1n2e4n2e1n6e',
        items: [
          { vnum: 10172, area: 'tekkitHill', name: 'a little gnomish doll', slot: 'held', level: 74, stats: '+10 hit, +10 dam, +2 dex', source: 'Worn by the little gnomish girls' },
          { vnum: 10173, area: 'tekkitHill', name: 'a small blue tunic', slot: 'body', level: 76, stats: '+10 hit, +10 dam, +2 str', source: 'Worn by the little gnomish boys, same part of the hill', note: 'Wearable from 71; a step up from the sandy shirt for everyone' }
        ]
      },
      {
        at: '70-75',
        area: 'Lost Kingdoms, west',
        anchor: 'lost-kingdoms',
        items: [
          { vnum: 11766, area: 'lostKingdoms', name: 'a brightly beaded leather belt', slot: 'waist', level: 72, stats: '+10 dam, +2 con, +10 hit', source: 'Worn by the robed heishan priestess', zaps: ['evil'], for: ['good', 'neutral'] },
          { vnum: 11775, area: 'lostKingdoms', name: 'a worn leather belt', slot: 'waist', level: 76, stats: '-10 AC, +8 hit, +5 dam', source: 'Worn by the thoughtful titan patron in the titan bar', for: ['evil'] },
          { vnum: 11764, area: 'lostKingdoms', name: 'a bone-studded black leather bracer', slot: 'wrist', level: 74, count: 2, stats: '+6 dam, -10 AC, +8 hit', source: 'Worn by the hawk-nosed well guard; one guard, so two visits' }
        ]
      },
      {
        at: '75',
        area: 'Shadowbox',
        anchor: 'shadowbox',
        walk: '4e9n5w6n11e3n5e1n3e7n2w9n1w1n3w7n11w4s2w1n',
        items: [
          { vnum: 19421, area: 'shadowbox', name: 'a black tunic of fine silk', slot: 'body', level: 76, stats: '+75 hp, +15 dam, +20 hit', source: 'Worn by Lurient (level 93)', zaps: ['good', 'neutral'], for: ['evil'] }
        ]
      }
    ]
  },
  {
    id: 'shadowbox-gear',
    stops: [
      {
        at: '86-89',
        area: 'Shadowbox',
        anchor: 'shadowbox',
        items: [
          { vnum: 19405, area: 'shadowbox', name: 'a mithril badge, marked \'Supervisor\'', slot: 'neck', level: 91, count: 2, stats: '+5 hit, +50 mana, +50 hp, +20 dam', source: 'Worn by the gnomish supervisors', limit: 5 },
          { vnum: 19435, area: 'shadowbox', name: 'a tin helmet', slot: 'head', level: 91, stats: '+11 dam, +17 hit', source: 'Worn by the tin soldiers' },
          { vnum: 19434, area: 'shadowbox', name: 'a tin bracer', slot: 'wrist', level: 92, stats: '+10 dam, +15 hit, +1 dex', source: 'Worn by the tin soldiers' },
          { vnum: 19431, area: 'shadowbox', name: 'a floating featherduster', slot: 'float', level: 93, stats: '+7 dam, +14 hit', source: 'Worn by the tiny humming maids' },
          { vnum: 19423, area: 'shadowbox', name: 'a black pair of satin hose', slot: 'legs', level: 94, stats: '+10 dam, +10 hit, +3 dex', source: 'Worn by Lurient', zaps: ['good', 'neutral'], for: ['evil'] },
          { vnum: 11753, area: 'lostKingdoms', name: 'sandy trousers', slot: 'legs', level: 71, stats: '+9 dam, +8 hit, -2 AC', source: 'Good and neutral: keep the sandy trousers, they are close', for: ['good', 'neutral'], keep: true }
        ]
      }
    ]
  },
  {
    id: 'hero-gear',
    stops: [
      {
        at: '100',
        area: 'Eirenole Valley',
        anchor: 'eirenole-valley',
        walk: '4e9n5w6n6w3n2w3n2w1s1w1n10w3s5w4n3e11n6e8n1w4n2e1n;buy key;unlock north;open north;2n1e9n2e5n',
        items: [
          { vnum: 21419, area: 'eirenoleValley', name: 'an emerald ring with an electrum band', slot: 'finger', level: 105, count: 2, stats: '-10 saves, +25 dam, +500 moves', source: 'Worn by the water elementals' },
          { vnum: 21416, area: 'eirenoleValley', name: 'some silver bangles with embedded emeralds', slot: 'arms', level: 105, stats: '-10 saves, +25 dam, +350 moves', source: 'Worn by the water elementals' },
          { vnum: 21415, area: 'eirenoleValley', name: 'a silver necklace with embedded emeralds', slot: 'neck', level: 105, count: 2, stats: '-10 saves, +25 hit, +15 dam', source: 'Worn by the ephydiads' },
          { vnum: 21428, area: 'eirenoleValley', name: 'a steel chestplate', slot: 'body', level: 105, stats: '+4 con, +30 dam, +17 hit', source: 'Worn by the King\'s Valley Guards at the entrance' },
          { vnum: 21423, area: 'eirenoleValley', name: 'a steel helmet', slot: 'head', level: 105, stats: '+3 str, +40 dam', source: 'Worn by the King\'s Valley Guards' },
          { vnum: 21424, area: 'eirenoleValley', name: 'a pair of steel gauntlets', slot: 'hands', level: 105, stats: '+4 dex, +40 hit', source: 'Worn by the King\'s Valley Guards' },
          { vnum: 21425, area: 'eirenoleValley', name: 'a steel shield', slot: 'shield', level: 105, stats: '+4 int, +25 hit, +25 dam', source: 'Worn by the King\'s Valley Guards' }
        ]
      },
      {
        at: '100',
        area: 'The Giants Outpost',
        anchor: 'giants-outpost',
        walk: '11e2n5e1n7e6n3w4n5w6n2e1n',
        items: [
          { vnum: 20417, area: 'theGiantsOutpost', name: 'a gauze robe', slot: 'about', level: 105, stats: '+25 dam, +30 hit', source: 'Worn by the camp followers' },
          { vnum: 20419, area: 'theGiantsOutpost', name: 'a leather belt', slot: 'waist', level: 105, stats: '+30 dam, +15 hit', source: 'Worn by Fraglax; only one reset in five loads it' },
          { vnum: 20412, area: 'theGiantsOutpost', name: 'a leather bracer', slot: 'wrist', level: 105, stats: '+200 hp, +100 mana, +15 hit, +20 dam', source: 'Worn by the drunk giant and the leering giants', zaps: ['evil'], for: ['good', 'neutral'] },
          { vnum: 19434, area: 'shadowbox', name: 'a tin bracer', slot: 'wrist', level: 92, stats: '+10 dam, +15 hit, +1 dex', source: 'Evil: keep the tin bracer from Shadowbox', for: ['evil'], keep: true }
        ]
      },
      {
        at: '100',
        area: 'Trouthead Town',
        anchor: 'trouthead-town',
        walk: 'From the Giants Outpost: 5n;open north;1n',
        items: [
          { vnum: 14255, area: 'troutheadTown', name: 'a pair of leather boots', slot: 'feet', level: 105, stats: '+30 hit, +25 dam', source: 'Worn by most of the townsfolk' },
          { vnum: 14325, area: 'troutheadTown', name: 'a pair of massive leg-plates', slot: 'legs', level: 101, stats: '+25 hit, +20 dam', source: 'Sold by Grablo for about 45 gold', note: 'Better than the giants\' leather greaves, and no fight' },
          { vnum: 14311, area: 'troutheadTown', name: 'a huge wicker basket', slot: 'held', level: 100, stats: '+20 dam, +15 hit', source: 'Sold by Bloo for 21 gold' },
          { vnum: 14330, area: 'troutheadTown', name: 'a steel lantern', slot: 'light', level: 105, stats: '+25 hit, +5 str, +5 con', source: 'Sold by Withen for about 62 gold' },
          { vnum: 14355, area: 'troutheadTown', name: 'a mystic lantern', slot: 'light', level: 105, stats: '+25 hit, +100 moves, +80 hp, +2 wis, +200 mana, infrared', source: 'Or take this off the mad herbalist (level 120)' }
        ]
      }
    ]
  }
];
