# AdventuresUnlimited
A collection of resources and information surrounding the Adventures Unlimited MUD

## Table of Contents
- [Directions](#directions)
- [Temple](#temple)
  - [Temple Rank Costs](#temple-rank-costs)
  - [Temple Upgrade Costs](#temple-upgrade-costs)
  - [Temple Healer Costs](#temple-healer-costs)
- [Entitlement](#entitlement)
  - [Housing Costs](#housing-costs)
- [Pets](#pets)
- [Monk](#monk)
  - [Monk Mantras](#monk-mantras)
  - [Monk Fight Moves](#monk-fight-moves)
  - [Monk Techniques](#monk-techniques)
  - [Monk Abilities](#monk-abilities)
  - [Monk Chi](#monk-chi)
  - [Monk Stances](#monk-stances)
  - [Monk Combos](#monk-combos)
- [Quest Rewards](#quest-rewards)
- [Prompts](#prompts)
- [MUD Client Configuration](#mud-client-configuration)
  - [TinTin++](#tintin)
- [Potions Wands Staves & Scrolls](#potions-wands-staves-and-scrolls)
- [Items For Leveling](#items-for-leveling)
  - [Light Items](#light-items)
  - [Head Armor](#head-armor)
  - [Neck Armor](#neck-armor)
  - [Shoulder Armor](#shoulder-armor)
  - [Torso Armor](#torso-armor)
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
The following are unlisted or possibly removed areas that may need to be removed or added to the `areas` list within the game:
- Plains of Blodai: 4e9n5w6n11e3n5e1n3e7n2w9n1w1n3w7n10w
- Ruined Gerighelm: 5w9n4e6n6w3n2w3n2w

All `directions` start from `Market Square` within `Naerlan`.
| level | name | directions |
| --- | --- | --- |
| ALL | The Western Beaches | Unknown |
| ALL | The Western Ocean | Unknown |
| ALL | The Western Coastline | Unknown |
| ALL | More Western Ocean | Unknown |
| ALL | The Western Trails | 42w2s |
| ALL | The Western Road | 17w |
| ALL | Western Tharel | Unknown |
| OOC | The Lounge | 3n;go ooc |
| ALL | The Dwarven Forest | Unknown |
| ALL | Tucker's Hotel | Unknown |
| ALL | Beaches | 5w17s5e7s2e1s2e1d2s1e1s2e5s1w2s2e1d2e1s1e1s |
| ALL | Underground Highway |  4e9n5w6n11e3n5e1n3e7n2w9n1w1n3w7n2w2n2d9s8w1s2w2s2w1s |
| ALL | The Neighborhood | Unknown |
| ALL | Ether | Unknown |
| ALL | Naerlan | Starting Position |
| 1 - 5 | Survival Training | 2e1n |
| 1 - 20 | Heishnum Desert | 4e;open east;7e3s6e4s2e1s |
| 1 - 20 | The Eastern Moors | 8e1n |
| 5 - 8 | School of Faith | 6w6s1w |
| 5 - 10 | T'leisins Pool | 8w4s2w;search north;open n;1n2w2s |
| 5 - 10 | The Stone Quarry | 14w1s |
| 5 - 10 | Nerezza | 7e1d2s1e7s7e2n3w |
| 5 - 10 | Equinilis | 12w4n1w |
| 5 - 10 | Lunatic's Alley | 5w17s2e1n |
| 5 - 10 | Gypsy Camp | 8w2s |
| 5 - 10 | Naerlan Graveyard | 6w10s1w1s |
| 5 - 10 | Woodfell Forest | 5w9n4e;open north;6n3e1s |
| 5 - 15 | The Mines of Markov | 5w17s5e;open s;9s2w2s1w1n1u2n1u3n1u2w1unw2e1u3e2u8e1u1w2n |
| 5 - 15 | Shrine of Barbades | 4e9n5w6n9e2n1w1n1w1u |
| 5 - 15 | Deltherian | 8e7n |
| 5 - 15 | Taverns of Naerlan | Unknown |
| 5 - 15 | Travellers' Rest | 11e3s5w |
| 5 - 15 | Brovlancor | 4e9n5w6n6w8s2w1n2w4s1w4s2e1s |
| 5 - 30 | Naerlan Sewers | 4s2w1d |
| 5 - 40 | The City of Aliuna | 11e3s6e4s5e |
| 8 - 22 | Haythor Dungeon | Unknown |
| 10 - 15 | The Drow Mines | 4e9n5w6n11e3n5e1n3e7n2w9n1w1n3w7n2w2n2d9s8w1s2w2s2w1s1e2s1w1s2e1s |
| 10 - 15 | Cartwrights Farm | 9w1d5n7w2n1e |
| 10 - 15 | Volencymale | 12w4n1e |
| 10 - 15 | The Renault House | 7w2n2w;search n |
| 10 - 15 | Bose'nisten | 5w9n4e6n6w2s |
| 10 - 15 | The Bog of Durlah | 7e1d2w2n12w2s |
| 10 - 15 | Hagarth | 4e17s4w9s2w2s1w1s |
| 10 - 20 | Tark Valley | 9w1d5n11w;open n;1n;open w;1w;open n;n |
| 10 - 20 | Mt Ka'lri | 4e9n5w6n6w8s2w1n2w4s1s;search west;open w;1qw |
| 10 - 20 | Tzimosh's Camp | 5w9n4e6n11e3n1e1n |
| 10 - 20 | Hythian Forest | 5w17s5e;open south;7s2e1s2e1s2e1d2s1e1s1e |
| 10 - 20 | Burrowholme | 5w9n4e;open north;5n4w1n |
| 10 - 20 | Goblin Stronghold | 5w9n4e6n6w2s4s2e;search s;2s2w1s2e3s |
| 10 - 20 | Grungel | 7e1d2s1e3s1w |
| 10 - 25 | The Hand of Markov | 7s4e10s4w9s2w2s2w |
| 10 - 30 | Illianathoren Pass | 8e7n1w1n1e5n3e3n4e |
| 10 - 30 | Khetes | 11e5n2e1s7e3n |
| 10 - 40 | Northern Barreston | 5w9n4e6n6w3n2w3n2w |
| 10 - 40 | Lower Barreston | 5w9n4e6n6w3n2w3n2w |
| 10 - 40 | Upper Barreston | 5w9n4e6n6w3n2w3n2w |
| 13 - 30 | Sanctuary | 7e1d2w2n9w5s2e2s2re |
| 13 - 50 | Underdark | 4e9n5w6n3e2s1e1s2w |
| 15 - 25 | Littlefist Glade | 41w1s1w5s2w2s3w2n1w1n2w1s1w1n8w2n2w2s2w3n5w6n |
| 15 - 25 | Jasporin | 5w9n4e6n6w2s6s2w1n1w3n |
| 15 - 25 | Longbottom's Shire | 5w9n4e;open north;6n6w3n2w3n2e |
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
| contin. | contin. | 2e1n5e1n1e1s1e1n2e4s1e2u1e1s2e;search up;1u1s;go pool;go mirage |
| 20 - 30 | The Avian Tree | 5w9n4e6n11e3n1e1n |
| 20 - 30 | The Meridian | 11e3s6e4s23e2n4e |
| 20 - 35 | Dleivain | 4e9n5w6n9e2n4w1n1w1n;go door |
| 20 - 55 | Yrenelania | 8e7n1w1n1e4n2e4n8e1d1s2e;go crack;1e1n1e;search south;open south;1s3e1n2e2n3e |
| 25 - 30 | Goblin Pass | 4e9n5w6n11e3n5e1n3e7n2w9n1w1n3w7n2w1n |
| 25 - 35 | The Hamlet of Elsfar | 4e9n5w6n6w3n2w3n2w1s1w1n10w3s5w4n3e11n6e8n1w4n2e1n |
| 25 - 35 | Blackeye's Camp | 5w17s5e;open south;7s2e1s2e1s2e1d2s1e2s |
| 25 - 45 | Valeda | 4e9n5w6n11e3n5e1n3e9n |
| 30 - 40 | Castle of Burden | Unknown |
| 30 - 40 | Whirlpool | Unknown |
| 30 - 40 | R'tescra | Unknown |
| 30 - 40 | Reskel | Unknown |
| 30 - 45 | Quickling Village | Unknown |
| 30 - 50 | Darathorn's Pit | Unknown |
| 35 - 45 | The Sandcastle | Unknown |
| 35 - 45 | Oterion | Unknown |
| 35 - 45 | Eirenole | Unknown |
| 35 - 50 | Tyyrinn Village | Unknown |
| 35 - 50 | The City of Terrason | Unknown |
| 35 - 50 | Uchduruk | Unknown |
| 40 - 45 | Eirenole Thistle | Unknown |
| 40 - 50 | The Four Seasons | Unknown |
| 40 - 50 | Schwartz Glacier | Unknown |
| 40 - 50 | Mystery Manor | Unknown |
| 40 - 55 | Pyrainn Mountains | Unknown |
| 40 - 60 | Draek'le | Unknown |
| 45 - 55 | Kaer Tzoun | Unknown |
| 45 - 55 | Beehive | Unknown |
| 45 - 60 | Xuergothe Castle | Unknown |
| 45 - 60 | Eirenole Castle | Unknown |
| 50 - 60 | Heishaer City | Unknown |
| 50 - 60 | Breyard Village | Unknown |
| 50 - 60 | The Acoma Estate | Unknown |
| 55 - 65 | The Overlook Grounds | Unknown |
| 55 - 65 | The Overlook Towers | Unknown |
| 55 - 65 | Xe'lith | Unknown |
| 55 - 70 | Ruins of Khezauch | Unknown |
| 55 - 75 | Necropolis | Unknown |
| 60 - 70 | Caranos' Tomb | Unknown |
| 60 - 70 | Rivendale | Unknown |
| 60 - 75 | Tiny Rapids | Unknown |
| 60 - 85 | Lost Kingdoms | Unknown |
| 65 - 75 | Forest of Dreams | Unknown |
| 65 - 75 | The Overlook Maze | Unknown |
| 65 - 75 | Ktharstu | Unknown |
| 65 - 80 | The Forbidden Wastes | Unknown |
| 65 - 80 | Ship in a Bottle | Unknown |
| 70 - 80 | Connerty Crossing | Unknown |
| 70 - 80 | Wildlife Refuge | Unknown |
| 70 - 85 | Tekkit Hill | Unknown |
| 70 - 85 | Ruins of Khezaderth | Unknown |
| 70 - 85 | Meneth Naur | Unknown |
| 70 - 90 | Fireblast Mountains | Unknown |
| 75 - 85 | The Overlook Citadel | Unknown |
| 75 - 90 | Vlauchauch | Unknown |
| 75 - 90 | The Haze | Unknown |
| 75 - 100 | Drakyri Isle | Unknown |
| 80 - 90 | Shadowbox | Unknown |
| 85 - 95 | The White Shrine | Unknown |
| 85 - 95 | Sildarak's Crypt | Unknown |
| 85 - 110 | Urbyrtnol | Unknown |
| 90 - 95 | Eirenole Valley | Unknown |
| 90 - 110 | Ayasil | Unknown |
| 90 - 110 | Arthmore | Unknown |
| HERO | Kallenpesh Palace | Unknown |
| HERO | Kallendale Forest | Unknown |
| HERO | The Hall of Heroes | Unknown |
| HERO | Il'kaethe | Unknown |
| HERO | The Giants Outpost | Unknown |

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
| stat | rank | cost |
| --- | --- | --- | 
| hp | 5: apostle / defender / conspirator | 900g |
| wp | 5: apostle / defender / conspirator | 900g |
| mv | 5: apostle / defender / conspirator | 315g |
| hit | 5: apostle / defender / conspirator | 2850g |
| dam | 5: apostle / defender / conspirator | 4800g |
| hp | 6: champion / guardian / fiend | 850g |
| wp | 6: champion / guardian / fiend | 850g |
| mv | 6: champion / guardian / fiend | 265g |
| hit | 6: champion / guardian / fiend | 2800g |
| dam | 6: champion / guardian / fiend | 4750g |
| hp | 7: Rha'sion / Nuy'dian / Tza'fiel | 800g |
| wp | 7: Rha'sion / Nuy'dian / Tza'fiel | 800g |
| mv | 7: Rha'sion / Nuy'dian / Tza'fiel | 215g |
| hit | 7: Rha'sion / Nuy'dian / Tza'fiel | 2750g |
| dam | 7: Rha'sion / Nuy'dian / Tza'fiel | 4700g |
| hp | 8: Kru'sion / Ley'dian / Rte'fiel | 750g |
| wp | 8: Kru'sion / Ley'dian / Rte'fiel | 750g |
| mv | 8: Kru'sion / Ley'dian / Rte'fiel | 165g |
| hit | 8: Kru'sion / Ley'dian / Rte'fiel | 2700g |
| dam | 8: Kru'sion / Ley'dian / Rte'fiel | 4650g |
| hp | 9: Pol'sion / Moy'dian / Ure'fiel | 700g |
| wp | 9: Pol'sion / Moy'dian / Ure'fiel | 700g |
| mv | 9: Pol'sion / Moy'dian / Ure'fiel | 115g |
| hit | 9: Pol'sion / Moy'dian / Ure'fiel | 2650g |
| dam | 9: Pol'sion / Moy'dian / Ure'fiel | 4600g |

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
| a living whip of flame | 40 | 160g0s | Terrason |
| a spectre of light | 45 | 202g50s | Terrason |
| an enchanted gauntlet of power | 50 | 250g0s | Terrason |

## Monk

### Monk Mantras
| name | description |
| --- | --- | 
| spirit invisibility | invisibility | 
| stone hands | damage enhancement | 
| spirit eyes | detect magic, detect invis, ~detect hidden~ | 
| stone skin | ac self buff | 
| levitate | fly | 
| strength enhance | giant strength | 
| metabolize | haste, cures some illnesses and maledictions | 
| know object | identify item | 
| iron hands | damage enhancement | 
| celestial path | limited gate to adjacent areas, gate out of norecall rooms | 
| know speech | translate | 
| steel hands | damage enhancement | 
| life cloak | regenerate | 
| healing touch | heal anybody regardless of where they are | 
| harden | halves slash, blunt or pierce damage | 
| flaming hands | damage enhancement | 
| spirit hands | damage enhancement | 

| name | level | mana | awareness | combat | focus | body | spirit |
| --- | --- | --- | --- | --- | --- | --- | --- | 
| spirit invisibility | 13 | 20 | 1 | 0 | 0 | 1 | 1 |
| stone hands | 19 | 35 | 0 | 2 | 1 | 1 | 1 |
| spirit eyes | 22 | 20 | 2 | 0 | 1 | 0 | 2 |
| stone skin | 29 | 20 | 2 | 0 | 1 | 2 | 0 |
| levitate | 30 | 30 | 0 | 2 | 2 | 2 | 2 |
| strength enhance | 30 | 20 | 2 | 0 | 0 | 3 | 2 |
| metabolize | 37 | 30 | 2 | 2 | 0 | 3 | 2 |
| know object | 37 | 20 | 2 | 0 | 3 | 0 | 3 |
| iron hands | 39 | 50 | 0 | 3 | 0 | 2 | 2 |
| celestial path | 40 | 25 | 4 | 0 | 3 | 3 | 3 |
| know speech | 42 | 20 | 2 | 0 | 3 | 0 | 3 |
| steel hands | 59 | 50 | 2 | 3 | 2 | 2 | 2 |
| life cloak | 60 | 50 | 3 | 0 | 2 | 3 | 3 |
| healing touch | 65 | 100 | 2 | 0 | 2 | 3 | 2 |
| harden | 65 | 80 | 4 | 4 | 4 | 4 | 4 |
| flaming hands | 79 | 50 | 2 | 3 | 2 | 3 | 3 |
| spirit hands | 99 | 50 | 4 | 4 | 0 | 4 | 4 |

### Monk Fight Moves
| name | level | requirements |
| --- | --- | --- |
| knee | 1 | none |
| punch | 1 | none |
| elbow | 1 | none |
| kick | 1 | none |
| bodyblow | 10 | none |
| trip | 10 | none |
| stamp | 17 | kick |
| swiftkick | 18 | kick |
| grapple | 23 | bodyblow |
| hook | 24 | none |
| charge | 26 | bodyblow |
| backfist | 27 | bodyblow, punch |
| uppercut | 31 | grapple, punch |
| forearm | 34 | punch, charge |
| hurl | 42 | bodyblow, punch |
| jumpkick | 49 | kick, bodyblow |
| hammer | 49 | kick, charge |
| sweep | 51 | kick, bodyblow |
| spinkick | 55 | sweep |
| headbutt | 57 | none |

### Monk Techniques
| name | level | requirements |
| --- | --- | --- |
| thrust kick | 12 | kick, bodyblow |
| knee | 17 | knee |
| elbow | 23 | punch, thrust kick |
| shin kick | 27 | kick, stamp |
| back fist | 33 | backfist, elbow |
| palm strike | 39 | backfist |
| sweep | 43 | shin kick |
| spin kick | 61 | spinkick, thrust kick |
| double punch | 67 | punch, backfist |
| triple kick | 73 | kick, spinkick |

### Monk Abilities
| name | level | requirements | effects |
| --- | --- | --- | --- |
| awareness 1 | 1 | 10 practices | unknown |
| awareness 2 | 15 | 20 practices | unknown |
| awareness 3 | 30 | 30 practices | unknown |
| awareness 4 | 45 | 40 practices | unknown |
| combat 1 | 1 | 10 practices | +3 damroll, +3 hitroll |
| combat 2 | 15 | 20 practices | +3 damroll, +3 hitroll |
| combat 3 | 30 | 30 practices | +3 damroll, +3 hitroll |
| combat 4 | 45 | 40 practices | +3 damroll, +3 hitroll |
| focus 1 | 1 | 10 practices | longer, more reliable chi |
| focus 2 | 15 | 20 practices | longer, more reliable chi |
| focus 3 | 30 | 30 practices | longer, more reliable chi |
| focus 4 | 45 | 40 practices | longer, more reliable chi |
| body 1 | 1 | 10 practices | unknown |
| body 2 | 15 | 20 practices | unknown |
| body 3 | 30 | 30 practices | unknown |
| body 4 | 45 | 40 practices | unknown |
| spirit 1 | 1 | 10 practices | longer, more reliable chi |
| spirit 2 | 15 | 20 practices | longer, more reliable chi |
| spirit 3 | 30 | 30 practices | longer, more reliable chi |
| spirit 4 | 45 | 40 practices | longer, more reliable chi |

### Monk Chi
| chi level | trains | player level | mana | other |
| --- | --- | --- | --- | --- |
| 1 | 0 | 1 | 5 | |
| 2 | 10 | 11 | 10 | usage of pressure point |
| 3 | 15 | 21 | 15 | |
| 4 | 20 | 31 | 20 | |
| 5 | 25 | 41 | 25 | |
| 6 | 30 | 51 | 30 | |

### Monk Stances
Stances take exactly 25 improvements to advance in skill level and have 9 ranks of mastery. You can grandmaster 1 stance per 10 levels.

1. apprentice
2. trainee
3. student
4. fairely experienced
5. well trained
6. highly skilled
7. expert
8. master
9. grandmaster

| name | requirement | description |
| --- | --- | --- |
| viper | none | aggressive fast combat |
| crane | none | semi-aggresive blocking combat |
| crab | none | semi-aggressive defensive combat |
| mongoose | none | semi-aggresive dodging combat |
| bull | none | aggresive strong combat |
| mantis | crane, viper | defensive & counter attacks |
| dragon | bull, crab | strong & defensive combat |
| tiger | bull, viper | strong & fast combat |
| monkey | crane, mongoose | nullify advantages of opponents stance |
| swallow | mongoose, crab | most defensive of all stances |
| grandmaster | mantis, dragon, tiger, swallow, monkey | most offennsive & defensive of all stances |

### Monk Combos
The aboslute key to mastering monk combat is leveraging all the techniques to perform combinations that deliver drastic effect.

| name | combo (required aura) | effects |
| --- | --- | --- |
| silence | elbow (red), palm strike | target can no talk, read scrolls or cast magic |
| knock | knee (bright blue), elbow (red), thrust kick | chance to knock mob/player out cold |
| knee spike | thrust kick (red), knee | tiny damage |
| trip | shin kick (yellow), sweep | slightly helps prevent fleeing, tiny damage |
| leg sweep | sweep (red), shin kick | slightly helps prevent fleeing, tiny damage |
| elbow strike | palm strike (bright red), elbow | average damage |
| burning hands | back fist (blue), elbow (red), double punch | average damage |
| thrust kick | spin kick (gold), thrust kick | average damage |
| forcekick | thrust kick (red), thrust kick (bright red), triple kick | average damage |
| back fist | elbow (red), back fist | average damage |
| glowing hands | elbow (red), elbow (red), double punch | average damage |
| elbow strike | shin kick (yellow), thrust kick (red), elbow | high damage |
| lightning kick | thrust kick (red), thrust kick (bright red), spin kick | high damage |
| palm strike | back fist (blue), palm strike | high damage |
| flaming hands | double punch (white), double punch | massive damage |
| lightning kick | triple kick (gold), double kick (white), spin kick | massive damage |
| palm strike | spin kick (gold), back fist (blue), palm strike | massive damage |

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
prompt {D[{R%h{D/{r%Hhp {M%m{D/{m%Mmp {G%v{D/{g%Vmv {c%Cchi {Y%q%Q{D/{y%Nq {r%P{Dqp {r%X{Dtnl] ( {r%p {D) {r%B%c

// next line is for tintin++ configuration of the same prompt
#prompt {[%1/%2hp %3/%4mp %5/%6mv %7/%8chi %9/%10q %11qp %12tnl] (%13) %14} {<109>[<119>%1<109>/<019>%2<109>hp <159>%3<109>/<059>%4<109>mp <129>%5<109>/<029>%6<109>mv <169>%7<109>/<069>%8<109>chi <139>%9<109>/<039>%10<109>q <019>%11<109>qp <019>%12<109>tnl] (<119>%13<109>) <119>%14}
```

## MUD Client Configuration
### Tintin++
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

## Potions Wands Staves and Scrolls

| name | req lvl | item lvl | cost | found in | description |
| --- | --- | --- | --- | --- | --- |
| a potion of protection | 5 | 10 | 2g0s | naerlan | armor |
| a small seed | 5 | 15 | 4g0s | naerlan | farsight |
| a potion of revealing | 7 | 15 | 2g90s | naerlan | detect invis, detect magic, detect hidden |
| a dry ivy leaf | 7 | 12 | 4g50s | naerlan | create spring, cure disease |
| a potion of sickness removal | 8 | 14 | 5g50s | naerlan | cure poison, cure light, cure disease |
| a potion of sight | 8 | 13 | 2g30s | naerlan | cure blindness, infravision |
| an elixir of negation | 9 | 20 | 8g30s | naerlan | cancellation |
| a dirty root | 9 | 14 | 5g0s | naerlan | refresh, floating disc |
| a simple sycamore wand | 10 | 10 | 4g0s | aliuna | invisibility x 2 |
| a swirling maple wand | 10 | 14 | 15g0s | aliuna | faerie fog x 2 |
| a feather | 10 | 15 | 8g70s | naerlan | fly x 1 |
| an elixir of tranquility | 11 | 20 | 8g0s | naerlan | sanctuary |
| a pink willow wand | 14 | 17 | 10g0s | aliuna | faerie fire x 3 |
| a pink & white oak wand | 14 | 17 | 20g0s | aliuna | sleep x 2 |
| a brilliant white wand of ash | 14 | 15 | 50g0s | aliuna | sanctuary x 2 |
| a potion of crifus' favor | 15 | 5 | 3g90s | naerlan | cure critical, bless |

## Items For Leveling

### Light Items
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- |
| a ssmall jar of glow-moss | 14 | 1g0s | hitroll +3 | sold in kargath |
| a black guard's lantern | 28 | 15g0s | ac -2, hitroll +2 | guard in mirage |
### Head Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| a brass helmet | 14 | 6g20s | wis +2 | unknown |
| a large mithril helmet | 15 | 14g34s | hitroll +3 | loahan, foreman in mines of noal'xyn |
| a golden helmet of courage | 15 | 1g78s | hitroll +2, damroll +1 | shrine of barbades guards |
| a sheer black veil | 15 | 3g46s | int +1, wis +1 | drow mines |
| a pair of dirty horns | 20 | 18g92s | str +1, con +1, damroll +2, hitroll +1 | grungel boss |
| the eye circlet of un'hlehya | 25 | 0g93s | wis +2, int +1 | tzimosh camp |
| a dark helmet | 28 | 49g50s | hitroll +2, damroll +4 | east tower guard, mines of noal'xyn |
| a spirit helmet | 28 | 49g50s | hitroll +2, damroll +4 | west tower guard, mines of noal'xyn |
### Neck Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| a tattered cloak | 11 | 1g18s | damroll +1 | unknown |
| a heavy cloak | 13 | 4g95s | con +1, damroll +1 | guard in renault house |
| a jewelled necklace | 15 | 3g86s | wis +1, int +1 | renault house |
| a thick leather collar | 20 | 30g69s | hitroll +1, damroll +1, str +1 | deltherian from dog |
### Shoulder Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| a grey robe | 5 | 1g27s | hitroll +1 | unknown |
| a flowing robe | 13 | 11g88s | damroll +1, hitroll +1, hp +2 | unknown |
| a black spider silk surcoat | 15 | 2g7s | hp -1, saves -1, hitroll +1, damroll +1 | vampire in nerezza behind door |
| the wings of a great dragon | 35 | 44g55s | wis +1, str +1, hitroll +4, hp +20 | great dragon in caldera |
### Torso Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| studded ream hide armor | 9 | 8g47s | damroll +3, hitroll +1 | unknown |
| a steel chest-plate | 13 | 1g53s | con +1, str +1 | renault house |
| a shining chest plate | 15 | 28g35s | hitroll +3, damroll +2 | guard in front of shrine of barbades |
| a black tunic | 20 | 27g72s | hitroll +2, dex +1 | drow mines |
| a mithril vest | 24 | 17g88s | damroll +1, hitroll +1 | mines of noal'xyn foreman loahan |
| a shadow steel platemail cuirass | 25 | 2g84s | move +100, saves -2, ac -2, dex +1, str +1 | drow in grungnison catacombs |
| shadow armor | 28 | 49g50s | con +2, hitroll +5 | east tower guard, mines of noal'xyn |
| a suit of silver armor | 28 | 41g8s | damroll +4 | guard in mirage |
### Waist Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| a jewelled belt | 15 | 2g52s | str +1, hitroll +2 | renault house |
| a silver girth | 28 | 23g6s | hitroll +3, dex -1, con +2 | guard in mirage |
### Arms Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| dark steel arm guards | 12 | 11g1s | constitution +1 | unknown |
| silver armguards | 28 | 12g99s | hitroll +3, damroll + | guard in mirage | 

### Wrist Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| an iron bracer | 5 | 0g99s | hitroll +1 | unknown |
| an obsidian bracer | 12 | 0g95s | damroll +1, hitroll +1 | unknown |
| a steel-banded bracer | 12 | 0g27s | hitroll +1, damroll +1 | burrowholme guards |
| a steel bracer | 13 | 3g76s | damroll +1, dex +1 | renault house |
| a dryad's bracelet | 15 | 3g96s | int +1, hitroll +2 | behind hidden waterfall near goblin stronghold |
| a bracelet of elf-hide | 15 | 0g99s | damroll +2 | goblin stronghold |
| an acid-eaten steel bracer | 18 | 1g97s | hitroll +2, dex +1 | nerezza, gelatinus cube on top |
| a silver bracer | 28 | 11g21s | hitroll +2, damroll +2 | guard in mirage |
### Hand Armor
None yet.
### Finger Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| a silver ring | 6 | 0g0s | damroll +1 |  unknown |
| a beautiful silver ring | 10 | 1g28s | wis +1 | unknown |
| a battered silver ring | 10 | 3g18s | hitroll +2 | grungel |
| a granite ring | 15 | 16g66s | int +1 | khetes priest |
| a copper ring | 16 | 8g23s | damroll +1, saves -1, hitroll +2 | naerlan patrol guard |
| (invis) an elemental ring of frost | 37 | 24g48s | hitroll +4, damroll +3 | valeda elemental |
### Leg Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| thick leather leggings | 15 | 20g79s | move +50, hp +5, damroll +1 | equinalas |
| a pair of shadow steel leg plates | 15 | 6g3s | hitroll +3 | Zzukenethaft |
| bloodstained trousers | 16 | 0g24s | hitroll +2, damroll +2 | unknown |
| a pair of black leggings | 22 | 34g65s | damroll +2, con +1 | drow mines |
| mithril greaves | 24 | 27g47s | hitroll +2 | loahann, foreman at mines of noal'xyn |
| a stylish set of trousers | 26 | 14g85s | hitroll +3, damroll +1 | girl in merchants house, aliuna |
| silver greaves | 28 | 16g93s | hitroll +5, int -1, dex +1 | guard in mirage |
| rotting hide greaves | 34 | 6g79s | hitroll +3, damroll +3 | valeda orc |
### Feet Armor
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- |
| a pair of hard leather boots | 14 | 0g49s | damroll +1 | unknown |
| a pair of soft-hide boots | 15 | 2g97s | dex +1, move +75 | unknown |
| a pair of knee-high boots | 18 | 76g56s | damroll +2, con +1 | drow mines |
| mithril boots | 24 | 27g10s | damroll +2 | loahan, mines of noal'xyn |
### Held Items
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- | 
| a small idol of asteri | 9 | 12g0s | str +1, damroll +1 | lunatics alley |
| a goblin fetish | 12 | 0g0s | int +1, damroll +1 | unknown |
| a magical torch | 15 | 21g0s | int +2 | unknown |
### Floater Items
| name | req lvl | cost | description | found |
| --- | --- | --- | --- | --- |
| a dark-trimmed emerald | 14 | 12g48s | int +2 | goblin stronghold |
| a dark-trimmed ruby | 14 | 12g42s | dex +2 | goblin stronghold |
| a dark-trimmed amethyst | 14 | 12g51s | wis +2 | goblin stronghold |
| a dark-trimmed sapphire | 14 | 13g63s | str +2 | goblin stronghold |
| a dark-trimmed pearl | 14 | 11g85s | con +2 | goblin stronghold |
| an aviak eye | 30 | 14g85s | str +1, con +1, dex +1 | the avian tree |
