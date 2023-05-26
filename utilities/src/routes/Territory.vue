<template lang="pug">
section(style='padding-top: 0')
  .grid.bg-indigo-700.text-primary-50.border-round-md.mb-2
    .col
      .text-2xl.font-bold Territory Calculator
      .text-xl paste your "territory clan" list
  hr
  .grid
    .col-6.flex.flex-column
      .flex
        .text-xl.mr-2(style='margin-top:-0.4rem') paste inside this area
        i.fa.fa-hand-o-down
      Textarea(@input='updateAreas', rows='20')
    .col-6.flex.flex-column
      .flex.flex-align-center
        .text-xl.mr-2(style='margin-top:-0.4rem') this will be unconquered areas
        i.fa.fa-hand-o-down
      Textarea(v-model='areaOutput', rows='20')
</template>
<script>
const areas = [
  'Eastern Moors (1-20)',
  'The Haze (75-90)',
  'Woodfell Forest (5-10)',
  'Brovlancor (5-15)',
  'Grungnison Catacombs (15-30)',
  'Hagarth (10-15)',
  'Travellers\' Rest (5-15)',
  'The Hand of Markov (10-25)',
  'Heishnum Desert (1-20)',
  'Dleivain (20-35)',
  'The Bog of Durlah (10-15)',
  'Bose\'nisten (10-15)',
  'The City of Aliuna (5-40)',
  'Sewers (5-30)',
  'Grungel (10-20)',
  'The Giants Outpost (100-110)',
  'Drakyri Isle (75-100)',
  'UnderDark (13-50)',
  'Eirenole Castle (45-60)',
  'Darathorn\'s Pit (30-50)',
  'Ship in a Bottle (65-80)',
  'Rivendale (60-70)',
  'Eirenole (35-45)',
  'Yrenelania (20-55)',
  'Sanctuary (13-30)',
  'The Underground Highway (5-20)',
  'The Acoma Estate (50-60)',
  'Beaches (5-25)',
  'Goblin Pass (25-30)',
  'Goblin Stronghold (10-20)',
  'Gypsy Camp (5-10)',
  'Urbyrtnol (100-110)',
  'The Forbidden Wastes (65-80)',
  'Arthmore (100-110)',
  'Necropolis (55-75)',
  'Xe\'lith (55-65)',
  'Deltherian (5-15)',
  'Manthalaras (40-60)',
  'Pyrainn Mountains (40-55)',
  'The Meridian (20-30)',
  'The Frozen Waste (20-20)',
  'Il\'kaethe (100-110)',
  'Burrowholme (10-20)',
  'Reskel (30-40)',
  'The Avian Tree (20-30)',
  'Renault House (10-15)',
  'Equinilis (5-10)',
  'R\'tescra (30-40)',
  'Blackeye\'s Gypsy Camp (25-35)',
  'Uchduruk (35-50)',
  'Hythian Forest (10-20)',
  'Sildarak\'s Crypt (85-95)',
  'The Hamlet of Elsfar (25-35)',
  'Vlauchauch, City of the Divine (75-90)',
  'The Whirlpool (30-40)',
  'The City of Terrason (35-50)',
  'Castle of Burden (30-40)',
  'Mirage City (20-30)',
  'Racomva (20-30)',
  'Racomva Castle (20-30)',
  'Draek\'le (40-60)',
  'Caranos Tomb (60-70)',
  'Xuergothe Castle (45-60)',
  'Caldera Ruins (15-30)',
  'The Dwarven Forest (15-20)',
  'Khetes (10-30)',
  'Mines of Noal\'xyn (15-30)',
  'Cathedral Volencymale (10-15)',
  'Meneth Naur (70-85)',
  'Zzukenathaft (15-25)',
  'Shadowbox (80-90)',
  'Du\'Rahath (15-30)',
  'Khezaderth (70-85)',
  'The Ruins of Khezaderth (70-85)',
  'Tzimosh\'s Camp (10-20)',
  'Fideal\'s Lake (10-20)',
  'Mt. Ka\'lri (10-20)',
  'Oterion (35-45)',
  'Tekkit Hill (70-85)',
  'Illianathoren Pass (10-30)',
  'Nerezza (5-10)',
  'Valeda (25-45)',
  'Fireblast Mountains (70-90)',
  'Mystery Manor (40-50)',
  'Longbottom\'s Shire (15-25)',
  'Ruins of Khezauch (55-70)',
  'Lost Kingdoms (60-85)',
  'Gtharstu (65-75)',
  'Ayasil (100-110)',
  'Jasporin (15-25)',
  'Tark Valley (10-20)',
  'The White Shrine (85-95)',
  'Schwartz Glacier (50-50)',
  'Cartwrights Farm (10-15)',
  'Wildlife Refuge (70-80)',
  'The Four Seasons (40-50)',
  'The Stone Quarry (5-10)',
  'The Western Road (5-15)',
  'Eirenole Thistle (40-45)',
  'Quickling Village (30-45)',
  'Shrine of Barbades (5-15)',
  'Breyard Village (50-60)',
  'Eirenole Valley (90-95)',
  'The Mines of Markov (5-15)',
  'Upper Barreston (10-40)',
  'Lower Barreston (10-40)',
  'Northern Barreston (10-40)',
  'Kaer Tzoun (45-55)',
  'Connerty Crossing (70-80)',
  'Tiny Rapids (60-75)',
  'The Sandcastle (35-45)',
  'Littlefist Glade (15-25)',
  'Tyyrinn Village (35-50)',
  'T\'leisins Pool (5-10)',
  'The Drow Mines (10-15)',
  'Trouthead Town (100-110)',
  'Heishaer City (50-60)',
  'Kallendale (100-110)',
  'Kallenpesh Palace (100-110)',
  'Haythor Dungeon (8-22)'
];

import { mapState } from 'pinia';
import { usersStore } from '../stores/';

// Prepare the main template
export default {
  name: 'TerritoryIndex',
  computed: {
    ...mapState(usersStore, ['name'])
  },
  data(){
    return {
      areaOutput: ''
    };
  },
  methods: {
    updateAreas(e){
      const text = e
        .split('\n')
        .filter(line=>line.includes('['))
        .map(line=> line.replace(/\[.*]\s/g,''));

      this.areaOutput = areas.filter(area=>{
        return !text.find(s=>area.includes(s));
      })
      .map(s=>{
        const [name,area] = s.split('('),
              [startLevel,endLevelLong] = area.split('-'),
              endLevel = (endLevelLong||'').replace(')','');

        return [name.trimEnd(),startLevel,endLevel];
      })
      .sort((a,b)=> +a[1] < +b[1] ? -1 : 1)
      .map(([name,startLevel,endLevel])=> `[${startLevel}-${endLevel}] ${name}`)
      .join('\n');
    }
  }
};
</script>
<style lang="stylus" scoped>
.bold
  font-weight bold
.mb
  margin-bottom 1rem
.mr
  margin-right 1rem
.mb-2
  margin-bottom 2rem
.mx-r
  margin-left -1.5rem
  margin-right -1.5rem
.b-slider
  padding 0 1rem
</style>
