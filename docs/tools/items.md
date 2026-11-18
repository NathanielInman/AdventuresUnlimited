---
aside: false
---

# Item search

Every object the game loads, read straight from the area files the way the game reads them: armor, weapons, potions, keys, furniture, all of it. Narrow it down by name, type, slot, area and level, and the list ranks what's left by a score you control: each stat bonus times its weight. Click an item for what identify would tell you about it and where the world puts it.

<ItemSearch />

The score only counts the ten weighted stats. Armor class, saves and weapon dice don't add to it, so compare those in the item's details. "Where to find it" comes from the area resets, shops, mob programs and quest code, so it knows which mob wears an item or which shop sells it, but not what a player crafted or what staff handed out. Items nothing places say so.
