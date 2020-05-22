# AdventuresUnlimited
A collection of resources and information surrounding the Adventures Unlimited MUD

## Table of Contents
- [Directions](#directions)
  - [Areas](#areas)
  - [Quest Masters](#quest-masters)
  - [Trainers](#trainers)
  - [Tradesguilds](#tradesguilds)
- [Temple](#temple)
  - [Temple Rank Costs](#temple-rank-costs)
  - [Temple Upgrade Costs](#temple-upgrade-costs)
  - [Temple Healer Costs](#temple-healer-costs)
- [Entitlement](#entitlement)
  - [Housing Costs](#housing-costs)
- [Pets](#pets)
- [Classes](#classes)
  - [Race And Class Table](#race-and-class-table)
  - [Max Stats](#max-stats)
    - [Mage](#mage)
    - [Cleric](#cleric)
    - [Thief](#thief)
    - [warrior](#warrior)
    - [paladin](#paladin)
    - [charlatan](#charlatan)
    - [myrmidon](#myrmidon)
    - [antipaladin](#antipaladin)
    - [monk](#monk)
  - [Skill And Class Table](#skill-and-class-table)
  - [Spell And Class Table](#spell-and-class-table)
  - [Monk Details](#monk-details)
    - [Monk Mantras](#monk-mantras)
    - [Monk Fightstyles](#monk-fightstyles)
    - [Monk Abilities](#monk-abilities)
    - [Monk Chi](#monk-chi)
    - [Monk Stances](#monk-stances)
      - [leveling strategy](#leveling-strategy)
      - [viper](#viper)
      - [crane](#crane)
      - [crab](#crab)
      - [mongoose](#mongoose)
      - [bull](#bull)
      - [mantis](#mantis)
      - [dragon](#dragon)
      - [tiger](#tiger)
      - [swallow](#swallow)
      - [monkey](#monkey)
      - [grandmaster](#grandmaster)
    - [Monk Techniques](#monk-techniques)
    - [Monk Combos](#monk-combos)
- [Combat Calculations](#combat-calculations)
  - [Hitroll](#hitroll)
  - [Armor Class](#armor-class)
  - [Magic Saves](#magic-saves)
- [Quest Rewards](#quest-rewards)
- [Prompts](#prompts)
- [MUD Client Configuration](#mud-client-configuration)
  - [TinTin++](#tintin)
- [Potions Wands Staves & Scrolls](#potions-pills-wands-staves-and-scrolls)
- [Items For Leveling](#items-for-leveling)
  - [Light Items](#light-items)
  - [Head Armor](#head-armor)
  - [Neck Armor](#neck-armor)
  - [Shoulder / About Armor](#shoulder--about-armor)
  - [Torso / Body Armor](#torso--body-armor)
  - [Waist Armor](#waist-armor)
  - [Arms Armor](#arms-armor)
  - [Wrist Armor](#wrist-armor)
  - [Hand Armor](#hand-armor)
  - [Finger Armor](#finger-armor)
  - [Leg Armor](#leg-armor)
  - [Feet Armor](#feet-armor)
  - [Held Items](#held-items)
  - [Floater Items](#floater-items)

## Directions
All `directions` start from `Market Square` within `Naerlan`.

### Areas
The following are unlisted or possibly removed areas that may need to be removed or added to the `areas` list within the game:
- Plains of Blodai: 4e9n5w6n11e3n5e1n3e7n2w9n1w1n3w7n10w
- Ruined Gerighelm: 5w9n4e6n6w3n2w3n2w

Additional helpful maps on the [official website](tharel.net):
  - [Tharel](https://tharel.net/img/map-tharel.gif)
  - [Naerlan](https://tharel.net/img/map-naerlan.jpg)
  - [Naerlan: Out the East Gate](https://tharel.net/img/map-gate-east.png)
  - [Naerlan: Out the North Gate](https://tharel.net/img/map-gate-north.png)
  - [Naerlan: Out the South Gate](https://tharel.net/img/map-gate-south.png)
  - [Naerlan: Out the West Gate](https://tharel.net/img/map-gate-west.png)
  - [Dragon Sea Waterways](https://tharel.net/img/map-dragonsea.png)
  - [Northern & Caravan Roads](https://tharel.net/img/map-caravannorthernroads.png)
  - [Northern River Path](https://tharel.net/img/map-northernriverpath.png)
  - [Western Ocean Waterways](https://tharel.net/img/map-westernocean.png)
  - [The Western Road](https://tharel.net/img/map-westernroad.png)

| level | name | directions |
| --- | --- | --- |
| ALL | The Western Beaches | Unknown |
| ALL | [The Western Ocean](https://tharel.net/img/map-westernocean.png) | Unknown |
| ALL | The Western Coastline | Unknown |
| ALL | More Western Ocean | Unknown |
| ALL | The Western Trails | 42w2s |
| ALL | [The Western Road](https://tharel.net/img/map-westernroad.png) | 17w |
| ALL | Western Tharel | Unknown |
| OOC | The Lounge | 3n;go ooc |
| ALL | The Dwarven Forest | Unknown |
| ALL | Tucker's Hotel | 2w1s |
| ALL | Beaches | 5w17s5e7s2e1s2e1d2s1e1s2e5s1w2s2e1d2e1s1e1s |
| ALL | Underground Highway |  4e9n5w6n11e3n5e1n3e7n2w9n1w1n3w7n2w2n2d9s8w1s2w2s2w1s |
| ALL | The Neighborhood | Unknown |
| ALL | Ether | Unknown |
| ALL | [Naerlan](https://tharel.net/img/map-naerlan.jpg) | Starting Position |
| 1 - 5 | Survival Training | 2e1n |
| 1 - 20 | [Heishnum Desert](https://tharel.net/img/map-heishnumdesert.gif) | 4e;open east;7e3s6e4s2e1s |
| 1 - 20 | [The Eastern Moors](https://tharel.net/img/map-easternmoors.png) | 8e1n |
| 5 - 8 | [School of Faith](https://tharel.net/img/map-schooloffaith.gif) | 6w6s1w |
| 5 - 10 | T'leisins Pool | 8w4s2w;search north;open n;1n2w2s |
| 5 - 10 | The Stone Quarry | 14w1s |
| 5 - 10 | Nerezza | 7e1d2s1e7s7e2n3w |
| 5 - 10 | [Equinilis](https://tharel.net/img/map-equinilis.gif) | 12w4n1w |
| 5 - 10 | Lunatic's Alley | 5w17s2e1n |
| 5 - 10 | [Gypsy Camp](https://tharel.net/img/map-gypsycamp.jpg) | 8w2s |
| 5 - 10 | Naerlan Graveyard | 6w10s1w1s |
| 5 - 10 | Woodfell Forest | 5w9n4e;open north;6n3e1s |
| 5 - 15 | The Mines of Markov | 5w17s5e;open s;9s2w2s1w1n1u2n1u3n1u2w1unw2e1u3e2u8e1u1w2n |
| 5 - 15 | Shrine of Barbades | 4e9n5w6n9e2n1w1n1w1u |
| 5 - 15 | [Deltherian](https://tharel.net/img/map-deltherian.jpg) | 8e7n |
| 5 - 15 | Taverns of Naerlan | Unknown |
| 5 - 15 | [Travellers' Rest](https://tharel.net/img/map-travellersrest.gif) | 11e3s5w |
| 5 - 15 | Brovlancor | 4e9n5w6n6w8s2w1n2w4s1w4s2e1s |
| 5 - 30 | Naerlan Sewers | 4s2w1d |
| 5 - 40 | [The City of Aliuna](https://tharel.net/img/map-aliuna.png) | 11e3s6e4s5e |
| 8 - 22 | [Haythor Dungeon](https://tharel.net/img/map-haythordungeon.jpg) | 8e7n1w1n1e2n3e1s1e1n1e2s1s2ds1e1s |
| 10 - 15 | The Drow Mines | 4e9n5w6n11e3n5e1n3e7n2w9n1w1n3w7n2w2n |
| contin. | contin. | 2d9s8w1s2w2s2w1s1e2s1w1s2e1s |
| 10 - 15 | [Cartwrights Farm](https://tharel.net/img/map-cartwrightsfarm.gif) | 9w1d5n7w2n1e |
| 10 - 15 | [Volencymale](https://tharel.net/img/map-cathedralvolencymale.gif) | 12w4n1e |
| 10 - 15 | [The Renault House](https://tharel.net/img/map-renaulthouse.jpg) | 7w2n2w;search n |
| 10 - 15 | Bose'nisten | 5w9n4e6n6w2s |
| 10 - 15 | The Bog of Durlah | 7e1d2w2n12w2s |
| 10 - 15 | Hagarth | 4e17s4w9s2w2s1w1s |
| 10 - 20 | Tark Valley | 9w1d5n11w;open n;1n;open w;1w;open n;n |
| 10 - 20 | [Mt Ka'lri](https://tharel.net/img/map-mtkalri.png) | 4e9n5w6n6w8s2w1n2w4s1s;search west;open w;1qw |
| 10 - 20 | [Tzimosh's Camp](https://tharel.net/img/map-tzimoshscamp.jpg) | 5w9n4e6n11e3n1e1n |
| 10 - 20 | Hythian Forest | 5w17s5e;open south;7s2e1s2e1s2e1d2s1e1s1e |
| 10 - 20 | [Burrowholme](https://tharel.net/img/map-burrowholme.gif) | 5w9n4e;open north;5n4w1n |
| 10 - 20 | Goblin Stronghold | 5w9n4e6n6w2s4s2e;search s;2s2w1s2e3s |
| 10 - 20 | [Grungel](https://tharel.net/img/map-grungel.jpg) | 7e1d2s1e3s1w |
| 10 - 25 | [The Hand of Markov](https://tharel.net/img/map-handofmarkov.gif) | 7s4e10s4w9s2w2s2w |
| 10 - 30 | Illianathoren Pass | 8e7n1w1n1e5n3e3n4e |
| 10 - 30 | [Khetes](https://tharel.net/img/map-khetes.jpg) | 11e5n2e1s7e3n |
| 10 - 40 | [Northern Barreston](https://tharel.net/img/map-barreston.png) | 5w9n4e6n6w3n2w3n2w |
| 10 - 40 | [Lower Barreston](https://tharel.net/img/map-barreston.png) | 5w9n4e6n6w3n2w3n2w |
| 10 - 40 | [Upper Barreston](https://tharel.net/img/map-barrestonupper.png) | 5w9n4e6n6w3n2w3n2w |
| 13 - 30 | [Sanctuary](https://tharel.net/img/map-sanctuary.gif) | 7e1d2w2n9w5s2e2s2re |
| 13 - 50 | [Underdark](https://raw.githubusercontent.com/NathanielInman/AdventuresUnlimited/master/underdark.gif) | 4e9n5w6n3e2s1e1s2w |
| 15 - 25 | Littlefist Glade | 41w1s1w5s2w2s3w2n1w1n2w1s1w1n8w2n2w2s2w3n5w6n |
| 15 - 25 | [Jasporin](https://tharel.net/img/map-jasporin.jpg) | 5w9n4e6n6w2s6s2w1n1w3n |
| 15 - 25 | [Longbottom's Shire](https://tharel.net/img/map-longbottomsshire.gif) | 5w9n4e;open north;6n6w3n2w3n2e |
| 15 - 25 | Fidael's Lake | 9w2d5n2w1n |
| 15 - 25 | Zzukenathaft | 5w17s5e7s2e1s2e1d1w1s2d |
| 15 - 30 | Du'Rahath | 16w2s1e2s1e |
| 15 - 30 | Mines of Noal'xyn | 4e;open e;7e3s6e4s5e11e2e5s1e2s3w1s1w1s2w |
| 15 - 30 | Caldera Ruins | 16w2s4w |
| 15 - 30 | Shaolin Temple |  7e1d2s1e7s1w |
| 15 - 30 | Grungnison Catacombs | 5w17s5e9s2w2s1w1n2w1n1d |
| 20 - 20 | The Frozen Waste | 11e3s6e4s18e5s1e2s3w1s1w2s1w1s2w1n3w1n1w1n |
| contin. | contin. | 2w1s1w1s3w1n2w1n2w2s1w1s1e1s1e2s1e6s1w2s |
| 20 - 30 | Racomva | 5w17s5e7s2e1s2e1d3n1e1u2n |
| 20 - 30 | Mirage City | 11e3s6e4s2e4s1w1n1w1s2w3s1e1s1e3n3e1n1e3s1e1s2e2n |
| contin. | contin. | 2e1n5e1n1e1s1e1n2e4s1e2u1e1s2e;search up;1u1s;search;go pool;go mirage |
| 20 - 30 | [The Avian Tree](https://tharel.net/img/map-aviantree.png) | 4e9n5w6n9e2n1e1n |
| 20 - 30 | The Meridian | 11e3s6e4s23e2n4e |
| 20 - 35 | Dleivain | 4e9n5w6n9e2n4w1n1w1n;go door |
| 20 - 55 | Yrenelania | 8e7n1w1n1e4n2e4n8e1d1s2e;go crack;1e1n1e;search south |
| contin. | contin. | open south;1s3e1n2e2n3e |
| 25 - 30 | Goblin Pass | 4e9n5w6n11e3n5e1n3e7n2w9n1w1n3w7n2w1n |
| 25 - 35 | The Hamlet of Elsfar | 4e9n5w6n6w3n2w3n2w1s1w1n10w3s5w4n3e11n6e8n1w4n2e1n |
| 25 - 35 | Blackeye's Camp | 5w17s5e;open south;7s2e1s2e1s2e1d2s1e2s |
| 25 - 45 | Valeda | 4e9n5w6n11e3n5e1n3e9n |
| 30 - 40 | Castle of Burden | 4e9n5w6n11e3n5e1n3e7n2w9n1w1n3w7n1u |
| 30 - 40 | Whirlpool |  4e17s4w7s2e1s2e1d2s1e1s2e5s1w2s2e1d2s1e2s1e1w1s4e1s2e |
| 30 - 40 | R'tescra | 7e1d2w2n9w4s1e1s1e2s8e3s1w3s |
| 30 - 40 | Reskel | 4e9n5w6n11e3n5e1n3e8n1e |
| 30 - 45 | Quickling Village | 4e17s4w7s2e1s2e1d2s1e1s2e1s2e4s1e |
| 30 - 50 | Darathorn's Pit | 4e9n5w6n3e2s1e2s1w1n |
| 35 - 45 | The Sandcastle | 43w3n1w4n3w5n1s1e1n3w |
| 35 - 45 | Oterion | 7e1d2s1e9s4w1n3w |
| 35 - 45 | Eirenole | 4e9n5w6n6w3n2w3n2w1s1w1n10w3s5w4n3e11n6e8n1w4n2e1n |
| contin. | contin. | buy key;unlock north;open north;2n1e1n |
| 35 - 50 | Tyyrinn Village | 7e1d2s1e7s5e2s |
| 35 - 50 | [The City of Terrason](https://tharel.net/img/map-terrason.jpg) | 4e9n5w6n11e3n5e1n3e10n1e2n1w4n2e4n1w4n2e2n1e1n |
| 35 - 50 | Uchduruk | 11e4n4e1n1e |
| 40 - 45 | Eirenole Thistle | 4e9n5w6n6w3n2w3n2w1s1w1n10w3s5w4n3e11n6e8n1w4n2e1n |
| contin. | contin. | buy key;unlock north;open north;2n1e6n1e1n2e2s |
| 40 - 50 | The Four Seasons | 4s3w2s;go portrait |
| 40 - 50 | Schwartz Glacier | 4e17s4w7s2e1s2e1d2s1e1s2e5s1w2s2e1d2s1e4s5w |
| 40 - 50 | Mystery Manor | 11e4n9e1s3e1n2e1n |
| 40 - 55 | Pyrainn Mountains | 4e9n5w6n11e3n5e1n3e7n2w9n1w1n3w7n3w1s |
| 40 - 55 | Manthalaras | 4e17s4w7s2e1s2e1d5s1w1d1w1s1w;go waterfall |
| contin. | contin. | search north;open north;4n1e1n|
| 40 - 60 | Draek'le | 4e9n5w6n11e3n5e1n3e7n5w5s |
| 45 - 55 | Kaer Tzoun | 20w1n6w3n1w1u9w3n1u |
| 45 - 55 | Beehive | 4e17s4w7s2e1s2e1d2s1e1s2e5s5e2s3e;search south; |
| contin. | contin. | open south;2s1e2n5e;go beehive |
| 45 - 60 | Xuergothe Castle | 4e17s4w7s2e1s2e1d2s1e1s2e5s1w2s2e1d2s1e4s1w6s1w6s2u1s |
| 45 - 60 | Eirenole Castle | 4e9n5w6n6w3n2w3n2w1s1w1n10w3s5w4n3e11n6e8n1w4n2e1n |
| contin. | contin. | buy key;unlock north;open north;2n1e2n7e1n |
| 50 - 60 | Heishaer City | 7e1d2s1e7s7e6n3e1n1e3s1e1s2e2n2e |
| 50 - 60 | Breyard Village | 41w6s2w2s3w3n3w1s1w1n8w2n2w2s2w3n5w3s1w |
| 50 - 60 | The Acoma Estate | 7e1d2s1e9s1e |
| 55 - 65 | The Overlook Grounds | 4e9n5w6n11e3n5e1n3e7n5w4n4w2s1w |
| 55 - 65 | The Overlook Towers | 4e9n5w6n11e3n5e1n3e7n5w4n4w2s1w |
| 55 - 65 | Xe'lith | 4e9n5w6n11e3n5e1n3e7n5w4n2w2n6w1u1n1u2e1u |
| 55 - 70 | Ruins of Khezauch | 4e17s4w7s2e1s2e1d2s1e1s2e5s1w2s2e1d2s1e5s1w5s1w4s5e1n |
| 55 - 75 | Necropolis |  4e9n5w6n11e3n4e2s1w2s1e |
| 60 - 70 | Caranos' Tomb | 11e3s6e4s7e6s4e6s3w |
| 60 - 70 | [Rivendale](https://tharel.net/img/map-rivendale.gif) | 4e9n5w6n6w8s2w1n2w4s1w4s3w3s2w |
| 60 - 75 | Tiny Rapids | 4e9n5w6n6w3n2w3n2w1s1w1n10w3s9w1s3w1s4w1n10w1s1w3s6w |
| 60 - 85 | Lost Kingdoms | 4e9n5w6n11e3n5e1n3e10n1e2n7e1n3e1n6e;go tree |
| 65 - 75 | Forest of Dreams | 4e9n5w6n11e3n5e1n3e7n2w9n1w1n3w7n7w2s;go dream |
| 65 - 75 | The Overlook Maze | 11e2n5e1n7e6n3w4n5w4n4w2s12w |
| 65 - 75 | Gtharstu | 4e17s4w7s2e1s2e1d2s1e1s2e1s2e2s2e3s3e1n1e2n |
| 65 - 80 | The Forbidden Wastes | 4e17s4w9s2w2s1w7s2w1s3w |
| 65 - 80 | Ship in a Bottle | 39w |
| 70 - 80 | Connerty Crossing | 33w4n4w3n1w12n1e |
| 70 - 80 | Wildlife Refuge | 4e9n5w6n6w8s2w1n2w4s1w4s3w3s1e |
| 70 - 85 | Tekkit Hill | 11e2n5e1n11e1n2e4n2e1n6e |
| 70 - 85 | Ruins of Khezaderth | 11e3s6e4s18e1s2e |
| 70 - 85 | Meneth Naur |  7e1d2s1e7s9e1s |
| 70 - 90 | Fireblast Mountains | 11e2n5e1n7e6n3w4n5w4n4w3s2e1s1w1n2w2s1w |
| 75 - 85 | The Overlook Citadel | towers in corners of overlook grounds |
| 75 - 90 | Vlauchauch | 4e17s4w9s2w2s1w7s2w1s4w1s1w1s1w1s1w1s4w1s4w1n3w2n2w2s |
| 75 - 90 | The Haze | 7s2u |
| 75 - 100 | Drakyri Isle | 11e3s6e4s7e5n4e5n5e2s;go pool |
| 80 - 90 | Shadowbox | 4e9n5w6n11e3n5e1n3e7n2w9n1w1n3w7n11w4s2w1n |
| 85 - 95 | The White Shrine | 4e17s4w9s2w2s1w7s2w1s4w1s1w1s1w1s1w1s2w1s3w2s1w1s |
| 85 - 95 | Sildarak's Crypt | 4e17s4w7s2e1s2e1d2s1e1s2e5s1w2s |
| contin. | contin. | 2e1d2e1s1e1s1e1s2e1s3e1n2w2n1e1d |
| 85 - 110 | Urbyrtnol | 4e17s4w9s2w2s1w7s2w1s4w1s1w1s1w1s1w1u |
| 90 - 95 | Eirenole Valley | 4e9n5w6n6w3n2w3n2w1s1w1n10w3s5w4n3e11n6e8n1w4n2e1n | 
| contin. | contin. | buy key;unlock north;open north;2n1e9n2e5n |
| 90 - 110 | Ayasil | 4e17s4w7s2e1s2e1d2s1e1s2e5s1w2s2e1d2s1e5s1w5s1w4s5e1s3e |
| 90 - 110 | Arthmore | 11e2n5e1n7e6n3w4n5w4n4w1u |
| HERO | Kallenpesh Palace | inside kallendale forest |
| HERO | Kallendale Forest | 42w6s2w2s4w4s5w8s1w1s1e9s4w1n1w1n |
| HERO | The Hall of Heroes | See Aliuna & Terrason |
| HERO | Il'kaethe | 4e17s4w7s2e1s2e1d2s1e1s2e5s1w2s2e1d2s1e5s |
| contin. | contin. | 1w5s1w5s1w1n17w2s3w1s3w1s1w1s1w |
| HERO | The Giants Outpost | 11e2n5e1n7e6n3w4n5w6n2e1n |

### Quest Masters
| Alignment | Levels | Name | directions |
| --- | --- | --- | --- | 
| Good | 1-35 | Valerie | 3w1n1u1n |
| Good | 36-75 | Selinia | 11e4n9e2s2w1u1w1n1u |
| Good | 76-100 | Markaile | 4e9n5w6n6w8s2w1n2w1s1u1n1u1s1u1s |
| Neutral | 1-35 | Rovlan | 4s1w1s |
| Neutral | 36-75 | Denias | 4e9n5w6n6e2n1w1n;open up;1u |
| Neutral | 76-100 | Corlando | 11e3s6e4s7e5n4e5n1e2n1u1e1n |
| Evil | 1-35 | Varzola | 4s1e2n1d |
| Evil | 36-75 | Braime | 4e17s4w7s2e1s2e1d2s1e2n2e1s1u |
| Evil | 76-100 | Jioxo | 4e17s4w7s2e1s2e1d2s1e1s2e5s1w2s2e1d2w1u1s |

### Trainers
Barreston: myrmidon, mage
Rivendale: good cleric, paladin
Terrason: charlatan, thief, warrior, evil cleric, antipaladin
Aliuna: monk

### Tradesguilds
south east of aliuna, down in hargath.. south of erinole castle, east north of terrason

## Temple
A collection of helpful information related to AU temples

### Temple Rank Costs
| rank | good name | neutral name | evil name | devotion required |
| --- | --- | --- | --- | --- |
| 1 | follower | follower | follower | 0 |
| 2 | devotee | acolyte | disciple | 1,000 |
| 3 | benefactor | supporter | fanatic | 2,000 |
| 4 | protector | advocate | zealot | 4,000 |
| 5 | apostle | defender | conspirator | 10,000 |
| 6 | champion | guardian | fiend | 20,000 |
| 7 | Rha'sion | Nuy'dian | Tza'fiel | 30,000 |
| 8 | Kru'sion | Ley'dian | Rte'fiel | 50,000 |
| 9 | Pol'sion | Moy'dian | Ure'fiel | 70,000 |
| 10 | Ili'sion | Auy'dian | Ezt'fiel | 100,000 |

### Temple Upgrade Costs
The max upgradable amounts are:
  - **HP**: level * 4 + rank * 10
  - **MP**: level * 4 + rank * 10
  - **MV**: level * 10
  - **Hitroll**: level / 2 + rank# * 3
  - **Damroll**: level / 3 + rank# * 2

| rank | hp cost | wp cost | mv cost | hit cost | dam cost |
| --- | --- | --- | --- | --- | --- |
| 1: follower / follower / follower | - | - | - | - | - |
| 2: devotee / acolyte / disciple | - | - | 465g | - | - |
| 3: benefactor / supporter / fanatic | 1000g | 1000g | 415g | - | - |
| 4: protector / advocate / zealot | 950g | 950g | 365g | 2900g | - |
| 5: apostle / defender / conspirator | 900g | 900g | 315g | 2850g | 4800g |
| 6: champion / guardian / fiend | 850g | 850g | 265g | 2800g | 4750g |
| 7: Rha'sion / Nuy'dian / Tza'fiel | 800g | 800g | 215g | 2750g | 4700g |
| 8: Kru'sion / Ley'dian / Rte'fiel | 750g | 750g | 165g | 2700g | 4650g |
| 9: Pol'sion / Moy'dian / Ure'fiel | 700g | 700g | 115g | 2650g | 4600g |
| 10: Ili'sion / Auy'dian / Ezt'fiel | 650g | 650g | 65g | 2600g | 4550g |

### Temple Healer Costs
| name | description | cost |
| --- | --- | --- | 
| light | cure light wounds | 10g | 
| serious | cure serious wounds | 15g | 
| critic | cure critical wounds | 25g | 
| heal | healing spell | 50g | 
| blind | cure blindness | 20g | 
| disease | cure disease | 15g | 
| poison | cure poison | 25g | 
| uncurse | remove curse from equipment | 50g | 
| refresh | restore movement | 5g | 
| mana | restore mana | 10g | 
| bless | bless spell | 50g | 
| armor | armor spell | 15g | 

## Entitlement
| name | gold cost | equivalent qp cost | equivalent qp total |
| --- | --- | --- | --- |
| 1. Citizen | 10,000 | 3,000 | 3,000 |
| 2. Watcher/Seeker | 20,000 | 4,000 | 7,000 |
| 3. Master/Mistress | 30,000 | 5,000 | 12,000 |
| 4. Seneschal | 40,000 | 6,000 | 18,000 |
| 5. Lord/Lady | 50,000 | 7,000 | 25,000 |
| 6. Baron/Baroness | 60,000 | 8,000 | 33,000 |
| 7. Count/Countess | 70,000 | 9,000 | 42,000 |
| 8. Marquis/Marquise | 80,000 | 10,000 | 52,000 |
| 9. Duke/Duchess | 90,000 | 11,000 | 63,000 |

### Housing Costs
| description | diamonds | equivalent gold |
| --- | --- | --- |
| additional room heal rate 10% (to a max of 300%) | 125 | 13,750 |
| portal | 400 | 44,000 |
| lock upgrade (hard) | 200 | 22,000 from default easy |
| lock upgrade (infuriating) | 200 | 22,000 (44,000 from easy) |
| lock upgrade (implausible) | 200 | 22,000 (66,000 from easy) |
| lock upgrade (improbable) | 200 | 22,000 (88,000 from easy) |
| lock upgrade (impossible) | 200 | 22,000 (110,000 from easy) |
| lock level upgrade each (default level is 50)| 10 | 1,100 |
| lock level upgrade to max | 500 | 55,000 |
| furniture | 25 | 2,750 |
| fireplace | 50 | 5,500 |
| fountain (water) | 150 | 16,500 |
| fountain (other liquid) | 200 | 22,000 |
| redecoration | 20 | 2,200 |
| rekey a lock (not including replacement) | 250 | 27,500 |
| key replacement | 50 | 5,500 |
| wood door (default) | free | free |
| stone door | 50 | 5,500 |
| metal door | 100 | 11,000 |
| trough | 50 | 5,500 |
| crucible | 100 | 11,000 |
| anvil | 250 | 27,500 |
| workbench | 250 | 27,500 |
| forge | 500 | 55,000 |

## Pets
| name | level | cost | location |
| --- | --- | --- | --- |
| a large white rat | 1 | 0g10s | Naerlan |
| a scruffy dog | 3 | 0g90s | Naerlan |
| a boa constrictor | 5 | 2g50s | Naerlan |
| a hunting dog | 5 | 2g50s | Hand of Markov |
| a rottweiler | 7 | 4g90s | Naerlan |
| a timber wolf | 9 | 8g10s | Naerlan |
| a tabby cat | 10 | 10g0s | Hand of Markov |
| a small lion cub | 11 | 12g10s | Aliuna |
| the female human slave | 11 | 12g10s | The Underdark |
| a huge dog | 14 | 19g60s | Aliuna |
| a white chicken | 15 | 22g50s | Hand of Markov |
| a young serpent | 18 | 32g40s | Aliuna |
| the orc slave | 18 | 32g40s | The Underdark |
| the goblin slave | 18 | 32g40s | The Underdark |
| a male human slave | 19 | 36g10s | The Underdark |
| a huge, bloated spider | 20 | 40g0s | Hand of Markov |
| the kobold | 20 | 40g0s | The Underdark |
| a large vulture | 20 | 40g0s | Mirage City |
| a small bear cub | 21 | 44g10s | Aliuna |
| a crafty brown stoat | 22 | 48g40s | Northern Barreston |
| the elven slave | 24 | 57g60s | The Underdark |
| a giant scorpion | 25 | 62g50s | Mirage City |
| a black-skinned griffin | 25 | 62g50s | Terrason |
| an alert black and tan bloodhound | 26 | 67g60s | Northern Barreston |
| the dwarven slave | 26 | 67g60s | The Underdark |
| a large tarantula | 27 | 72g90s | Mirage City |
| a grey peregrine falcon | 30 | 90g0s | Northern Barreston |
| a small fire dragon | 30 | 90g0s | Terrason |
| a large cobra | 30 | 90g0s | Mirage City |
| a glowing-eyed serpent | 35 | 122g50s | Terrason |
| a weasel | 35 | 122g50s | A Quickling Village |
| a living whip of flame | 40 | 160g0s | Terrason |
| a ferret | 40 | 160g0s | A Quickling Village |
| a carrier pigeon | 40 | 160g0s | A Quickling Village |
| a snow-white polar bear | 40 | 160g0s | Lost Kingdoms |
| a spectre of light | 45 | 202g50s | Terrason |
| a fierce falcon | 45 | 202g50s | A Quickling Village|
| a  russet-colored fire-cat | 45 | 202g50s | Lost Kingdoms |
| an enchanted gauntlet of power | 50 | 250g0s | Terrason |
| a shaggy black wolf | 50 | 250g0s | Lost Kingdoms |
| a large-tusked wild pig | 55 | 302g50s | Lost Kingdoms |
| a mother needra | 55 | 302g50s | Rivendale |
| a writhing anaconda | 60 | 360g0s | Lost Kingdoms |
| a shatra bird | 60 | 360g0s | Rivendale |
| a beautiful snow cat | 65 | 422g50s | Lost Kingdoms |
| a blonde fox | 65 | 422g50s | Lost Kingdoms |
| a huge yalen sand-worm | 65 | 422g50s | Rivendale |
| a heishan batle-maid | 70 | 490g0s | Rivendale |
| an elemental guardian | 75 | 752g50s | Rivendale |

## Classes
### Race And Class Table

| races       | mage  | cleric | thief | warrior | antipaladin | paladin | charlatan | myrmidon | monk  |
| ---         | ---   | ---    | ---   | ---     | ---         | ---     | ---       | ---      | ---   |
| drow        | **✓** | **✓**  | **✓** | **✓**   | **✓**       |         |           |          | **✓** |
| duergar     | **✓** | **✓**  | **✓** | **✓**   | **✓**       |         |           | **✓**    |       |
| dwarf       | **✓** | **✓**  | **✓** | **✓**   |             | **✓**   |           | **✓**    | **✓** |
| fire giant  | **✓** | **✓**  |       | **✓**   |             |         |           |          |       |
| frost giant | **✓** |        |       | **✓**   |             |         |           | **✓**    |       |
| giant       |       | **✓**  |       | **✓**   |             | **✓**   |           |          |       |
| gnome       | **✓** | **✓**  | **✓** |         |             |         | **✓**     |          | **✓** |
| goblin      | **✓** | **✓**  | **✓** | **✓**   | **✓**       |         | **✓**     | **✓**    | **✓** |
| halfling    | **✓** |        | **✓** | **✓**   |             |         | **✓**     | **✓**    | **✓** |
| heishan elf | **✓** | **✓**  |       | **✓**   |             | **✓**   |           | **✓**    | **✓** |
| human       | **✓** | **✓**  | **✓** | **✓**   | **✓**       | **✓**   | **✓**     | **✓**    | **✓** |
| orc         | **✓** | **✓**  | **✓** | **✓**   | **✓**       |         |           | **✓**    |       |
| pixie       | **✓** | **✓**  | **✓** |         |             |         | **✓**     |          |       |
| quickling   | **✓** |        | **✓** |         |             |         | **✓**     |          | **✓** |
| river troll |       | **✓**  |       | **✓**   | **✓**       |         |           |          |       |
| sylvan elf  | **✓** | **✓**  | **✓** | **✓**   |             | **✓**   | **✓**     |          | **✓** |
| titan       | **✓** | **✓**  |       | **✓**   |             |         |           | **✓**    |       |

### Max Stats
All stats in the following sections are before armor or temple mark. Stats in parenthesis are the adjusted stats after accommodating for primary and secondary stats where primary stats adds 2 and secondary adds 1 to the base stat maximum.

#### Mage
* Primary Stat: `Intelligence`
* Secondary Stat: `Intelligence`

| races | HP | MP | MV | str | int | wis | dex | con |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| drow | 8200 | 5300 | 4800 | 17 | 20 (23) | 18 | 21 | 16 |
| duergar | 8575 | 5200 | 4450 | 20 | 16 (19) | 19 | 14 | 21 |
| dwarf | 8575 | 5200 | 4450 | 20 | 16 (19) | 19 | 14 | 21 |
| fire giant | 8425 | 5210 | 4550 | 20 | 18 (21) | 17 | 16 | 20 |
| frost giant | 8350 | 5200 | 4550 | 21 | 17 (21) | 18 | 16 | 19 |
| gnome | 8275 | 5270 | 4650 | 18 | 19 (22) | 20 | 18 | 17 |
| goblin | 8425 | 5270 | 4800 | 16 | 17 (20) | 18 | 21 | 19 |
| halfling | 8425 | 5190 | 4800 | 18 | 17 (20) | 17 | 21 | 19 |
| heishan elf | 8350 | 5240 | 4750 | 17 | 18 (21) | 18 | 20 | 18 |
| human | 8350 | 5240 | 4650 | 18 | 18 (21) | 18 | 18 | 18 |
| orc | 8575 | 5170 | 4550 | 21 | 15 (18) | 19 | 16 | 21 |
| pixie | 8200 | 5370 | 4700 | 16 | 21 (24) | 20 | 19 | 16 |
| quickling | 8125 | 5200 | 5000 | 17 | 18 (21) | 16 | 25 | 15 |
| sylvan elf | 8200 | 5300 | 2100 | 16 | 20 (23) | 18 | 21 | 16 |
| titan | 8425 | 5220 | 4550 | 20 | 18 (21) | 17 | 16 | 19 |

#### Cleric
* Primary Stat: `Wisdom`
* Secondary Stat: `Wisdom`

| races | HP | MP | MV | str | int | wis | dex | con |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| drow | 8950 | 4770 | 4800 | 17 | 20 | 18 (21) | 21 | 16 |
| duergar | 9325 | 4670 | 4450 | 20 | 16 | 19 (22) | 14 | 21 |
| dwarf | 9325 | 4670 | 4450 | 20 | 16 | 19 (22) | 14 | 21 |
| fire giant | 9250 | 4690 | 4550 | 20 | 18 | 17 (20) | 16 | 20 |
| giant | 9250 | 4620 | 4550 | 22 | 15 | 18 (21) | 15 | 20 |
| gnome | 9025 | 4780 | 4650 | 18 | 19 | 20 (23) | 18 | 17 |
| goblin | 9175 | 4680 | 4800 | 16 | 17 | 18 (21) | 21 | 19 |
| heishan elf | 9100 | 4710 | 4750 | 17 | 18 | 18 (21) | 20 | 18 |
| human | 9100 | 4710 | 4650 | 18 | 18 | 18 (21) | 18 | 18 |
| orc | 9325 | 4640 | 4550 | 21 | 15 | 19 (22) | 16 | 21 |
| pixie | 8950 | 4840 | 4700 | 16 | 21 | 20 (23) | 19 | 16 |
| river troll | 9325 | 4650 | 4550 | 20 | 16 | 18 (21) | 16 | 21 |
| sylvan elf | 8950 | 4770 | 4800 | 16 | 20 | 18 (21) | 21 | 16 |
| titan | 9175 | 4690 | 4550 | 20 | 18 | 17 (20) | 16 | 19 |

#### Thief
* Primary Stat: `Dexterity`
* Secondary Stat: `Dexterity`

| races | HP | MP | MV | str | int | wis | dex | con |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| drow | 8700 | 3210 | 4950 | 17 | 20 | 18 | 21 (24) | 16 | 
| duergar | 9075 | 3110 | 4600 | 20 | 16 | 19 | 14 (17) | 21 |
| dwarf | 9075 | 3110 | 4600 | 20 | 16 | 19 | 14 (17) | 21 |
| gnome | 8775 | 3220 | 4800 | 18 | 19 | 20 | 18 (21) | 17 |
| goblin | 8925 | 3120 | 4950 | 16 | 17 | 18 | 21 (24) | 19 |
| halfling | 8925 | 3100 | 4950 | 18 | 17 | 17 | 21 (24) | 19 |
| human | 8850 | 3150 | 4800 | 18 | 18 | 18 | 18 (21) | 18 |
| orc | 9075 | 3080 | 4700 | 21 | 15 | 19 | 16 (19) | 21 |
| pixie | 8700 | 3280 | 4850 | 16 | 21 | 20 | 19 (22) | 16 |
| quickling | 8625 | 3110 | 5100 | 17 | 18 | 16 | 25 (27) | 15 |
| sylvan elf | 8700 | 3210 | 4950 | 16 | 20 | 18 | 21 (24) | 16 |

#### Warrior
* Primary Stat: `Strength`
* Secondary Stat: `Strength`

| races | HP | MP | MV | str | int | wis | dex | con |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| drow | 9700 | 2710 | 4800 | 17 (20) | 20 | 18 | 21 | 16 |
| duergar | 10075 | 2610 | 4450 | 20 (23) | 16 | 19 | 14 | 21 |
| dwarf | 10075 | 2610 | 4450 | 20 (23) | 16 | 19 | 14 | 21 |
| fire giant | 10000 | 2630 | 4550 | 20 (23) | 18 | 17 | 16 | 20 |
| frost giant | 9925 | 2620 | 4550 | 21 (24) | 17 | 18 | 16 | 19 |
| giant | 10000 | 2560 | 4500 | 22 (25) | 15 | 18 | 15 | 20 |
| goblin | 9925 | 2620 | 4800 | 16 (19) | 17 | 18 | 21 | 19 |
| halfling | 9925 | 2600 | 4800 | 18 (21) | 17 | 17 | 21 | 19 |
| heishan elf | 9850 | 2650 | 4750 | 17 (20) | 18 | 18 | 20 | 18 |
| human | 9850 | 2650 | 4650 | 18 (21) | 18 | 18 | 18 | 18 |
| orc | 10075 | 2580 | 4550 | 21 (24) | 15 | 19 | 16 | 21 |
| river troll | 10075 | 2590 | 4550 | 20 (23) | 16 |18 | 16 | 21 |
| sylvan elf | 9700 | 2710 | 4800 | 16 (19) | 20 | 18 | 21 | 16 | 
| titan | 9925 | 2630 | 4550 | 20 (23) | 18 | 17 | 16 | 19 |

#### Paladin
* Primary Stat: `Wisdom`
* Secondary Stat: `Strength`

| races | HP | MP | MV | str | int | wis | dex | con |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| dwarf | 9575 | 3400 | 4450 | 20 (21) | 16 | 19 (21) | 14 | 21 |
| giant | 9500 | 3350 | 4500 | 22 (23) | 15 | 18 (20) | 15 | 20 |
| heishan elf | 9350 | 3440 | 4750 | 17 (18) | 18 | 18 (20) | 20 | 18 |
| human | 9350 | 3440 | 4650 | 18 (19) | 18 | 18 (20) | 18 | 18 |
| sylvan elf | 9200 | 3500 | 4800 | 16 (17) | 20 | 18 (20) | 21 | 16 |

#### Charlatan
* Primary Stat: `Dexterity`
* Secondary Stat: `Intelligence`

| races | HP | MP | MV | str | int | wis | dex | con |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| gnome |8525 | 4500 | 4750 | 18 | 19 (20) | 20 | 18 (20) | 17 |
| goblin | 8675 | 4400 | 4900 | 16 | 17 (18) | 18 | 21 (23) | 19 |
| halfling | 8675 | 4380 | 4900 | 18 | 17 (18) | 17 | 21 (23) | 19 |
| human | 8600 | 4430 | 4750 | 18 | 18 (19) | 18 | 18 (20) | 18 |
| pixie | 8450 | 4560 | 4800 | 16 | 21 (22) | 20 | 19 (21) | 16 |
| quickling | 8375 | 4390 | 5100 | 17 | 18 (19) | 16 | 25 (27) | 15 |
| sylvan elf | 8450 | 4490 | 4900 | 16 | 20 (21) | 18 | 21 (23) | 16 |

#### Myrmidon
* Primary Stat: `Intelligence`
* Secondary Stat: `Strength`

| races | HP | MP | MV | str | int | wis | dex | con |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| duergar | 9825 | 3420 | 4450 | 20 (21) | 16 (18) | 19 | 14 | 21 |
| dwarf | 9825 | 3420 | 4450 | 20 (21) | 16 (18) | 19 | 14 | 21 |
| frost giant | 9675 | 3430 | 4550 | 21 (22) | 17 (19) | 18 | 16 | 19 |
| goblin | 9675 | 3430 | 4800 | 16 (17) | 17 (19) | 18 | 21 | 19 |
| halfling | 9675 | 3410 | 4800 | 18 (19) | 17 (19) | 17 | 21 | 19 |
| heishan elf |9600 | 3460 | 4750 | 17 (18) | 18 (20) | 18 | 20 | 18 |
| human | 9600 | 3460 | 4650 | 18 (19) | 18 (20) | 18 | 18 | 18 |
| orc | 9825 | 3390 | 4550 | 21 (22) | 15 (17) | 19 | 16 | 21 |
| titan | 9675 | 3440 | 4550 | 20 (21) | 18 (20) | 17 | 16 | 19 |

#### Antipaladin
* Primary Stat: `Wisdom`
* Secondary Stat: `Strength`

| races | HP | MP | MV | str | int | wis | dex | con |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| drow | 9200 | 3500 | 4800 | 17 (18) | 20 | 18 (20) | 21 | 16 |
| duergar | 9575 | 3400 | 4450 | 20 (21) | 16 | 19 (21) | 14 | 21 |
| goblin | 9425 | 3410 | 4800 | 16 (17) |17 | 18 (20) | 21 | 19 |
| human | 9350 | 3440 | 4650 | 18 (19) | 18 | 18 (20) | 18 | 18 |
| orc | 9575 | 3370 | 4550 | 21 (22) | 15 | 19 (21) | 16 | 21 |
| river troll | 9575 | 3380 | 4550 | 20 (21) | 16 | 18 (20) | 16 | 21 |

#### Monk
* Primary Stat: `Dexterity`
* Secondary Stat: `Strength`

| races | HP | MP | MV | str | int | wis | dex | con |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| drow | 8450 | 3460 | 4900 | 17 (18) | 20 | 18 | 21 (23) | 16 |
| dwarf | 8825 | 3360 | 4550 | 20 (21) | 16 | 19 | 14 (16) | 21 |
| gnome | 8525 | 3470 | 4750 | 18 (19) | 19 | 20 | 18 (20) | 17 |
| goblin | 8675 | 3370 | 4900 | 16 (17) | 17 | 18 | 21 (23) | 19 |
| halfling | 8675 | 3350 | 4900 | 18 (19) | 17 | 17 | 21 (23) | 19 |
| heishan elf | 8600 | 3400 | 4850 | 17 (18) | 18 | 18 | 20 (22) | 18 |
| human | 8600 | 3400 | 4750 | 18 (19) | 18 | 18 | 18 (20) | 18 |
| quickling | 8375 | 3360 | 5100 | 17 (18) | 18 | 16 | 25 (27) | 15 |
| sylvan | 8450 | 3460 | 4900 | 16 (17) | 20 | 18 | 21 (23) | 16 |

### Skill And Class Table

| skills | mage | cleric | thief | warrior | antipaladin | paladin | charlatan | myrmidon | monk |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| archery | - | - | 20 | 20 | 20 | 20 | 20 | 20 | - |
| attune | - | - | - | - | - | - | - | 65 | - |
| axe | - | - | 1 | 1 | 1 | 1 | - | 1 | 1 |
| backstab | - | - | 12 | - | 17 | - | 20 | - | - |
| bash | - | - | - | 1 | 14 | 12 | - | 10| 21 |
| berserk | - | - | - | 18 | - | - | - | - | - |
| blind fighting | - | - | 42 | 36 | 70 | 70 | - | 60 | 40 |
| brew | 25 | 25 | - | - | - | - | 50 | - | - |
| butcher | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| calibrate | 50 | 50 | - | - | - | - | 50 | 50 | - |
| caltrops | - | - | 60 | - | - | - | - | - | - |
| campfire | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| charge | - | - | - | 62 | - | - | - | - | - |
| circle | - | - | 25 | - | - | - | - | - | - |
| cloak of divinity | - | 75 | - | - | - | - | - | - | - |
| cook | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| consecrate | - | 64 | -  | - | - | - | - | - | - |
| counter | - | - | - | 55 | 65 | 65 | - | 60 | 50 |
| critical strike | - | - | - | 50 | 60 | 60 | - | 55 | - |
| dagger | 1 | - | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| devote | - | - | - | - | - | 10 | - | - | - |
| direction sense | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| dirt kicking | - | - | 4 | 4 | 1 | - | 10 | 10 | 16 |
| disarm | - | - | 12 | 11 | 14 | 14 | 16 | 16 | 20 |
| dodge | 20 | 22 | 1 | 13 | 18 | 18 | 5 | 13 | 1 |
| dual wield | - | - | 42 | 25 | 29 | 29 | - | 32 | - |
| duress | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 |
| eavesdrop | - | - | 30 | - | - | - | - | - | - |
| empower | 65 | - | - | - | - | - | - | - | - |
| endow | - | 75 | - | - | - | - | - | - | - |
| enhanced damage | 45 | 30 | 25 | 1 | 25 | 25 | 18 | 20 | 15 |
| envenom | - | - | 10 | - | - | - | 14 | - | - |
| fast healing | 23 | 15 | 22 | 9 | 12 | 12 | 22 | 6 | 15 |
| fifth attack | - | - | - | 60 | 66 | 68 | - | 75 | - |
| firescrye | 47 | - | - | - | - | - | - | - | - |
| firewalk | - | - | - | - | - | - | - | 22 | - |
| fish | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| flail | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| fourth attack | - | - | 65 | 32 | 45 | 45 | - | 50 | - |
| haggle | 11 | 26 | 1 | 21 | 23 | 23 | 5 | 15 | 25 |
| hamstring | - | - | 40 | - | - | - | 55 | - | - |
| hand to hand | 35 | 15 | 20 | 12 | 13 | 13 | 25 | 20 | 1 |
| hide | - | - | 1 | 15 | - | - | 5 | - | 17 |
| holy touch | - | - | - | - | - | 55 | - | - | - |
| hunt | - | - | - | 30 | - | - | - | 40 | - |
| irongrip | - | - | - | 20 | - | - | - | - | - |
| kick | - | 12 | 14 | 8 | 10 | 7 | 14 | - | - |
| knock | - | - | 40 | - | - | - | 35 | - | - |
| lay hands | - | - | - | - | 1 | 1 | - | - | - |
| lore | 10 | 10 | 6 | 20 | 15 | 15 | 8 | 10 | 17 |
| mace | - | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| manabind | - | - | 50 | 60 | - | - | - | - | - |
| meditation | 6 | 6 | - | - | 10 | 10 | 10 | 8 | 1 |
| nerve | - | - | - | - | - | - | - | - | 20 |
| palm | - | - | 20 | - | - | - | 30 | - | - |
| parry | 22 | 20 | 13 | 1 | 10 | 9 | 15 | 1 | 10 |
| peek | - | - | 1 | - | - | - | 4 | - | - |
| pick lock | - | - | 7 | - | - | - | 10 | - | - |
| poison guard | - | - | 13 | - | - | - | - | - | - |
| polearm | - | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| pressure point | - | - | - | - | - | - | - | - | 45 |
| rescue | - | - | - | 5 | - | 1 | - | - | 25 |
| round | - | - | - | - | - | - | 15 | - | - |
| runecut | - | - | - | - | - | - | - | 52 | - |
| runeblade | - | - | - | - | - | - | - | 63 | - |
| runeforge | - | - | - | - | - | - | - | 60 | - |
| runesplit | - | - | - | - | - | - | - | 60 | - |
| scribe | 25 | 25 | - | - | - | - | 50 | - | - |
| scrolls | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| second attack | 30 | 24 | 15 | 7 | 16 | 14 | 20 | 15 | - |
| sharpen | - | - | 50 | 25 | - | - | - | - | - |
| shatter | - | - | - | - | - | - | - | - | 55 |
| shield block | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | - |
| silent casting | 40 | 55 | - | - | - | - | - | - | - |
| silent draw | - | - | 16 | - | - | - | 16 | - | - |
| sixth attack | - | - | - | 82 | - | - | - | - | - |
| sneak | - | - | 6 | 15 | - | - | 6 | 20 | 10 |
| spear | - | - | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| spell lore | 39 | 39 | - | - | 44 | 44 | 44 | 44 | - |
| spellcraft | 60 | 60 | - | - | - | - | - | - | - |
| staves | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| steadiness | - | - | 21 | - | - | - | - | - | - |
| steal | - | - | 5 | - | - | - | 6 | - | 30 |
| subterfuge | - | - | 15 | - | - | - | - | - | - |
| staff | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| sword | 1 | - | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| target | - | - | - | 53 | 72 | 72 | - | 72 | 64 |
| third attack | 52 | 47 | 32 | 18 | 30 | 30 | 37 | 27 | - |
| throwing | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| throwing axe | - | - | - | 151 | 151 | 151 | - | 151 | - |
| throwing dart | 151 | - | 151 | - | - | - | 151 | - | - |
| throwing knife | 151 | - | 151 | 151 | - | - | 151 | 151 | - |
| throwing needle | - | 151 | 151 | - | - | - | 151 | - | - |
| throwing spear | - | - | - | 151 | 151 | 151 | - | 151 | - |
| throwing shuriken | - | - | - | - | - | - | - | - | 151 |
| trip | - | - | 1 | 15 | 20 | - | 5 | 20 | - |
| wands | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| warcry | - | - | - | 14 | - | - | - | - | - |
| whip | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| whirlwind | - | - | - | 60 | - | - | - | - | - |
| whittle | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |

### Spell And Class Table

| spells | mage | cleric | thief | warrior | antipaladin | paladin | charlatan | myrmidon | monk |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| acid blast | 35 | - | - | - | - | - | 40 | 45 | - |
| acid breath | 40 | - | - | - | - | - | - | - | - |
| acid shield | 30 | - | - | - | - | - | 50 | - | - |
| arcane acid | - | - | - | - | - | - | - | 72 | - |
| arcane air | - | - | - | - | - | - | - | 83 | - |
| arcane bolt | - | - | - | - | - | - | - | 85 | - |
| arcane earth | - | - | - | - | - | - | - | 68 | - |
| arcane fire | - | - | - | - | - | - | - | 65 | - |
| arcane iceshard | - | - | - | - | - | - | - | 75 | - |
| arcane water | - | - | - | - | - | - | - | 78 | - |
| armageddon | - | - | - | - | 85 | - | - | - | - |
| armor | 9 | 3 | - | - | - | 6 | - | 12 | - |
| bless | - | 12 | - | - | - | 15 | - | - | - |
| blindness | 20 | 16 | - | - | 15 | - | - | 23 | - |
| blink | 41 | - | - | - | - | - | - | - | - |
| burning hands | - | - | - | - | - | - | 7 | - | - |
| call lightning | - | 24 | - | - | - | - | - | - |
| calm | 38 | 28 | 55 | - | - | 30 | 40 | - | - |
| cancellation | 20 | 30 | - | - | 33 | 33 | 25 | 27 | - |
| cause light | - | 1 | - | - | 1 | 2 | - | - | - |
| cause serious | - | 11 | - | - | 11 | 13 | - | - | - |
| cause critical | - | 19 | - | - | 20 | 24 | - | - | - |
| chain lightning | 55 | - | - | - | - | - | - | 65 | - |
| change sex | 65 | - | - | - | 40 | - | 48 | - | - |
| charm person | 28 | - | 40 | - | 25 | - | 30 | - | - |
| chill touch | 9 | - | - | - | - | - | 9 | 12 | - |
| colour spray | 22 | - | - | - | - | - | 18 | 20 | - |
| continual light | 14 | 12 | - | - | - | 13 | 14 | - | - |
| control weather | 29 | 24 | - | - | - | - | - | - | - |
| create food | 20 | 15 | - | - | - | 16 | 15 | - | - |
| create furniture | - | - | - | - | - | - | 10 | - | - |
| create rose | 23 | 16 | - | - | - | 5 | 20 | - | - |
| create spring | 21 | 17 | - | - | - | 28 | 18 | - | - |
| create water | 17 | 6 | - | - | - | 8 | 8 | - | - |
| cure light | - | 4 | - | - | 12 | 6 | - | - | - |
| cure blindness | - | 11 | - | - | - | 16 | - | - | - |
| cure serious | - | 12 | - | - | 20 | 15 | - | - | - |
| cure critical | - | 20 | - | - | 30 | 25 | - | - | - |
| cure disease | - | 22 | - | - | - | 26 | - | - | - |
| cure poison | - | 26 | - | - | - | 29 | - | - | - |
| curse | 25 | 21 | - | - | 24 | - | 32 | 35 | - |
| cyclone | 55 | 52 | - | - | - | - | - | 62 | - |
| burning hands | 8 | - | - | - | - | - | - | 9 | - |
| deathwind | - | 84 | - | - | - | - | - | - | - |
| demonfire | - | 52 | - | - | 56 | - | - | - | - |
| detect evil | 17 | 9 | - | - | - | 12 | - | - | - |
| detect good | 17 | 9 | - | - | - | - | - | - | - |
| detect hidden | 21 | 29 | - | - | 34 | 34 | 19 | 24 | - |
| detect invis | 14 | 20 | - | - | 25 | 25 | 12 | 16 | - |
| detect magic | 3 | - | - | - | - | 12 | 1 | 5 | - |
| detect poison | 22 | 13 | - | - | - | 18 | - | - | - |
| dispel evil | - | 25 | - | - | 12 | 24 | - | - | - |
| dispel good | - | 25 | - | - | 24 | - | - | - | - |
| dispel neutral | - | 25 | - | - | 24 | 25 | - | - | - |
| dispel magic | 28 | 11 | - | - | 12 | 44 | 50 | 35 | - |
| divine light | - | 73 | - | - | - | - | - | - | - |
| divine wrath | - | 85 | - | - | - | - | - | - | - |
| dome of respite | - | 85 | - | - | - | - | - | - | - |
| earthquake | - | 14 | - | - | 17 | 17 | - | - | - |
| earthshield | 30 | - | - | - | - | - | 50 | - | - |
| enchant armor | 13 | - | - | - | - | - | 14 | 18 | - |
| enchant weapon | 14 | - | - | - | - | - | 15 | 22 | - |
| energy drain | 26 | 32 | - | - | - | - | - | 31 | - |
| faerie fire | 7 | 3 | - | - | - | - | 8 | 9 | - |
| faerie fog | 17 | 33 | - | - | - | - | - | 19 | - |
| farsight | 14 | 16 | - | - | 17 | 17 | - | 25 | - |
| fire breath | 50 | - | - | - | - | - | 43 | - | - |
| fireball | 30 | - | - | - | - | - | 27 | 33 | - |
| fireproof | 18 | 15 | - | - | 20 | 20 | 14 | 18 | - |
| fireshield | 30 | - | - | - | - | - | 50 | - | - |
| flame sphere | - | 38 | - | - | - | 40 | - | - | - |
| flamestrike | - | 26 | - | - | 26 | 26 | - | - | - |
| floating disc | 7 | 17 | - | - | - | 18 | 3 | - | - |
| fly | 15 | 22 | - | - | 25 | 25 | 10 | 17 | - |
| frenzy | - | 24 | - | - | 24 | 24 | - | - | - |
| frost breath | 44 | - | - | - | - | - | - | - | - |
| gas breath | 52 | - | - | - | - | - | 50 | - | - |
| gate | 28  | 36 | - | - | - | - | 26 | 40 | - |
| giant strength | 14 | - | - | - | - | - | 10 | 20 | - |
| harm | - | 25 | - | - | 25 | 30| - | - | - |
| haste | 21 | - | - | - | - | - | 16 | 29 | - |
| heal | - | 30 | - | - | - | 35 | - | - | - |
| heat metal | - | 21 | - | - | 26 | 26 | - | - | - |
| holy word | - | 60 | - | - | 80 | 75 | - | - | - |
| iceshield | 30 | - | - | - | - | - | 50 | - | - |
| identify | 13 | 16 | - | - | 22 | 22 | 12 | 25 | - |
| imbue | - | 52 | - | - | - | - | - | - | - |
| infravision | 11 | - | - | - | - | - | 18 | 16 | - |
| infuse accuracy | 53 | - | - | - | - | - | 53 | - | - |
| infuse agility | 57 | - | - | - | - | - | 57 | - | - |
| infuse comprehension | 63 | - | - | - | - | - | - | 63 | - |
| infuse energy | 69 | 69 | - | - | - | - | - | - | - |
| infuse force | 55 | - | - | - | - | - | - | 55 | - |
| infuse fortitude | 59 | - | - | - | - | 59 | - | - | - |
| infuse health | 71 | - | - | - | 71 | 71 | - | - | - |
| infuse might | 61 | - | - | - | 61 | - | - | - | - |
| infuse protection | 51 | - | - | - | - | - | 51 | 51 | - |
| infuse stamina | 67 | 67 | - | - | 67 | 67 | 67 | 67 | - |
| infuse willpower | 65 | 65 | - | - | - | - | - | - | - |
| instill accuracy | 54 | - | - | - | - | - | 54 | - | - |
| instill agility | 58 | - | - | - | - | - | 58 | - | - |
| instill force | 56 | - | - | - | - | - | - | 56 | - |
| instill fortitude | 60 | - | - | - | - | 60 | - | - | - |
| instill might | 62 | - | - | - | 62 | - | - | - | - |
| invisibility | 9 | - | 20 | - | - | - | 5 | - | - |
| know alignment | 19 | 14 | - | - | 16 | 16 | - | - | - |
| lightning bolt | 17 | 23 | - | - | - | - | 21 | 25 | - |
| lightning breath | 49 | - | - | - | - | - | - | - | - |
| lightning shield | 30 | - | - | - | - | - | 50 | - | - |
| locate object | 16 | 23 | - | - | 26 | 26 | - | - | - |
| magic missile | 1 | - | - | - | - | - | - | - | - |
| mass healing | - | 50 | - | - | - | - | - | - | - |
| mass invis | 29 | - | 30 | - | - | - | 24 | - | - |
| mental toughness | 48 | - | - | - | - | - | - | - | - |
| meteor swarm | 77 | - | - | - | - | - | - | - | - |
| nexus | 45 | 40 | - | - | - | - | 40 | 50 | - |
| pass door | 31 | 42 | - | - | - | - | 26 | 36 | - |
| phase | 50  | - | - | - | - | - | - | - | - |
| plague | 27 | 21 | - | - | 27 | - | 32 | - | - |
| poison | 18 | 16 | - | - | 22 | - | 21 | - | - |
| portal | 35 | - | - | - | - | - | - | - | - |
| protection evil | 18 | 13 | - | - | - | 20 | - | - | - |
| protection good | 18 | 13 | - | - | 20 | - | - | - | - |
| protection neutral | 18 | 13 | - | - | 20 | 20 | - | - | - |
| psychic allergy | 66 | - | - | - | - | - | - | - | - |
| psychic agony | 85 | - | - | - | - | - | - | - | - |
| psychic stun | 53 | - | - | - | - | - | - | - | - |
| rap | 20 | - | - | - | - | - | 50 | - | - |
| ray of truth | - | 50 | - | - | - | 60 | - | - | - |
| recharge | 15 | - | - | - | - | - | 12 | 18 | - |
| refresh | 14 | 8 | - | - | 12 | 12 | 13 | 18 | - |
| regeneration | 70 | - | - | - | - | - | - | - | - |
| remove curse | - | 25 | - | - | 33 | 28 | - | - | - |
| resist acid | 33 | - | - | - | - | - | - | - | - |
| resist cold | 27 | - | - | - | - | - | - | - | - |
| resist earth | 21 | - | - | - | - | - | - | - | - |
| resist lightning | 36 | - | - | - | - | - | - | - | - |
| resist sound | 30 | - | - | - | - | - | - | - | - |
| resist water | 24 | - | - | - | - | - | - | - | - |
| restoration | - | 57 | - | - | - | - | - | - | - |
| resurrect | - | 50 | - | - | 60 | - | - | - | - |
| rope trick | - | - | - | - | - | - | 60 | - | - |
| sanctuary | 36 | 20 | - | - | 35 | 30 | - | - | - |
| shield | 10 | 25 | - | - | 25 | 25 | - | 30 | - |
| shocking grasp | 9 | - | - | - | - | - | 11 | 16 | - |
| silence | - | 39 | - | - | - | - | - | - | - |
| sleep | 10 | - | 15 | - | 15 | - | 5 | - | - |
| slow | 23 | 30 | - | - | 25 | - | 22 | 28 | - |
| spectral dagger | - | - | - | - | - | - | - | 67 | - |
| spectral edge | - | - | - | - | - | - | - | 41 | - |
| spectral sword | - | - | - | - | - | - | - | 62 | - |
| stone skin | 25 | 35 | - | - | 45 | 40 | - | - | - |
| teleport | 21 | 30 | - | - | - | - | 18 | 25 | - |
| translate | 40 | 55 | - | - | - | - | 44 | 44 | - |
| transmute | 43 | - | - | - | - | - | - | - | - |
| ventriloquate | 1 | - | 4 | - | - | - | 1 | - | - |
| water shield | 30 | - | - | - | - | - | 50 | - | - |
| wind shield | 30 | - | - | - | - | - | 50 | - | - |
| weaken | 17 | 23 | - | - | 17 | - | 16 | 18 | - |
| word of recall | 15 | 15 | - | - | 35 | 35 | 20 | 29 | - |

### Monk Details

#### Monk Mantras
| name | level | mana | awareness | body | combat | spirit | focus | description |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| spirit invisibility | 13 | 20 | 1 | 1 | 0 | 1 | 0 | invisibility |
| stone hands | 19 | 35 | 0 | 1 | 2 | 1 | 1 | +8% damage |
| spirit eyes | 22 | 20 | 2 | 0 | 0 | 2 | 1 | detect magic, invis, hidden (lvl 31) |
| stone skin | 29 | 20 | 2 | 2 | 0 | 0 | 1 | | ac self buff |
| levitate | 30 | 30 | 0 | 2 | 0 | 2 | 2 | fly |
| strength enhance | 37 | 30 | 2 | 3 | 0 | 2 | 0 | giant strength |
| metabolize | 37 | 30 | 2 | 3 | 2 | 2 | 0 | haste, cure poisons & chill touch |
| know object | 37 | 20 | 2 | 0 | 0 | 3 | 3 | identify item |
| iron hands | 39 | 50 | 0 | 2 | 3 | 2 | 0 | +17% damage |
| celestial path | 45 | 25 | 4 | 3 | 0 | 3 | 3 | limited gate to adjacent areas & norecall |
| know speech | 42 | 20 | 2 | 0 | 0 | 3 | 3 | translate |
| steel hands | 59 | 50 | 2 | 2 | 3 | 2 | 2 | +25% damage |
| life cloak | 60 | 50 | 3 | 3 | 0 | 3 | 2 | regenerate |
| healing touch | 65 | 100 | 2 | 3 | 0 | 2 | 2 | heal target regardless of location |
| harden | 65 | 80 | 4 | 4 | 4 | 4 | 4 | halves non-exotic damage |
| flaming hands | 79 | 50 | 2 | 3 | 3 | 3 | 2 | +33% damage |
| spirit hands | 99 | 50 | 4 | 4 | 4 | 4 | 0 | +40% damage |

#### Monk Fightstyles
| name | level | requirements | damage | slottable | description |
| --- | --- | --- | --- | --- | --- |
| knee | 1 | none | 117% | 4 | basic attack |
| punch | 1 | none | 117% | 4 | basic attack |
| elbow | 1 | none | 117% | 4 | basic attack |
| kick | 1 | none | 117% | 4 | basic attack |
| bodyblow | 10 | none | 100% | 4 | basic attack |
| trip | 10 | none | 117% | 4 | trip affect, affected by player & enemy dex & haste |
| stamp | 17 | kick | 100% | 3 | failable, subtracts between 25 & 50 move from enemy |
| swiftkick | 18 | kick | 100% | 3 | basic attack |
| grapple | 23 | bodyblow | 133% | 2 | failable player strength vs enemy dex |
| hook | 24 | none | 100% | 2 | basic attack |
| charge | 26 | bodyblow | 100% | 2 | basic attack |
| backfist | 27 | bodyblow, punch | 133% | 2 | basic attack |
| uppercut | 31 | grapple, punch | 100% | 2 | failable pllayer vs enemy dex |
| forearm | 34 | punch, charge | 133% | 2 | basic attack |
| hurl | 42 | bodyblow, punch | 100% | 1 | basic attack |
| jumpkick | 49 | kick, bodyblow | 133% | 1 | basic attack |
| hammer | 49 | kick, charge | 100% | 1 | basic attack |
| sweep | 51 | kick, bodyblow | 133% | 1 | basic attack |
| spinkick | 55 | sweep | 133% | 1 | basic attack |
| headbutt | 57 | none | 133% | 1 | basic attack |

#### Monk Abilities
| level | requirements |
| --- | --- |
| 1 | 10 practices |
| 15 | 20 practices |
| 30 | 30 practices |
| 45 | 40 practices | 

**Awareness**
> Awareness has no affect and is only a requirement for mantras.

**Combat**
- Combat 1
  - 90% chance for extra attack if player level 6 or above
  - 15% chance to  prevent blind fighting from reducing number of attacks by 30%
  - 20% resistant to each attack above 4+ during PK
  - hitroll and damroll bonus
    - For players less than level 51: +3 hitroll, +3 damroll
    - For players greater than level 50: 10% * level + 5dam & hitroll
- Combat 2
  - 90% chance for extra attack #1 if player level 6 or above
  - 75% chance for extra attack #2 if player level 6 or above
  - 30% chance to  prevent blind fighting from reducing number of attacks by 30%
  - 40% resistant to each attack above 4+ during PK
  - hitroll and damroll bonus
    - For players less than level 51: +6 hitroll, +6 damroll
    - For players greater than level 50: 10% * level + 10dam & hitroll
- Combat 3
  - 90% chance for extra attack #1 if player level 6 or above
  - 75% chance for extra attack #2 if player level 16 or above
  - 60% chance for extra attack #3 if player level 31 or above
  - 45% chance to  prevent blind fighting from reducing number of attacks by 30%
  - 60% resistant to each attack above 4+ during PK
  - hitroll and damroll bonus
    - For players less than level 51: +9 hitroll, +9 damroll
    - For players greater than level 50: 10% * level + 15dam & hitroll
- Combat 4
  - 90% chance for extra attack #1 if player level 6 or above
  - 75% chance for extra attack #2 if player level 16 or above
  - 60% chance for extra attack #3 if player level 31 or above
  - 35% chance for extra attack #4 if player level 51 or above
  - 60% chance to  prevent blind fighting from reducing number of attacks by 30%
  - 80% resistant to each attack above 4+ during PK
  - hitroll and damroll bonus
    - For players less than level 51: +12 hitroll, +12 damroll
    - For players greater than level 50: 10% * level + 20dam & hitroll
    
**Focus**
- Focus 1
  - 50% chance to gain chi
  - 10% to maintain chi each tick outside battle
  - 25% to maintain chi when out of mana
  - 10 - 25% resistance to losing chi from bash during PK
- Focus 2
  - 60% chance to gain chi
  - 30% to maintain chi each tick outside battle
  - 45% to maintain chi when out of mana
  - 20 - 50% resistance to losing chi from bash during PK
- Focus 3
  - 70% chance to gain chi
  - 50% to maintain chi each tick outside battle
  - 65% to maintain chi when out of mana
  - 30 - 75% resistance to losing chi from bash during PK
- Focus 4
  - 80% chance to gain chi
  - 70% to maintain chi each tick outside battle
  - 85% to maintain chi when out of mana
  - 40 - 100% resistance to losing chi from bash during PK
  
**Body**
- Focus 1: 10% * level lower AC
- Focus 2: 20% * level lower AC
- Focus 3: 30% * level lower AC
- Focus 4: 40% * level lower AC

**Spirit**
> Spirit has no affect and is only a requirement for mantras.

#### Monk Chi

**CHI 1**: Player Level 1
  - free to train
  - consumes 5 mana per hit
  - +5% + level / 5 damage
  - +1% to dodge & parry
  - -1% enemy shieldblock, dodge & parry

**CHI 2**: Player Level 11
  - costs 10 trains
  - consumes 10 mana per hit
  - **usage of pressure point**
  - +10% + level / 5 damage
  - +1% to dodge & parry
  - -2% enemy shieldblock, dodge & parry

**CHI 3**: Player Level 21
  - costs 15 trains
  - consumes 15 mana per hit
  - **usage of pressure point**
  - 75% chance for +30% + level / 5 damage
  - +1% to dodge & parry
  - -3% enemy shieldblcok, dodge & parry
  - chance to add 2 attacks

**CHI 4**: Pllayer Level 31
  - costs 20 trains
  - costs 20 mana per hit
  - **usage of pressure point**
  - 75% chance for +40% + level / 5 damage
  - +1% to dodge & parry
  - -4% enemy shieldblock, dodge & parry
  - chance to add 2 attacks

**CHI 5**: Player Level 41
  - costs 25 trains
  - costs 25 mana per hit
  - **usage of pressure point**
  - 75% chance for +75% + level / 5 damage
  - +2% to dodge & parry
  - -5% enemy shieldblock, dodge & parry
  - chance to add 3 attacks

**CHI 6**: Player level 51
  - costs 30 trains
  - costs 30 mana per hit
  - **usage of pressure poinnt**
  - 65% chance for +90% + level / 5 damage
  - +2% to dodge & parry
  - -6% enemy shieldblock, dodge & parry
  - chance to add 4 attacks

#### Monk Stances
Stances take exactly 25 improvements to advance in skill level and have 9 ranks of mastery. You can rank up a stance every level. You can grandmaster 1 stance per 8 levels. This limit disappears at level 50. You can therefor unlock grandmaster stance and grandmaster it at level 50. You can reach this goal even if you train no stances until level 50 as it is accumulatively unlocked.

Every hit has a possibility to check for improvement:
```
percent chance (0-100): 4 * int + level) / 10
```

If possibility is unlocked it checks for improvement:
```
apprentice: 75 - 100%
trainee: 50 - 75%
student: 25 - 50%
fairly experienced: 1 - 25%
well trained & above: 1%
```

1. apprentice
2. trainee
3. student
4. fairly experienced
5. well trained
6. highly skilled
7. expert
8. master
9. grandmaster

##### Leveling Strategy
One leveling strategy is to work on the worst stances first as monks get increasingly difficult to level until they unlock pressure point (45) and counter (50).

1. (1-8) Crane - (worst stance, does nothing knock it out first)
2. (9-16) Mongoose
3. (17-24) Monkey
4. (25-32) crab
4. (33-40) Viper
5. (41-48) Bull
6. (49-50) tiger
7. (50) swallow - only useful after lvl 45 pressure point
8. (50) mantis - only useful after lvl 50 counter
10. (50) dragon - only useful after lvl 50 counter
11. (50) grandmaster

##### Viper 
- starter stance
- allow grapple fightstyle to work if target is flying
- allow trip fightstyle to work if target is flying
- up to 50% at grandmaster to +10% success on disarm
- up to 50% at grandmaster to add 1 extra attack
- up to 17% at grandmaster to dodge
- up to 10% increased chance at grandmaster to apply pressure point

##### Crane
- starter stance
- allow trip fightstyle to work if target is flying

##### Crab
- starter stance
- DECREASE chance of uppercut fightstyle success by 25%
- up to 17% at grandmaster to parry

##### Mongoose
- starter stance
- allow grapple fightstyle to force resting position on target if they're flying
- up to 17% at grandmaster to dodge
- up to 10% increased chance at grandmaster to apply pressure point

##### Bull
- starter stance
- +73% damage
- **DECREASE** chance of uppercut fightstyle success by 25%
- **DECREASE** chance to counter by 5 - 10%

##### Mantis
- requires crane and viper grandmastered
- up to 50% at grandmaster to add 1 extra attack
- +10-15% chance to counter

##### Dragon
- requires bull and crab grandmastered
- +80% damage
- **DECREASE** chance of uppercut fightstyle success by 25%
- allow trip fightstyle to work if target is flying
- +5-10% chance to counter
- up to 50% at grandmaster to have 75% for 1 extra attack & 50% for 2 extra attacks, and 25% for 3 extra attacks

##### Tiger
- requires bull and viper grandmastered
- +89% damage
- up to 50% at grandmaster to have 75% for 1 extra attack & 50% for 2 extra attacks

##### Swallow
- requires mongoose and crab grandmastered
- up to 10% increased chance at grandmaster to apply pressure point
- **DECREASE** chance to counter by 10 - 15%

##### Monkey
- requires crane and mongoose grandmastered
- +33% damage
- up to 50% at grandmaster to +15% success on disarm

##### Grandmaster
- requires mantis, dragon, tiger, swallow & crane grandmastered
- +100% damage
- (requires level 60) up to 50% at grandmaster to have 60% for 1 extra attack & 50% for 2 extra attacks, and 30% for 3 extra attacks
- up to 10% increased chance at grandmaster to apply pressure point
- +15-20% chance to counter
- up to 17% at grandmaster to parry
- up to 17% at grandmaster to dodge
- up to 50% at grandmaster to +20-25% success on disarm

#### Monk Techniques
Some techniques may require either fightstyles or other techniques to learn.
| name | level | requirements | damage |
| --- | --- | --- | --- |
| thrust kick | 12 | kick (fightstyle), bodyblow (fightstyle) | 200% |
| knee | 17 | knee (fightstyle) | 200% |
| elbow | 23 | punch (fightstyle), thrust kick (technique) | 200% |
| shin kick | 27 | kick (fightstyle), stamp (fightstyle) | 200% |
| back fist | 33 | backfist (fightstyle), elbow (technique) | 200% |
| palm strike | 39 | backfist (technique) | 200% |
| sweep | 43 | shin kick (technique) | 225% |
| spin kick | 61 | spinkick (fightstyle), thrust kick (technique) | 200% |
| double punch | 67 | punch (fightstyle), backfist (fightstyle) | 200% |
| triple kick | 73 | kick (fightstyle), spinkick (fightstyle) | 225% |

#### Monk Combos
The absolute key to mastering monk combat is leveraging all the techniques to perform combinations that deliver drastic effect.

| lvl available | name | combo (required aura) | damage | other |
| --- | --- | --- | --- | --- |
| 17 | knee spike | thrust kick, knee | 225% | |
| 23 | knock | knee, elbow, thrust kick | 200% on chi/2 attacks | chi5+ chance to knock |
| 27 | elbow strike | shin kick, thrust kick, elbow | 225% on chi attacks | |
| 33 | back fist | elbow, back fist | 200% on chi attacks | |
| 39 | palm strike | back fist, palm strike | 200% on chi attacks | |
| 39 | silence | elbow, palm strike | 200% | 60% in chi3 or above to silence |
| 39 | elbow strike | palm strike, elbow | 225% on chi/2 attacks | |
| 43 | trip | shin kick, sweep | 200% + 225% | 100% stun at chi6 |
| 43 | leg sweep | sweep, shin kick | 200% + 225% | 100% stun at chi6 |
| 61 | thrust kick | spin kick, thrust kick | 200% on chi/2 attacks | |
| 61 | lightning kick | thrust kick, thrust kick, spin kick | 225% on chi+1 attacks | |
| 61 | palm strike | spin kick, back fist, palm strike | 200% on chi x 3/2 attacks | |
| 61 | flurry spin | palm strike, spin kick, sweep | 200% + 200% on chi/2 attacks | |
| 67 | firefist | back fist, elbow, double punch | 225% on chi/2 attacks | |
| 67 | glowfist | elbow, elbow, double punch | 225% on chi attacks | |
| 67 | firefist | double punch, double punch | 225% on chi attacks | |
| 73 | forcekick | thrust kick, thrust kick, triple kick | 225% on chi attacks | |
| 73 | lightning kick | triple kick, double kick, spin kick | 225% on chi x 3/2 attacks | |

## Combat Calculations
### Hitroll
Since 95% is the maximum allowed hitchance, the recommendation is the find a worst case scenario for achieving a good hit chance, acquiring that much hitroll if feasible and then dumping the rest into other stats instead of wasting extraneous hitroll on armor.
```
Dexterity bonus: playerDexterity - enemyDexterity/2
Strength bonus: playerStrength/4
Intelligence bonus: playerIntelligence/10
Level bonus: (playerLevel - enemyLevel)/2
Hitroll bonus: hitroll / (playerLevel / 10) + 1
Rested bonus:
  0 - 50% Rested: - randomNumberBetween(4,8)
  51 - 89% Rested: - randomNumberBetween(1,4)
  90%+ Rested: randomNumberBetween(1,3)

Hit chance: 65 + dexterityBonus + strengthBonus + intelligenceBonus + levelBonus + hitrollBonus + restedBonus
Hit chance maximum allowed: 95%
```
### Armor Class
Armor class doesn't scale well at later levels. You'd need -2500 AC to remove 30% of 1k damage. Because of this scaling its better not to even worry about damage reduction from armor past beginning of the game.
```
Note that this is based on the "type" of damage, i.e. pierce, slash, bash, exotic
Monk damage type is bash. Anything not pierce, slash or bash like "divine" is exotic.

Damage reduction for players: (victimAC - 100) / 8
Damage reduction for mobiles: (victimAC - 100) / 15
Maximum damage reduction allowed: 30% of the attack
```
Example:
```
You have -240 AC in slash.
(-240 - 100) / 15 = You reduce incoming damage by 22 against mobiles (not to exceed 30% of attack)
(-240 - 100) / 8 = You reduce incoming damage by 42 against players (not to exceed 30% of attack)
```
### Magic Saves
Saves can prevent effects altogether like blind, or merely reduce damage by a percent depending on the spell.

```
levelBonus = (playerLevel - enemyLevel) * 5
berserkBonus = playerLevel / 2
racialBonus = 
  if resistant: 2
  if vulnerable: -2
enemyPKClassSaveMultiplier =
  mage, cleric, paladin, charlatan, myrmidon, antipaladin, monk = 0.9
  thief, warrior, nonPKencounter = 1
saves = (50 + levelBonus - playerSaves * 2 + berserkBonus + racialBonus) * enemyPKClassSaveMultiplier

spellSave: randomNumberBetween(5,saves)
isSaveSuccessful: randomNumberBetween(1,100) < spellSave
Minimum save percentage: 5%
Maximum save percentage: 95%
```

## Quest Rewards
| name | cost |
| --- | --- | 
| quest recall | 100qp | 
| a magic tenderbox | 150qp | 
| a certificate of corpse retrieval | 200qp | 
| a restring certificate | 400qp | 
| a reflective silvite mirror | 500qp | 
| a pair of magical apprentice tongs | 600qp | 
| an apprentice jewelers magical polishing cloth | 600qp | 
| an apprentice armorsmiths magical file | 600qp | 
| an apprentice weaponsmiths magical file | 600qp | 
| an master jewelers magical polishing cloth | 750qp | 
| an master armorsmiths magical file | 750qp | 
| an master weaponsmiths magical file | 750qp | 
| a dimensional pocket | 900qp | 
| 10 practices | 900qp | 
| reforge certificate | 1,000qp | 
| 10,000 gold | 1,000qp | 
| blanket of tranquility | 1,200qp | 
| an adventurer's everfull flask | 1,500qp | 
| beacon rod | 2,000qp | 
| writ of entitlement | 2,000qp | 

## Prompts

**Monk Prompt**

![monk prompt example](./monkPromptExample.png)
```
// next line is in-game command
prompt {D[{R%h{D/{r%Hhp {M%m{D/{m%Mmp {G%v{D/{g%Vmv {c%Cchi {Y%q%Q{Dqt {y%l{Dql {r%P{Dqp {r%X{Dtnl]{r%p {R%B%c

// next line is for tintin++ configuration of the same prompt
#prompt {[%1/%2hp %3/%4mp %5/%6mv %7/%8chi %9qt %10ql %11qp %12tnl] %13 %14} {<109>[<119>%1<109>/<019>%2<109>hp <159>%3<109>/<059>%4<109>mp <129>%5<109>/<029>%6<109>mv <169>%7<109>/<069>%8<109>chi <139>%9<109>qt <039>%10<109>ql <019>%11<109>qp <019>%12<109>tnl] <119>%13<109> <119>%14}
```

## MUD Client Configuration
### Tintin++
The following are some basic helpful commands:
```
// log into au when tt++ opens automatically
#event {PROGRAM START} {#ses AdventuresUnlimited tharel.net 5005;y;####USERNAME####;####PASSWORD####;y}

// separate input from output
#split

// f1 and f2 hotkeys
#macro {\eOP} {take flask pocket;drink flask;drink flask;drink flask;drink flask;put flask pocket;}
#macro {\eOQ} {order ####PETNAME#### rescue ####USERNAME####}

// some basic aliases, this is for a quickling - hence `haste` and `slow`
#alias {sleep} {stand;take blanket pocket;drop blanket;r blanket;slow;sl}
#alias {wake} {rest;haste;stand;take blanket;put blanket pocket;l}
```
Here is a script that buffs your character right before a quest:
(you need to either add the 'buff' alias or replace it with commands for buffing delimited by semicolons)
```
#variable {readyForQuest} {true};
#action { 1qt }
{
  #if {{$readyForQuest}=={false}} {
    buff;
    #variable {readyForQuest} {true};
  }
}
#action { 0qt }
{
  #if {{$readyForQuest}=={true}} {
    #showme <138>+-----------------------+<088>;
    #showme <138>|    <178>Quest Available<138>    |<088>;
    #showme <138>+-----------------------+<088>;
    #variable {readyForQuest} {false};
  }
}
#action {You may now quest again.}
{
  #line gag;
}
```


## Potions Pills Wands Staves and Scrolls

| name | req lvl | item lvl | cost | found in | description |
| --- | --- | --- | --- | --- | --- |
| scroll of reveal | 1 | 15 | 3g40s | underdark | faerie fog |
| a dirty root | 1 | 15 | 22g0s | underdark | armor, stone skin, shield |
| a pink wand | 2 | 7 | 2g50s | the meridian | faerie fire x 3 |
| a wand of oak | 3 | 8 | 4g10s | the meridian | armor x 4 |
| a wand of magic missiles | 5 | 10 | naerlan | magic missile x 2 |
| a crumpled scroll | 5 | 7 | 1g50s | naerlan | magic missile x 2 |
| a purple pill | 5 | 10 | 0g80s | brovlancor | invisibility |
| a blue pill | 5 | 10 | 2g3s | brovlancor | sanctuary |
| a potion of protection | 5 | 10 | 2g0s | naerlan | armor |
| a small seed | 5 | 15 | 4g0s | naerlan | farsight |
| a flame-painted wand | 5 | 10 | 10g0s | brovlancor | fireball |
| a potion of crifus' favor | 5 | 15 | 3g90s | naerlan | cure critical, bless |
| an ivory wand | 7 | 7 | 3g0s | equinilis | dispel evil x 2 |
| a scroll of identify | 7 | 12 | 8g90s | naerlan | identify |
| a travel-light flask | 7 | 5 | 1g0s | equinilis | cure light, refresh |
| a lightning-painted wand | 7 | 9 | 12g71s | brovlancor | lightning bolt |
| a potion of revealing | 7 | 15 | 2g90s | naerlan | detect invis, detect magic, detect hidden |
| a dry ivy leaf | 7 | 12 | 4g50s | naerlan | create spring, cure disease |
| a jade wand | 8 | 8 | 1g15s | equinilis | harm |
| a bent stick | 8 | 10 | 10g0s | aliuna | change sex |
| a small blue pill | 8 | 8 | 1g0s | equinilis | heal |
| a potion of sickness removal | 8 | 14 | 5g50s | naerlan | cure poison, cure light, cure disease |
| a potion of sight | 8 | 13 | 2g30s | naerlan | cure blindness, infravision |
| a sunshine-yellow stick | 9 | 10 | 10g0s | aliuna | continual light x 2 |
| a bright pink wand | 9 | 10 | 10g0s | aliuna | faerie fire x 2 |
| a scroll of cancellation | 9 | 14 | 11g90s | naerlan | cancellation |
| an elixir of negation | 9 | 20 | 8g30s | naerlan | cancellation |
| a dirty root | 9 | 14 | 5g0s | naerlan | refresh, floating disc |
| a wand of curing | 10 | 15 | 10g0s | naerlan | cure light x 7 |
| the hand of shocking grasp | 10 | 15 | 53g0s | underdark | shocking grasp x 4 |
| a wand of petrification | 10 | 15 | 68g0s | underdark | freeze x 8 |
| a blue wand with purple spots | 10 | 10 | 20g0s | aliuna | haste x 2 |
| a simple xycamore wand | 10 | 10 | 4g0s | aliuna | invisibility x 2 |
| a swirling maple wand | 10 | 14 | 15g0s | aliuna | faerie fog x 2 |
| a short oak wand | 10 | 10 | 2g0s | deltherian | magic missile x 8 |
| a purple crystal staff | 10 | 15 | 0g0s | aliuna | cure light x 2 |
| a scroll in a yellow case | 10 | 10 | 1g0s | deltherian | continual light |
| a scroll in a red case | 10 | 10 | 1g0s | deltherian | detect hidden |
| a scroll in a blue case | 10 | 8 | 1g0s | deltherian | haste |
| a scroll in a white case | 10 | 8 | 1g0s | deltherian | cure light |
| essence of troll | 10 | 5 | 2g0s | equinilis | regeneration |
| potion of detection | 10 | 15 | 13g0s | underdark | detect hidden, detect invis, detect magic |
| a frothing black potion | 10 | 15 | 50g0s | bose'nisten |
| a simple sycamore wand | 10 | 10 | 4g0s | aliuna | invisibility x 2 |
| a swirling maple wand | 10 | 14 | 15g0s | aliuna | faerie fog x 2 |
| a feather | 10 | 15 | 8g70s | naerlan | fly x 1 | 
| the root of a black willow tree | 10 | 15 | 4g1s | bog of durlah | cure critical, cure disease, cure blindness |
| a blue crystal staff | 11 | 15 | 25g0s | aliuna | slow x 2 |
| an off white potion | 11 | 16 | 8g20s | the meridian | haste |
| flask of holy water | 11 | 16 | 8g80s | dwarven catacombs | bless, sanctuary |
| an elixir of tranquility | 11 | 20 | 8g0s | naerlan | sanctuary |
| a prism wand | 12 | 17 | 22g0s | dwarven catacombs | colour spray x 4 |
| a deep-green potion | 12 | 17 | 9g50s | the meridian | stone skin, blindness |
| a misty potion | 12 | 17 | 4g60s | dwarven catacombs | pass door, faerie fire |
| a cold vial | 12 | 15 | 12g0s | aliuna | armor, bless, blindness |
| a small crystal flask | 10 | 10 | 1g0s | cure light, cure light |
| a golden eagle feather | 14 | 19 | 7g99s | nerezza | haste |
| a pink willow wand | 14 | 17 | 10g0s | aliuna | faerie fire x 3 |
| a pink & white oak wand | 14 | 17 | 20g0s | aliuna | sleep x 2 |
| a brilliant white wand of ash | 14 | 15 | 50g0s | aliuna | sanctuary x 2 |
| a blood shot eye | 15 | 20 | 23g99s | underdark | flamestrike x 2 |
| an olde lute | 15 | 10 | 7g50s | renault house | charm person x 3 |
| a staff of withering | 15 | 20 | 17g71s | naerlan | weaken x 7 |
| a scroll of recall | 15 | 20 | 29g0s | naerlan | word of recall |
| a crimson-colored book | 15 | 14 | 5g0s | burrowholme | magic missile, blindness |
| an obsidian tablet | 15 | 20 | 0g5s | volencymale | sanctuary |
| a vial full of mist | 15 | 20 | 15g0s | illianathoren pass | detect hidden, faerie fog |
| a feather of a dove | 15 | 20 | 0g10s | illianathoren pass | fly, refresh |
| a mottled wand of rosewood | 16 | 20 | 16g0s | aliuna | haste x 3 |
| a grey seal skin | 17 | 20 | 0g0s | fideals lake | charm person |
| a blue and red vial | 17 | 20 | 15g0s | aliuna | giant strength, slow |
| a strange purple vial | 17 | 20 | 20g0s | aliuna | detect hidden, calm |
| a green-glowing decanter | 17 | 20 | 17g0s | aliuna | cure poison |
| a transluscent red wand | 18 | 18 | 4g50s | mt ka'lri | infravision x 3 |
| a worn page covered in writing | 18 | 20 | 18g0s | khetes | fireproof, continual light |
| a staff of destruction | 20 | 25 | 9g90s | naerlan | earthquake x 9 |
| a black scroll | 20 | 25 | 50g0s | mines of noal'xyn | curse, plague |
| a white scroll | 20 | 25 | 50g0s | mines of noal'xyn | haste, armor |
| a blue scroll | 20 | 25 | 50g0s | mines of noal'xyn | shield, stone skin |
| a rolled parchment | 20 | 20 | 0g0s | sanctuary | identify |
| the root of the Al'nar bush | 20 | 25 | 25g11s | naerlan | stone skin, cure poison |
| a vial filled with sticky green ooze | 20 | 20 | 20g0s |du'rahath | regeneration, armor, slow |
| a tiny beaker full of thinned out black liquid | 20 | 20 | 25g0s |du'rahath | detect invis, detect hidden, detect evil, detect good |
| a beaker of thick blue liquid | 20 | 20 | 30g0s |du'rahath | phase, blindness, shield, plague |
| a bubbling crimson potion | 20 | 20 | 30g0s | du'rahath | fireshield, giant strength |
| a vial of elven spirit | 20 | 20 | 56g25s |illianathoren pass | armor, shield |
| a vial of elven courage | 20 | 20 | 56g25s |illianathoren pass | giant strength, haste |
| a vial of elven honour | 20 | 20 | 56g25s |illianathoren pass | sanctuary |
| a purple scroll | 20 | 23 | 22g75s | mirage city | faerie fire |
| the red dragonorb | 21 | 13 | 186g0s | sewers | sanctuary x 6 |
| a potion of desert survival | 22 | 25 | 23g88s | mirage city | refresh, cure poison |
| a fire gem | 23 | 28 | 119g0s | underdark | fireball x 5 |
| the leaf of an ulo tree | 23 | 28 | 27g12s | naerlan | fly, armor, infravision |
| the stalk of the verbank plant | 24 | 29 | 32g11s | naerlan | shield, detect good, protection good |
| the gem of gate | 25 | 30 | 128g80s | underdark | teleport x 5 |
| a dark grey potion | 25 | 30 | 50g0s | mines of noal'xyn | giant strength, invisibility, weaken |
| a green potion | 25 | 30 | 50g0s | mines of noal'xyn | cure critical, cure critical |
| a clear potion | 25 | 30 | 50g0s | mines of noal'xyn | pass door, poison |
| a cold black potion | 25 | 30 | 18g0s | caldera ruins | fireshield, protection evil |
| a slime of the enforcing eye | 25 | 25 | 134g0s | underdark | detect invis, detect hidden, mend, refresh |
| a black vial | 25 | 25 | 0g0s | sanctuary | curse, weaken, poison |
| a black potion | 25 | 30 | 32g50s | mirage city | fly |
| a talisman of elemental control | 27 | 32 | 24g11s | dleivain | charm person x 6 |
| a darkened parchment | 28 | 33 | 40g0s | mirage city | colour spray |
| the dark wizard's athame | 30 | 35 | 30g0s | du'rahath | lightning bold x 10 |
| a glowing silver staff | 30 | 30 | 75g0s | mines of noal'xyn | sanctuary x 5 |
| a berry from a cleash bush | 30 | 35 | 35g1s | naerlan | sanctuary, remove curse |
| a red pill | 30 | 35 | 50g0s | mines of noal'xyn | protection evil, frenzy, heal |
| a yellow pill | 30 | 35 | 50g0s | mines of noal'xyn | frenzy, protection good, heal |
| a dark pill | 30 | 35 | 50g0s | mines of noal'xyn | bless, stone skin |
| a mysterious potion | 30 | 35 | 30g0s | castle of burdon | armor, stone skin |
| a mysterious pill | 30 | 35 | 30g0s | castle of burdon | infravision, giant strength |
| a mysterious scroll | 30 | 35 | 30g0s | castle of burdon | shocking grasp |
| a jar of fiddlehead cream | 35 | 35 | 20g80s | tyyrinn village | cure poison x 2, cure disease x 2 |
| a jar of dandelion cream | 35 | 35 | 20g80s | tyyrinn village | heal x 2 |
| a powdered snake scale paste | 35 | 39 | 30g0s | valeda | earthshield |
| crushed white flower petals | 35 | 39 | 30g0s | valeda | armor |
| thorn shavings | 35 | 39 | 30g0s | valeda | bless |
| a knobbly stave | 35 | 20 | 30g0s | gnomish studen, tyyrinn | dispel evil x 8 | 
| some mint leaves | 35 | 39 | 30g0s | valeda | iceshield |
| a blue potion | 38 | 38 | 57g0s | castle of burden | phase, plague, curse |
| a red potion | 38 | 38 | 57g50s | castle of burden | detect invis, detect hidden |
| a sacred staff | 40 | 45 | 26g75s | castle of burden | heal x 10 |
| a black book | 40 | 45 | 45g0s | castle of burden | energy drain x 10 |
| a slender mithril rod | 40 | 43 | 30g0s | valeda | lightning bolt x 6 |
| burning coals | 40 | 43 | 35g0s | valeda | magic missile x 6 |
| an emerald rod | 40 | 43 | 45g0s | valeda | sleep x 6 |
| a glass rod | 40 | 43 | 25g0s | valeda | invisibility x 6 |
| a pink rod | 40 | 43 | 25g0s | valeda | faerie fire x 6 |
| a ruby staff | 40 | 40 | 65g75s | castle of burden | heat metal x 3 |
| a blue-trimmed scroll | 40 | 45 | 24g59s | heishaer city | cure diseases |
| a green vial | 40 | 43 | 8g48s | heishaer city | cure critical |
| a jar of woodruff cream | 40 | 40 | 40g90s | tyyrinn village | detect hidden, detect invis, translate |
| a jar of black elder cream | 40 | 40 | 150g39s | tyyrinn village | stone skin, giant strength |
| a potion of warmth | 40 | 42 | 5g64s | schwartz glacier | flamesphere |
| a green vial | 40 | 43 | 8g8s | heishaer city vendor | cure critical x 1 |
| a potion of emergency get-away | 40 | 45 | 42g0s | schwartz glacier | teleport |
| a blue pill | 42 | 45 | 12g96s | edible vitamins, heishaer | fly, cure blindness x 2 |
| a clear potion | 44 | 47 | 4g63s | heishaer city vendor | refresh x 2 |
| a jeweled sceptre | 45 | 47 | 40g0s | valeda | translate x 6 |
| a red-trimmed scroll | 45 | 47 | 17g78s | heishaer city vendor | cancellation |
| a slate-grey pill | 45 | 47 | 13g79s | heishaer city vendor | armor, stone skin, shield |
| a pixie doll | 45 | 47 | 35g0s | valeda | haste x 6 |
| a red pill | 50 | 55 | 14g43s | heishaer city vendor | cure disease |
| a dark bottle | 50 | 55 | 9g60s | heishaer city vendor | detect invis, detect hidden, detect magic |
| a green-trimmed scroll | 50 | 55 | 26g68s | heishaer city vendor | identify |
| soul of the frost beast | 50 | 55 | 90g0s | frost beast, pyrainn mountains | frost breath x 20, dex -2, con -2 |
| a pink-painted doll made of stick | 50 | 55 | 50g0s | young centaur guard, xuergothe | faerie fire x 10 |
| a songbook | 51 | 56 | 40g0s | litte girl, xuergothe castle | charm person |
| a spellbook | 65 | 65 | 45g89s | overlook gardens | charm person x 2 |

## Items For Leveling
Keep in mind that the intention for this is **not** to be a comprehensive list of items, but the **best-in-slot** leveling items. Adventures Unlimited has a huge focus on tradeskills, where created items will always be the strongest items for each level tier group (armor is crafted for levels 10, 20, 30 etc.) But if you're leveling quickly, don't have access to an armorsmith or simply the crafted item isn't as strong as it could be, these are great fall-back options.

**Alignment Restriction Flags**
- **[-E]** = Anti-evil item, evil alignment characters cannot wear it
- **[-N]** = Anti-neutral item, neutral alignment characters cannot wear it
- **[-G]** = Anti-good item, good alignment characters cannot wear it

### Light Items
These are **unlimited only** light sources.
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- |
| a small jar of glow-moss | 14 | 4g48s | hitroll +3 | sold in hargath |
| a black guard's lantern | 28 | 15g0s | ac -2, hitroll +2 | guard in mirage |
| a glowing green ball | 29 | 13g82s | hitroll +3, dex +1 | kid in valeda |
| a large light | 30 | 22g50s | hitroll +2, strength +1 | spelunker in castle burdon |
| (invis) a ghostly flame | 31 | 17g40s | hitroll +2, damroll +2, mana +20 | servant in dleivan |
| elemental water beacon | 35 | 15g62s | hitroll +2, damroll +2, ac -2 | elemental in valeda |
| a steel lantern | 39 | 12g50s | hitroll +2, damroll +1, hp +10 | hunter in oterion |
| a bright ball of snow | 40 | 48g25s | hitroll +4, damroll +2 | general store, schwartz glacier |
| a sylvan-made everlasting light | 46 | 59g23s | hitroll +3, con +1, str +1 | sylvan guard, draek'le |
| the power stone | 50 | 217g83s | damroll +2, hitroll +1, hp +65 | king of eirenole |

### Head Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| a spiked steel helm | 8 | 0g68s | damroll +1 | duergar in naerlan |
| the shroud of deception | 10 | 2g97s | hitroll +3 | lunatic's alley |
| a copper helmet | 13 | 9g55s | damroll +1, hitroll +1 | [purchase] Bruavaabwaew Tuuhtwelaag, Naerlan |
| a large mithril helmet | 15 | 14g34s | hitroll +3 | loahan, foreman in mines of noal'xyn |
| a golden helmet of courage | 15 | 1g78s | hitroll +2, damroll +1 | shrine of barbades guards |
| a bronze helmet | 19 | 12g61s | damroll +2, hitroll +1 | [purchase] Bruavaabwaew Tuuhtwelaag, Naerlan |
| a pair of dirty horns | 20 | 18g92s | str +1, con +1, damroll +2, hitroll +1 | grungel boss |
| a red bandana | 24 | 19g80s | damroll +2, hitroll +2, hp +2 | a deck hand, meridian |
| a dark helmet | 28 | 49g50s | [-G, -N] hitroll +2, damroll +4 | east tower guard, mines of noal'xyn |
| a spirit helmet | 28 | 49g50s | [-E, -N] hitroll +2, damroll +4 | west tower guard, mines of noal'xyn |
| a black leather eyepatch | 35 | 0g0s | hitroll +3, damroll +1, con +2 | blackeye, blackeyes camp |
| a straw sunhat | 37 | 12g23s | damroll +4, wis +1 | fishing pixie, valeda |
| a felt hat with stirrups | 37 | 21g12s | [-E] hitroll +3, damroll +3 | vallien knight, terrason |
| a black headpiece | 38 | 37g62s | hitroll +3, damroll +3, ac +3 | head senator abana, aliuna |
| a dark hood | 38 | 45g4s | hitroll +4, damroll +2 | shi'jal, castle of burden |
| a monk's hood | 40 | 22g91s | [-E] damroll +2, hitroll +4 | pious monk, terrason |
| a hardened wood helmet | 42 | 24g75s | hitroll +6, damroll +2 | loud-voiced sergeant, valeda |
| a silver head piece | 42 | 12g10s | hitroll +3, damroll +5 | merakki, merakkis kitchen, valeda |
| a crown of flowers | 45 | 9g99s | int +5 | hiilyraajie, valeda |
| a hide head-dress | 45 | 10g87s | damroll +3, hitroll +5, hp +50 | orc chieftan grarg, valeda |
| a platinum crown with sapphires | 50 | 24g41s | [-E][-N] damroll +5, hitroll +5, int +1, con +1, wis +1 | king, terrason |
| a battered steel helmet | 51 | 31g34s | damroll +3, hitroll +6, str +3 | brave adventurer, kaer tzoun |
| a heavy gold circlet | 53 | 21g68s | hitroll +6, damroll +4, wis +3 | king of eirenole |
| the antlers of a stag | 54 | 94g48s | damroll +7, hitroll +3, move +250 | stag, breyard woods |
| a coif of chainmail | 55 | 33g68s | hitroll +6, damroll +5, str +2 | vigilant guard, eirenole castle |
| a peaked silk hat | 62 | 79g20s | int +2, wis +2, damroll +2, hitroll +3 | chorus matron |

### Neck Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| an ancient iron brooch | 11 | 0g65s | hitroll +2 | nerezza |
| a heavy cloak | 13 | 4g95s | con +1, damroll +1 | guard in renault house |
| a yellow cloak | 17 | 10g0s | damroll +2, hitroll +1 | zel's armory, burrowholme |
| a thick leather collar | 20 | 30g69s | hitroll +1, damroll +1, str +1 | deltherian from dog |
| a golden signet necklace, 'Nobility' | 31 | 9g20s | [-E] hitroll +3, dex +1, saves +3, ac +6 | Elium in Aliuna |
| a dark-blue cloak | 32 | 89g10s | damroll +3, hp +25 | Yrenelania Orgath |
| an elemental lake amulet | 35 | 20g1s | damroll +2, hitroll +3, wis +1, int +1 | lake elemental, valeda |
| an elemental helmet of vigilance | 36 | 0g0s | damroll +4, int +2 | vigilance elemental, valeda |
| a green hunting cloak | 37 | 33g68s | damroll +4, hitroll +4 | hunter, eirenole |
| a cape embroidered with nightmares | 40 | 33g91s | damroll +4, str +1, dex +1 | jailcell, terrason |
| a necklace of wooden prayer beads | 40 | 12g30s | damroll +3, int +1, str +1, con +1 | pious monk, terrason |
| a delicate necklace | 42 | 15g84s | damroll +5 | girl, heishaer city |
| a brass-reinforced neck brace | 43 | 16g86s | hitroll +4, saves -3, ac -3 | pixie guard, valeda |
| a delicately-crafted necklace | 45 | 2g80s | hitroll +8, ac -2 | heishaer king |
| an unadorned hemp necklace | 45 | 5g49s | hitroll +8, damroll +5, ac -2 | the hermit sormingo, valeda |
| a dark grey hooded cloak | 45 | 42g78s | hitroll +10, move +50 | eirenole forest, bandit |
| a heavy fur mantle | 51 | 73g76s | hitroll +6, damroll +4, wis +3 | king of eirenole |

### Shoulder / About Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| a rotting cape | 11 | 0g0s | damroll +1, hitroll +1 | nerezza, bleached warrior |
| a black leather cape | 15 | 15g0s | damroll +2 | kreneth, aliuna |
| a blue cape with the signet of Elsfar | 15 | 13g96s | hitroll +3 | Metes, inn of the newt, naerlan |
| flowing soft brown robes | 20 | 17g32s | hitroll +2, damroll +1 | a honey-tongued priest, aliuna |
| an ogre talisman made from a human skull | 24 | 20g81s |  hitroll +3, damroll +1 | svirfneblin hangharid, underdark |
| a practical grey robe | 27 | 28g96s | [-G,-E] saves -3, damroll +2, hitroll +5 | a wise old bridge mage, aliuna |
| a cleric's tunic | 27 | 23g76s | hitroll +4, damroll +2 | grand clerk alissandra, aliuna |
| flowing priest's robes | 32 | 6g3s | damroll +1, hitroll +1, str +1, wis +1 | priest on justice road barreston |
| the wings of a great dragon | 35 | 44g55s | wis +1, str +1, hitroll +4, hp +20 | great dragon in caldera |
| a knight templars robe | 35 | 21g12s | [-E] hitroll +3, damroll +4 | vallien knight, terrason |
| blue tent-like robes | 35 | 44g55s | [-G,-E] hitroll +5, damroll +3, ac +3, saves +2 | a corpulent honored guest, aliuna |
| a shimmering robe | 42 | 75g22s | damroll +5 | malrya the flutist, valeda |
| an elsfaren cape | 42 | 31g69s | hitroll +4, damroll +4 | forest guard, eirenole |
| a tinted chest-plate | 43 | 5g64s | damroll +2, hitroll +8, str +2 | a halfling guard, tyyrinn village |
| a blue master's robe | 45 | 13g76s | hitroll +6, damroll +3 | magical pixie master, valeda |
| a long, cleric's robe | 45 | 14g17s | [-E] damroll +2, hitroll +5 | devout cleric, terrason |
| a rabbit fur lines robe | 50 | 21g10s | [-E] hitroll +6, hp +35 | king rastednu, terrason |
| a blue and gold surcoat | 53 | 61g38s | damroll +4, str +2, ac -8 | gatehouse guard, eirenole castle |
| a link of golden scales | 54 | 22g81s | dammroll +5, hitroll +5 | warl, bottom of pond in acoma |
| billowing golden silk robes | 61 | 79s20s | hitroll +6, dex +2, saves -2, con +1 | chorus matron |

### Torso / Body Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| a barded poncho | 5 | 1g3s | hitroll +3 | equinilis |
| a striped poncho | 7 | 1g48s | damroll +1 | equinilis |
| studded ream hide armor | 9 | 8g47s | damroll +3, hitroll +1 | unknown |
| an iron breast-plate | 13 | 9g90s | damroll +2 | a mountain goblin, bose'nisten |
| a shining chest plate | 15 | 28g35s | hitroll +3, damroll +2 | guard in front of shrine of barbades |
| a bronze breastplate | 19 | 19g55s | damroll +1, hitroll +1, str +1 | [purchase] Bruavaabwaew Tuuhtwelaag, Naerlan |
| a soft velvet vest | 22 | 22g27s | hitroll +2, damroll +2 | aliuna |
| a shadow steel platemail cuirass | 25 | 2g84s | move +100, saves -2, ac -2, dex +1, str +1 | drow in grungnison catacombs |
| shadow armor | 28 | 49g50s | [-G, -N] con +2, hitroll +5 | east tower guard, mines of noal'xyn |
| spirit armor | 28 | 49g50s | [-E, -N] con +2, hitroll +5 | west tower guard, mines of noal'xyn |
| a suit of silver armor | 28 | 41g8s | damroll +4 | guard in mirage |
| an Eliem's robe | 30 | 99g0s | hitroll +2, damroll +2, wis +1, int +1, con +1 | Elium in Aliuna |
| a suit of black chainmail | 30 | 15g24s | damroll +2, dex +2 | guard in castle of burdon |
| a small, simple green dress | 33 | 23g41s | damroll +3, hitroll +4 | a happy elven girl, valeda |
| an elemental flower gown | 36 | 29g68s | damroll +3, hitroll +5 | flower elemental, valeda |
| a stiff hide breastplate | 36 | 24g85s | [-G] damroll +4, hitroll +4, dex +2 | orc chieftan grarg, valeda |
| a satin, sky blue dress | 40 | 55g55s | damroll +2, hitroll +3, ac -5, saves -4 | floraena, marakkis kitchen, valeda |
| grass green robes | 42 | 13g51s | damroll +4, hitroll +6, dex -1 | caretaker's assistant, valeda |
| a blue master's robe | 45 | 13g76s | hitroll +6, damroll +3 | master pixie, field path valeda |
| a light woven vest | 48 | 43g16s | hitroll +4, damroll +2, dex +2 | stableboy, eirenole castle |
| a set of plate-mail | 50 | 15g65s | damroll +4, hitroll +4, con +1 | gromm, yrenelania |
| stiff fur armor | 52 | 79g20s | [-E] hitroll +5, damroll +3, str +1 | guard, xuergothe castle |
| a heavy chainmail shirt | 55 | 47g99s | hitroll +6, damroll +5, str ;2 | royal guard, eirenole castle |
| a thick yeti pelt | 56 | 1g0s | hitroll +10, ac -12 | yeti, kaer tzoun |

### Waist Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| a thick bronze belt | 5 | 0g28s | hitroll +1 | equinilis |
| a belt of bones strung with human hair | 10 | 0g0s | hitroll +1, damroll +1 | underground highway, skeleton |
| a jewelled belt | 15 | 2g52s | str +1, hitroll +2 | renault house |
| a bell covered belt | 24 | 0g29s | hitroll +3 | a smiling halfling bard, longbottoms shire |
| fine silk sash reads 'aliuna forever' | 24 | 24g75s | hitroll +2, damroll +1 | former eliem dal, aliuna |
| a silver girth | 28 | 23g6s | hitroll +3, dex -1, con +2 | guard in mirage |
| a grimy length of rope | 30 | 1g21s | hitroll +3, damroll +2 | a snot-nosed orc boy, valeda |
| a braided rope belt | 32 | 3g96s | hitroll +4, str +2, con +1, ac +3 | priest on justice road barreston |
| a dark purple aliunan belt | 37 | 25g74s | damroll +2, dex +1, con +1, str +1 | scowling guard aliuna |
| a wide brown sash | 37 | 16g58s | hitroll +5, con +2 | wide old woman, valeda |
| a hardened wood bracer | 39 | 12g37s | hit+8,dam+1 | weaponmaster, valeda |
| an engraved brass girth | 43 | 14g86s | damroll +5, hitroll +2 | fast pixie patroller, valeda |
| a frilly pink skirt | 50 | 25g43s | hitroll +6, con +1, str +1, dex +1 | lalaila maila, tyyrinn village |
| a plain leather sword sheath | 54 | 51g58s | damroll +7, hitroll +7 | kings guard, eirenole castle |
| a moss covered belt | 55 | 57g75s | hitroll +4, damroll +3, ac -3, con +1, int +1 | xe'lith patroller |
| an ornate belt | 57 | 61g40s | hitroll +6, str +2, hp +25 | ekeki, acoma |

### Arms Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| a pair of leather armbands | 8 | 1g3s | hitroll +2 | lunatic's alley |
| a pair of copper armplates | 13 | 9g55s | damroll +1 | [purchase] Bruavaabwaew Tuuhtwelaag, Naerlan |
| assassin's sleeves | 15 | 32g47s | damroll +1, hitroll +1 | a drow murderer, underdark |
| a bronze helmet | 19 | 12g61s | damroll +1, str +1 | [purchase] Bruavaabwaew Tuuhtwelaag, Naerlan |
| chain mail sleeves | 23 | 3g66s | damroll +3 | an impatient duergar, fideals lake |
| silver armguards | 28 | 12g99s | hitroll +3, damroll +1 | guard in mirage | 
| a pair of ravenskin sleeves | 30 | 29g70s | damroll +2, hitroll +2, con +1 | a razor raven, the avian tree |
| boiled leather armguards | 32 | 29g70s | damroll +5 | Liun, main council floor aliuna |
| armplates of flesh | 35 | 49g50s | damroll +3, hitroll +3 | the disgrace, reskel |
| simple leather armbands | 39 | 10g89s | hitroll +3, dex +1, con -1 | halfling citizen, tyyrinn village |
| braided strands of silver | 42 | 20g29s | hitroll +6, damroll +3 | merakki, merakkis kitchen, valeda |
| dull steel chain sleeves | 45 | 16g25s | damroll +4, hitroll +5 | jrek, the guardian, valeda |
| a pair of elven chain-mail sleeves | 45 | 62g12s | hitroll +3, damroll +4, dex +1 | eirenole forest, bandit |
| torn brown sleeves | 47 | 19g87s | damroll +2, hitroll +5 | bandit, kaer tzoun |
| a set of steel pauldrons | 51 | 19g4s | hitroll +9 | brave adventurer, kaer tzoun |
| sleeves of chainmail | 53 | 18g94s | hitroll +6, damroll +5, str +2 | watchtower guard, eirenole castle |

### Wrist Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| a steel-banded bracer | 12 | 0g27s | hitroll +1, damroll +1 | burrowholme guards |
| a steel bracer | 13 | 3g76s | damroll +1, dex +1 | renault house |
| a dryad's bracelet | 15 | 3g96s | int +1, hitroll +2 | behind hidden waterfall near goblin stronghold |
| a bracelet of elf-hide | 15 | 0g99s | damroll +2 | goblin stronghold |
| an acid-eaten steel bracer | 18 | 1g97s | hitroll +2, dex +1 | nerezza, gelatinus cube on top |
| a du'rahathian guard tattoo | 24 | 0g0s | damroll +1, hitroll +2 | an angry duergar, du'rahath |
| a wide iron bracer | 27 | 3g84s | hitroll +1, damroll +3 | barreston guards near entrance |
| a silver bracer | 28 | 11g21s | hitroll +2, damroll +2 | guard in mirage |
| a fealtic feather cord | 30 | 22g27s | hitroll +4, wis +1, int +1 | a fealtic bird, the avian tree |
| an elemental bark bracer | 36 | 16g61s | damroll +2, hitroll +2, dex +2 | a forest elemental, valeda |
| a hardened wood bracer | 39 | 12g37s | damroll +1, hitroll +8 | alert elven scout, valeda |
| a runed silver bracer | 40 | 26g25s | damroll +3, hitroll +4 | a nature loving pixie, valeda |
| a sparkling mithril bangle bracelets | 41 | 24g49s | hitroll +2, damroll +2, wis +1, int +1, con +1, | a small pixie mother, valeda |
| an engraved brass bracer | 43 | 30g36s | hitroll +7, damroll +1, dex +1 | a zipping pixie guard, valeda |
| an electrum bracelet | 45 | 25g22s | damroll +3, hitroll +3, str +1 | cyan-haired sprite, heishaer city |
| a cold steel bracer | 45 | 43g66s | damroll +3, hitroll +3, str +1 | dwarf, pyrainn mountains |
| a silver-inlaid steel bracer | 50 | 9g89s | hitroll +6, con +1, str +1, dex +1 | brave adventurer, kaer tzoun |
| a bracer forged of silvite | 52 | 31g41s | damroll +3, hitroll +3, ac -5 | dwarven knight, pyrainn mountains |
| a leather wrist guard | 56 | 47g32s | damroll +3, hitroll +9, dex +3 | archer in watchtower, eirenole castle |
| musical bangle bracelets | 62 | 60g19s | damroll +4, hitroll +4, saves +2 | chorus matron, xuergothe |

### Hand Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- |
| a pair of thin leather gloves | 12 | 9g79s | dex +1 | the filcher, underdark |
| a set of iron-spiked gauntlets | 13 | 4g15s | damroll +2 | a moutain goblin, bose'nisten |
| gauntlets of rage | 18 | 9g50s | damroll +3 | zel's armory, burrowholme |
| a pair of red dragon claws | 20 | 11g38s | damroll +3, hitroll +1 | the red dragon, sewers |
| giant skin gloves | 38 | 19g80s | damroll +1, hitroll +5 | oterion hunter |
| a pair of gauntlets of the eye | 42 | 183g15s | damroll +3, hp +10, hitroll +2 | underling, underdark |
| a pair of warm, fuzzy gloves | 46 | 19g80s | hitroll +6, damroll +3 | dockworker, schwartz glacier |
| a pair of steel gauntlets | 58 | 31g36s | damroll +6, con +2, str +2 | royal guard, eirenole castle |
| a pair of moss covered gloves | 59 | 44g55s | damroll +4, hitroll +4 | guard, xe'lith |

### Finger Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| a battered silver ring | 10 | 3g18s | hitroll +2 | grungel |
| a granite ring | 15 | 16g66s | int +1 | khetes priest |
| a copper ring | 16 | 8g23s | damroll +1, saves -1, hitroll +2 | naerlan patrol guard |
| a silver ring twisted with amethyst | 38 | 29g13s | hitroll +6 | scowling guard, aliuna |
| (invis) an elemental ring of frost | 37 | 24g48s | hitroll +4, damroll +3 | valeda elemental |
| the heart of the elven people | 30 | 3g6s | damroll +3, con +1, ac -2 | illiathorn pass commander |
| a ruby ring, twisted with silver | 40 | 39g60s | damroll +3, hitroll +5 | a hurried pixie man, valeda |
| a golden, sapphire studded ring | 46 | 23g22s | damroll +4, hitroll +3, hp +20 | caretaker assistant, valeda |
| a finely crafted silvite ring | 52 | 72g98s | damroll +4, hitroll +4, str +1 | llander, pyrainn mountains |
| a signet ring | 55 | 66g33s | damroll +5, hitroll +5, hp +35 | gromm, yrenelania |

### Leg Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- |
| a pair of copper legplates | 13 | 9g55s | damroll +1 | [purchase] Bruavaabwaew Tuuhtwelaag, Naerlan |
| a set of iron-spiked leg plates | 13 | 9g0s | damroll +2 | a mountain goblin, bose'nisten |
| a pair of shadow steel leg plates | 15 | 6g3s | hitroll +3 | Zzukenethaft |
| bloodstained trousers | 16 | 0g24s | hitroll +2, damroll +2 | master vampire, nerezza |
| a pair of bronze legplates | 19 | 19g55s | damroll +1, str +1 | [purchase] Bruavaabwaew Tuuhtwelaag, Naerlan |
| a pair of black leggings | 22 | 34g65s | damroll +2, con +1 | drow mines |
| mithril greaves | 24 | 27g47s | hitroll +2 | loahann, foreman at mines of noal'xyn |
| a stylish set of trousers | 26 | 14g85s | hitroll +3, damroll +1 | girl in merchants house, aliuna |
| a pair of bloodied leather pants | 27 | 14g85s | damroll +4 | the meridian, the styweard |
| silver greaves | 28 | 16g93s | hitroll +5, int -1, dex +1 | guard in mirage |
| iron leggings | 30 | 0g0s | damroll +2, hitroll +2 | jeroretlan, mines of noal'xyn |
| a pair of brown, canbas trousers | 30 | 16g26s | [-E] hitroll +2, damroll +3 | vallien knight, terrason |
| rotting hide greaves | 34 | 6g79s | hitroll +3, damroll +3 | valeda orc |
| a pair of dark runed legplates | 35 | 24g27s | hitroll +4, damroll +3, str +1 | gharl, naerlan |
| elemental arbed pants of pain | 36 | 6g8s | damroll +3, hitroll +3, str +2, hp -50 | pain elemental, valeda |
| runed steel greaves | 37 | 16g83s | hitroll +6, damroll +2 | captain merciata, aliuna |
| a pair of engraved brass leg plates | 43 | 21g73s | damroll +5 | fast pixie patroller, valeda |
| a pair of tinted leg-guards | 43 | 13g69s | damroll +5,hitroll +5 | halfling guard, tyrinn village |
| stiff hide leggings | 46 | 16g70s | damroll +4, hitroll +4, str +2 | orc chieftan grarg, valeda |
| a pair of strong, thick leather greaves | 51 | 31g34s | damroll +7 | brave adventurer, kaer tzoun |
| shimmering leggings | 53 | 94g5s | hitroll +10, damroll +1 | sweet-voiced chorus girl, xuergothe |
| a pair of fine felt leggings | 60 | 64g35s | hitroll +7, damroll +3 | small human boy, overlook grounds |

### Feet Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- |
| a pair of steel-toed boots | 8 | 1g97s | damroll +1 | duergar in Naerlan |
| a lightweight pair of boots | 10 | 0g0s | move +100 | gypsy in naerlan |
| a pair of knee-high boots | 18 | 76g56s | damroll +2, con +1 | drow mines |
| mithril boots | 24 | 27g10s | damroll +2 | loahan, mines of noal'xyn |
| an aviak anklet | 25 | 12g37s | hitroll +4, dex +1 | aviak sentry in avian tree |
| a pair of black leather boots | 26 | 24g5s | hitroll +2, damroll +2 | half-orc orak, underdark |
| boots of flying | 29 | 97g52s | +flying, +300 move | drevlin, underdark |
| iron combat boots | 30 | 0g0s | hitroll +2, damroll +2, dex +1 | jeroretlan, mines of noal'xyn |
| an expensive pair of leather boots | 36 | 44g55s | hitroll +4, damroll +3 | merchant graegor, aliuna |
| a pair of leather boots | 36 | 9g89s | move +500, dex +2 | gnomish student, tyyrinn |
| simple leather boots | 38 | 19g90s | hitroll +2, damroll +4, saves -2 | enthralled older elf, valeda |
| a painted ankle bracelet | 39 | 9g43s | hitroll +5, damroll +3 | a dancing sylvan female, valeda |
| soft calfskin boots | 40 | 33g39s | damroll +3, hitroll +5 | floraena, merakkis kitchen, valeda |
| a pair of brass-reinforced boots | 43 | 17g32s | hitroll +4, damroll +2, str +2 | pixie guard, valeda |
| soft deerskin boots | 47 | 23g96s | damroll +6 | bandit, kaer tzoun |
| strong knee-high leather boots | 52 | 34g39s | damroll +5, hitroll +5 | cartographer, kaer tzoun |
| a pair of moss covered boots | 55 | 49g50s | hitroll +5, damroll +5, move +300 | xe'lith patroller |
| a pair of tough boots | 57 | 20g9s | hitroll +6, damroll +6 | ekeki, acoma |

### Held Items
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| a small idol of asteri | 9 | 12g0s | str +1, damroll +1 | lunatics alley |
| a small idol of mahrina | 10 | 0g99s | hitroll +2 | t'liesin clan leader, gypsy camp |
| a dark-glowing statue | 11 | 25g0s | hitroll +1, damroll +1 | artifact merchant, aliuna |
| a goblin fetish | 12 | 0g0s | int +1, damroll +1 | goblin stronghold |
| the spirit of darkness | 18 | 0g9s | ac -1, damroll +1, hitroll +4 | nightwalker, nerezza |
| a life-like wolf carving | 25 | 32g50s | hitroll +4, damroll +1 | a master woodcarver, valeda |
| a large bear carving | 25 | 25g0s | damroll +2, str +2 | a master woodcarver, valeda |
| a frost wolf's tusk | 39 | 9g90s | damroll +3, con +1 | oterion hunter |
| a sacred tome | 40 | 37g12s | [-E] damroll +1, hitroll +2, saves -1, hp +20 | tyrlonde, castle of burdon |
| a magical cloth doll | 45 | 35g0s | con +4 | a pretty little Yara, heishaer city |
| a corn cob pipe | 48 | 5g82s | damroll +4, wis +2 | plodding traveler, kaer tzoun |

### Floater Items
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- |
| an aura of strength | 9 | 0g0s | strength +1 | nerezza |
| a smooth, round pebble | 10 | 0g0s | damroll +1, hp +1 | shrine of barbades |
| an undead stench | 13 | 0g0s | damroll +2 | zombie, nerezza |
| a dark-trimmed emerald | 14 | 12g48s | int +2 | goblin stronghold |
| a dark-trimmed ruby | 14 | 12g42s | dex +2 | goblin stronghold |
| a dark-trimmed amethyst | 14 | 12g51s | wis +2 | goblin stronghold |
| a dark-trimmed sapphire | 14 | 13g63s | str +2 | goblin stronghold |
| a dark-trimmed pearl | 14 | 11g85s | con +2 | goblin stronghold |
| a swooping parrot | 20 | 14g85s | hitroll +3, ac -2 | the avian tree, raven darter |
| an aviak eye | 30 | 14g85s | str +1, con +1, dex +1 | the avian tree |
| a cloud of smoke | 32 | 24g96s | hitroll +3, hp +20 | smoke elemental, dleivain |
| a bronze coin | 35 | 86g53s | +3 damroll, hp +25 | Yrenelania Orgath |
| a pair of fluttering pixie wings | 36 | 80g0s | hitroll +4, dex +2 | flirting pixie, sandcastle |
| an elemental aura of fear | 37 | 2g17s | hitroll +2, damroll +5, str -2 | fear elemental, valeda |
| the mark of the head priest | 38 | 49g50s | hitroll +5, damroll +5 | aliuna head priest |
| an aura of contentment | 41 | 29g91s | hitroll +4, damroll +3, ac -3 | pixie mother, valeda |
| a zipping fly | 43 | 15g82s | hitroll +4, damroll +3 | zipping pixie guuard, valeda |
| a pretty stone | 43 | 11g7s | damroll +3, hitroll +4 | kid in heishaer city |
| eye of the frost beast | 45 | 76g23s | damroll +2, str +1, dex +1, saves -4 | frost beast, pyrainn mountains |
| the eyes of warrl | 54 | 101g0s | hitroll +6, mana +50 | warrl, acoma estate |
| insanity | 60 | 0g99s | int -4, wis -4, damroll +8 | beastie, xuergothe |
