<template lang="pug">
main: .pt-5.card.flex.flex-wrap.align-items-center.justify-content-center
  .container
    h1.text-2xl Adventures Unlimited Damage Strings : Non-monk
    hr
    .container
      pre.code.margin-bottom
        .line(v-for='line in nonmonk.lines')
          span(v-for='word in line',:class='word.class') {{word.text}}
    h1.text-2xl(style='margin-top:3rem') Adventures Unlimited Damage Strings : Non-monk
    hr
    .container(style='margin-bottom:7rem')
      pre.code.margin-bottom
        .line(v-for='line in monk.lines')
          span(v-for='word in line',:class='word.class') {{word.text}}
</template>
<script>
import { mapState } from 'pinia';
import { usersStore } from '../stores/';
import { ColorPad } from '../utilities/ColorPad';

// Prepare the main template
export default {
  name: 'DamageStringsIndex',
  computed: {
    ...mapState(usersStore, ['name'])
  },
  created () {
    this.nonmonk = new ColorPad([
      '0 damage: {wmisses{x',
      '1-5 damage: {rpokes{x',
      '6-10 damage: {rwhaps{x',
      '11-15 damage: {rhits{x',
      '16-20 damage: {rinjures{x',
      '21-25 damage: {rwounds{x',
      '26-30 damage: {rmauls{x',
      '31-35 damage: {rdecimates{x',
      '36-45 damage: {rdevastates{x',
      '46-50 damage: {rwangs{x',
      '51-57 damage: {RBEATS{x',
      '58-65 damage: {RSLAUGHTERS{x',
      '66-75 damage: {RDECIMATES{x',
      '76-85 damage: {RMASSACRES{x',
      '86-93 damage: {RMANGLES{x',
      '94-100 damage: {W*** {RDEMOLISHES {W***{x',
      '101-125 damage: {W*** {RDEVASTATES {W***{x',
      '126-150 damage: {W=== {ROBLITERATES {W==={x',
      '151-200 damage: {W>>> {RANNIHILATES {W<<<{x',
      '201-250 damage: {W<<< {RERADICATES {W>>>{x',
      '251-350 damage: {Wdoes {RUNSPEAKABLE {Wthings to{x',
      '351-500 damage: +{mo{C+{mOoO{C+{moOo {CD{cI{CS{cS{CE{cC{CT{cS {moOo{C+{mOoO{C+{mo{C+{x',
      '501-750 damage: {YO{W={YO{W={YO{W={RTHRASHES{W={YO{W={YO{W={YO{x',
      '751-1250 damage: {C<<{Y++{Coo{YOO{Co {YB{CUT{YCH{CER{YS {Co{YOO{Coo{Y++{C>>{x',
      '1251-2500 damage: {w--==**{Bo{w*{BOo{W>> {CWRECKS {W<<{BoO{w*{Bo{w**==--{x',
      '2501-5000 damage: {C<{Y<{Wo{Y>{C>{B*{D-{B*{C<{Y<{W( {RASSAULTS {W){Y>{C>{B*{D-{B*{C<{Y<{Wo{Y>{C>',
      '5001-10000 damage: {r+{wx{r+{RX{r+ {YM{WUTILATE{YS {r+{RX{r+{wx{r+',
      '10001+ damage: {W({w({Ro{r+{D-- -{G RAZES {D- --{r+{Ro{w){W)'
    ]);
    this.monk = new ColorPad([
      '0 damage: {wmisses{x',
      '1-5 damage: {rtaps{x',
      '6-10 damage: {mbruises{x',
      '11-15 damage: {rslugs{x',
      '16-20 damage: {rstrikes{x',
      '21-25 damage: {rslaps{x',
      '26-30 damage: {rpommels{x',
      '31-35 damage: {rthumps{x',
      '36-45 damage: {rjabs{x',
      '46-50 damage: {rwangs{x',
      '51-57 damage: {RSWATS{x',
      '58-65 damage: {RWHACKS{x',
      '66-75 damage: {RFLOGS{x',
      '76-85 damage: {RTHWACKS{x',
      '86-93 damage: {RCUFFS{x',
      '94-100 damage: {W*** {RBATTERS {W***{x',
      '101-125 damage: {W*** {RSMASHES {W***{x',
      '126-150 damage: {W=== {RCRUSHES {W==={x',
      '151-200 damage: {W>>> {RWHOMPS {W<<<{x',
      '201-250 damage: {W<<< {RSTUNS {W>>>{x',
      '251-350 damage: {Y***{W>>> {RWALLOPS {W<<<{Y***{x',
      '351-500 damage: {MoO{W+{MOo{W+{MoO {CSMITES {MOo{W+{MoO{W+{MOo{x',
      '501-750 damage: {W--{Y==={R<<<{Y(({W[ {GCLOBBERS{W ]{Y)){R>>>{Y==={W--{x',
      '751-1250 damage: {woOo {BsSsSs {r)){W\\\\ {CBLUDGEONS {W//{r(( {BsSsSs {woOo{x',
      '1251-2500 damage: {wo{WO{Y={WO{wo{WO{Y={WO{wo{D. {BFLaTTEN {D.{wo{WO{Y={WO{wo{WO{Y={WO{wo',
      '2501-5000 damage: {B*{C-{B*{C-{B*{wx{W>{R> {WSH{CA{WTTERS {R<{W<{wx{B*{C-{B*{C-{B*',
      '5001-10000 damage: {MOII{mI{Di. {BPULVERIZES {D.i{mI{MIIO',
      '10001+ damage: {D- --{r+{Ro{w){W) {GRUINS {W({w({Ro{r+{D-- -'
    ]);
  }
};
</script>
<style lang="stylus" scoped>
.bold
  font-weight bold
</style>
