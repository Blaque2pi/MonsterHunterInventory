import React, {useEffect, useState} from 'react';
import {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

interface CounterElementProps {
  name: string;
  min: number;
  saveName?: string;
}

function CounterElement({
  name,
  min,
  saveName,
}: CounterElementProps): JSX.Element {
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      if (!saveName) return;
      const value = await AsyncStorage.getItem(saveName);
      if (value) setCount(parseInt(value, 10));
    })();
  }, [saveName]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <View style={styles.counterContainer}>
        <Button
          title="-"
          onPress={() => {
            if (count === min) return;
            if (saveName)
              AsyncStorage.setItem(saveName, (count - 1).toString());

            if (count < min) setCount(min);
            else setCount(count - 1);
          }}
        />
        <Text style={styles.countText}>{count}</Text>
        <Button
          title="+"
          onPress={() => {
            if (saveName)
              AsyncStorage.setItem(saveName, (count + 1).toString());

            setCount(count + 1);
          }}
        />
      </View>
    </View>
  );
}

enum Categories{
  Ores,
  Bones,
  Common,
  Jagras,
  Kadachi,
  Anja,
  Rathalos,
  Azurath,
  Swsh,
  Bow,
  Grsw,
}

interface CollapseElementProps extends PropsWithChildren {
  name: string;
  forceCollapsed?: boolean;
  onExpanded?: ()=>void;
}

function CollapseElement({name, forceCollapsed, onExpanded, children}: CollapseElementProps): JSX.Element {
  const [collapsed, setCollapsed] = useState(true);
  if(!collapsed && forceCollapsed){
    setCollapsed(true);
  }
  return (
    <View style={styles.container}>
      <Button title={name} onPress={() => {setCollapsed(!collapsed); onExpanded?.()}} />
      {!collapsed && !forceCollapsed && children}
    </View>
  );
}

const OreCounter = ({ore}:{ore: Ores}) => {
  const oreData = oreLookup.find(oreData => oreData[1] === ore)
  if(!oreData) throw new Error("No Ore Data Found For Specified Ore: " + ore)
  return(<CounterElement name = {oreData[0]} min={0} saveName={`ore_${ore}`} />)
}

enum Ores {
  CarbaliteOre=0,
  MalachiteOre=1,
  DragoniteOre=2,
  FuciumOre=3,
  AlloyHelm=4,
  AlloyMail=5,
  AlloyGreaves=6,
}

const oreLookup: [string, Ores][] = [
  ['Carbalite Ore', Ores.CarbaliteOre],
  ['Malachite Ore', Ores.MalachiteOre],
  ['Dragonite Ore', Ores.DragoniteOre],
  ['Fucium Ore', Ores.FuciumOre],
  ['Alloy Helm', Ores.AlloyHelm],
  ['Alloy Mail', Ores.AlloyMail],
  ['Alloy Greaves', Ores.AlloyGreaves],
];

const BoneCounter = ({bone}:{bone: Bones}) => {
  const boneData = boneLookup.find(boneData => boneData[1] === bone)
  if(!boneData) throw new Error("No Bone Data Found For Specified Bone: " + bone)
  return(<CounterElement name = {boneData[0]} min={0} saveName={`bone_${bone}`} />)
}

enum Bones {
  QualityBone=0,
  MonsterBoneSmall=1,
  MonsterBoneMedium=2,
  MonsterBoneLarge=3,
  MonsterKeenbone=4,
  MonsterHardbone=5,
  AncientBone=6,
  BoulderBone=7,
  BoneHelm=8,
  BoneMail=9,
  BoneGreaves=10,
}

const boneLookup: [string, Bones][] = [
  ['Quality Bone', Bones.QualityBone],
  ['Monster Bone Small', Bones.MonsterBoneSmall],
  ['Monster Bone Medium', Bones.MonsterBoneMedium],
  ['Monster Bone Large', Bones.MonsterBoneLarge],
  ['Monster Keenbone', Bones.MonsterKeenbone],
  ['Monster Hardbone', Bones.MonsterHardbone],
  ['Ancient Bone', Bones.AncientBone],
  ['Boulder Bone', Bones.BoulderBone],
  ['Bone Helm', Bones.BoneHelm],
  ['Bone Mail', Bones.BoneMail],
  ['Bone Greaves', Bones.BoneGreaves],
];

const CommonCounter = ({common}:{common: Commons}) => {
  const commonData = commonLookup.find(commonData => commonData[1] === common)
  if(!commonData) throw new Error("No Common Data Found For Specified Common: " + common)
  return(<CounterElement name = {commonData[0]} min={0} saveName={`common_${common}`} />)
}

enum Commons {
  DragonveinCrystal=0,
  CoralCrystal=1,
  FirecellStone=2,
  WingdrakeHide=3,
  Potion=4,
}

const commonLookup: [string, Commons][] = [
  ['Dragonvein Crystal', Commons.DragonveinCrystal],
  ['Coral Crystal', Commons.CoralCrystal],
  ['Firecell Stone', Commons.FirecellStone],
  ['Wingdrake Hide', Commons.WingdrakeHide],
  ['Potion', Commons.Potion],
];

const JagrasCounter = ({jagras}:{jagras: Jagras}) => {
  const jagrasData = jagrasLookup.find(jagrasData => jagrasData[1] === jagras)
  if(!jagrasData) throw new Error("No Jagras Data Found For Specified Jagras: " + jagras)
  return(<CounterElement name = {jagrasData[0]} min={0} saveName={`jagras_${jagras}`} />)
}

enum Jagras {
  GreatJagrasClaw=0,
  GreatJagrasHide=1,
  GreatJagrasScale=2,
  GreatJagrasMane=3,
  SharpClaw=4,
  PiercingClaw=5,
  JagrasHelm=6,
  JagrasMail=7,
  JagrasGreaves=8,
}

const jagrasLookup: [string, Jagras][] = [
  ['Great Jagras Claw', Jagras.GreatJagrasClaw],
  ['Great Jagras Hide', Jagras.GreatJagrasHide],
  ['Great Jagras Scale', Jagras.GreatJagrasScale],
  ['Great Jagras Mane', Jagras.GreatJagrasMane],
  ['Sharp Claw', Jagras.SharpClaw],
  ['Piercing Claw', Jagras.PiercingClaw],
  ['Jagras Helm', Jagras.JagrasHelm],
  ['Jagras Mail', Jagras.JagrasMail],
  ['Jagras Greaves', Jagras.JagrasGreaves],
];

const KadachiCounter = ({kadachi}:{kadachi: Kadachi}) => {
  const kadachiData = kadachiLookup.find(kadachiData => kadachiData[1] === kadachi)
  if(!kadachiData) throw new Error("No Kadachi Data Found For Specified Kadachi: " + kadachi)
  return(<CounterElement name = {kadachiData[0]} min={0} saveName={`kadachi_${kadachi}`} />)
}

enum Kadachi {
  TobiKadachiPelt=0,
  TobiKadachiScale=1,
  TobiKadachiElectrode=2,
  TobiKadachiMembrane=3,
  TobiKadachiClaw=4,
  ElectroSac=5,
  ThunderSac=6,
  KadachiHelm=7,
  KadachiMail=8,
  KadachiGreaves=9,
}

const kadachiLookup: [string, Kadachi][] = [
  ['Tobi-Kadachi Pelt', Kadachi.TobiKadachiPelt],
  ['Tobi-Kadachi Scale', Kadachi.TobiKadachiScale],
  ['Tobi-Kadachi Electrode', Kadachi.TobiKadachiElectrode],
  ['Tobi-Kadachi Membrane', Kadachi.TobiKadachiMembrane],
  ['Tobi-Kadachi Claw', Kadachi.TobiKadachiClaw],
  ['Electro Sac', Kadachi.ElectroSac],
  ['Thunder Sac', Kadachi.ThunderSac],
  ['Kadachi Helm', Kadachi.KadachiHelm],
  ['Kadachi Mail', Kadachi.KadachiMail],
  ['Kadachi Greaves', Kadachi.KadachiGreaves],
];

const AnjaCounter = ({anja}:{anja: Anja}) => {
  const anjaData = anjaLookup.find(anjaData => anjaData[1] === anja)
  if(!anjaData) throw new Error("No Anja Data Found For Specified Anja: " + anja)
  return(<CounterElement name = {anjaData[0]} min={0} saveName={`anja_${anja}`} />)
}

enum Anja {
  AnjanathScale=0,
  AnjanathPelt=1,
  AnjanathNosebone=2,
  AnjanathTail=3,
  AnjanathFang=4,
  FlameSac=5,
  InfernoSac=6,
  AnjaHelm=7,
  AnjaMail=8,
  AnjaGreaves=9,
}

const anjaLookup: [string, Anja][] = [
  ['Anjanath Scale', Anja.AnjanathScale],
  ['Anjanath Pelt', Anja.AnjanathPelt],
  ['Anjanath Nosebone', Anja.AnjanathNosebone],
  ['Anjanath Tail', Anja.AnjanathTail],
  ['Anjanath Fang', Anja.AnjanathFang],
  ['Flame Sac', Anja.FlameSac],
  ['Inferno Sac', Anja.InfernoSac],
  ['Anja Helm', Anja.AnjaHelm],
  ['Anja Mail', Anja.AnjaMail],
  ['Anja Greaves', Anja.AnjaGreaves],
];

const RathalosCounter = ({rathalos}:{rathalos: Rathalos}) => {
  const rathalosData = rathalosLookup.find(rathalosData => rathalosData[1] === rathalos)
  if(!rathalosData) throw new Error("No Rathalos Data Found For Specified Rathalos: " + rathalos)
  return(<CounterElement name = {rathalosData[0]} min={0} saveName={`rathalos_${rathalos}`} />)
}

enum Rathalos {
  RathalosWingtalon=0,
  RathalosScale=1,
  RathalosWebbing=2,
  RathalosTail=3,
  RathalosMarrow=4,
  RathalosPlate=5,
  RathalosWing=6,
  RathalosCarapace=7,
  RathalosShell=8,
  RathalosMedulla=9,
  RathalosHelm=10,
  RathalosMail=11,
  RathalosGreaves=12,
}

const rathalosLookup: [string, Rathalos][] = [
  ['Rathalos Wingtalon', Rathalos.RathalosWingtalon],
  ['Rathalos Scale', Rathalos.RathalosScale],
  ['Rathalos Webbing', Rathalos.RathalosWebbing],
  ['Rathalos Tail', Rathalos.RathalosTail],
  ['Rathalos Marrow', Rathalos.RathalosMarrow],
  ['Rathalos Plate', Rathalos.RathalosPlate],
  ['Rathalos Wing', Rathalos.RathalosWing],
  ['Rathalos Carapace', Rathalos.RathalosCarapace],
  ['Rathalos Shell', Rathalos.RathalosShell],
  ['Rathalos Medulla', Rathalos.RathalosMedulla],
  ['Rathalos Helm', Rathalos.RathalosHelm],
  ['Rathalos Mail', Rathalos.RathalosMail],
  ['Rathalos Greaves', Rathalos.RathalosGreaves],
];

const AzurathCounter = ({azurath}:{azurath: Azurath}) => {
  const azurathData = azurathLookup.find(azurathData => azurathData[1] === azurath)
  if(!azurathData) throw new Error("No Azurath Data Found For Specified Azurath: " + azurath)
  return(<CounterElement name = {azurathData[0]} min={0} saveName={`azurath_${azurath}`} />)
}

enum Azurath {
  AzurathWingtalon=0,
  AzurathScale=1,
  AzurathWing=2,
  AzurathPlate=3,
  AzurathMarrow=4,
  AzurathTail=5,
  AzurathCarapace=6,
  AzurathHelm=7,
  AzurathMail=8,
  AzurathGreaves=9,
}

const azurathLookup: [string, Azurath][] = [
  ['Azure Rathalos Wingtalon', Azurath.AzurathWingtalon],
  ['Azure Rathalos Scale', Azurath.AzurathScale],
  ['Azure Rathalos Wing', Azurath.AzurathWing],
  ['Azure Rathalos Plate', Azurath.AzurathPlate],
  ['Azure Rathalos Marrow', Azurath.AzurathMarrow],
  ['Azure Rathalos Tail', Azurath.AzurathTail],
  ['Azure Rathalos Carapace', Azurath.AzurathCarapace],
  ['Azure Rathalos Helm', Azurath.AzurathHelm],
  ['Azure Rathalos Mail', Azurath.AzurathMail],
  ['Azure Rathalos Greaves', Azurath.AzurathGreaves],
];

const SwshCounter = ({swsh}:{swsh: SwSh}) => {
  const swshData = swshLookup.find(swshData => swshData[1] === swsh)
  if(!swshData) throw new Error("No SwSh Data Found For Specified SwSh: " + swsh)
  return(<CounterElement name = {swshData[0]} min={0} saveName={`swsh_${swsh}`} />)
}

enum SwSh {
  HuntersKnife=0,
  SteelKnife=1,
  ChromeSlicer=2,
  BoneKukri=3,
  ChiefKukri=4,
  GrandBarong=5,
  JagrasEdge=6,
  JagrasGarotte=7,
  FlameKnife=8,
  HeatEdge=9,
  BloomingKnife=10,
  DaturaBlossom=11,
  CarapaceEdge=12,
  BarrothClub=13,
}

const swshLookup: [string, SwSh][] = [
  ['Hunters Knife', SwSh.HuntersKnife],
  ['Steel Knife', SwSh.SteelKnife],
  ['Chrome Slicer', SwSh.ChromeSlicer],
  ['Bone Kukri', SwSh.BoneKukri],
  ['Chief Kukri', SwSh.ChiefKukri],
  ['Grand Barong', SwSh.GrandBarong],
  ['Jagras Edge', SwSh.JagrasEdge],
  ['Jagras Garotte', SwSh.JagrasGarotte],
  ['Flame Knife', SwSh.FlameKnife],
  ['Heat Edge', SwSh.HeatEdge],
  ['Blooming Knife', SwSh.BloomingKnife],
  ['Datura Blossom', SwSh.DaturaBlossom],
  ['Carapace Edge', SwSh.CarapaceEdge],
  ['Barroth Club', SwSh.BarrothClub],
];

const BowCounter = ({bow}:{bow: Bow}) => {
  const bowData = bowLookup.find(bowData => bowData[1] === bow)
  if(!bowData) throw new Error("No Bow Data Found For Specified Bow: " + bow)
  return(<CounterElement name = {bowData[0]} min={0} saveName={`bow_${bow}`} />)
}

enum Bow {
  IronBow=0,
  SteelBow=1,
  AlloyBow=2,
  HuntersBow=3,
  HuntersStoutbow=4,
  HuntersProudbow=5,
  PulsarBow=6,
  FlyingKadachiStrikebow=7,
  BlazingBow=8,
  AnjaArch=9,
  BloomingArch=10,
  DaturaString=11,
  DiablosBow=12,
  DiablosCoilbender=13,
}

const bowLookup: [string, Bow][] = [
  ['Iron Bow', Bow.IronBow],
  ['Steel Bow', Bow.SteelBow],
  ['Alloy Bow', Bow.AlloyBow],
  ['Hunters Bow', Bow.HuntersBow],
  ['Hunters Stoutbow', Bow.HuntersStoutbow],
  ['Hunters Proudbow', Bow.HuntersProudbow],
  ['Pulsar Bow', Bow.PulsarBow],
  ['Flying Kadachi Strikebow', Bow.FlyingKadachiStrikebow],
  ['Blazing Bow', Bow.BlazingBow],
  ['Anja Arch', Bow.AnjaArch],
  ['Blooming Arch', Bow.BloomingArch],
  ['Datura String', Bow.DaturaString],
  ['Diablos Bow', Bow.DiablosBow],
  ['Diablos Coilbender', Bow.DiablosCoilbender],
];

const GrswCounter = ({grsw}:{grsw: Grsw}) => {
  const grswData = grswLookup.find(grswData => grswData[1] === grsw)
  if(!grswData) throw new Error("No Grsw Data Found For Specified Grsw: " + grsw)
  return(<CounterElement name = {grswData[0]} min={0} saveName={`grsw_${grsw}`} />)
}

enum Grsw {
  BusterSword=0,
  BusterBlade=1,
  ChromeRazor=2,
  BoneBlade=3,
  BoneSlasher=4,
  GiantJawblade=5,
  JagrasBlade=6,
  JagrasHacker=7,
  FlameBlade=8,
  RedWing=9,
  BloomingBlade=10,
  DaturaBlaze=11,
  CarapaceBuster=12,
  BarrothShredder=13,
}

const grswLookup: [string, Grsw][] = [
  ['Buster Sword', Grsw.BusterSword],
  ['Buster Blade', Grsw.BusterBlade],
  ['Chrome Razor', Grsw.ChromeRazor],
  ['Bone Blade', Grsw.BoneBlade],
  ['Bone Slasher', Grsw.BoneSlasher],
  ['Giant Jawblade', Grsw.GiantJawblade],
  ['Jagras Blade', Grsw.JagrasBlade],
  ['Jagras Hacker', Grsw.JagrasHacker],
  ['Flame Blade', Grsw.FlameBlade],
  ['Red Wing', Grsw.RedWing],
  ['Blooming Blade', Grsw.BloomingBlade],
  ['Datura Blaze', Grsw.DaturaBlaze],
  ['Carapace Buster', Grsw.CarapaceBuster],
  ['Barroth Shredder', Grsw.BarrothShredder],
];

function App(): JSX.Element {
  const [category, setCategory]=useState<Categories|undefined>(undefined)
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <CollapseElement name={'Ores'} forceCollapsed={category != Categories.Ores} onExpanded={()=>setCategory(Categories.Ores)}>
          {oreLookup.map(([_, ore]) => (
            <OreCounter
              key={ore}
              ore={ore}
            />
          ))}
        </CollapseElement>
        <CollapseElement name={'Bones'} forceCollapsed={category != Categories.Bones} onExpanded={()=>setCategory(Categories.Bones)}>
        {boneLookup.map(([_, bone]) => (
            <BoneCounter
              key={bone}
              bone={bone}
            />
          ))}
        </CollapseElement>
        <CollapseElement name={'Common'} forceCollapsed={category != Categories.Common} onExpanded={()=>setCategory(Categories.Common)}>
          {commonLookup.map(([_, common]) => (
            <CommonCounter
              key={common}
              common={common}
            />
          ))}
        </CollapseElement>
        <CollapseElement name={'Jagras'} forceCollapsed={category != Categories.Jagras} onExpanded={()=>setCategory(Categories.Jagras)}>
          {jagrasLookup.map(([_, jagras]) => (
            <JagrasCounter
              key={jagras}
              jagras={jagras}
            />
          ))}
        </CollapseElement>
        <CollapseElement name={'Kadachi'} forceCollapsed={category != Categories.Kadachi} onExpanded={()=>setCategory(Categories.Kadachi)}>
          {kadachiLookup.map(([_, kadachi]) => (
            <KadachiCounter
              key={kadachi}
              kadachi={kadachi}
            />
          ))}
        </CollapseElement>
        <CollapseElement name={'Anjanath'} forceCollapsed={category != Categories.Anja} onExpanded={()=>setCategory(Categories.Anja)}>
          {anjaLookup.map(([_, anja]) => (
            <AnjaCounter
              key={anja}
              anja={anja}
            />
          ))}
        </CollapseElement>
        <CollapseElement name={'Rathalos'} forceCollapsed={category != Categories.Rathalos} onExpanded={()=>setCategory(Categories.Rathalos)}>
          <AnjaCounter anja={Anja.InfernoSac}/>
          {rathalosLookup.map(([_, rathalos]) => (
            <RathalosCounter
              key={rathalos}
              rathalos={rathalos}
            />
          ))}
        </CollapseElement>
        <CollapseElement name={'Azure Rathalos'} forceCollapsed={category != Categories.Azurath} onExpanded={()=>setCategory(Categories.Azurath)}>
          <AnjaCounter anja={Anja.InfernoSac}/>
          {azurathLookup.map(([_, azurath]) => (
            <AzurathCounter
              key={azurath}
              azurath={azurath}
            />
          ))}
        </CollapseElement>
        <CollapseElement name={'Sword & Shield'} forceCollapsed={category != Categories.Swsh} onExpanded={()=>setCategory(Categories.Swsh)}>
          {swshLookup.map(([_, swsh]) => (
            <SwshCounter
              key={swsh}
              swsh={swsh}
            />
          ))}
        </CollapseElement>
        <CollapseElement name={'Bow'} forceCollapsed={category != Categories.Bow} onExpanded={()=>setCategory(Categories.Bow)}>
          {bowLookup.map(([_, bow]) => (
            <BowCounter
              key={bow}
              bow={bow}
            />
          ))}
        </CollapseElement>
        <CollapseElement name={'Great Sword'} forceCollapsed={category != Categories.Grsw} onExpanded={()=>setCategory(Categories.Grsw)}>
          {grswLookup.map(([_, grsw]) => (
            <GrswCounter
              key={grsw}
              grsw={grsw}
            />
          ))}
        </CollapseElement>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;