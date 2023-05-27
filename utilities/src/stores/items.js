import { defineStore } from 'pinia';
import { items } from '../items/';

export const itemsStore = defineStore('items', {
  state () {
    return {
      items,
      query: {
        levelRestriction: [0,100],
        showStaffs: true,
        showWands: true,
        showPills: true,
        showScrolls: true,
        showPotions: true,
        showArmor: true,
        showWeapons: true,
        showOther: true,
        armorFilter: 'none',
        weaponFilter: 'none',
        staffFilter: 'none',
        wandFilter: 'none',
        pillFilter: 'none',
        potionFilter: 'none',
        scrollFilter: 'none',
        areaFilter: 'none',
        otherFilter: 'none'
      },
      weights: {
        strength: 7,
        strengthDefault: 7,
        dexterity: 7,
        dexterityDefault: 7,
        intelligence: 7,
        intelligenceDefault: 7,
        wisdom: 7,
        wisdomDefault: 7,
        constitution: 7,
        constitutionDefault: 7,
        hitroll: 4,
        hitrollDefault: 4,
        damroll: 7,
        damrollDefault: 7,
        health: 1,
        healthDefault: 1,
        mana: 1,
        manaDefault: 1,
        move: 0,
        moveDefault: 0
      },
      options: {
        armorSlots: [
          'none','finger','neck','body','head','legs','feet','hands','arms',
          'shield','about','waist','wrist','wield','hold','float'
        ],
        weaponTypes: [
          'none', 'sword','dagger','spear','mace','axe','flail','whip',
          'polearm','staff'
        ],
        otherTypes: [
          'none','container','drink','food','fountain','furniture','gem','jewelry','key',
          'light','lockpick','map','pole','portal','staff','tool','trash',
          'treasure','warp_stone'
        ],
        pillTypes: [
          'none',
          ...Object.keys(
            items
              .filter(i=> i.itemType==='pill')
              .reduce((map,item)=>{
                item.valueFlags.forEach(rawFlag=>{
                  const flag = rawFlag.split(/\(|\)/g)[1];

                  if(isNaN(+flag[0])) map[flag] = true;
                });
                return map;
              },{})
          )
        ],
        scrollTypes: [
          'none',
          ...Object.keys(
            items
              .filter(i=> i.itemType==='scroll')
              .reduce((map,item)=>{
                item.valueFlags.forEach(rawFlag=>{
                  const flag = rawFlag.split(/\(|\)/g)[1];

                  if(isNaN(+flag[0])) map[flag] = true;
                });
                return map;
              },{})
          )
        ],
        potionTypes: [
          'none',
          ...Object.keys(
            items
              .filter(i=> i.itemType==='potion')
              .reduce((map,item)=>{
                item.valueFlags.forEach(rawFlag=>{
                  const flag = rawFlag.split(/\(|\)/g)[1];

                  if(isNaN(+flag[0])) map[flag] = true;
                });
                return map;
              },{})
          )
        ],
        wandTypes: [
          'none',
          ...Object.keys(
            items
              .filter(i=> i.itemType==='wand')
              .reduce((map,item)=>{
                item.valueFlags.forEach(rawFlag=>{
                  const flag = rawFlag.replace(/'/g,'').split(/\(|\)/g)[1];

                  // B is a deprecated flag
                  if(isNaN(+flag[0])&&flag[0]!=='B') map[flag] = true;
                });
                return map;
              },{})
          )
        ],
        staffTypes: [
          'none',
          ...Object.keys(
            items
              .filter(i=> i.itemType==='staff')
              .reduce((map,item)=> {
                item.valueFlags.forEach(rawFlag=>{
                  const flag = rawFlag.replace(/'/g,'').split(/\(|\)/g)[1];

                  if(isNaN(+flag[0])) map[flag] = true;
                });
                return map;
              },{})
          )
        ],
        areas: [
          'none',
          ...Object.keys(
            items
              .reduce((map,item)=>{
                map[item.area]=true;
                return map;
              },{})
          )
        ]
      }
    };
  },
  getters: {
    minLevel() {
      return this.query.levelRestriction[0];
    },
    maxLevel() {
      return this.query.levelRestriction[1];
    }
  },
  actions: {}
});
