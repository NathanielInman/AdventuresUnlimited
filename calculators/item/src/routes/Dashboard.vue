<template lang="pug">
section.section(style='padding-top: 0')
  .hero.is-primary.mb-2.mx-r
    .hero-body: .container
      .columns
        .column
          .level
            .level-left
              .title Item Calculator
            .level-right
              b-button(icon-left='content-copy',type='is-primary',inverted,
                @click='copyURL') Share URL
          .code
            span.gray short string 
            span.green-bold (
            span.green SCORE
            span.green-bold ) 
            span.red-bold (
            span.red LEVEL
            span.red-bold )
  b-collapse.card.mb-2(animation='slide',:open='false')
    .card-header(slot='trigger',slot-scope='props',role='button')
      p.card-header-title Score Configuration (Advanced)
      a.card-header-icon: b-icon(:icon='props.open?"menu-down":"menu-up"')
    .card-content: .content
      b-checkbox(v-model='customizeScore',@input='changeScore') Customize Score
      .columns
        .column
          b-field(label='Strength')
            b-input(v-model='weights.strength',type='number',@input='changeScore')
          b-field(label='Dexterity')
            b-input(v-model='weights.dexterity',type='number',@input='changeScore')
          b-field(label='Intelligence')
            b-input(v-model='weights.intelligence',type='number',@input='changeScore')
          b-field(label='Wisdom')
            b-input(v-model='weights.wisdom',type='number',@input='changeScore')
          b-field(label='Constitution')
            b-input(v-model='weights.constitution',type='number',@input='changeScore')
        .column
          b-field(label='Hitroll')
            b-input(v-model='weights.hitroll',type='number',@input='changeScore')
          b-field(label='Damroll')
            b-input(v-model='weights.damroll',type='number',@input='changeScore')
        .column
          b-field(label='Mana')
            b-input(v-model='weights.health',type='number',@input='changeScore')
          b-field(label='Health')
            b-input(v-model='weights.mana',type='number',@input='changeScore')
          b-field(label='Move')
            b-input(v-model='weights.move',type='number',@input='changeScore')
  b-collapse.card.mb-2(animation='slide',:open='false')
    .card-header(slot='trigger',slot-scope='props',role='button')
      p.card-header-title Filters
      a.card-header-icon: b-icon(:icon='props.open?"menu-down":"menu-up"')
    .card-content: .content
      .columns
        .column
          b-field(label='Armor Filter')
            b-select.mb-1(placeholder='Filter By Armor Slot',v-model='armorFilter',
              @input='change()')
              option(v-for='option in armorSlotOptions',:value='option') {{option}}
          b-field(label='Pill Filter')
            b-select.mb-1(placeholder='Filter By Magic Type',v-model='pillFilter',
              @input='change()')
              option(v-for='option in pillTypeOptions',:value='option') {{option}}
          b-field(label='Wand Filter')
            b-select.mb-1(placeholder='Filter By Magic Type',v-model='wandFilter',
              @input='change()')
              option(v-for='option in wandTypeOptions',:value='option') {{option}}
        .column
          b-field(label='Weapon Filter')
            b-select.mb-1(placeholder='Filter By Weapon Type',v-model='weaponFilter',
              @input='change()')
              option(v-for='option in weaponTypeOptions',:value='option') {{option}}
          b-field(label='Potions Filter')
            b-select.mb-1(placeholder='Filter By Magic Type',v-model='potionFilter',
              @input='change()')
              option(v-for='option in potionTypeOptions',:value='option') {{option}}
          b-field(label='Area Filter')
            b-select.mb-1(placeholder='Filter By Area',v-model='areaFilter',
              @input='change()')
              option(v-for='option in areaOptions',:value='option') {{option}}
        .column
          b-field(label='Other Filter')
            b-select.mb-1(placeholder='Filter By Other Type',v-model='otherFilter',
              @input='change()')
              option(v-for='option in otherTypeOptions',:value='option') {{option}}
          b-field(label='Scroll Filter')
            b-select.mb-1(placeholder='Filter By Magic Type',v-model='scrollFilter',
              @input='change()')
              option(v-for='option in scrollTypeOptions',:value='option') {{option}}
          b-field(label='Stave Filter')
            b-select.mb-1(placeholder='Filter By Magic Type',v-model='staffFilter',
              @input='change()')
              option(v-for='option in staffTypeOptions',:value='option') {{option}}
  .level
    .level-item
      b-checkbox(v-model='showPills',@input='change()') Show Pills
      b-checkbox(v-model='showScrolls',@input='change()') Show Scrolls
      b-checkbox(v-model='showPotions',@input='change()') Show Potions
      b-checkbox(v-model='showStaffs',@input='change()') Show Staves
      b-checkbox(v-model='showWands',@input='change()') Show Wands
      b-checkbox(v-model='showArmor',@input='change()') Show Armor
      b-checkbox(v-model='showWeapons',@input='change()') Show Weapons
      b-checkbox(v-model='showOther',@input='change()') Show Other
  b-field.has-text-centered(label='Level Restriction')
    b-slider(v-model='levelRestriction',:min='0',:max='105',@change='change()')
  .code.has-text-left(v-if='output&&output.length')
    .has-text-right
      b-button.top-button(icon-left='arrow-left-bold',
       type='is-primary',inverted,@click='change(null)',
       style='position:absolute;margin-top:-0.4rem;right:2.2rem;',
       v-if='$router.currentRoute.query.vnum') Return
    template(v-for='line in output')
      .cursor(v-if='line.item',@click='change(line.item.vnum)')
        .line
          span(v-for='word in line',:class='word.class') {{word.text}}
      .line(v-if='!line.item')
        span(v-for='word in line',:class='word.class') {{word.text}}
    b-button.bottom-button(icon-left='arrow-left',:disabled='page==0',
      type='is-secondary',inverted,@click='previousPage',
      v-if='!$router.currentRoute.query.vnum',
      style='position:absolute;margin-top:-1.9rem;right:5rem')
    b-button.bottom-button(icon-left='arrow-right',:disabled='page==pages-1',
      type='is-secondary',inverted,@click='nextPage',
      v-if='!$router.currentRoute.query.vnum',
      style='position:absolute;margin-top:-1.9rem;right:2.2rem')
</template>
<script>

import Vuex from 'vuex';
import * as colors from '../colors';
import {items} from '../items/';

const {mapActions,mapGetters,mapMutations,mapState} = Vuex;

// Prepare the main template
export default {
  name: 'Dashboard',
  computed: {
    ...mapState('user',['name'])
  },
  data(){
    return {
      output: [],
      page: 0,
      pages: 0,
      itemsPerPage: 20,
      customizeScore: false,
      weights: {
        strength: 7,
        dexterity: 7,
        intelligence: 7,
        wisdom: 7,
        constitution: 7,
        hitroll: 4,
        damroll: 7,
        health: 1,
        mana: 1,
        move: 0
      },
      armorSlotOptions: [
        'none','finger','neck','body','head','legs','feet','hands','arms',
        'shield','about','waist','wrist','wield','hold','float'
      ],
      weaponTypeOptions: [
        'none', 'sword','dagger','spear','mace','axe','flail','whip',
        'polearm','staff'
      ],
      otherTypeOptions: [
        'none','container','drink','food','fountain','furniture','gem','jewelry','key',
        'light','lockpick','map','pole','portal','staff','tool','trash',
        'treasure','warp_stone'
      ],
      pillTypeOptions: ['none'],
      scrollTypeOptions: ['none'],
      potionTypeOptions: ['none'],
      wandTypeOptions: ['none'],
      staffTypeOptions: ['none'],
      areaOptions: ['none'],
      items: items
        .sort((a,b)=> +a.score<+b.score?1:+a.score>+b.score?-1:+a.level<+b.level?1:-1)
        .filter(o=>o.score<5000)
    };
  },
  created(){
    const {query} = this.$router.currentRoute;

    Object.keys(
      this.items
        .reduce((map,item)=>{
          map[item.area]=true;
          return map;
        },{})
    ).forEach(key=> this.areaOptions.push(key));
    Object.keys(
      this.items
        .filter(i=> i.itemType==='staff')
        .reduce((map,item)=>{
          item.valueFlags.forEach(rawFlag=>{
            const flag = rawFlag.replace(/'/g,'').split(/\(|\)/g)[1];

            if(isNaN(+flag[0])) map[flag] = true;
          });
          return map;
        },{})
    ).forEach(key=> this.staffTypeOptions.push(key));
    Object.keys(
      this.items
        .filter(i=> i.itemType==='wand')
        .reduce((map,item)=>{
          item.valueFlags.forEach(rawFlag=>{
            const flag = rawFlag.replace(/'/g,'').split(/\(|\)/g)[1];

            // B is a deprecated flag
            if(isNaN(+flag[0])&&flag[0]!=='B') map[flag] = true;
          });
          return map;
        },{})
    ).forEach(key=> this.wandTypeOptions.push(key));
    Object.keys(
      this.items
        .filter(i=> i.itemType==='pill')
        .reduce((map,item)=>{
          item.valueFlags.forEach(rawFlag=>{
            const flag = rawFlag.split(/\(|\)/g)[1];

            if(isNaN(+flag[0])) map[flag] = true;
          });
          return map;
        },{})
    ).forEach(key=> this.pillTypeOptions.push(key));
    Object.keys(
      this.items
        .filter(i=> i.itemType==='potion')
        .reduce((map,item)=>{
          item.valueFlags.forEach(rawFlag=>{
            const flag = rawFlag.split(/\(|\)/g)[1];

            if(isNaN(+flag[0])) map[flag] = true;
          });
          return map;
        },{})
    ).forEach(key=> this.potionTypeOptions.push(key));
    Object.keys(
      this.items
        .filter(i=> i.itemType==='scroll')
        .reduce((map,item)=>{
          item.valueFlags.forEach(rawFlag=>{
            const flag = rawFlag.split(/\(|\)/g)[1];

            if(isNaN(+flag[0])) map[flag] = true;
          });
          return map;
        },{})
    ).forEach(key=> this.scrollTypeOptions.push(key));
    const levelRestriction = +query.levelRestriction;

    if(!Array.isArray(query.levelRestriction)){
      this.levelRestriction = [50,100];
    }else{
      this.levelRestriction = query.levelRestriction.map(n=>+n);
    }
    if(!query.hasOwnProperty('showStaffs')){
      this.showStaffs = true;
    }else{
      this.showStaffs = query.showStaffs==='true';
    } //end if
    if(!query.hasOwnProperty('showWands')){
      this.showWands = true;
    }else{
      this.showWands = query.showWands==='true';
    } //end if
    if(!query.hasOwnProperty('showPills')){
      this.showPills = true;
    }else{
      this.showPills = query.showPills==='true';
    } //end if
    if(!query.hasOwnProperty('showScrolls')){
      this.showScrolls = true;
    }else{
      this.showScrolls = query.showScrolls==='true';
    } //end if
    if(!query.hasOwnProperty('showPotions')){
      this.showPotions = true;
    }else{
      this.showPotions = query.showPotions==='true';
    } //end if
    if(!query.hasOwnProperty('showArmor')){
      this.showArmor = true;
    }else{
      this.showArmor = query.showArmor==='true';
    } //end if
    if(!query.hasOwnProperty('showWeapons')){
      this.showWeapons = true;
    }else{
      this.showWeapons = query.showWeapons==='true';
    } //end if
    if(!query.hasOwnProperty('showOther')){
      this.showOther = true;
    }else{
      this.showOther = query.showOther==='true';
    } //end if
    this.areaFilter = query.areaFilter || 'none';
    this.potionFilter = query.potionFilter || 'none';
    this.scrollFilter = query.scrollFilter || 'none';
    this.pillFilter = query.pillFilter || 'none';
    this.staffFilter = query.staffFilter || 'none';
    this.wandFilter = query.wandFilter || 'none';
    this.weaponFilter = query.weaponFilter || 'none';
    this.armorFilter = query.armorFilter || 'none';
    this.otherFilter = query.otherFilter || 'none';
    this.change(query&&query.vnum ? query.vnum : null);
  },
  methods: {
    previousPage(){
      this.page--;
      this.load();
    },
    nextPage(){
      this.page++;
      this.load();
    },
    changeScore(){
      if(!this.customizeScore) return; //short-circuit. ignore changes
      this.items.forEach(item=>{
        item.customScore=0;
        (item.affects||[]).forEach(affect=>{
          if(
            [
              'strength','dexterity','intelligence',
              'wisdom','constitution','hitroll','damroll',
              'health','mana','move'
            ].includes(affect.name)
          ) item.customScore+=parseInt(this.weights[affect.name]||0)*parseInt(affect.amount);
        });
      });
      this.items = this.items.sort((a,b)=> a.customScore<b.customScore?1:a.customScore>b.customScore?-1:+a.level<+b.level?1:-1);
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
      this.$buefy.toast.open('Copied URL to Clipboard!');
      inputEl.remove();
    },
    change(vnum){
      const query = {
        levelRestriction: this.levelRestriction,
        showStaffs: this.showStaffs,
        showWands: this.showWands,
        showPills: this.showPills,
        showScrolls: this.showScrolls,
        showPotions: this.showPotions,
        showArmor: this.showArmor,
        showWeapons: this.showWeapons,
        showOther: this.showOther,
        armorFilter: this.armorFilter,
        weaponFilter: this.weaponFilter,
        staffFilter: this.staffFilter,
        wandFilter: this.wandFilter,
        pillFilter: this.pillFilter,
        potionFilter: this.potionFilter,
        scrollFilter: this.scrollFilter,
        areaFilter: this.areaFilter,
        otherFilter: this.otherFilter
      };
      if(vnum===undefined){
        this.page = 0;
      }else{
        query.vnum = vnum;
      } //end if
      this.$router.push({query});
      this.load(vnum);
    },
    load(vnum){
      this.output.length = 0;
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

          const meetsLevel = +item.level>=this.levelRestriction[0]&&
                 +item.level<=this.levelRestriction[1],
                meetsArea = this.areaFilter==='none'||item.area===this.areaFilter,
                meetsOther = this.otherTypeOptions.includes(item.itemType)&&this.showOther&&(
                  this.otherFilter==='none'||
                  item.itemType===this.otherFilter
                ),
                meetsArmor = this.showArmor&&(
                  this.armorFilter==='none'&&item.itemType==='armor'||
                  item.wearFlags.includes(this.armorFilter)
                ),
                meetsWeapon = item.itemType==='weapon'&&this.showWeapons&&(
                  this.weaponFilter==='none'||
                  item.valueFlags[0].includes(this.weaponFilter)
                ),
                meetsWand = item.itemType==='wand'&&this.showWands&&(
                  this.wandFilter==='none'||
                  item.valueFlags.find(o=>o.includes(this.wandFilter))
                ),
                meetsStaff = item.itemType==='staff'&&this.showStaffs&&(
                  this.staffFilter==='none'||
                  item.valueFlags.find(o=>o.includes(this.staffFilter))
                ),
                meetsPill = item.itemType==='pill'&&this.showPills&&(
                  this.pillFilter==='none'||
                  item.valueFlags.find(o=>o.includes(this.pillFilter))
                ),
                meetsScroll = item.itemType==='scroll'&&this.showScrolls&&(
                  this.scrollFilter==='none'||
                  item.valueFlags.find(o=>o.includes(this.scrollFilter))
                ),
                meetsPotion = item.itemType==='potion'&&this.showPotions&&(
                  this.potionFilter==='none'||
                  item.valueFlags.find(o=>o.includes(this.potionFilter))
                );

          return meetsLevel&&meetsArea&&(
            meetsOther||meetsArmor||meetsWeapon||meetsPill||meetsScroll||meetsPotion||meetsWand||meetsStaff
          );
        });

        if(!items.length){
          this.drawString('{R---> {xNo Results {R<--');
        }else if(this.customizeScore){
          const sortedItems = items
            .sort((a,b)=> a.customScore<b.customScore?1:a.customScore>b.customScore?-1:+a.level<+b.level?1:-1);

          this.pages = Math.floor(sortedItems.length/this.itemsPerPage);
          for(let i=this.page*this.itemsPerPage;i<(this.page+1)*this.itemsPerPage&&i<sortedItems.length;i++){
            this.drawItem(items[i],i+1);
          } //end for
        }else{
          const sortedItems = items
            .sort((a,b)=> +a.score<+b.score?1:+a.score>+b.score?-1:+a.level<+b.level?1:-1);

          this.pages = Math.floor(sortedItems.length/this.itemsPerPage);
          for(let i=this.page*this.itemsPerPage;i<(this.page+1)*this.itemsPerPage&&i<sortedItems.length;i++){
            this.drawItem(items[i],i+1);
          } //end for
        } //end if
      } //end if
    },
    drawItem(item,number){
      item.stringified = this.drawString(`${number?`{D${number}. {x`:''}${item.short} {G({g${this.customizeScore?item.customScore:item.score}{G) {R({r${item.level}{R)`);
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
