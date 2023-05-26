<template lang="pug">
section(style='padding-top: 0')
  .grid.bg-indigo-700.text-primary-50.border-round-md.mb-2
    .col
      .text-2xl.font-bold Diamonds: {{diamonds}}
      .text-xl Gold: {{gold}}
    .col.text-right.flex.justify-content-end
      Button(@click='copyURL()') Share URL
  .hero.is-danger.mb-2.mx-r(v-if='errors.length')
    .hero-body: .container
      .subtitle(v-for='error in errors') {{error}}
  .grid
    .col
      .card.mb-2
        .card-header: .card-header-title Basic {{locationType}}
        .card-content
          .p-field
            label(for='toggle-type') Toggle Type
            br
            InputSwitch#toggle-type(v-model='locationTypeValue',@click='locationTypeClick',
              @change='updateCost') {{locationType}}
          .p-field-checkbox
            Checkbox#is-public(v-model='isPublic',@change='updateCost',:binary='true')
            label(for='is-public') is public
          .p-field-checkbox
            Checkbox#has-portal(v-model='hasPortal',@change='updateCost',:binary='true')
            label(for='has-portal') has portal
          .p-field
            label(for='healing-rate') Healing Rate
            Slider#healing-rate(v-model='healingRate',:min='100',:max='400',:step='10',
              @change='updateCost')
    .col(v-if='locationType=="house"')
      .card.mb-2
        .card-header: .card-header-title Door
        .card-content
          .p-field
            label(for='door-type') Door Type
            Dropdown#door-type(v-model='doorType',:options='doorTypes',optionLabel='name',optionValue='value',
              @change='updateCost')
          .p-field
            label(for='lock-type') Lock Type
            Dropdown(v-model='doorLock',:options='lockTypes',optionLabel='name',optionValue='value',
              @change='updateCost')
          .p-field
            label(for='lock-level') Lock Level {{lockLevel}}
            Slider(v-model='lockLevel',:step='1',:min='50',:max='100',@change='updateCost')
  .grid
    .col(v-if='locationType=="manor"&&!isPublic')
      .card.mb-2
        .card-header: .card-header-title Henchmen
        .card-content
          .p-field
            label(for='henchmen-number') Number
            InputNumber#henchmen-number(v-model='henchmenNumber',:min='2',:max='6',
              :showButtons='true',buttonLayout='horizontal',@input='updateCost')
          .p-field
            label(for='henchmen-level') Level {{henchmenLevel}}
            Slider#henchmen-level(v-model='henchmenLevel',:step='5',:min='75',:max='110',
              @change='updateCost')
          .p-field
            .mb-2 Toggle All
            InputSwitch#toggle-all-henchmen(v-model='henchmenAll',
              @click='upgradeHenchmenAll')
          p.mb-2.
            Starting abilities: dark vision, regeneration, detect invisibility, detect hidden, dodge, parry, kick. Weapons are free.
          .grid
            .col
              .text-2xl.mb-2 General Upgrades
              .p-field-checkbox
                Checkbox#sanctuary(v-model='sanctuary',@change='updateCost',:binary='true')
                label(for='sanctuary') Sanctuary
              .p-field-checkbox
                Checkbox#haste(v-model='haste',@change='updateCost',:binary='true')
                label(for='haste') Haste
              .p-field-checkbox
                Checkbox#phase(v-model='phase',@change='updateCost',:binary='true')
                label(for='phase') Phase
              .p-field-checkbox
                Checkbox#protection(v-model='protection',@change='updateCost',:binary='true')
                label(for='protection') Protection (either evil or good)
              .p-field-checkbox
                Checkbox#sneak(v-model='sneak',@change='updateCost',:binary='true')
                label(for='sneak') Sneak
              .p-field-checkbox
                Checkbox#fly(v-model='fly',@change='updateCost',:binary='true')
                label(for='fly') Fly
              .p-field-checkbox
                Checkbox#invisibility(v-model='invisibility',@change='updateCost',:binary='true')
                label(for='invisibility') Invisibility
            .col
              .text-2xl.mb-2 Offensive Abilities
              .p-field-checkbox
                Checkbox#critical-strike(v-model='criticalStrike',@change='updateCost',:binary='true')
                label(for='critical-strike') Critical Strike
              .p-field-checkbox
                Checkbox#counter(v-model='counter',@change='updateCost',:binary='true')
                label(for='counter') Counter
              .p-field-checkbox
                Checkbox#dirt-kick(v-model='dirtKick',@change='updateCost',:binary='true')
                label(for='dirt-kick') Dirt Kick
              .p-field-checkbox
                Checkbox#disarm(v-model='disarm',@change='updateCost',:binary='true')
                label(for='disarm') Disarm
              .p-field-checkbox
                Checkbox#berserk(v-model='berserk',@change='updateCost',:binary='true')
                label(for='berserk') Berserk
              .p-field-checkbox
                Checkbox#bash(v-model='bash',@change='updateCost',:binary='true')
                label(for='bash') Bash
              .p-field-checkbox
                Checkbox#trip(v-model='trip',@change='updateCost',:binary='true')
                label(for='trip') Trip
            .col
              .text-2xl.mb-2 Major Resistances
              .p-field-checkbox
                Checkbox#monk(v-model='resistMonk',@change='updateCost',:binary='true')
                label(for='monk') Monk
              .p-field-checkbox
                Checkbox#magic(v-model='resistMagic',@change='updateCost',:binary='true')
                label(for='magic') Magic
              .p-field-checkbox
                Checkbox#pierce(v-model='resistPierce',@change='updateCost',:binary='true')
                label(for='pierce') Pierce
              .p-field-checkbox
                Checkbox#slash(v-model='resistSlash',@change='updateCost',:binary='true')
                label(for='slash') Slash
              .p-field-checkbox
                Checkbox#bash(v-model='resistBash',@change='updateCost',:binary='true')
                label(for='bash') Bash
            .col
              .text-2xl.mb-2 Minor Resistances
              .p-field-checkbox
                Checkbox#wood(v-model='resistWood',@change='updateCost',:binary='true')
                label(for='wood') Wood
              .p-field-checkbox
                Checkbox#silver(v-model='resistSilver',@change='updateCost',:binary='true')
                label(for='silver') Silver
              .p-field-checkbox
                Checkbox#iron(v-model='resistIron',@change='updateCost',:binary='true')
                label(for='iron') Iron
              .p-field-checkbox
                Checkbox#light(v-model='resistLight',@change='updateCost',:binary='true')
                label(for='light') Light
              .p-field-checkbox
                Checkbox#poison(v-model='resistPoison',@change='updateCost',:binary='true')
                label(for='poison') Poison
              .p-field-checkbox
                Checkbox#holy(v-model='resistHoly',@change='updateCost',:binary='true')
                label(for='holy') Holy
              .p-field-checkbox
                Checkbox#energy(v-model='resistEnergy',@change='updateCost',:binary='true')
                label(for='energy') Energy
              .p-field-checkbox
                Checkbox#disease(v-model='resistDisease',@change='updateCost',:binary='true')
                label(for='disease') Disease
              .p-field-checkbox
                Checkbox#fire(v-model='resistFire',@change='updateCost',:binary='true')
                label(for='fire') Fire
              .p-field-checkbox
                Checkbox#cold(v-model='resistCold',@change='updateCost',:binary='true')
                label(for='cold') Cold
              .p-field-checkbox
                Checkbox#lightning(v-model='resistLightning',@change='updateCost',:binary='true')
                label(for='lightning') Lightning
              .p-field-checkbox
                Checkbox#acid(v-model='resistAcid',@change='updateCost',:binary='true')
                label(for='acid') Acid
    .col
      .card.mb-1
        .card-header: .card-header-title Basic Furniture
        .card-content
          .p-field
            label(for='furniture-pieces') Furniture Pieces
            InputNumber#furniture-items(v-model='furnitureItems',:min='0',:max='10',
              :showButtons='true',buttonLayout='horizontal',@input='updateCost')
          .p-field
            label(for='fireplaces') Fireplaces
            InputNumber#fireplaces(v-model='fireplaceItems',:min='0',:max='10',
              :showButtons='true',buttonLayout='horizontal',@input='updateCost')
          .p-field
            label(for='fountains') Fountains
            InputNumber#fountains(v-model='fountainItems',:min='0',:max='10',
              :showButtons='true',buttonLayout='horizontal',@input='updateCost')
    .col
      .card(style='margin-bottom:4rem')
        .card-header: .card-header-title Tradesguild Furniture
        .card-content
          .p-field
            label(for='tradesguild-troughs') Troughs
            InputNumber#tradesguild-troughs(v-model='troughItems',:min='0',:max='10',
              :showButtons='true',buttonLayout='horizontal',@input='updateCost')
          .p-field
            label(for='tradesguild-crucibles') Crucibles
            InputNumber#tradesguild-crucibles(v-model='crucibleItems',:min='0',:max='10',
              :showButtons='true',buttonLayout='horizontal',@input='updateCost')
          .p-field
            label(for='tradesguild-anvils') Anvils
            InputNumber#tradesguild-anvils(v-model='anvilItems',:min='0',:max='10',
              :showButtons='true',buttonLayout='horizontal',@input='updateCost')
          .p-field
            label(for='tradesguild-workbenches') Workbenches
            InputNumber#tradesguild-workbenches(v-model='workbenchItems',:min='0',:max='10',
              :showButtons='true',buttonLayout='horizontal',@input='updateCost')
          .p-field
            label(for='tradesguild-forges') Forges
            InputNumber#tradesguild-forges(v-model='forgeItems',:min='0',:max='10',
              :showButtons='true',buttonLayout='horizontal',@input='updateCost')
</template>
<script>
import { mapState } from 'pinia';
import { usersStore } from '../stores/';

// Prepare the main template
export default {
  name: 'HomeIndex',
  computed: {
    ...mapState(usersStore, ['name'])
  },
  created(){
    const {query} = this.$router.currentRoute.value;

    this.locationType = query.locationType||'manor';
    this.locationTypeValue = false;

    if(isNaN(+query.healingRate)||+query.healingRate<100||+query.healingRate>400){
      if(this.locationType==='manor'){
        this.healingRate = 150;
      }else{
        this.healingrate = 100;
      } //end if
    }else{
      this.healingRate = +query.healingRate;
    } //end if
    this.henchmenAll = false;
    this.henchmenNumber = +query.henchmenNumber||2;
    this.henchmenLevel = +query.henchmenLevel||75;
    this.hasPortal = query.hasPortal==='true';
    this.isPublic = query.isPublic==='true';
    this.doorLock = +query.doorLock;
    this.doorType = +query.doorType;
    this.lockLevel = +query.lockLevel;
    this.furnitureItems = +query.furnitureItems||0;
    this.fireplaceItems = +query.fireplaceItems||0;
    this.fountainItems = +query.fountainItems||0;
    this.troughItems = +query.troughItems||0;
    this.crucibleItems = +query.crucibleItems||0;
    this.anvilItems = +query.anvilItems||0;
    this.workbenchItems = +query.workbenchItems||0;
    this.forgeItems = +query.forgeItems||0;
    this.sanctuary = query.sanctuary==='true';
    this.haste = query.haste==='true';
    this.phase = query.phase==='true';
    this.protection = query.protection==='true';
    this.sneak = query.sneak==='true';
    this.fly = query.fly==='true';
    this.invisibility = query.invisibility==='true';
    this.criticalStrike = query.criticalStrike==='true';
    this.counter = query.counter==='true';
    this.dirtKick = query.dirtKick==='true';
    this.disarm = query.disarm==='true';
    this.berserk = query.berserk==='true';
    this.bash = query.bash==='true';
    this.trip = query.trip==='true';
    this.resistMonk = query.resistMonk==='true';
    this.resistMagic = query.resistMagic==='true';
    this.resistPierce = query.resistPierce==='true';
    this.resistSlash = query.resistSlash==='true';
    this.resistBash = query.resistBash==='true';
    this.resistWood = query.resistWood==='true';
    this.resistSilver = query.resistSilver==='true';
    this.resistIron = query.resistIron==='true';
    this.resistLight = query.resistLight==='true';
    this.resistPoison = query.resistPoison==='true';
    this.resistHoly = query.resistHoly==='true';
    this.resistEnergy = query.resistEnergy==='true';
    this.resistDisease = query.resistDisease==='true';
    this.resistFire = query.resistFire==='true';
    this.resistCold = query.resistCold==='true';
    this.resistLightning = query.resistLightning==='true';
    this.resistAcid = query.resistAcid==='true';
    this.updateCost();
  },
  data(){
    return {
      diamonds: 0,
      gold: 0,
      errors: [],
      doorTypes: [
        { name: 'wood door', value: 0 },
        { name: 'stone door', value: 50 },
        { name: 'metal door', value: 100 }
      ],
      lockTypes: [
        { name: 'easy difficulty lock', value: 0 },
        { name: 'regular difficulty lock', value: 200 },
        { name: 'hard difficulty lock', value: 400 },
        { name: 'implausible difficulty lock', value: 600 },
        { name: 'improbable difficulty lock', value: 800 },
        { name: 'impossible difficulty lock', value: 1000 }
      ]
    };
  },
  methods: {
    locationTypeClick(){
      this.locationTypeValue = !!this.locationTypeValue;
      this.locationType = this.locationTypeValue ? 'manor' : 'house';
    },
    copyURL(){
      const inputEl = document.createElement('input');

      inputEl.style.position = 'absolute';
      inputEl.style.left = '-8000px';
      document.body.appendChild(inputEl);
      inputEl.value = location.href;
      inputEl.select();
      inputEl.select();
      inputEl.setSelectionRange(0,99999);
      document.execCommand('copy');
      console.log(this.$toast.add);
      this.$toast.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Copied URL to Clipboard!',
        life: 3000
      });
      inputEl.remove();
    },
    acquireHenchmenStatus(){
      this.sanctuary = this.henchmenAll;
      this.haste = this.henchmenAll;
      this.phase = this.henchmenAll;
      this.protection = this.henchmenAll;
      this.sneak = this.henchmenAll;
      this.fly = this.henchmenAll;
      this.invisibility = this.henchmenAll;
      this.criticalStrike = this.henchmenAll;
      this.counter = this.henchmenAll;
      this.dirtKick = this.henchmenAll;
      this.disarm = this.henchmenAll;
      this.berserk = this.henchmenAll;
      this.bash = this.henchmenAll;
      this.trip = this.henchmenAll;
      this.resistMonk = this.henchmenAll;
      this.resistMagic = this.henchmenAll;
      this.resistPierce = this.henchmenAll;
      this.resistSlash = this.henchmenAll;
      this.resistBash = this.henchmenAll;
      this.resistWood = this.henchmenAll;
      this.resistSilver = this.henchmenAll;
      this.resistIron = this.henchmenAll;
      this.resistLight = this.henchmenAll;
      this.resistPoison = this.henchmenAll;
      this.resistHoly = this.henchmenAll;
      this.resistEnergy = this.henchmenAll;
      this.resistDisease = this.henchmenAll;
      this.resistFire = this.henchmenAll;
      this.resistCold = this.henchmenAll;
      this.resistLightning = this.henchmenAll;
      this.resistAcid = this.henchmenAll;
    },
    upgradeHenchmenAll(){
      this.henchmenAll = !this.henchmenAll;
      this.acquireHenchmenStatus();
      this.$forceUpdate();
      this.updateCost();
    },
    updateCost(){
      let items = 0;

      this.errors.length = 0;
      this.diamonds = 0;
      if(this.locationType==='house'){
        this.diamonds += (this.healingRate - 100)/10*125;
        this.henchmenAll = false;
        this.acquireHenchmenStatus();
      }else{
        if(this.healingRate<150){
          this.errors.push('Default healing rate for manor is 150');
        }else{
          this.diamonds += (this.healingRate - 150)/10*125;
        } //end if
        this.doorLock = 0;
        this.doorType = 0;
        this.lockLevel = 50;
      } //end if
      if(this.healingRate>300&&this.isPublic) this.errors.push('Public location may not have healing rate above 300%');
      if(this.healingRate>300&&this.locationType==='house') this.errors.push('House location may not have healing rate above 300%');
      if(this.hasPortal) this.diamonds += 400;
      this.diamonds += +this.doorLock;
      this.diamonds += +this.doorType;
      this.diamonds += (this.lockLevel - 50) * 10;
      this.diamonds += this.furnitureItems * 25;
      items += this.furnitureItems;
      this.diamonds += this.fireplaceItems * 50;
      items += this.fireplaceItems;
      this.diamonds += this.fountainItems * 150;
      items += this.fountainItems;
      this.diamonds += this.troughItems * 50;
      items += this.troughItems;
      this.diamonds += this.crucibleItems * 100;
      items += this.crucibleItems;
      this.diamonds += this.anvilItems * 250;
      items += this.anvilItems;
      this.diamonds += this.workbenchItems * 250;
      items += this.workbenchItems;
      this.diamonds += this.forgeItems * 500;
      items += this.forgeItems;
      if(!this.isPublic){
        let henchmenDiamonds = 0;
        if(this.sanctuary) henchmenDiamonds += 125;
        if(this.haste) henchmenDiamonds += 100;
        if(this.phase) henchmenDiamonds += 100;
        if(this.protection) henchmenDiamonds += 50;
        if(this.sneak) henchmenDiamonds += 25;
        if(this.fly) henchmenDiamonds += 25;
        if(this.invisibility) henchmenDiamonds += 25;
        if(this.criticalStrike) henchmenDiamonds += 100;
        if(this.counter) henchmenDiamonds += 100;
        if(this.dirtKick) henchmenDiamonds += 75;
        if(this.disarm) henchmenDiamonds += 75;
        if(this.berserk) henchmenDiamonds += 50;
        if(this.bash) henchmenDiamonds += 25;
        if(this.trip) henchmenDiamonds += 10;
        if(this.resistMonk) henchmenDiamonds += 100;
        if(this.resistMagic) henchmenDiamonds += 100;
        if(this.resistPierce) henchmenDiamonds += 50;
        if(this.resistSlash) henchmenDiamonds += 50;
        if(this.resistBash) henchmenDiamonds += 50;
        if(this.resistWood) henchmenDiamonds += 25;
        if(this.resistSilver) henchmenDiamonds += 25;
        if(this.resistIron) henchmenDiamonds += 25;
        if(this.resistLight) henchmenDiamonds += 25;
        if(this.resistPoison) henchmenDiamonds += 25;
        if(this.resistHoly) henchmenDiamonds += 25;
        if(this.resistEnergy) henchmenDiamonds += 25;
        if(this.resistDisease) henchmenDiamonds += 25;
        if(this.resistFire) henchmenDiamonds += 25;
        if(this.resistCold) henchmenDiamonds += 25;
        if(this.resistLightning) henchmenDiamonds += 25;
        if(this.resistAcid) henchmenDiamonds += 25;
        this.diamonds += this.henchmenNumber * henchmenDiamonds;
        if(this.henchmenNumber > 2) this.diamonds += 200 * (this.henchmenNumber - 2);
        if(this.henchmenLevel > 75) this.diamonds += 100 * (this.henchmenLevel - 75)/5 *this.henchmenNumber;
      } //end if
      this.gold = this.diamonds * 110;
      if(this.locationType==='house'&&items > 10) this.errors.push(`Total items (${items}) exceeds 10 for houses`);
      if(this.locationType==='manor'&&items > 15) this.errors.push(`Total items (${items}) exceeds 15 for manors`);
      this.$router.push({query: {
        henchmenNumber: this.henchmenNumber,
        henchmenLevel: this.henchmenLevel,
        locationType: this.locationType,
        healingRate: this.healingRate,
        hasPortal: this.hasPortal,
        isPublic: this.isPublic,
        doorLock: this.doorLock,
        doorType: this.doorType,
        lockLevel: this.lockLevel,
        furnitureItems: this.furnitureItems,
        fireplaceItems: this.fireplaceItems,
        fountainItems: this.fountainItems,
        troughItems: this.troughItems,
        crucibleItems: this.crucibleItems,
        anvilItems: this.anvilItems,
        workbenchItems: this.workbenchItems,
        forgeItems: this.forgeItems,
        sanctuary: this.sanctuary,
        haste: this.haste,
        phase: this.phase,
        protection: this.protection,
        sneak: this.sneak,
        fly: this.fly,
        invisibility: this.invisibility,
        criticalStrike: this.criticalStrike,
        counter: this.counter,
        dirtKick: this.dirtKick,
        disarm: this.disarm,
        berserk: this.berserk,
        bash: this.bash,
        trip: this.trip,
        resistMonk: this.resistMonk,
        resistMagic: this.resistMagic,
        resistPierce: this.resistPierce,
        resistSlash: this.resistSlash,
        resistBash: this.resistBash,
        resistWood: this.resistWood,
        resistSilver: this.resistSilver,
        resistIron: this.resistIron,
        resistLight: this.resistLight,
        resistPoison: this.resistPoison,
        resistHoly: this.resistHoly,
        resistEnergy: this.resistEnergy,
        resistDisease: this.resistDisease,
        resistFire: this.resistFire,
        resistCold: this.resistCold,
        resistLightning: this.resistLightning,
        resistAcid: this.resistAcid
      }});
    }
  }
};
</script>
<style lang="stylus" scoped>
.mx-r
  margin-left -3rem
  margin-right -3rem
.p-field, .p-field-checkbox
  margin-bottom 1rem
  & > label
    line-height 2
    color #888
    display block
.p-field-checkbox
  display flex
  align-items center
  &> label
    margin-left 0.5rem
    line-height 1
</style>
