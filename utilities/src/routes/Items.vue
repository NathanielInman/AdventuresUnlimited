<template lang="pug">
section(style='padding-top: 0')
  .grid.bg-indigo-700.text-primary-50.border-round-md.mb-2
    .col
      .text-2xl.font-bold Item Calculator
    .col.text-right.flex.justify-content-end
      Button(@click='copyURL()') Share URL
  hr
  TabView
    TabPanel(header='Search Visibility')
      .grid.mt-2
        .col
          .p-field-checkbox
            Checkbox#show-pills(v-model='query.showPills',@change='change()',:binary='true')
            label(for='show-pills') Show Pills
          .p-field-checkbox
            Checkbox#show-scrolls(v-model='query.showScrolls',@change='change()',:binary='true')
            label(for='show-scrolls') Show Scrolls
        .col
          .p-field-checkbox
            Checkbox#show-potions(v-model='query.showPotions',@change='change()',:binary='true')
            label(for='show-potions') Show Potions
          .p-field-checkbox
            Checkbox#show-staves(v-model='query.showStaffs',@change='change()',:binary='true')
            label(for='show-staves') Show Staves
        .col
          .p-field-checkbox
            Checkbox#show-wands(v-model='query.showWands',@change='change()',:binary='true')
            label(for='show-wands') Show Wands
          .p-field-checkbox
            Checkbox#show-armor(v-model='query.showArmor',@change='change()',:binary='true')
            label(for='show-armor') Show Armor
        .col
          .p-field-checkbox
            Checkbox#show-weapons(v-model='query.showWeapons',@change='change()',:binary='true')
            label(for='show-weapons') Show Weapons
          .p-field-checkbox
            Checkbox#show-other(v-model='query.showOther',@change='change()',:binary='true')
            label(for='show-other') Show Other
    TabPanel(header='Search Filters')
      .grid.justify-content-between
        .p-field
          label(for='armor-filter') Armor Filter
          Dropdown#armor-filter.mb-1(placeholder='Filter By Armor Slot',v-model='query.armorFilter',
            @update:modelValue='change()', :options='options.armorSlots')
        .p-field
          label(for='pill-filter') Pill Filter
          Dropdown#pill-filter.mb-1(placeholder='Filter By Magic Type',v-model='query.pillFilter',
            @update:modelValue='change()', :options='options.pillTypes')
        .p-field
          label(for='wand-filter') Wand Filter
          Dropdown#wand-filter.mb-1(placeholder='Filter By Magic Type',v-model='query.wandFilter',
            @update:modelValue='change()', :options='options.wandTypes')
        .p-field
          label(for='weapon-filter') Weapon Filter
          Dropdown#weapon-filter.mb-1(placeholder='Filter By Weapon Type',v-model='query.weaponFilter',
            @update:modelValue='change()', :options='options.weaponTypes')
        .p-field
          label(for='potions-filter') Potions Filter
          Dropdown#potions-filter.mb-1(placeholder='Filter By Magic Type',v-model='query.potionFilter',
            @update:modelValue='change()', :options='options.potionTypes')
        .p-field
          label(for='scroll-filter') Scroll Filter
          Dropdown#scroll-filter.mb-1(placeholder='Filter By Magic Type',v-model='query.scrollFilter',
            @update:modelValue='change()', :options='options.scrollTypes')
        .p-field
          label(for='stave-filter') Stave Filter
          Dropdown#stave-filter.mb-1(placeholder='Filter By Magic Type',v-model='query.staffFilter',
            @update:modelValue='change()', :options='options.staffTypes')
      .grid.justify-content-between
        .p-field
          label(for='area-filter') Area Filter
          Dropdown#area-filter.mb-1(placeholder='Filter By Area',v-model='query.areaFilter',
            @update:modelValue='change()', :options='options.areas')
        .p-field
          label(for='other-filter') Other Filter
          Dropdown#other-filter.mb-1(placeholder='Filter By Other Type',v-model='query.otherFilter',
            @update:modelValue='change()', :options='options.otherTypes')
      .p-field.text-center
        label(for='level-restriction') Level Restriction ({{minLevel}} to {{maxLevel}})
        Slider#level-restriction(v-model='query.levelRestriction',:min='0',:max='110',
          range,@change='change()')
    TabPanel(header='Score Configuration (Advanced)')
      Button.mb-2(type='is-secondary',@click='resetScoreDefaults()') Reset Defaults
      .grid.justify-content-between
        .p-field
          label(for='strength') Strength
          InputNumber#strength(v-model='weights.strength',@input='changeScore',
          showButtons,buttonLayout='vertical',style='width:50px')
        .p-field
          label(for='dexterity') Dexterity
          InputNumber#dexterity(v-model='weights.dexterity',@input='changeScore',
          showButtons,buttonLayout='vertical',style='width:50px')
        .p-field
          label(for='intelligence') Intelligence
          InputNumber#intelligence(v-model='weights.intelligence',@input='changeScore',
          showButtons,buttonLayout='vertical',style='width:50px')
        .p-field
          label(for='wisdom') Wisdom
          InputNumber#wisdom(v-model='weights.wisdom',@input='changeScore',
          showButtons,buttonLayout='vertical',style='width:50px')
        .p-field
          label(for='constitution') Constitution
          InputNumber#constitution(v-model='weights.constitution',@input='changeScore',
          showButtons,buttonLayout='vertical',style='width:50px')
        .p-field
          label(for='damroll') Damroll
          InputNumber#damroll(v-model='weights.damroll',@input='changeScore',
          showButtons,buttonLayout='vertical',style='width:50px')
        .p-field
          label(for='hitroll') Hitroll
          InputNumber#hitroll(v-model='weights.hitroll',@input='changeScore',
          showButtons,buttonLayout='vertical',style='width:50px')
        .p-field
          label(for='health') Health
          InputNumber#health(v-model='weights.health',@input='changeScore',
          showButtons,buttonLayout='vertical',style='width:50px')
        .p-field
          label(for='mana') Mana
          InputNumber#mana(v-model='weights.mana',@input='changeScore',
          showButtons,buttonLayout='vertical',style='width:50px')
        .p-field
          label(for='move') Move
          InputNumber#move(v-model='weights.move',@input='changeScore',
          showButtons,buttonLayout='vertical',style='width:50px')
  hr
  .code.has-text-left(v-if='output&&output.length')
    .has-text-right
      Button.top-button(icon='fa fa-arrow-up',
       type='is-primary',inverted,@click='change(null)',
       style='position:absolute;margin-top:-0.4rem;right:2.2rem;',
       v-if='$route.query.vnum')
    template(v-if='!$route.query.vnum')
      span.gray #. short string 
      span.green-bold (
      span.green SCORE
      span.green-bold ) 
      span.red-bold (
      span.red LEVEL
      span.red-bold )
    template(v-for='line in output')
      .cursor(v-if='line.item',@click='change(line.item.vnum)')
        .line
          span(v-for='word in line',:class='word.class') {{word.text}}
      .line(v-if='!line.item')
        span(v-for='word in line',:class='word.class') {{word.text}}
    Button.bottom-button(icon='fa fa-arrow-left',:disabled='page==0',
      type='is-secondary',inverted,@click='previousPage',
      v-if='!$route.query.vnum',
      style='position:absolute;margin-top:-1.9rem;right:5rem')
    Button.bottom-button(icon='fa fa-arrow-right',:disabled='page==pages-1',
      type='is-secondary',inverted,@click='nextPage',
      v-if='!$route.query.vnum',
      style='position:absolute;margin-top:-1.9rem;right:2.2rem')
</template>
<script>

import { mapState, mapGetters, mapActions } from 'pinia';
import { itemsStore, usersStore } from '../stores/';
import * as colors from '../colors';


// Prepare the main template
export default {
  name: 'Items',
  computed: {
    ...mapState(usersStore, ['name']),
    ...mapState(itemsStore, ['items','query','weights','options']),
    ...mapGetters(itemsStore, ['minLevel', 'maxLevel'])
  },
  data(){
    return {
      output: [],
      page: 0,
      pages: 0,
      itemsPerPage: 20
    };
  },
  created(){
    const {query} = this.$route;

    if(Array.isArray(query.levelRestriction)){
      this.levelRestriction = query.levelRestriction.map(n=>parseInt(n,10));
    }
    if(query.hasOwnProperty('showStaffs')){
      this.showStaffs = query.showStaffs==='true';
    } //end if
    if(query.hasOwnProperty('showWands')){
      this.showWands = query.showWands==='true';
    } //end if
    if(query.hasOwnProperty('showPills')){
      this.showPills = query.showPills==='true';
    } //end if
    if(query.hasOwnProperty('showScrolls')){
      this.showScrolls = query.showScrolls==='true';
    } //end if
    if(query.hasOwnProperty('showPotions')){
      this.showPotions = query.showPotions==='true';
    } //end if
    if(query.hasOwnProperty('showArmor')){
      this.showArmor = query.showArmor==='true';
    } //end if
    if(query.hasOwnProperty('showWeapons')){
      this.showWeapons = query.showWeapons==='true';
    } //end if
    if(query.hasOwnProperty('showOther')){
      this.showOther = query.showOther==='true';
    } //end if
    if(query.hasOwnProperty('areaFilter')) this.areaFilter = query.areaFilter;
    if(query.hasOwnProperty('potionFilter')) this.potionFilter = query.potionFilter;
    if(query.hasOwnProperty('scrollFilter')) this.scrollFilter = query.scrollFilter;
    if(query.hasOwnProperty('pillFilter')) this.pillFilter = query.pillFilter;
    if(query.hasOwnProperty('staffFilter')) this.staffFilter = query.staffFilter;
    if(query.hasOwnProperty('wandFilter')) this.wandFilter = query.wandFilter;
    if(query.hasOwnProperty('weaponFilter')) this.weaponFilter = query.weaponFilter;
    if(query.hasOwnProperty('armorFilter')) this.armorFilter = query.armorFilter;
    if(query.hasOwnProperty('otherFilter')) this.otherFilter = query.otherFilter;
    this.change(query&&query.vnum ? query.vnum : null);
  },
  methods: {
    sortScore(items){
      return items.sort((a,b)=> parseInt(a.score,10)<parseInt(b.score,10)?1:-1);
    },
    previousPage(){
      this.page--;
      this.load();
    },
    nextPage(){
      this.page++;
      this.load();
    },
    resetScoreDefaults(){
      this.weights.strength = this.weights.strengthDefault;
      this.weights.dexterity = this.weights.dexterityDefault;
      this.weights.intelligence = this.weights.intelligenceDefault;
      this.weights.wisdom = this.weights.wisdomDefault;
      this.weights.constitution = this.weights.constitutionDefault;
      this.weights.hitroll = this.weights.hitrollDefault;
      this.weights.damroll = this.weigthts.damrollDefault;
      this.weights.health = this.weights.healthDefault;
      this.weights.mana = this.weights.manaDefault;
      this.weights.move = this.weights.moveDefault;
    },
    changeScore(){
      this.items.forEach(item=>{
        item.score=0;
        (item.affects||[]).forEach(affect=>{
          if(
            [
              'strength','dexterity','intelligence',
              'wisdom','constitution','hitroll','damroll',
              'health','mana','move'
            ].includes(affect.name)
          ) item.score+=parseInt(this.weights[affect.name]||0)*parseInt(affect.amount);
        });
      });
      this.items = this.sortScore(this.items);
      const {query} = this.$router.currentRoute;

      this.change(query&&query.vnum?query.vnum:null);
    },
    copyURL(){
      const inputEl = document.createElement('input');

      inputEl.style.position = 'absolute';
      inputEl.style.left = '-8000px';
      document.body.appendChild(inputEl);
      const split = location.href.split('?'),
            vnumString = split[1].split('&').find(s=>s.includes('vnum')),
            hasVnum = vnumString&&vnumString.includes('=');

      if(hasVnum){
        inputEl.value = `${split[0]}?${vnumString}`;
      }else{
        inputEl.value = location.href;
      } //end if
      inputEl.select();
      inputEl.select();
      inputEl.setSelectionRange(0,99999);
      document.execCommand('copy');
      this.$toast.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Copied URL to Clipboard!',
        life: 3000
      });
      inputEl.remove();
    },
    change(vnum){
      const {query} = this;
      if(vnum===undefined){
        this.page = 0;
      }else{
        query.vnum = vnum;
      } //end if
      this.$router.push({query});
      this.load(vnum);
    },
    load(vnum){
      this.output.splice(0);
      if(vnum){
        const item = this.items.find(item=> item.vnum===vnum);

        let str;

        this.drawString('{c*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
        this.drawString(`       {cName : {C${item.short}`);
        this.drawString(`     {cObject : {C${item.names.join(' ')}`);
        str = `      {cLevel : {C${item.level}`;
        this.drawString(`${str}${`{cArea : {C${item.area}`.padStart(57-str.length)}`);
        str = `       {cType : {C${item.itemType}`;
        this.drawString(`${str}${`{cWeight : {C${item.weight}`.padStart(57-str.length)}`);
        if(item.wearFlags.length){
          str = `       {cWear : {C${item.wearFlags.join(' ')}`;
          this.drawString(`${str}${`{cScore : {C${item.score}`.padStart(57-str.length)}`);
        }else{
          str = `       {cWear : {Cno`;
          this.drawString(`${str}${`{cScore : {C${item.score}`.padStart(57-str.length)}`);
        } //end if
        if(item.extraflags.length){
          this.drawString(`      {cFlags : {C${item.extraflags.join(' ')}`);
        }else{
          this.drawString(`      {cFlags : {Cnone`);
        } //end if
        this.drawString(`      {cValue : {Y${Math.floor(item.cost/100)} gold{c, {x${item.cost%100} silver`);
        this.drawString(' ');
        this.drawString(`   {cMaterial : {x${item.material.join(' ')}`)
        this.drawString(`{cSubmaterial : {x${item.submaterial.join(' ')}`);
        this.drawString(`     {cRarity : {x${item.rarity}`);
        if(item.itemType==='armor'){
          this.drawString(' ');
          this.drawString(`{cArmor Class: {x${item.valueFlags[0].split(/\(|\)/g)[1]} {cpierce`);
          this.drawString(`             {x${item.valueFlags[1].split(/\(|\)/g)[1]} {cbash`);
          this.drawString(`             {x${item.valueFlags[2].split(/\(|\)/g)[1]} {cslash`);
          this.drawString(`             {x${item.valueFlags[3].split(/\(|\)/g)[1]} {cvs magic`);
        }else if(item.itemType==='weapon'){
          this.drawString(' ');
          this.drawString(`{cWeapon Type : {C${item.valueFlags[0].split(/\(|\)/g)[1]}`);
          this.drawString(`{cDamage Type : {C${item.valueFlags[2].split(/\(|\)/g)[1]}`);
          str = item.valueFlags[3].split(/\(|\)/g)[1].split(',').join(' ');
          this.drawString(`      {cFlags : {C${!str.length?'none':str}`);
        }else if (['staff','wand'].includes(item.itemType)){
          this.drawString(' ');
          item.valueFlags.forEach(flag=>{
            const [title,value] = flag.replace(/:\s|'/g,'').split(/\(|\)/g);

            this.drawString(`{c${title.padStart(13)} : {x${value}`);
          })
        }else if(['pill','scroll','potion'].includes(item.itemType)){
          this.drawString(' ');
          const spells = [];

          if(item.valueFlags.length>1){
            const spell = item.valueFlags[1].split(/\(|\)/g)[1];

            if(!spell.includes('reserved')) spells.push(spell);
          } //end if
          if(item.valueFlags.length>2){
            const spell = item.valueFlags[2].split(/\(|\)/g)[1];

            if(!spell.includes('reserved')) spells.push(spell);
          } //end if
          if(item.valueFlags.length>3){
            const spell = item.valueFlags[3].split(/\(|\)/g)[1];

            if(!spell.includes('reserved')) spells.push(spell);
          } //end if
          if(item.valueFlags.length>4){
            const spell = item.valueFlags[4].split(/\(|\)/g)[1];

            if(!spell.includes('reserved')) spells.push(spell);
          } //end if
          this.drawString(`{cLevel {x${item.valueFlags[0].split(/\(|\)/g)[1]} {cspells of: ${spells.join(', ')}`);
        } //end if
        if(item.affects){
          this.drawString(' ');
          item.affects.forEach(affect=>{
            this.drawString(`    {cAffects : {C${affect.name}{c by {C${(affect.amount>0?'+':'')+affect.amount}`);
          });
        } //end if
        this.drawString('{c*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
      }else{
        const items = this.items.filter(item=>{

          const meetsLevel = +item.level>=this.query.levelRestriction[0]&&
                 +item.level<=this.query.levelRestriction[1],
                meetsArea = this.query.areaFilter==='none'||item.area===this.query.areaFilter,
                meetsOther = this.options.otherTypes.includes(item.itemType)&&this.query.showOther&&(
                  this.query.otherFilter==='none'||
                  item.itemType===this.query.otherFilter
                ),
                meetsArmor = this.query.showArmor&&(
                  this.query.armorFilter==='none'&&item.itemType==='armor'||
                  item.wearFlags.includes(this.query.armorFilter)
                ),
                meetsWeapon = item.itemType==='weapon'&&this.query.showWeapons&&(
                  this.query.weaponFilter==='none'||
                  item.valueFlags[0].includes(this.query.weaponFilter)
                ),
                meetsWand = item.itemType==='wand'&&this.query.showWands&&(
                  this.query.wandFilter==='none'||
                  item.valueFlags.find(o=>o.includes(this.query.wandFilter))
                ),
                meetsStaff = item.itemType==='staff'&&this.query.showStaffs&&(
                  this.query.staffFilter==='none'||
                  item.valueFlags.find(o=>o.includes(this.query.staffFilter))
                ),
                meetsPill = item.itemType==='pill'&&this.query.showPills&&(
                  this.query.pillFilter==='none'||
                  item.valueFlags.find(o=>o.includes(this.query.pillFilter))
                ),
                meetsScroll = item.itemType==='scroll'&&this.query.showScrolls&&(
                  this.query.scrollFilter==='none'||
                  item.valueFlags.find(o=>o.includes(this.query.scrollFilter))
                ),
                meetsPotion = item.itemType==='potion'&&this.query.showPotions&&(
                  this.query.potionFilter==='none'||
                  item.valueFlags.find(o=>o.includes(this.query.potionFilter))
                );

          return meetsLevel&&meetsArea&&(
            meetsOther||meetsArmor||meetsWeapon||meetsPill||meetsScroll||meetsPotion||meetsWand||meetsStaff
          );
        });

        if(!items.length){
          this.drawString('{R---> {xNo Results {R<--');
        }

        const sortedItems = this.sortScore(items);

        this.pages = Math.floor(sortedItems.length/this.itemsPerPage);
        for(let i=this.page*this.itemsPerPage;i<(this.page+1)*this.itemsPerPage&&i<sortedItems.length;i++){
          this.drawItem(items[i],i+1);
        } //end for
      } //end if
    },
    drawItem(item,number){
      item.stringified = this.drawString(`${number?`{D${number}. {x`:''}${item.short} {G({g${item.score}{G) {R({r${item.level}{R)`);
      item.stringified.item = item; //recursive for function pointer
    },
    drawString(string){
      const colorMap = {
          R: colors.redBold,
          r: colors.red,
          G: colors.greenBold,
          g: colors.green,
          B: colors.blueBold,
          b: colors.blue,
          C: colors.cyanBold,
          c: colors.cyan,
          M: colors.magentaBold,
          m: colors.magenta,
          Y: colors.yellowBold,
          y: colors.yellow,
          w: colors.grayBold,
          d: colors.black,
          D: colors.black,
          W: colors.white,
          x: colors.white,
          X: colors.white,
          k: colors.white,
          t: colors.tab,
          '#': colors.red
        },
        line = [];

      let i,str='',char,lastchar,flipbit,
          colorSwitch='W';

      for(i=0;i<string.length;i++){
        lastchar = char;
        char = string[i];
        if(char==='{' && !flipbit){
          flipbit = true;
        }else if(char==='{'&&flipbit){
          flipbit = false;
          str+=char;
        }else if(flipbit){
          flipbit = false;
          if(str.length){
            if(!colorMap.hasOwnProperty(colorSwitch)) colorSwitch = 'x';
            line.push(colorMap[colorSwitch](str));
            str = '';
            colorSwitch = char;
          }else if(char==='t'){
            if(!colorMap.hasOwnProperty(char)) colorSwitch = 'x';
            line.push(colorMap[char](' '));
          }else{
            colorSwitch = char;
          } //end if
        }else{
          str+=char;
        } //end if
      } //end for
      if(str.length) line.push(colorMap[colorSwitch](str));
      this.output.push(line);
      return line;
    }
  }
};
</script>
<style lang="stylus" scoped>
span
  white-space pre
.cursor
  cursor pointer
.bold
  font-weight bold
.top-button
  margin-bottom 1rem
  margin-top -1rem
</style>
