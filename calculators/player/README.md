# armory

Armory distinguishes the process in creating a random drop using the PLOS database.

## Process of random drop
When it comes to computing chance to drop the numbers next to each option represent weights. To compute the actual chance
for something to drop you aggregate all the weights together and consider this your pool where each weight has it's
own relative chance to occur depending on that correlation of weight to pool size. When rolling for all subsequent
procedures, it uses the same weighting process.

Start by determining the items category
  1. (30) Nothing
  2. (20) Weapon
      1. Roll to determine type (https://exploringthebleak.com/api/items?itemtype=weapons)
      2. Roll for material (https://exploringthebleak.com/api/items?itemtype=materials&armortype=????)
      3. Roll for craftsmanship (https://exploringthebleak.com/api/configurations/generationCraftsmanship)
      4. Roll quality based on craft (only if craft high enough)
      5. Roll magical properties based on quality (only if quality high enough)

  3. (20) Armor
      1. Roll to determine type (https://exploringthebleak.com/api/items?itemtype=armor)
      2. Roll for material (https://exploringthebleak.com/api/items?itemtype=materials&armortype=????)
      3. Roll for craftsmanship (https://exploringthebleak.com/api/configurations/generationCraftsmanship)
      4. Roll quality based on craft (only if craft high enough)
      5. Roll magical properties based on quality (only if quality high enough)
  4. (20) Money
      1. Roll for type (https://exploringthebleak.com/api/configurations/generationMoney)
      2. Roll for value
  5. (10) Miscellaneous
      1. Roll for category (https://exploringthebleak.com/api/configurations/generationMiscItems)
      2. Roll for type
  6. (20) Food
      1. Roll for food category (https://exploringthebleak.com/api/configurations/generationFoodItems)
      2. Roll for type (https://exploringthebleak.com/api/items?itemtype=food&&category=????)
      3. Roll for quality
      4. Roll for prefix adjective based on quality
      5. Roll for type adjective
