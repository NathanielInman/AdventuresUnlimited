# Speed leveling

The fastest route from level 1 to hero that I know of: where to level at each stage and what gear to pick up on the way. It works for good, neutral and evil characters. Where your alignment changes where you should hunt or what you can wear, each stage says so. Item links open the item in the [item search](../tools/items.md), and every walk starts from Market Square in Naerlan, like the ones on the [areas](../world/areas.md) page.

<LevelingAlignment />

Spots marked *untested* come from the area files rather than from my own runs: the mobs, levels and alignments are right, but check them in game before you commit a session to one.

## Route at a glance

| Level | Good | Neutral | Evil |
| ---: | --- | --- | --- |
| 1-3 | Survival Training | Survival Training | Survival Training |
| 4-6 | Gear run | Gear run | Gear run |
| 7-10 | Haythor Dungeon *(untested)* | The Hand of Markov: dwarves | The Hand of Markov: animals and trash |
| 10-11 | Gear run | Gear run | Gear run |
| 11-21 | Haythor Dungeon *(untested)* | The Hand of Markov, with trips to Haythor | The Hand of Markov: dwarves |
| 21-25 | The Avian Tree | Mines of Noal'xyn *(untested)* | The Avian Tree |
| 25-31 | Valeda: trash, then the orcs | Valeda: the orcs | Valeda: trash |
| 31-45 | Valeda's orcs, then Heishaer's Kappa and Rusalki *(untested)* | Heishaer City: the yellow and blue fish | Heishaer City: fish |
| 45-55 | Heishaer's Kappa and Rusalki, then Yrenelania *(untested)* | Eirenole Castle | Eirenole Castle |
| 55-65 | Lost Kingdoms: northern kids | Necropolis *(untested)* | Lost Kingdoms: northern kids |
| 65-75 | Lost Kingdoms west: pixies | Lost Kingdoms west: both sides | Lost Kingdoms west: heishan and titans |
| 75-85 | Lost Kingdoms west: drow temple *(untested)* | Lost Kingdoms south: dwarves | Lost Kingdoms south: dwarves |
| 85-88 | Shadowbox: the caves | Shadowbox: angels and the caves | Shadowbox: bluebirds and angels |
| 88-90 | Eirenole Valley | Eirenole Valley: does and air currents | Eirenole Valley |
| 90-100 | Trouthead Town: the little kids | Trouthead Town: the small kids | Trouthead Town: kids |

## How alignment changes the route

Three rules from the game's code decide most of this.

**Kills are worth more against the other side.** Your alignment against your victim's adds to or takes from each kill's experience (`xp_computeAlignmentFactor` in `fight.c`). Killing your own kind costs you a lot, and a neutral character loses half of everything for killing neutral mobs, which is why a few stages split by alignment:

| You are | Victim very good (over 700) | Good (300 to 700) | Neutral | Evil (-300 to -700) | Very evil (under -700) |
| --- | ---: | ---: | ---: | ---: | ---: |
| Very good (over 700) | -75% | -50% | 0 | +25% | +33% |
| Good (300 to 700) | -50% | -33% | 0 | +20% | +25% |
| Neutral | +25% | +20% | -50% | +20% | +25% |
| Evil (-300 to -700) | +25% | +20% | 0 | -33% | -50% |
| Very evil (under -700) | +33% | +25% | 0 | -50% | -75% |

Mobs flagged `noalign` give no bonus or penalty to anyone.

**Your alignment follows your kills.** Every kill pulls you toward the victim's alignment, a few points at a time (`alignment_change_compute`). A neutral character who only farms good dwarves turns evil within a few dozen kills, so neutral characters should split their time between good and evil targets. Good characters hunting evil mobs, and evil characters hunting good ones, only get more so.

**Gear can refuse you.** Anti-good, anti-neutral and anti-evil items zap off a character of that alignment when worn, and again after every kill (`equip_char` in `handler.c`, `group_gain` in `fight.c`), so drifting across a line can drop gear on the floor mid-fight. The game counts 350 and up as good and -350 and down as evil. Two more limits apply to everyone:

- You can wear an item up to 5 levels above your own (`wear_obj` in `act_obj.c`). The gear lists show both: "L28, wear 23".
- Sylvan elves, heishan elves and frost giants can't wear iron; it burns them and they drop it. Iron items carry an "Iron" tag.

## Levels 1-3: Survival Training

The newbie school (`2e1n`). Get the silver bracelets right away and work through the rest as you level.

<LevelingGear stage="survival" />

## Levels 4-6: First gear run

Lunatic's Alley is behind the warehouse door at the end of its walk. Rip through the gypsy camp on the way into T'leisins Pool for the pants. MentMacro's Park is the city park inside Naerlan's south wall.

<LevelingGear stage="early-run" />

## Levels 7-10: First hunting ground

- **Good:** Haythor Dungeon (`8e7n1w1n1e2n3e1s1e1n1e2s1s2d1s1e1s`, then through the old wooden door). Its small green goblins, mean green orcs and human-sized skeletons are levels 8 and 9 and all evil, so you get the bonus. The large skeleton and a few others attack good and neutral characters on sight. *(untested)* {.au-for-good}
- **Neutral:** The Hand of Markov (`7s4e10s4w9s2w2s2w1e`). The dwarven women, children and miners are good, so they're worth more to you; the animals are neutral and give half. {.au-for-neutral}
- **Evil:** The Hand of Markov (`7s4e10s4w9s2w2s2w1e`). Stick to animals and trash mobs. The dwarven women and children are good-aligned and worth a quarter to a third more. {.au-for-evil}

## Levels 10-11: Second gear run

Metes, a traveller sitting by the fire in a Naerlan common room, replaces the river-troll hide from Grungel: his cape has +3 hit where the hide had +1 str. Evil characters skip the golden helmet in the Shrine of Barbades, which zaps them, and keep the shroud.

<LevelingGear stage="ten" />

## Levels 11-21: The Hand of Markov

- **Evil:** Dwarves start at 400 xp. Avoid the guards at first, then from 15 move on to the dwarf patrols and guards, still 100-200 xp each. {.au-for-evil}
- **Neutral:** The same dwarves, at a quarter more for you, but they pull you toward evil. Break it up with runs through Haythor Dungeon, whose evil mobs pull you back. {.au-for-neutral}
- **Good:** The dwarves are good-aligned, so they cost you three quarters of each kill. Stay in Haythor Dungeon instead: dark knights at 12, then the drow, orcs, duergar and goblins at 17-20 and the knights and leaders at 21-22. *(untested)* {.au-for-good}

Haythor's gargoyles and sorcerers attack good and neutral characters on sight; evil characters get left alone until they start a fight.

<LevelingGear stage="markov-gear" />

## Levels 21-25: The Avian Tree

- **Good and evil:** Mostly go for the avian guards and sentries (`search up`), all the way to the top for the sentries by 23-25. Evil characters get insulted by the birds and the shopkeeper, nothing worse. {.au-for-good .au-for-evil}
- **Neutral:** Every bird in the tree is neutral, so you get half. Go to the Mines of Noal'xyn instead: the lost souls (level 21, evil, attack on sight) and later the mutated fish in the underground river (27, evil). The mud golem there leaves neutral characters alone and attacks good and evil ones who start fights in front of it. *(untested)* {.au-for-neutral}

The gear run at 23 visits Mirage City, whose walk on the [areas](../world/areas.md#mirage-city) page no longer matches the desert. The walk below goes through the shimmering wall of heat at the oasis.

<LevelingGear stage="avian-gear" />

## Levels 25-31: Valeda

- **Evil:** Go for the trash mobs at the entry and around town; avoid the pixie guards. {.au-for-evil}
- **Good:** The same trash costs you nothing. From 29, the orc village is better: its orcs (29-35) are all evil. The orcish sentries at its edge attack on sight. {.au-for-good}
- **Neutral:** The trash is neutral and gives you half. Head for the orc village as soon as you can take level 29 orcs. *(untested)* {.au-for-neutral}

## Levels 31-45: Heishaer City

At 31, go back to Naerlan: grab a beacon and some feathers for Heishaer, and set the beacon at your farming spot.

- **Evil:** Kill tons of fish. Maybe skip the blue minnows at first (they're 43). The yellow minnows and bass (800) and the blue minnows (1000) are very good, so they pay a third more. {.au-for-evil}
- **Neutral:** The yellow and blue fish give you a quarter more; skip the red paddlefish, which are neutral and give half. {.au-for-neutral}
- **Good:** The fish are good-aligned and cost you up to three quarters. Stay on Valeda's orcs into the mid 30s, then come here for the evil ones: the Kappa, the Rusalki and the abaia (43-45). *(untested)* {.au-for-good}

<LevelingGear stage="heishaer-gear" />

## Levels 45-55: Eirenole Castle

- **Evil and neutral:** Start with the sleeping soldiers; it's tough at first. Nearly everyone in the castle is good-aligned, so the whole castle pays the bonus. Neutral characters should mix in some evil kills to stay neutral. {.au-for-evil .au-for-neutral}
- **Good:** The castle costs you three quarters of each kill. Keep hunting Heishaer's Kappa and Rusalki to about 50, then Yrenelania's orc temple (acolytes 45, dark priests 47, temple guards 48, pit-fiends 54, all evil). *(untested)* {.au-for-good}

Mystery Manor at 45 replaces the City of Terrason trip: the royal Terrason shield and bracers zap evil characters, and the manor's shield and wrist pieces, plus the bracer Heishaer sells, match them for everyone. The castle gear comes off its good-aligned guards, so good characters lose a little alignment collecting it.

<LevelingGear stage="castle-gear" />

## Levels 55-75: Lost Kingdoms

Northern or eastern area (`4e9n5w6n11e3n5e1n3e10n1e2n7e1n3e1n6e;go tree`): start with the kids in the north and avoid the town in the east.

- **Good and evil:** The northern kids are neutral, so no penalty. {.au-for-good .au-for-evil}
- **Neutral:** The northern kids give you half. The Necropolis (`4e9n5w6n11e3n4e2s1w2s1e`) has skeleton warriors and screaming skulls at 55-60, all evil; the skulls attack on sight. *(untested)* {.au-for-neutral}

From 70, level in the western area, which depends on alignment:

- **Good:** The pixies: evil, 70-78. {.au-for-good}
- **Neutral:** Both sides. The heishan pull you good and the pixies evil, so switching keeps you neutral. {.au-for-neutral}
- **Evil:** The heishan and the titans. The robed heishan priestess attacks evil characters on sight, so clear her first or stay out of her room. {.au-for-evil}

<LevelingGear stage="kingdoms-gear" />

## Levels 75-85: Lost Kingdoms south

- **Evil and neutral:** The southern area (dwarves). The priestess of Markov in the dwarven temple attacks evil characters on sight. {.au-for-evil .au-for-neutral}
- **Good:** The dwarves are good-aligned. Stay west: the drow temple (77-81) and Elbar's priests and priestesses (76) are all evil. *(untested)* {.au-for-good}

## Levels 85-88: Shadowbox

- **Evil:** Bluebirds and angels. {.au-for-evil}
- **Neutral:** Angels and the caves. The bluebirds are neutral and give you half. {.au-for-neutral}
- **Good:** The caves: mud crawlers, cave spiders, mud scorpions and leeches, all evil. {.au-for-good}

<LevelingGear stage="shadowbox-gear" />

## Levels 88-100: Eirenole Valley and Trouthead Town

From 88 to 90, Eirenole Valley, the forest north of Eirenole Castle. Careful of the 2 King's Valley Guards at the entrance, who attack on sight; set your beacon past them.

- **Neutral:** Almost everything in the valley is neutral and gives you half. The prancing does and the currents of air don't count alignment, so hunt those. {.au-for-neutral}

From 90, Trouthead Town (through the secret panel in Da Olde Pubb at the Giants Outpost: `11e2n5e1n7e6n3w4n5w6n2e1n5n;open north;1n`). Stick to the kids.

- **Good:** The pretty little girls, cute little boys and the homely and whooping little ones are close to neutral, so no penalty. The small girls, small boys and toddlers are good-aligned and cost you a third to a half. {.au-for-good}
- **Neutral:** The reverse: the small girls, small boys and toddlers give you a fifth more, the little ones half. {.au-for-neutral}
- **Evil:** All of them; the small ones pay a fifth to a quarter more. {.au-for-evil}

## Hero gear

At 100 you can wear level 105 gear. Trouthead's shops sell some of the best of it, so a few pieces need no fight at all.

<LevelingGear stage="hero-gear" />
