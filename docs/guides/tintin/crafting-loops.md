# TinTin++ crafting loops

These loops automate the repetitive half of mining and the tradeskills: they watch for the game's messages and type the next command for you. They don't replace being at the keyboard. You must keep manning the keyboard while one runs, or you're playing against the terms of service and will get in trouble. What they buy you is the freedom to talk with people and watch something instead of typing `mine` for the thousandth time.

Setup, prompts and the idle toggle are on the [TinTin++ page](index.md).

> [!IMPORTANT]
> Load one loop at a time. Many of them react to the same game messages (every repair skill prints "You slip with the hammer and miss"), and TinTin++ keeps only the last action loaded for a given message, so a second loop silently takes over the first. Each loop sits in its own `#class`: unload it with `#class {name} {kill}` (for example `#class {mining} {kill}`) before you load the next.

## Mining loop

Start it with `td` in a mine and stop it with `tdd`, which also recalls you. It tunnels down, then south, mines every vein it finds, puts xedalium chunks in your `pocket` and donates everything else to the temple pit (or drops it if the pit is full).

It's best to carry a stack of `clear` potions from [Heishaer](../../world/areas.md#heishaer-city) in your `pocket`: whenever `score` shows you getting tired the loop quaffs one. If you have the refresh spell, replace `take clear pocket;quaff clear` with `cast refresh`. If your prompt shows your rested state (the [multiline prompt](index.md#multiline-prompt) does), you can drop the `score` commands, since the rested messages show up as you mine. When you're asleep on your feet it gives up, recalls, sleeps and turns on the idle toggle.

> [!IMPORTANT]
> This needs `$pet` from [Connecting](index.md#connecting) and the [idle toggle](index.md#idle-toggle).

<details>
<summary>Mining loop script</summary>

```text
#class {mining} {open}
#var {tunnelDirection} {down}
#var {mining} {false}
#alias {td} {
  #var {tunnelDirection} {down};
  #var {mining} {true};
  autoexit;autobrief;automap;
  order $pet recall;
  tunnel $tunnelDirection
}
#alias {tdd} {
  #var {mining} {false};
  autoexit;autobrief;automap;
  recall
}
#alias {drinkclear} {
  #if {"$mining" == "true"} {take clear pocket;quaff clear}
}
#action {Underground Tunnel} {#line gag}
#action {You need to hold a pickaxe in order to dig} {
  hold pickaxe;
  #if {"$mining" == "true"} {
    tunnel $tunnelDirection;
    #showme <108>(tunneling);
    #line gag
  }
}
#action {You feel rested.} {drinkclear}
#action {You are a bit tired.} {drinkclear}
#action {You feel fatigued.} {drinkclear}
#action {You are tired.} {drinkclear}
#action {You are asleep on your feet!} {
  #if {"$mining" == "true"} {
    #var {mining} {false};
    recall;
    sl;
    idle
  }
}
#action {You chip away at the walls making no progress} {
  #if {"$mining" == "true"} {
    score;
    tunnel $tunnelDirection;
    #showme <108>(tunneling-retry)
  }
}
#action {You chip at the walls} {
  #if {"$mining" == "true"} {
    #var {tunnelDirection} {south};
    tunnel $tunnelDirection;
    #showme <108>(tunneling);
    #line gag
  }
}
#action {You hammer at the tunnel walls with a steel pickaxe.} {#line gag}
#action {You chip away at the walls making very little progress} {
  #if {"$mining" == "true"} {
    tunnel $tunnelDirection;
    #showme <108>(tunneling-retry)
  };
  #line gag
}
#action {It won't fit.} {
  #if {"$mining" == "true"} {
    donate chunk temple;
    drop chunk
  }
}
#action {You tunnel %1.} {
  #if {"$mining" == "true"} {
    $tunnelDirection;
    score;
    mine;
    #showme <108>(move %1);
    #line gag
  }
}
#action {You chip off chunks of %1 from the vein.} {
  #if {"%1" == "xedalium"} {
    take chunk;
    put chunk pocket;
    mine;
    #showme <178>+------+ <168> Xedalium Chunk! <178>+------+;
    #line gag
  };
  #else {
    tunnel $tunnelDirection;
    #showme <108>+------+ <048> %1 - Ignoring <108>+------+;
    #line gag
  }
}
#action {You chip off part of the tunnel wall and find a %1 piece of %2.} {
  take %2;
  donate %2 temple;
  #showme <178>+------+ <158> %2 (%1)! <178>+------+;
  mine
}
#action {You fail to mine the ore from the vein} {
  mine;
  #showme <108>(mining-retry);
  #line gag
}
#action {You think there might be ore here but you do not see a vein to mine.} {
  mine;
  #showme <108>(mining-retry);
  #line gag
}
#action {You search for a vein of metal in this tunnel but cannot locate one.} {
  tunnel $tunnelDirection;
  #showme <108>(tunneling);
  #line gag
}
#class {mining} {close}
```

</details>

## Mining repair loop

Type `fm <item>` and it reforms, refines and rubs the item until it's in perfect condition, then clears its item variable so it stops reacting to other repair messages. You need a hammer, steel wool and a refining solution in your inventory and an anvil in the room.

```text
#class {miner-repair} {open}
#var {minerRepairItem} {none}
#alias {fm %1} {
  #var {minerRepairItem} {%1};
  reform %1
}
#alias {fmnext} {
  #showme <138>+------+ <188>Finished $minerRepairItem<138> +------+;
  #var {minerRepairItem} {none}
}
#action {You work with a hammer and anvil to improve the condition} {
  #if {"$minerRepairItem" != "none"} {reform $minerRepairItem}
}
#action {You slip with the hammer and miss} {
  #if {"$minerRepairItem" != "none"} {reform $minerRepairItem}
}
#action {This item will need to be reformed} {
  #if {"$minerRepairItem" != "none"} {reform $minerRepairItem}
}
#action {This item needs to be refined} {
  #if {"$minerRepairItem" != "none"} {refine $minerRepairItem}
}
#action {You slip with the steel wool and ding} {
  #if {"$minerRepairItem" != "none"} {refine $minerRepairItem}
}
#action {You refine the dings from} {
  #if {"$minerRepairItem" != "none"} {refine $minerRepairItem}
}
#action {This item needs to be rubbed} {
  #if {"$minerRepairItem" != "none"} {rub $minerRepairItem}
}
#action {You rub a scratch out of} {
  #if {"$minerRepairItem" != "none"} {rub $minerRepairItem}
}
#action {You fail to rub a scratch} {
  #if {"$minerRepairItem" != "none"} {rub $minerRepairItem}
}
#action {You cannot find scratches on} {
  #if {"$minerRepairItem" != "none"} {fmnext}
}
#action {You cannot find any blemishes on} {
  #if {"$minerRepairItem" != "none"} {fmnext}
}
#action {What mineral item do you wish to reform?} {#var {minerRepairItem} {none}}
#class {miner-repair} {close}
```

## Mining repair farm

An add-on for the mining repair loop when you farm dark-trimmed floaters from [Bose'nisten](../../world/areas.md#bosenisten). It picks up every floater that drops, and replaces the loop's `fmnext` so that each finished floater is dropped and sacrificed and the next one in your inventory gets repaired. When you run out, the loop stops on its own.

Eventually you might think about short-cutting the repair loop if you have the ability to do so: it prevents needless use of the rub skill after it's already mastered.

> [!IMPORTANT]
> Load this after the [mining repair loop](#mining-repair-loop); it adds to the same class.

```text
#class {miner-repair} {open}
#action {A dark-trimmed %1 falls to the floor} {take %1}
#alias {fmnext} {
  drop $minerRepairItem;
  sac $minerRepairItem;
  fm $minerRepairItem
}
#class {miner-repair} {close}
```

## Smelting loop

Start it with `m <ore> <size>`, for example `m 2.xed 30` (see the required ore table for sizes). It smelts until it has a chunk of the size you asked for, puts it in your `pocket` and starts on the next one.

```text
#class {smelting} {open}
#var {smeltingItem} {none}
#var {smeltingSize} {40}
#var {smeltingWeight} {0}
#alias {m %1 %2} {
  #var {smeltingItem} {%1};
  #var {smeltingSize} {%2};
  #showme <138>+------+ <188>Starting smelting $smeltingItem ($smeltingSize lb chunks)<138> +------+;
  smelt $smeltingItem
}
#alias {smeltnext} {
  #var {smeltingWeight} {%1};
  #if {$smeltingWeight >= $smeltingSize} {put %2 pocket};
  smelt $smeltingItem
}
#action {You combine your ore and now have %1 pounds of raw %2.} {smeltnext {%1} {%2}}
#action {You now have %1 pounds of raw %2.} {smeltnext {%1} {%2}}
#action {You fail to smelt} {smelt $smeltingItem}
#class {smelting} {close}
```

## Armorsmith fixing loop

Type `f <item>` and it rebuilds, repairs and readjusts the armor until it's in perfect condition. You need a hammer and steel wool in your inventory and an anvil in the room.

```text
#class {armorsmith-repair} {open}
#var {armorsmithRepairItem} {none}
#alias {f %1} {
  #var {armorsmithRepairItem} {%1};
  rebuild %1
}
#action {This item will need refurbishing} {
  #if {"$armorsmithRepairItem" != "none"} {rebuild $armorsmithRepairItem}
}
#action {You slip with the hammer and miss} {
  #if {"$armorsmithRepairItem" != "none"} {rebuild $armorsmithRepairItem}
}
#action {This item needs to be repaired} {
  #if {"$armorsmithRepairItem" != "none"} {repair $armorsmithRepairItem}
}
#action {You work with a hammer and anvil to improve the condition} {
  #if {"$armorsmithRepairItem" != "none"} {repair $armorsmithRepairItem}
}
#action {This item needs to be readjusted} {
  #if {"$armorsmithRepairItem" != "none"} {readjust $armorsmithRepairItem}
}
#action {This item only needs to be readjusted} {
  #if {"$armorsmithRepairItem" != "none"} {readjust $armorsmithRepairItem}
}
#action {You succeed in removing a few blemishes} {
  #if {"$armorsmithRepairItem" != "none"} {readjust $armorsmithRepairItem}
}
#action {You fail to remove the blemishes} {
  #if {"$armorsmithRepairItem" != "none"} {readjust $armorsmithRepairItem}
}
#action {You cannot find any blemishes on} {#var {armorsmithRepairItem} {none}}
#class {armorsmith-repair} {close}
```

## Armorsmith training loop

Get a bunch of silver items from [Mirage City](../../world/areas.md#mirage-city), make sure you have a hammer, file and tongs in your inventory and type `m 2.silver`. It smelts everything down and makes boots until nothing is left. Because it's action-based you can still talk on channels while it runs. Once you've mastered armorsmithing, use the crafting loop instead.

<details>
<summary>Armorsmith training loop script</summary>

```text
#class {armorsmith-training} {open}
#var {armorsmithSmeltItem} {none}
#var {armorsmithFormItem} {feet}
#var {armorsmithOre} {unknown}
#var {armorsmithPoundMax} {100}
#var {armorsmithPoundCur} {0}
#alias {m %1} {
  #var {armorsmithSmeltItem} {%1};
  smelt $armorsmithSmeltItem
}
#alias {armorsmithore} {
  #if {%1 < 15} {smelt $armorsmithSmeltItem};
  #else {
    #var {armorsmithOre} {%2};
    hold tongs;
    form $armorsmithOre armor $armorsmithFormItem
  }
}
#action {You fail to smelt} {smelt $armorsmithSmeltItem}
#action {You combine your ore and now have %1 pounds of raw %2.} {armorsmithore {%1} {%2}}
#action {You now have %1 pounds of raw %2.} {armorsmithore {%1} {%2}}
#action {You fail to form} {smelt ruined}
#action {You have broken the form} {smelt broken}
#action {You have cracked the form} {smelt broken}
#action {You filed a large gash into} {smelt $armorsmithSmeltItem}
#action {You use your tongs and the anvil to form} {
  hold hammer;
  #var {armorsmithPoundCur} {0};
  pound $armorsmithFormItem
}
#action {* CLANG! *} {
  #math {armorsmithPoundCur} {$armorsmithPoundCur + 1};
  #if {$armorsmithPoundCur < $armorsmithPoundMax} {
    hold hammer;
    pound $armorsmithFormItem
  };
  #else {
    hold tongs;
    quench $armorsmithFormItem
  }
}
#action {You quench the form of the} {
  hold file;
  finish $armorsmithFormItem
}
#action {You file down} {smelt $armorsmithOre}
#class {armorsmith-training} {close}
```

</details>

## Armorsmith crafting loop

A completely automated crafting loop. It smelts the failures and starts over until it makes an item or you run out of ore. Make sure you have a hammer, file and tongs in your inventory as well as items to smelt, then type `m <item to smelt> <slot> <level>`, for example `m 2.silver feet 105`. The slot sets how much ore it gathers before forming.

<details>
<summary>Armorsmith crafting loop script</summary>

```text
#class {armorsmith-crafting} {open}
#var {armorsmithSmeltItem} {none}
#var {armorsmithFormItem} {feet}
#var {armorsmithOre} {unknown}
#var {armorsmithQuantity} {40}
#var {armorsmithPoundMax} {15}
#var {armorsmithPoundCur} {0}
#var {armorsmithForming} {false}
#var {armorsmithLevel} {105}
#alias {m %1 %2 %3} {
  #var {armorsmithSmeltItem} {%1};
  #var {armorsmithFormItem} {%2};
  #var {armorsmithLevel} {%3};
  #if {"%2" == "head"} {#var {armorsmithQuantity} {40}};
  #if {"%2" == "neck"} {#var {armorsmithQuantity} {30}};
  #if {"%2" == "arms"} {#var {armorsmithQuantity} {25}};
  #if {"%2" == "wrist"} {#var {armorsmithQuantity} {30}};
  #if {"%2" == "hands"} {#var {armorsmithQuantity} {25}};
  #if {"%2" == "torso"} {#var {armorsmithQuantity} {45}};
  #if {"%2" == "waist"} {#var {armorsmithQuantity} {40}};
  #if {"%2" == "legs"} {#var {armorsmithQuantity} {30}};
  #if {"%2" == "feet"} {#var {armorsmithQuantity} {15}};
  #if {"%2" == "hold"} {#var {armorsmithQuantity} {30}};
  #if {"%2" == "shield"} {#var {armorsmithQuantity} {30}};
  #showme <138>+------+ <188>Starting level $armorsmithLevel $armorsmithSmeltItem ($armorsmithQuantity ore)<138> +------+;
  smelt $armorsmithSmeltItem
}
#alias {armorsmithore} {
  #if {%1 < $armorsmithQuantity && "$armorsmithForming" != "true"} {smelt $armorsmithSmeltItem};
  #if {%1 >= $armorsmithQuantity} {
    #var {armorsmithOre} {%2};
    #var {armorsmithForming} {true};
    hold tongs;
    form '$armorsmithOre' armor $armorsmithFormItem
  }
}
#action {You combine your ore and now have %1 pounds of raw %2.} {armorsmithore {%1} {%2}}
#action {You now have %1 pounds of raw %2.} {armorsmithore {%1} {%2}}
#action {You fail to form} {
  #var {armorsmithForming} {false};
  smelt ruined
}
#action {You have broken the form} {
  #var {armorsmithForming} {false};
  smelt broken
}
#action {You have cracked the form} {
  #var {armorsmithForming} {false};
  smelt broken
}
#action {You filed a large gash into} {
  #var {armorsmithForming} {false};
  smelt $armorsmithSmeltItem
}
#action {You use your tongs and the anvil to form} {
  #var {armorsmithPoundCur} {0};
  pound $armorsmithFormItem
}
#action {* CLANG! *} {
  #math {armorsmithPoundCur} {$armorsmithPoundCur + 1};
  #if {$armorsmithPoundCur < $armorsmithPoundMax} {
    #showme <178>+------+ <188> Pounding <168>$armorsmithPoundCur<178>/<068>$armorsmithPoundMax <178>+------+;
    pound $armorsmithFormItem
  };
  #else {
    #showme <178>+------+ <188> Successful Pound! <178>+------+;
    hold tongs;
    quench $armorsmithFormItem
  }
}
#action {You need a hammer to shape} {
  hold hammer;
  pound $armorsmithFormItem
}
#action {You quench the form of the} {
  hold file;
  finish $armorsmithFormItem $armorsmithLevel
}
#action {You file down} {
  #var {armorsmithForming} {false};
  condition $armorsmithOre;
  #showme <138>+------+ <188>Finished $armorsmithFormItem<138> +------+
}
#class {armorsmith-crafting} {close}
```

</details>

## Weaponsmith fixing loop

Type `fw <weapon>` and it reconstructs, reconditions and maintains the weapon until it's in perfect condition. You need a hammer and steel wool in your inventory and an anvil in the room.

The same class farms the [Mirage City](../../world/areas.md#mirage-city) weapons for practice. The loot actions pick the training weapons up from corpses, and `fwm` fixes one axe, spear, mace, staff and flail in that order, skipping any you don't carry.

```text
#class {weaponsmith-repair} {open}
#var {weaponRepairItem} {none}
#var {weaponRepairCurrent} {none}
#alias {fw %1} {
  #var {weaponRepairItem} {%1};
  reconstruct %1
}
#action {You work with a hammer and anvil to improve the condition} {
  #if {"$weaponRepairItem" != "none"} {reconstruct $weaponRepairItem}
}
#action {You slip with the hammer and miss} {
  #if {"$weaponRepairItem" != "none"} {reconstruct $weaponRepairItem}
}
#action {This item will need reconstructing} {
  #if {"$weaponRepairItem" != "none"} {reconstruct $weaponRepairItem}
}
#action {This item needs to be reconditioned} {
  #if {"$weaponRepairItem" != "none"} {recondition $weaponRepairItem}
}
#action {This item needs regular maintenance} {
  #if {"$weaponRepairItem" != "none"} {maintain $weaponRepairItem}
}
#action {This item only needs regular maintenance} {
  #if {"$weaponRepairItem" != "none"} {maintain $weaponRepairItem}
}
#action {You fail to remove the blemishes from} {
  #if {"$weaponRepairItem" != "none"} {maintain $weaponRepairItem}
}
#action {You remove a few blemishes from} {
  #if {"$weaponRepairItem" != "none"} {maintain $weaponRepairItem}
}
#action {You cannot find any blemishes on} {
  #var {weaponRepairItem} {none};
  #if {"$weaponRepairCurrent" != "none"} {fwmnext}
}
#action {What weapon did you wish to maintain?} {
  #var {weaponRepairItem} {none};
  #if {"$weaponRepairCurrent" != "none"} {fwmnext}
}

#nop Mirage City weapon farming.
#alias {fwm} {
  #var {weaponRepairCurrent} {axe};
  fw axe
}
#alias {fwmnext} {
  #if {"$weaponRepairCurrent" == "axe"} {
    #var {weaponRepairCurrent} {spear};
    fw spear
  };
  #elseif {"$weaponRepairCurrent" == "spear"} {
    #var {weaponRepairCurrent} {mace};
    fw mace
  };
  #elseif {"$weaponRepairCurrent" == "mace"} {
    #var {weaponRepairCurrent} {staff};
    fw staff
  };
  #elseif {"$weaponRepairCurrent" == "staff"} {
    #var {weaponRepairCurrent} {flail};
    fw flail
  };
  #else {
    #var {weaponRepairCurrent} {none};
    #showme <138>+------+ <188>Done Fixing Mirage<138> +------+
  }
}
#action {       * a damaged flail} {take flail corpse}
#action {       * a small bronze spear} {take spear corpse}
#action {       * a steel mace} {take mace corpse}
#action {       * a bronze staff} {take staff corpse}
#action {       * a steel axe} {take axe corpse}
#action {       * a large broadsword} {take broad corpse}
#class {weaponsmith-repair} {close}
```

## Weaponsmith training loop

Take all your silver items from [Mirage City](../../world/areas.md#mirage-city) out of your pocket and type `m 2.silver`. Daggers are the best way to train weaponsmithing even though they take 30 pounds of metal each. This takes a lot longer than the armorsmith training loop.

<details>
<summary>Weaponsmith training loop script</summary>

```text
#class {weaponsmith-training} {open}
#var {weaponsmithSmeltItem} {none}
#var {weaponsmithFormItem} {dagger}
#var {weaponsmithOre} {unknown}
#var {weaponsmithHammerMax} {100}
#var {weaponsmithHammerCur} {0}
#alias {m %1} {
  #var {weaponsmithSmeltItem} {%1};
  smelt $weaponsmithSmeltItem
}
#alias {weaponsmithore} {
  #if {%1 < 30} {smelt $weaponsmithSmeltItem};
  #else {
    #var {weaponsmithOre} {%2};
    hold tongs;
    form $weaponsmithOre weapon $weaponsmithFormItem
  }
}
#action {You fail to smelt} {smelt $weaponsmithSmeltItem}
#action {You combine your ore and now have %1 pounds of raw %2.} {weaponsmithore {%1} {%2}}
#action {You now have %1 pounds of raw %2.} {weaponsmithore {%1} {%2}}
#action {You fail to form} {smelt ruined}
#action {You have broken the form} {smelt broken}
#action {You have cracked the form} {smelt broken}
#action {You filed a large gash into} {smelt $weaponsmithSmeltItem}
#action {You use your tongs and the anvil to form} {
  hold hammer;
  #var {weaponsmithHammerCur} {0};
  hammer $weaponsmithFormItem
}
#action {* CLANG! *} {
  #math {weaponsmithHammerCur} {$weaponsmithHammerCur + 1};
  #if {$weaponsmithHammerCur < $weaponsmithHammerMax} {
    hold hammer;
    hammer $weaponsmithFormItem
  };
  #else {
    hold tongs;
    quench $weaponsmithFormItem
  }
}
#action {You quench the form of the} {
  hold file;
  file $weaponsmithFormItem
}
#action {You file down} {smelt $weaponsmithOre}
#class {weaponsmith-training} {close}
```

</details>

## Jewelry fixing loop

Type `fj <item>` and it resurfaces, buffs and polishes the jewelry until it's in perfect condition. You need a hammer and a polishing cloth (plus buffing solution) in your inventory and a workbench in the room.

```text
#class {jeweler-repair} {open}
#var {jewelerRepairItem} {none}
#alias {fj %1} {
  #var {jewelerRepairItem} {%1};
  resurface %1
}
#action {You work with a hammer and workbench to improve} {
  #if {"$jewelerRepairItem" != "none"} {resurface $jewelerRepairItem}
}
#action {You slip with the hammer and miss} {
  #if {"$jewelerRepairItem" != "none"} {resurface $jewelerRepairItem}
}
#action {This item will need to be resurfaced} {
  #if {"$jewelerRepairItem" != "none"} {resurface $jewelerRepairItem}
}
#action {This item needs to be buffed} {
  #if {"$jewelerRepairItem" != "none"} {buff $jewelerRepairItem}
}
#action {You slip with the cloth and ding} {
  #if {"$jewelerRepairItem" != "none"} {buff $jewelerRepairItem}
}
#action {You buff the dings out of} {
  #if {"$jewelerRepairItem" != "none"} {buff $jewelerRepairItem}
}
#action {This item needs polishing} {
  #if {"$jewelerRepairItem" != "none"} {polish $jewelerRepairItem}
}
#action {This item only needs polishing} {
  #if {"$jewelerRepairItem" != "none"} {polish $jewelerRepairItem}
}
#action {You fail to polish a scratch out of} {
  #if {"$jewelerRepairItem" != "none"} {polish $jewelerRepairItem}
}
#action {You buff a scratch out of} {
  #if {"$jewelerRepairItem" != "none"} {polish $jewelerRepairItem}
}
#action {You cannot find scratches on} {#var {jewelerRepairItem} {none}}
#action {You cannot find any blemishes on} {#var {jewelerRepairItem} {none}}
#action {You cannot find any damage to} {#var {jewelerRepairItem} {none}}
#class {jeweler-repair} {close}
```

## Engraving training loop

With an engraver and a ring in your inventory and a workbench in the room, start it by typing `engrave ring engraving test`. It engraves the ring, erases the engraving and engraves it again, and when a ring is too poor to engrave it drops that one and moves to the next.

```text
#class {engraving} {open}
#var {engraved} {no}
#action {You slip engraving} {
  #if {"$engraved" == "no"} {engrave ring engraving test};
  #else {engrave ring erase engraving}
}
#action {You engrave} {
  #var {engraved} {yes};
  engrave ring erase engraving
}
#action {You remove the inscription} {
  #var {engraved} {no};
  engrave ring engraving test
}
#action {is of too poor a quality to engrave} {
  #var {engraved} {no};
  drop ring;
  engrave ring engraving test
}
#action {already has an engraving} {
  #var {engraved} {yes};
  engrave ring erase engraving
}
#class {engraving} {close}
```
