---
aside: false
---

# Damage strings

Every hit in combat prints a message whose verb tells you roughly how much damage it did. This is the full ladder, for monks and for everyone else, straight from the game's source. Type a number to see what it reads as, or paste a line from combat to find its range.

<DamageStrings />

The table shows what the room sees ("pokes"), which is also what you see for any hit with a named attack ("Your slash pokes the orc"). A plain unarmed hit of your own drops the s ("You poke the orc"), and the lookup understands both. Up to 24 damage the line ends in a period and from 25 up in an exclamation mark, so "wounds!" (or "slaps!" from a monk) means exactly 25.
