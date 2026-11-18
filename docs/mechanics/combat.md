# Combat Calculations

## Hitroll
Your chance to hit is capped at your class's maximum, so find a worst case for the fights you care about, get enough hitroll to reach the cap there, and put the rest into other stats. Hitroll past the cap is wasted.

Each swing, your chance to hit is your class base plus:
  - half the level difference between you and the target
  - half the difference between your dexterity and the target's
  - a quarter of your strength
  - a tenth of your intelligence
  - your hitroll divided by (your level / 10 + 1), so it counts for less as you level: at level 100, 110 hitroll adds 10%
  - your rest state minus the target's: +1 to 3 if you're well rested, -1 to -4 if you're tired, -5 to -12 if you're completely exhausted

| class | base hit chance | max hit chance |
| --- | --- | --- |
| mage | 50% | 90% |
| cleric | 53% | 91% |
| thief | 55% | 92% |
| warrior | 60% | 95% |
| paladin | 58% | 94% |
| charlatan | 55% | 92% |
| myrmidon | 57% | 93% |
| antipaladin | 58% | 94% |
| monk | 55% | 92% |
| necromancer | 50% | 90% |

Mobs start at 65% and cap at 95% (90 to 92% for mage, cleric and thief mobs). If your weapon skill is under 75%, your cap shrinks to max × (skill + 25) / 100: a warrior at 50% skill caps at 71%.

A few things move the number after that. You get +5% if the target is sitting, resting or asleep (+15% if it's asleep or stunned), +5% if it can't see you, and +20% against mobs while a damage favor is active, all still under your class cap. If you can't see the target you lose 5% or more, and that comes off after the cap.

## Armor Class
Armor class takes a flat amount off each weapon hit: 1 point for every 8 AC below +100 when you get hit, or 1 per 15 AC when a mob gets hit. It comes off the weapon's base roll, before damroll, enhanced damage and the other bonuses, so -2,300 AC takes 300 points off the base roll. Spells ignore armor, and so do mobs fighting without a weapon. Unarmed hits (monks) lose 1 point per 5 AC against a player or 1 per 10 against a mob. Because of this, armor isn't worth worrying about past the early game.

> [!WARNING]
> The weapon-hit reduction is meant to stop at 70% of the hit, but the code gets it backwards: if your armor would take off more than 70% of a hit's base roll, that hit gets 70% stronger instead. So a very negative AC can make weak armed hits land harder.

## Magic Saves
Saves can prevent effects altogether, like blind, or only reduce damage by a percent depending on the spell.

Your chance to save is 50% plus:
  - your level minus the spell's level, 1% per level
  - a random roll from 1 up to your saves (gear shows saves as negative numbers, and lower is better). A roll above 50 is halved, so saves past -50 barely help. Mobs roll 1 to level/5 instead.
  - berserk: 1 to level/5 more (up to 20 at level 100)

Then:
  - resistance to the spell's damage type adds 10% of your save chance and vulnerability takes 10% off; immunity always saves
  - mages, clerics, paladins, charlatans, myrmidons, antipaladins, monks and necromancers (every class that uses mana) save at 90% of the result, while warriors and thieves don't
  - your chance to save never drops below 5% or goes above 95%
