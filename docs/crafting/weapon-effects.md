# Poisons, Runes and Weapon Effects

ilvl is the weapon's item level. A poison put on with `envenom` uses the poison's own level instead, which drops by 2 with every hit until it wears off.

Runes, poisons and the vampiric and vorpal drains fire on every hit that lands. Holy and unholy fire on 1 hit in 6. Most "chance to" effects also need the target to fail a saving throw.

| name | damage | description |
| --- | --- | --- |
| iron against vulnerable | 125% base | 75% against a target resistant to iron |
| silver against vulnerable | 125% base | 75% against a target resistant to silver |
| wood against vulnerable | 125% base | 75% against a target resistant to wood |
| poison | - | causes poison, -1 str, duration is ilvl/8 ticks |
| vinesap | - | causes poison, -2 str, duration is ilvl/8 ticks |
| deepsbreath | - | causes slow, -2 dex, duration is ilvl/12 ticks |
| bloodmoss | - | causes plague, -3 str, duration is ilvl/12 ticks |
| tirimic | - | causes blind, -2 dex, duration is ilvl/20 ticks |
| vampiric | 1 to ilvl/5+1 | heals you for half the damage dealt, 20% chance to shift your alignment one point toward evil |
| vorpal | 1 to ilvl/7+1 mana | drains the target's mana, you get half of it back (plus 1) and lose 1 hit point |
| flame rune | 1 to ilvl/4+1 | resistable fire damage, chance to blind with "fire breath" (-4 hitroll) |
| large flame rune | 3 to ilvl/2+3 | resistable fire damage, chance to blind with "fire breath" (-4 hitroll) |
| frost rune | 1 to ilvl/6+2 | resistable cold damage, chance of "chill touch" (-1 str), chance to damage enemy items |
| large frost rune | 3 to ilvl/3+5 | resistable cold damage, chance of "chill touch" (-1 str), chance to damage enemy items |
| shocking (lightning) rune | 1 to ilvl/5+2 | resistable lightning damage, chance to daze, chance to damage enemy items |
| large shocking (lightning) rune | 3 to ilvl/3+5 | resistable lightning damage, chance to daze, chance to damage enemy items |
| water rune | 1 to ilvl/4+1 | resistable drowning damage, chance to add 2 to ilvl drowning damage |
| large water rune | 5 to ilvl/2+6 | resistable drowning damage, chance to add 2 to ilvl drowning damage |
| air rune | 1 to ilvl/4+1 | resistable air damage, chance to blow the enemy out of the room with a cyclone |
| large air rune | 3 to ilvl/2+3 | resistable air damage, chance to blow the enemy out of the room with a cyclone |
| earth rune | 1 to ilvl/4+1 | resistable earth damage, only against a standing target, chance to knock it down if not flying |
| large earth rune | 3 to ilvl/2+3 | resistable earth damage, only against a standing target, chance to knock it down if not flying |
| acid rune | 1 to ilvl/4+1 | resistable acid damage, chance to add 2 to ilvl acid damage, chance to damage enemy items |
| large acid rune | 5 to ilvl/2+8 | resistable acid damage, chance to add 2 to ilvl acid damage, chance to damage enemy items |
| holy, devoted by you | 1 to ilvl+2 on 1 hit in 6 (17%) | energy damage against an evil target, chance to damage enemy items |
| holy, devoted by someone else | 1 to ilvl/5+2 on 1 hit in 6 (17%) | if you're evil, the weapon hits you instead, as resistable energy damage |
| unholy, devoted by you | 1 to ilvl+2 on 1 hit in 6 (17%) | energy damage against a good target, chance to damage enemy items |
| unholy, devoted by someone else | 1 to ilvl/5+2 on 1 hit in 6 (17%) | if you're good, the weapon hits you instead, as resistable energy damage |
