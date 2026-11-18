// Damage messages from dam_message() in the MUD's src/fight.c, copied as
// written there, color codes included. Each row covers damage up to `max`
// (the last row has no limit). `others` is what the room and the victim see
// ("pokes"), and what you see for any hit with a named attack ("Your slash
// pokes..."); `you` is the bare form in "You poke the goblin".

export interface DamageMessage {
  you: string;
  others: string;
}

export interface DamageRow {
  min: number;
  max: number;
  normal: DamageMessage;
  monk: DamageMessage;
}

const limits = [0, 5, 10, 15, 20, 25, 30, 35, 45, 50, 57, 65, 75, 85, 93, 100, 125, 150, 200, 250, 350, 500, 750, 1250, 2500, 5000, 10000, Infinity];

const normal: [string, string][] = [
  ["{wmiss{x", "{wmisses{x"],
  ["{rpoke{x", "{rpokes{x"],
  ["{rwhap{x", "{rwhaps{x"],
  ["{rhit{x", "{rhits{x"],
  ["{rinjure{x", "{rinjures{x"],
  ["{rwound{x", "{rwounds{x"],
  ["{rmaul{x", "{rmauls{x"],
  ["{rdecimate{x", "{rdecimates{x"],
  ["{rdevastate{x", "{rdevastates{x"],
  ["{rwang{x", "{rwangs{x"],
  ["{RBEAT{x", "{RBEATS{x"],
  ["{RSLAUGHTER{x", "{RSLAUGHTERS{x"],
  ["{RDECIMATE{x", "{RDECIMATES{x"],
  ["{RMASSACRE{x", "{RMASSACRES{x"],
  ["{RMANGLE{x", "{RMANGLES{x"],
  ["{W*** {RDEMOLISH {W***{x", "{W*** {RDEMOLISHES {W***{x"],
  ["{W*** {RDEVASTATE {W***{x", "{W*** {RDEVASTATES {W***{x"],
  ["{W=== {ROBLITERATE {W==={x", "{W=== {ROBLITERATES {W==={x"],
  ["{W>>> {RANNIHILATE {W<<<{x", "{W>>> {RANNIHILATES {W<<<{x"],
  ["{W<<< {RERADICATE {W>>>{x", "{W<<< {RERADICATES {W>>>{x"],
  ["{Wdo {RUNSPEAKABLE {Wthings to{x", "{Wdoes {RUNSPEAKABLE {Wthings to{x"],
  ["{C+{mo{C+{mOoO{C+{moOo {CD{cI{CS{cS{CE{cC{CT {moOo{C+{mOoO{C+{mo{C+{x", "{C+{mo{C+{mOoO{C+{moOo {CD{cI{CS{cS{CE{cC{CT{cS {moOo{C+{mOoO{C+{mo{C+{x"],
  ["{YO{W={YO{W={YO{W={RTHRASH{W={YO{W={YO{W={YO{x", "{YO{W={YO{W={YO{W={RTHRASHES{W={YO{W={YO{W={YO{x"],
  ["{C<<{Y++{Coo{YOO{Co {YB{CUT{YC{CHE{YR {Co{YOO{Coo{Y++{C>>{x", "{C<<{Y++{Coo{YOO{Co {YB{CUT{YCH{CER{YS {Co{YOO{Coo{Y++{C>>{x"],
  ["{w--==**{Bo{w*{BOo{W>> {CWRECK {W<<{BoO{w*{Bo{w**==--{x", "{w--==**{Bo{w*{BOo{W>> {CWRECKS {W<<{BoO{w*{Bo{w**==--{x"],
  ["{C<{Y<{Wo{Y>{C>{B*{D-{B*{C<{Y<{W( {RASSAULT {W){Y>{C>{B*{D-{B*{C<{Y<{Wo{Y>{C>{x", "{C<{Y<{Wo{Y>{C>{B*{D-{B*{C<{Y<{W( {RASSAULTS {W){Y>{C>{B*{D-{B*{C<{Y<{Wo{Y>{C>{x"],
  ["{r+{wx{r+{RX{r+ {YM{WUTILAT{YE {r+{RX{r+{wx{r+{x", "{r+{wx{r+{RX{r+ {YM{WUTILATE{YS {r+{RX{r+{wx{r+{x"],
  ["{W({w({Ro{r+{D-- -{G RAZE {D- --{r+{Ro{w){W){x", "{W({w({Ro{r+{D-- -{G RAZES {D- --{r+{Ro{w){W){x"],
];

const monk: [string, string][] = [
  ["{wmiss{x", "{wmisses{x"],
  ["{rtap{x", "{rtaps{x"],
  ["{mbruises{x", "{mbruises{x"],
  ["{rslug{x", "{rslugs{x"],
  ["{rstrike{x", "{rstrikes{x"],
  ["{rslap{x", "{rslaps{x"],
  ["{rpommel{x", "{rpommels{x"],
  ["{rthump{x", "{rthumps{x"],
  ["{rjab{x", "{rjabs{x"],
  ["{rwang{x", "{rwangs{x"],
  ["{RSWAT{x", "{RSWATS{x"],
  ["{RWHACK{x", "{RWHACKS{x"],
  ["{RFLOG{x", "{RFLOGS{x"],
  ["{RTHWACK{x", "{RTHWACKS{x"],
  ["{RCUFF{x", "{RCUFFS{x"],
  ["{W*** {RBATTER {W***{x", "{W*** {RBATTERS {W***{x"],
  ["{W*** {RSMASH {W***{x", "{W*** {RSMASHES {W***{x"],
  ["{W=== {RCRUSH {W==={x", "{W=== {RCRUSHES {W==={x"],
  ["{W>>> {RWHOMP {W<<<{x", "{W>>> {RWHOMPS {W<<<{x"],
  ["{W<<< {RSTUN {W>>>{x", "{W<<< {RSTUNS {W>>>{x"],
  ["{Y***{W>>> {RWALLOP {W<<<{Y***{x", "{Y***{W>>> {RWALLOPS {W<<<{Y***{x"],
  ["{MoO{W+{MOo{W+{MoO {CSMITE {MOo{W+{MoO{W+{MOo{x", "{MoO{W+{MOo{W+{MoO {CSMITES {MOo{W+{MoO{W+{MOo{x"],
  ["{W--{Y==={R<<<{Y(({W[ {GCLOBBER{W ]{Y)){R>>>{Y==={W--{x", "{W--{Y==={R<<<{Y(({W[ {GCLOBBERS{W ]{Y)){R>>>{Y==={W--{x"],
  ["{woOo {BsSsSs {r)){W\\\\ {CBLUDGEON {W//{r(( {BsSsSs {woOo{x", "{woOo {BsSsSs {r)){W\\\\ {CBLUDGEONS {W//{r(( {BsSsSs {woOo{x"],
  ["{wo{WO{Y={WO{wo{WO{Y={WO{wo{D. {BFLaTTEN {D.{wo{WO{Y={WO{wo{WO{Y={WO{wo{x", "{wo{WO{Y={WO{wo{WO{Y={WO{wo{D. {BFLaTTENS {D.{wo{WO{Y={WO{wo{WO{Y={WO{wo{x"],
  ["{B*{C-{B*{C-{B*{wx{W>{R> {WSH{CA{WTTER {R<{W<{wx{B*{C-{B*{C-{B*{x", "{B*{C-{B*{C-{B*{wx{W>{R> {WSH{CA{WTTERS {R<{W<{wx{B*{C-{B*{C-{B*{x"],
  ["{MOII{mI{Di. {BPULVERIZE {D.i{mI{MIIO{x", "{MOII{mI{Di. {BPULVERIZES {D.i{mI{MIIO{x"],
  ["{w- --{r+{Ro{w){W) {GRUIN {W({w({Ro{r+{w-- -{x", "{w- --{r+{Ro{w){W) {GRUINS {W({w({Ro{r+{w-- -{x"],
];

export const damageRows: DamageRow[] = limits.map((max, i) => ({
  min: i === 0 ? 0 : limits[i - 1] + 1,
  max,
  normal: { you: normal[i][0], others: normal[i][1] },
  monk: { you: monk[i][0], others: monk[i][1] }
}));

/** The message ends in a period up to this much damage, "!" above it. */
export const PERIOD_MAX = 24;
