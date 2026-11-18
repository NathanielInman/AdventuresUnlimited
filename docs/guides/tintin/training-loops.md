# TinTin++ training loops

Scripts that buff you before quests, buff other players on request while you idle, and train spells by casting them on yourself. Setup, prompts, chat logging and the idle toggle are on the [TinTin++ page](index.md); most of these scripts lean on them.

## Quest buffer

This buffs you a minute before you can quest again and puts a "Quest Available" banner up when the timer hits zero.

> [!IMPORTANT]
> It reads the quest timer from your prompt, so you need a prompt that shows it as `<number>qt` (the [monk prompt](index.md#monk-prompt) does). It also calls a `buff` alias: define one with your buff commands separated by semicolons, or point it at the mage buffer with `#alias {buff} {gobuff}`.

```text
#var {readyForQuest} {true}
#action { 1qt } {
  #if {"$readyForQuest" == "false"} {
    buff;
    #var {readyForQuest} {true}
  }
}
#action { 0qt } {
  #if {"$readyForQuest" == "true"} {
    #showme <138>+-----------------------+<088>;
    #showme <138>|    <178>Quest Available<138>    |<088>;
    #showme <138>+-----------------------+<088>;
    #var {readyForQuest} {false}
  }
}
#action {You may now quest again.} {#line gag}
```

## Mage buffer

While you idle on a marble bench, this answers buff requests on the OOC channel: someone types `osay sanc` (or `osay can`, `osay fly`, `osay spell` for the full set and so on) and you stand, cast it on them and rest again. It takes one request at a time; a request that comes in while you're still casting is logged as missed. `gobuff` buffs you and your pet.

It ignores requests that claim to come from you. Someone could fake a line like that with a pmote, a tell or another line-feed trick to make you cast on command. The script answers on OOC and logs the attempt so you can report them.

> [!IMPORTANT]
> This needs `$me` and `$pet` from [Connecting](index.md#connecting), `logline` from [Chat logging](index.md#chat-logging) and the [idle toggle](index.md#idle-toggle). It only answers requests while `idle` is on.

<details>
<summary>Mage buffer script</summary>

```text
#var {buffing} {false}
#var {spoofed} {false}

#nop singlebuff {target} {spell}
#alias {singlebuff} {
  #if {"$idling" == "true"} {
    #var {spoofed} {false};
    #regex {%1} {^%i$me$} {#var {spoofed} {true}};
    #if {"$spoofed" == "true"} {
      osay (AUTOMATED) Your abuse has been logged.;
      logline {(%1)(SPOOFED) : single-buff-%2}
    };
    #elseif {"$buffing" == "true"} {
      logline {(%1)(MISSED) : single-buff-%2}
    };
    #else {
      #var {buffing} {true};
      logline {(%1) : single-buff-%2};
      stand;
      c '%2' %1;
      r bench
    }
  }
}

#nop fullbuff {target}
#alias {fullbuff} {
  #if {"$idling" == "true"} {
    #var {spoofed} {false};
    #regex {%1} {^%i$me$} {#var {spoofed} {true}};
    #if {"$spoofed" == "true"} {
      osay (AUTOMATED) Your abuse has been logged.;
      logline {(%1)(SPOOFED) : full-buff}
    };
    #elseif {"$buffing" == "true"} {
      logline {(%1)(MISSED) : full-buff}
    };
    #else {
      #var {buffing} {true};
      logline {(%1) : full-buff};
      stand;
      c regen '%1';
      c haste '%1';
      c giant '%1';
      c sanc '%1';
      c 'stone skin' '%1';
      c 'armor' '%1';
      c 'shield' '%1';
      c phase '%1';
      c 'protection good' '%1';
      c fly '%1';
      r bench
    }
  }
}

#action {Ooc - %1 says 'can %2'} {singlebuff {%2} {can}}
#action {Ooc - %1 says 'can'} {singlebuff {%1} {can}}
#action {Ooc - %1 says 'fly'} {singlebuff {%1} {fly}}
#action {Ooc - %1 says 'regen'} {singlebuff {%1} {regen}}
#action {Ooc - %1 says 'sanc'} {singlebuff {%1} {sanc}}
#action {Ooc - %1 says 'protection good'} {singlebuff {%1} {protection good}}
#action {Ooc - %1 says 'protection evil'} {singlebuff {%1} {protection evil}}
#action {Ooc - %1 says 'protection neutral'} {singlebuff {%1} {protection neutral}}
#action {Ooc - %1 says 'shield'} {singlebuff {%1} {shield}}
#action {Ooc - %1 says 'armor'} {singlebuff {%1} {armor}}
#action {Ooc - %1 says 'giant'} {singlebuff {%1} {giant}}
#action {Ooc - %1 says 'haste'} {singlebuff {%1} {haste}}
#action {Ooc - %1 says 'stone'} {singlebuff {%1} {stone}}
#action {Ooc - %1 says 'phase'} {singlebuff {%1} {phase}}
#action {Ooc - %1 says 'spell %2'} {fullbuff {%2}}
#action {Ooc - %1 %2 says 'spell'} {fullbuff {%2}}
#action {Ooc - %1 says 'spell'} {fullbuff {%1}}
#action {Ooc - %1 says '?spellup?'} {fullbuff {%1}}
#action {You sit on A marble bench and rest.} {#var {buffing} {false}}

#alias {gobuff} {
  gt buff-start;
  buffself;
  buffpet;
  gt buff-end
}
#alias {buffpet} {
  stand;
  #3 c can $pet;
  c regen $pet;
  c 'armor' $pet;
  c 'shield' $pet;
  c 'stone skin' $pet;
  c 'protection good' $pet;
  c sanc $pet;
  c haste $pet;
  c phase $pet;
  c giant $pet;
  order $pet stand
}
#alias {buffself} {
  stand;
  #3 c can;
  c regen;
  c 'armor';
  c 'detect invis';
  c 'detect hidden';
  c 'detect evil';
  c 'detect good';
  c 'protection good';
  c 'shield';
  c 'stone';
  c haste;
  c giant;
  c phase;
  c sanc
}
```

</details>

## Poison training loop

For classes that have both poison and cure poison, this is the fastest way to master both. It poisons you, cures you and starts over, retrying whenever a cast fails. Start it by casting `c poison <yourname>` once.

> [!IMPORTANT]
> This casts on `$me` from [Connecting](index.md#connecting). The three training loops share the "You lost your concentration" message, so load one at a time and unload it with `#class {name} {kill}` before the next.

```text
#class {train-poison} {open}
#var {farmState} {none}
#action {You feel less sick} {
  #var {farmState} {none};
  c 'poison' $me
}
#action {You feel momentarily ill} {c 'poison' $me}
#action {The poison in you is resistant} {c 'cure poison' $me}
#action {You feel sick} {
  #var {farmState} {yes};
  c 'cure poison' $me
}
#action {You lost your concentration} {
  #if {"$farmState" == "none"} {c 'poison' $me};
  #else {c 'cure poison' $me}
}
#class {train-poison} {close}
```

## Disease training loop

For classes that have both plague and cure disease. Start it with `c plague <yourname>`.

```text
#class {train-disease} {open}
#var {farmState} {none}
#action {Your sores vanish} {
  #var {farmState} {none};
  c 'plague' $me
}
#action {You feel momentarily ill} {c 'plague' $me}
#action {The curse of the plague on you is resistant} {c 'cure disease' $me}
#action {You scream in agony as plague} {
  #var {farmState} {yes};
  c 'cure disease' $me
}
#action {You lost your concentration} {
  #if {"$farmState" == "none"} {c 'plague' $me};
  #else {c 'cure disease' $me}
}
#class {train-disease} {close}
```

## Blind training loop

For classes that have both blindness and cure blindness. Start it with `c blind <yourname>`.

```text
#class {train-blind} {open}
#var {farmState} {none}
#action {You can see again.} {
  #var {farmState} {none};
  c 'blind' $me
}
#action {The room seems darker.. then gets} {c 'blind' $me}
#action {The curse of blindness on you is resistant} {c 'cure blind' $me}
#action {You are blinded!} {
  #var {farmState} {yes};
  c 'cure blind' $me
}
#action {You lost your concentration} {
  #if {"$farmState" == "none"} {c 'blind' $me};
  #else {c 'cure blind' $me}
}
#class {train-blind} {close}
```
