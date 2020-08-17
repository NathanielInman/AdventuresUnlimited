# AdventuresUnlimited
A collection of resources and information surrounding the Adventures Unlimited MUD

- [Official Homepage](tharel.net)
- [Item Calculator](https://itemcalculator.nathanielinman.com/)
- [Territory Calculator](https://territorycalculator.nathanielinman.com/)
- [Home Calculator](https://homecalculator.nathanielinman.com/)

## Table of Contents
- [Directions](#directions)
  - [Areas](#areas)
  - [Quest Masters](#quest-masters)
    - [Quest Items](#quest-items)
  - [Trainers](#trainers)
  - [Tradesguilds](#tradesguilds)
    - [Required Ore Table](#required-ore-table)
    - [Materials Table](#materials-table)
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
  - [Spec And Class Table](#spec-and-class-table)
  - [Specialization Unlockable Table](#specialization-unlockable-table)
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
  - [Quest Buffer](#quest-buffer)
  - [Mining Loop](#mining-loop)
  - [Armorsmith Fixing Loop](#armorsmith-fixing-loop)
  - [Armorsmith Training Loop](#armorsmith-training-loop)
  - [Armorsmith Crafting Loop](#armorsmith-crafting-loop)
  - [Poison Training Loop](#poison-training-loop)

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

#### Quest Items
| Name | Alignment | Hidden | 
| --- | --- | --- |
| the chalice of the sun | good | |
| the amulet of courage | good | |
| the sceptre of mercy | good | |
| the tome of eternal benevolence | good | |
| the crystalline shard | good | |
| a cloth woven of innocence | good | |
| a sliver of hope | good | |
| the scales of justice | good | |
| a worry stone | good | |
| a sliver of the truth | good | **✓** |
| a piece of lost glory | good | **✓** |
| a blessed stone of luck | good | **✓** |
| sacred seedling of the one one tree | neutral | |
| the silver chronometer | neutral | |
| the manuscripts of wisdom | neutral | |
| the talisman of harmony | neutral | |
| the fruit of the earth | neutral | |
| the grain of sustenance | neutral | |
| the three faces of tolerance | neutral | |
| a platinum coin etched with the image of Irrail | neutral | |
| a historical almanac | neutral | |
| a powerful antidote | neutral | **✓** |
| the incense of meditation | neutral | **✓** |
| a chunk of petrified wood | neutral | **✓** |
| the codex of the occult | evil | |
| the jaded scarab | evil | |
| the evil eye of torment | evil | |
| the finger of condemnation | evil | |
| the blood thorn | evil | |
| the heart of deception | evil | |
| a miniature stone obelisk | evil | |
| a small piece of irlimnite ore | evil | |
| the cursed tome of destruction | evil | |
| the rune covered sacrificial knife | evil | **✓** |
| the ancient blessing of an antipaladin | evil | **✓** |
| a parchment inscribed with words of power | evil | **✓** |
### Trainers
Most trainers - with exception of monk - have 3 ranks found within tharel: entry, mid-level and hero.

#### Entry Trainers (up to level 10)
- Thief (Naerlan): 4s1e1s1e1s
- Monk (Naerlan): 5w2n1e2n1u
- Warrior (Naerlan): 3e1s1e1s
- Myrmidon (Naerlan): 5w5s2e1s
- Mage (Naerlan): 4w2s1e
- Charlatan (Naerlan): 5w2n3e1n1w
- Cleric (Naerlan): 1n1w1n1w
- Paladin (Naerlan): 1n2e
- Antipaladin (Naerlan): 4e2n3w2n1d

#### Mid Level (up to level 40)
- Thief (Aliuna): 11e3s6e4s7e2n2e1s2w1d
- Monk (Aliuna): same as hero trainer
- Warrior (Aliuna): 11e3s6e4s7e3s2e4s1w2s2w1n
- Myrmidon (Aliuna): 11e3s6e4s7e6s2e2n1e1n
- Mage (Aliuna): 11e3s6e4s7e5n1w1u
- Charlatan (Aliuna): 11e3s6e4s9e1n3w1u
- Cleric (Aliuna): 11e3s6e4s7e3s6e2s1u1s
- Paladin (Aliuna): 11e3s6e4s7e5n2e1s2e
- Antipaladin (Aliuna): 11e3s6e4s7e6s1w1d

#### Hero Trainers
- Thief & Charlatan (Terrason): 11e3n12e6n3w4n2w9n8e4n1d2e1s
- Monk (Aliuna): 11e3s6e4s7e2n8e2s2w
- Warrior (Northern Barreston): 4e9n5w6n6w3n2w3n2w1s1w1n10w3s5w4n2w6n3w3s2e1s
- Myrmidon (Northern Barreston): 4e9n5w6n6w3n2w3n2w1s1w1n10w3s5w4n2w6n3w2s1e1u1e
- Mage (Upper Barreston): 4e9n5w6n6w3n2w3n2w3n1e1u1e1n1e2s4e2n1e1u1n5e2n1e2n2u
- Evil/Neutral Cleric (Terrason): 4e9n5w6n11e3n5e1n3e10n1e2n1w4n2e4n1w4n2e2n1e4n4e5n5e1n1e1s2d2w
- Good Cleric (Rivendale): 4e9n5w6n6w8s2w1n2w4s1w4s3w3s3w2n1w1n
- Paladin (Rivendale): 4e9n5w6n6w8s2w1n2w4s1w4s3w3s3w2n1e1n
- Antipaladin (Terrason): 4e9n5w6n11e3n5e1n3e10n1e2n1w4n2e4n1w4n2e2n1e4n4e5n5e1n1e1s2d1w1s

### Tradesguilds
The following is the locations of the tradesguilds: 

| name | directions |
| --- | --- |
| miners | 4e17s4w9s2w2s1w3s1d |
| jewelers | 11e3s6e4s7e6s8e1s |
| weaponsmiths | 4e9n5w6n11e3n5e1n3e7n2w9n14e1n | 
| armorsmiths | 4e9n5w6n6w3n2w3n2w1s1w1n10w3s5w4n3e11n6e8n1w4n2e1n;buy key;unlock north;open north;2n6e1s |

#### Required Ore Table
| item | ore required | trades |
| --- | --- | --- |
| Head | 40 | armorsmithing, jewelcrafting |
| Neck | 30 | armorsmithing, jewelcrafting |
| Finger | 20 | jewelcrafting |
| Arms | 25 | armorsmithing, jewelcrafting |
| wrist | 30 | armorsmithing, jewelcrafting |
| hands | 25 | armorsmithing |
| torso | 45 | armorsmithing |
| waist | 40 | armorsmithing, jewelcrafting |
| legs | 30 | armorsmithing |
| feet | 15 | armorsmithing |
| hold | 30 | armorsmithing, jewelcrafting |
| shield | 30 | armorsmithing |
| dagger | 30 | weaponsmithing |
| sword | 55 | weaponsmithing |
| mace | 45 | weaponsmithing |
| polearm | 75 | weaponsmithing |
| axe | 70 | weaponsmithing |
| flail | 60 | weaponsmithing |
| staff | 45 | weaponsmithing |
| spear | 45 | weaponsmithing |

#### Materials Table

Strength And Magic Percentages:
```
0-9=abysmal, 10-19=atrocious, 20-29=incompetent, 30-39=lousy, 40-49=passable,
50-64=adequate, 65-74=accomplished, 75-84=outstanding, 85-99=exceptional, 100=masterful
```

Rarity Percentages:
```
0-9=extremely rare, 10-19=very rare, 20-29 = kinda rare,30-39 = uncommon, 40-49=barely uncommon
50-59=common,60-69=very common,70-79=abundant,80-89=very abundant,90-100=everywhere
```

| name | type | strength | magic | rarity | other |
| --- | --- | --- | --- | --- | --- |
| lead | metal | adequate | incompetent | everywhere |
| gold | metal | adequate | adequate | abundant |
| pewter | metal | adequate | adequate | everywhere |
| silver | metal | adequate | passable | abundant |
| copper | metal | adequate | lousy | abundant |
| brass | metal | accomplished | incompetent | very abundant |
| electrum | metal | accomplished | outstanding | very common |
| bronze | metal | accomplished | lousy | abundant |
| platinum | metal | accomplished | accomplished | abundant |
| iron | metal | accomplished | atrocious | very abundant |
| steel | metal | accomplished | adequate | very abundant |
| meteorite | metal | outstanding | adequate | very abundant |
| mithril | metal | outstanding | accomplished | very common |
| adamantite | metal | outstanding | exceptional | very common |
| silvite | metal | outstanding | accomplished | very common |
| cold steel | metal | exceptional | exceptional | common |
| irlimnite | metal | exceptional | atrocious | very abundant |
| uulayilium | metal | exceptional | exceptional | common |
| qyarelite | metal | exceptional | exceptional | barely uncommon |
| zeririte | metal | exceptional | exceptional | uncommon |
| xedalium | metal | masterful | masterful | kinda rare |
| amethyst | mineral | accomplished | passable | very abundant | minor energy resistance
| glass | mineral | adequate | atrocious | everywhere |
| clay | mineral | adequate | incompetent | everywhere |
| diamond | mineral | oustanding | accomplished | very common | lesser lightning resistance
| ebony | mineral | accomplished | passable | very abundant | 
| emerald | mineral | accomplished | atrocious | abundant | moderate poison resistance
| garnet | mineral | adequate | exceptional | very common | moderate mental resistance
| gem | mineral | adequate | adequate | very abundant |
| granite | mineral | adequate | atrocious | everywhere |
| ivory | mineral | adequate | outstanding | very abundant |
| jade | mineral | adequate | accomplished | abundant | lesser acid resistance
| marble | mineral | adequate | incompetent | everywhere |
| obsidian | mineral | adequate | adequate | very abundant |
| onyx | mineral | adequate | incompetent | abundant | minor holy resistance
| opal | mineral | accomplished | accomplished | very common | minor light resistance
| pearl | mineral | accomplished | passable | very abundant |
| pyrite | mineral | accomplished | lousy | very abundant | moderate iron resistance
| quartz | mineral | accomplished | accomplished | very common | minor magic resistance
| sapphire | mineral | accomplished | adequate | very common | lesser fire resistance
| ruby | mineral | outstanding | adequate | very common | moderate cold resistance
| stone | mineral | accomplished | passable | very abundant |
| amber | mineral | lousy | very abundant | very common | greater energy resistance
| aquamarine | mineral | adequate | accomplished | very common | minor drowning resistance
| azurite | mineral | passable | lousy | very common | extreme iron resistance, minor magic vulnerability
| beryl | mineral | accomplished | accomplished | common | extreme holy resistance
| chrysoberyl | mineral | accomplished | accomplished | common | moderate mental resistance
| citrine | mineral | accomplished | atrocious | abundant | moderate sound resistance
| heliodor | mineral | accomplished | exceptional | barely uncommon | minor fire vulnerability, extreme cold resistance
| lapis | mineral | adequate | adequate | very common | moderate fire resistance, minor cold vulnerability
| moonstone | mineral | adequate | exceptional | barely uncommon | extreme silver resistance
| morganite | mineral | accomplished | adequate | common | lesser magic resistance
| olivine | mineral | adequate | outstanding | common | lesser fire resistance
| spinel | mineral | accomplished | accomplished | adequate | extreme mental resistance
| sunstone | mineral | adequate | exceptional | barely uncommon | extreme light resistance
| tanzanite | mineral | adequate | passable | very common | extreme lightning resistance, lesser drowning vulnerability
| topaz | mineral | adequate | accomplished | uncommon | lesser bash resistance
| tourmaline | mineral | adequate | adequate | barely uncommon | extreme acid resistance

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
The max stats a mark can upgrade to are:
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

- A housing cost simulator website is available [here](https://homecalculator.nathanielinman.com).
- A housing cost simulator template of a maxed manor is available [here](https://homecalculator.nathanielinman.com/#/dashboard?locationType=manor&healingRate=400&hasPortal=true&isPublic=false&doorLock=0&doorType=0&lockLevel=50&furnitureItems=8&fireplaceItems=1&fountainItems=1&troughItems=1&crucibleItems=1&anvilItems=1&workbenchItems=1&forgeItems=1&sanctuary=true&haste=true&phase=true&protection=true&sneak=true&fly=true&invisibility=true&criticalStrike=true&counter=true&dirtKick=true&disarm=true&berserk=true&bash=true&trip=true&resistMonk=true&resistMagic=true&resistPierce=true&resistSlash=true&resistBash=true&resistWood=true&resistSilver=true&resistIron=true&resistLight=true&resistPoison=true&resistHoly=true&resistEnergy=true&resistDisease=true&resistFire=true&resistCold=true&resistLightning=true&resistAcid=true). (727,100 gold)
- A housing cost simulator template of a maxed house is available [here](https://homecalculator.nathanielinman.com/#/dashboard?locationType=house&healingRate=300&hasPortal=true&isPublic=false&doorLock=1000&doorType=100&lockLevel=100&furnitureItems=3&fireplaceItems=1&fountainItems=1&troughItems=1&crucibleItems=1&anvilItems=1&workbenchItems=1&forgeItems=1&sanctuary=false&haste=false&phase=false&protection=false&sneak=false&fly=false&invisibility=false&criticalStrike=false&counter=false&dirtKick=false&disarm=false&berserk=false&bash=false&trip=false&resistMonk=false&resistMagic=false&resistPierce=false&resistSlash=false&resistBash=false&resistWood=false&resistSilver=false&resistIron=false&resistLight=false&resistPoison=false&resistHoly=false&resistEnergy=false&resistDisease=false&resistFire=false&resistCold=false&resistLightning=false&resistAcid=false). (651,750 gold)

| description | diamonds | equivalent gold |
| --- | --- | --- |
| additional room heal rate 10% (starts at 100%) | 125 | 13,750 |
| maxed room heal rate 300% | 2500 | 275,000 |
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
| a quick bayard | 70 | 490g0s | Wildlife Refuge |
| a grim-faced pixie mercenary | 70 | 490g0s | Lost Kingdoms |
| an elemental guardian | 75 | 752g50s | Rivendale |
| the yeck | 75 | 562g50s | Wildlife Refuge |
| a greedy gnome mercenary | 75 | 562g50s | Lost Kingdoms |
| a mischievous alan | 80 | 640g0s | Wildlife Refuge |
| a professional quickling mercenary | 80 | 640g0s | Lost Kingdoms |
| a serious sylvan mercenary | 85 | 722g50s | Lost Kingdoms |
| an outcast drow mercenary | 90 | 810g0s | Lost Kingdoms |
| a grumbling duergar mercenary | 95 | 902g50s | Lost Kingdoms |
| an uninterested female mercenary | 95 | 902g50s | Lost Kingdoms |
| a smiling halfling mercenary | 100 | 1000g0s | Lost Kingdoms |
| a heavily-muscled giant mercenary | 100 | 1000g0s | Lost Kingdoms |

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

### Spec And Class Table
Specialization points allow a caster to excel further at a spellcasting group. You must master the entire spellgroup before specializing in it.
| level       | mage  | cleric | antipaladin | paladin | charlatan | myrmidon |
|---|---|---|---|---|---|---|
| 50          | 2     | 1      |  1           | 1      |   1       |  1        |
| 60          | 1     | 1      |  0           | 0      |   0       |  0        |
| 70          | 2     | 1      |  1           | 1      |   1       |  1        |
| 80          | 2     | 1      |  1           | 1      |   1       |  1        |
| 90          | 1     | 1      |  0           | 0      |   0       |  0        |
| 100         | 2     | 1      |  1           | 1      |   1       |  1        |
| total       | 10    | 6      |  4           | 4      |   4       |  4        |

### Specialization Unlockable Table
Putting specialization points into certain groups may unlock new versions of spells.
| name | root spell | rank required | group |
| --- | --- | --- | --- |
| shocklash | shocking grasp | 1 | combat |
| vision shield | cure blindness | 2 | curative |
| divine vitality | cure disease | 2 | curative |
| divine fortitude | cure poison | 2 | curative |
| bestial strength | giant strength | 1 | enhancement |
| elemental strength | giant strength | 3 | enhancement |
| dragon strength | giant strength | 5 | enhancement |
| gazelle agility | haste | 1 | enhancement |
| viper quickness | haste | 3 | enhancement |
| snowcat speed | haste | 5 | enhancement |
| shadow sight | infravision | 1 | enhancement |
| hex shield | remove curse | 1 | benedictions |
| goblin weakness | weaken | 3 | maladictions |
| pixie weakness | weaken | 5 | maladictions |
| sloth slowness | slow | 1 | maladictions |
| tortoise plodding | slow | 3 | maladictions |
| slug speed | slow | 5 | maladictions |
| curse of the hag | curse | 1 | maladictions |
| curse of the mummy | curse | 3 | maladictions |
| curse of the demon | curse | 5 | maladictions |
| spider poison | poison | 1 | maladictions |
| snake poison | poison | 2 | maladictions |
| urthomu pioson | poison | 3 | maladictions |
| nerassi poison | poison | 4 | maladictions |
| artilis poison | poison | 5 | maladictions |
| itchy scabs | plague | 1 | maladictions |
| oozing blisters | plague | 2 | maladictions |
| festering sores | plague | 3 | maladictions |
| puss filled boils | plague | 4 | maladictions |
| infected pustules | plague | 5 | maladictions |
| disorientation | blindness | 1 | maladictions |
| granite skin | stone skin | 1 | protective |
| iron skin | stone skin | 3 | protective |
| diamond skin | stone skin | 5 | protective |
| mystic weakness | dispel magic | 1 | protective |

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

Things that affect hit chance:
  - a tiny amount of your intelligence
  - a small amount of your strength
  - a large amount of the difference between your enemy and your dexterity
  - your hitroll becomes less effective at higher levels so more is needed
  - a *very* large portion can be affected by your rested state
  - there is a base of 65% chance to hit with possibility to go lower, with a maximum of 95%

### Armor Class
Armor class doesn't scale well at later levels. You'd need -2500 AC to remove 30% of 1k damage at hero. Because of this scaling its better not to even worry about damage reduction from armor past beginning of the game.

### Magic Saves
Saves can prevent effects altogether like blind, or merely reduce damage by a percent depending on the spell.

Things that affect saves:
  - racial resistance & invulnerability
  - mages, clerics, paladins, charlatans, myrmidons, antipaladins & monk have bonuses
  - warriors & thiefs have negatives
  - berserk provides an *immense* bonus to magic saves
  - level difference between an enemy and player provides a *huge* difference
  - you will always have at least a 5% chance to save, with a maximum of 95%

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
#### Quest Buffer
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
#### Mining Loop
The following is a mining loop:
```
/* mining loop - triggers only work when starting w/ td */
#var {tunnelDirection}{down}
#var {mining}{false}
#alias {td}{ #var {tunnelDirection}{down}; #var {mining}{true}; tunnel $tunnelDirection; }
#action {You need to hold a pickaxe in order to dig}{
  hold pickaxe;
  #if {"$mining" == "true"}{ tunnel $tunnelDirection; };
}
#action {You chip away at the walls making no pogress}{ #nop; }
#action {You chip at the walls}{
  #if {"$mining" == "true"}{
    #var {tunnelDirection}{south};
    tunnel $tunnelDirection;
  };
}
#action {You chip away at the walls making very little progress}{ #if {"$mining" == "true"}{tunnel $tunnelDirection;}; }
#action {You tunnel}{ #if {"$mining" == "true"}{$tunnelDirection; mine; }; }
#action {You chip off chunks of xedalium}{ take xed;put xed sat; }
#action {You chip off chunks of %1}{ take chunk;donate chunk clan;drop chunk;mine; }
#action {You fail to mine the ore from the vein}{ mine; }
#action {You think there might be ore here but you do not see a vein to mine.}{ mine; }
#action {You search for a vein of metal in this tunnel but cannot locate one.}{ tunnel $tunnelDirection; }
```
#### Armorsmith Fixing Loop
The following is an automated repair command for armorsmith. Merely type `f itemname` and it'll fix it provided you have a hammer and wool in your inventory.
```
#var {armorsmithRepairItem} {none}
#alias {f %1}{ #var {armorsmithRepairItem}{ %1 };rebuild $armorsmithRepairItem; }
#action {This item needs to be repaired}{ repair $armorsmithRepairItem; }
#action {This item needs to be readjusted}{ readjust $armorsmithRepairItem; }
#action {This item only needs to be readjusted}{ readjust $armorsmithRepairItem; }
#action {You succeed in removing a few blemishes}{ readjust $armorsmithRepairItem; }
#action {You fail to remove the blemishes}{ readjust $armorsmithRepairItem; }
#action {You work with a hammer and anvil to improve the condition}{ repair $armorsmithRepairItem; }
```
#### Armorsmith Training Loop
The following is an automated armorsmith trainer. Merely get a bunch of `silver` items from `Mirage City` and then make sure you have a hammer, file and tongs in you inventory and type `m 2.silver` and it'll smelt everything down and make boots with nothing left over when finished. Because it's action-based you can still communicate over channels while it's running. Once you've mastered everything don't use this, use the automated crafting loop.
```
#var {armorsmithSmeltItem} {none};
#var {armorsmithFormItem}{feet};
#var {armorsmithOre}{unknown};
#var {armorsmithPoundMax}{100};
#var {armorsmithPoundCur}{0};
#alias {m %1}{ #var {armorsmithSmeltItem}{ %1 };smelt $armorsmithSmeltItem; }
#action {You combine your ore and now have %1 pounds of raw %2.}{
  #var {armorsmithOreWeight} { %1 };
  #if {$armorsmithOreWeight < 15}{ smelt $armorsmithSmeltItem; };
  #if {$armorsmithOreWeight > 14}{
    #var {armorsmithOre}{ %2 };
    hold tongs;form $armorsmithOre armor $armorsmithFormItem;
  }
}
#action {You now have %1 pounds of raw %2.}{
  #var {armorsmithOreWeight} { %1 };
  #if {$armorsmithOreWeight < 15}{ smelt $armorsmithSmeltItem; };
  #if {$armorsmithOreWeight > 14}{
    #var {armorsmithOre}{ %2 };
    hold tongs;form $armorsmithOre armor $armorsmithFormItem;
  }
}
#action {You fail to form} { smelt ruined; }
#action {You have broken the form} { smelt broken; }
#action {You have cracked the form} { smelt broken; }
#action {You filed a large gash into} { smelt $armorsmithSmeltItem; }
#action {You use your tongs and the anvil to form} {
  hold hammer;
  #var {armorsmithPoundCur} { 0 };
  pound $armorsmithFormItem;
}
#action {* CLANG! *} {
  #math {armorsmithPoundCur} {$armorsmithPoundCur + 1};
  #if {$armorsmithPoundCur < $armorsmithPoundMax} {
    hold hammer; pound $armorsmithFormItem;
  }
  #if {$armorsmithPoundCur == $armorsmithPoundMax} {
    hold tongs;quench $armorsmithFormItem;
  }
}
#action {You quench the form of the} { hold file; finish $armorsmithFormItem; }
#action {You file down} { smelt $armorsmithOre; }
```
#### Armorsmith Crafting Loop
The following is a completely automated crafting loop. It smelts failures and automatically restarts until it made an item or you're out of resources. Make sure you you have a hammer, file and tongs in your inventory as well as items to smelt. `m (item name to smelt) (target equip slot) (target level)`:
```
/* smithing and smelting loop */
#var {armorsmithSmeltItem} {none};
#var {armorsmithFormItem}{feet};
#var {armorsmithOre}{unknown};
#var {armorsmithQuantity}{40};
#var {armorsmithPoundMax}{15};
#var {armorsmithPoundCur}{0};
#var {armorsmithForming}{false};
#var {armorsmithLevel}{105};
#alias {m %1 %2 %3}{
  #var {armorsmithSmeltItem}{ %1 };
  #var {armorsmithFormItem}{ %2 };
  #var {armorsmithLevel}{ %3 };
  #if {{%2}=={head}} { #var {armorsmithQuantity}{ 40 }; };
  #if {{%2}=={neck}} { #var {armorsmithQuantity}{ 30 }; };
  #if {{%2}=={arms}} { #var {armorsmithQuantity}{ 25 }; };
  #if {{%2}=={wrist}} { #var {armorsmithQuantity}{ 30 }; };
  #if {{%2}=={hands}} { #var {armorsmithQuantity}{ 25 }; };
  #if {{%2}=={torso}} { #var {armorsmithQuantity}{ 45 }; };
  #if {{%2}=={waist}} { #var {armorsmithQuantity}{ 40 }; };
  #if {{%2}=={legs}} { #var {armorsmithQuantity}{ 30 }; };
  #if {{%2}=={feet}} { #var {armorsmithQuantity}{ 15 }; };
  #if {{%2}=={hold}} { #var {armorsmithQuantity}{ 30 }; };
  #if {{%2}=={shield}} { #var {armorsmithQuantity}{ 30 }; };
  #showme <138>+------+ <188>Starting level $armorsmithLevel $armorsmithSmeltItem ($armorsmithQuantity ore)<138> +------+;
  smelt $armorsmithSmeltItem;
}
#action {You combine your ore and now have %1 pounds of raw %2.}{
  #var {armorsmithOreWeight} { %1 };
  #if {$armorsmithOreWeight < $armorsmithQuantity && "$armorsmithForming" != "true"}{ smelt $armorsmithSmeltItem; };
  #if {$armorsmithOreWeight >= $armorsmithQuantity}{
    #var {armorsmithOre}{ %2 };
    #var {armorsmithForming}{true};
    hold tongs;form '$armorsmithOre' armor $armorsmithFormItem;
  }
}
#action {You now have %1 pounds of raw %2.}{
  #var {armorsmithOreWeight} { %1 };
  #if {$armorsmithOreWeight < $armorsmithQuantity && "$armorsmithForming" != "true"}{ smelt $armorsmithSmeltItem; };
  #if {$armorsmithOreWeight >= $armorsmithQuantity}{
    #var {armorsmithOre}{ %2 };
    #var {armorsmithForming}{true};
    hold tongs;form '$armorsmithOre' armor $armorsmithFormItem;
  }
}
#action {You fail to form} { #var {armorsmithForming}{false}; smelt ruined; }
#action {You have broken the form} { #var {armorsmithForming}{false}; smelt broken; }
#action {You have cracked the form} { #var {armorsmithForming}{false}; smelt broken; }
#action {You filed a large gash into} { #var {armorsmithForming}{false}; smelt $armorsmithSmeltItem; }
#action {You use your tongs and the anvil to form} {
  #var {armorsmithPoundCur} { 0 };
  pound $armorsmithFormItem;
}
#action {* CLANG! *} {
  #math {armorsmithPoundCur} {$armorsmithPoundCur + 1};
  #if {$armorsmithPoundCur < $armorsmithPoundMax} {
    #showme <178>+------+ <188> Pounding <168>$armorsmithPoundCur<178>/<068>$armorsmithPoundMax <178>+------+;
    pound $armorsmithFormItem;
  }
  #if {$armorsmithPoundCur == $armorsmithPoundMax} {
    #showme <178>+------+ <188> Successful Pound! <178>+------+;
    hold tongs;quench $armorsmithFormItem;
  }
}
#action {You need a hammer to shape}{ hold hammer; pound $armorsmithFormItem; }
#action {You quench the form of the} { hold file; finish $armorsmithFormItem $armorsmithLevel; }
#action {You file down} {
  #var {armorsmithForming}{false};
  condition $armorsmithOre;
  #showme <138>+------+ <188>Finished $armorsmithFormItem<138> +------+;
}
```
#### Poison Training Loop
For classes that have 'cure poison' and 'poison', this is the fastest way to master both skills.
```
#var {farmState}{none};
#action {You feel less sick}{c 'poison' alleus;#var {farmState}{none};}
#action {You feel momentarily ill}{c 'poison' alleus;}
#action {The poison in you is resistant}{c 'cure poison';}
#action {You feel sick}{c 'cure poison' alleus;#var {farmState}{yes};}
#action {You lost your concentration}{
  #if {"$farmState"=="none"}{ c 'poison' alleus; }
  #if {"$farmState"=="yes"}{ c 'cure poison' alleus; }
}
```
