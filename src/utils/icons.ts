import type { Activity, CombatStyle } from '../types/activity';
import type { SortingGroup } from '../types/common';
import type { Skill } from '../types/skill';
import type { Spellbook } from '../types/spell';

const suffixes4 = ['_potion', '_brew'];
const suffixes5 = [
  '_arrow',
  '_arrowheads',
  '_arrows',
  '_bolts',
  '_bolts_(e)',
  '_bolts_(unf)',
  '_bolts(unf)',
  '_bolt_tips',
  '_dart_tips',
  '_javelin_heads',
  '_javelin_tips',
  '_seed',
  '_shaft',
];

const sortingGroupIcons: Record<SortingGroup | string, string> = {
  boss: 'Master_Reanimation',
  chest: 'Crystal_key',
  diaries: 'Achievement_Diaries_icon',
  distraction_and_diversion: 'Distractions_and_Diversions',
  dungeon: 'Dungeon_map_link_icon',
  guild: 'Map_link_icon',
  location: 'Map_link_icon',
  minigame: 'Minigame_icon',
  misc: 'Collection_log',
  monster: 'Monster_Examine',
  music: 'Music',
  npc: 'NPC_Contact',
  pvm: 'Combat_icon',
  pvp: 'Skull_(status)_icon',
  quest: 'Quest_point_icon',
  raid: 'Raids',
  shop: 'Bank_icon',
  skilling: 'Stats_icon',
  spellbook: 'Spellbook',
};

const combatStyleIcons: Record<CombatStyle, string> = {
  melee: 'Attack_icon',
  ranged: 'Ranged_icon',
  magic: 'Magic_icon',
  hybrid: 'Hybrid',
  stab: 'White_dagger',
  slash: 'White_scimitar',
  crush: 'White_warhammer',
};

const spellbookIcons: Record<Spellbook, string> = {
  Ancient: 'Ancient_spellbook',
  Arceuus: 'Arceuus_spellbook',
  Lunar: 'Lunar_spellbook',
  Standard: 'Standard_spellbook',
};

const skillIcons: Record<Skill, string> = {
  attack: 'Attack_icon',
  strength: 'Strength_icon',
  defence: 'Defence_icon',
  ranged: 'Ranged_icon',
  prayer: 'Prayer_icon',
  magic: 'Magic_icon',
  runecraft: 'Runecraft_icon',
  construction: 'Construction_icon',
  hitpoints: 'Hitpoints_icon',
  agility: 'Agility_icon',
  herblore: 'Herblore_icon',
  thieving: 'Thieving_icon',
  crafting: 'Crafting_icon',
  fletching: 'Fletching_icon',
  slayer: 'Slayer_icon',
  hunter: 'Hunter_icon',
  mining: 'Mining_icon',
  smithing: 'Smithing_icon',
  fishing: 'Fishing_icon',
  cooking: 'Cooking_icon',
  firemaking: 'Firemaking_icon',
  woodcutting: 'Woodcutting_icon',
  farming: 'Farming_icon',
  sailing: 'Sailing_icon',
};

const islandIcons: Record<string, string> = {
  "Anglers'_Retreat": "Anglers'_Retreat_icon",
  Brittle_Isle: 'Brittle_Isle_icon',
  "Buccaneers'_Haven": "Buccaneers'_Haven_icon",
  Charred_Island: 'Charred_Island_icon',
  Chinchompa_Island: 'Chinchompa_Island_icon',
  Deepfin_Point: 'Deepfin_Point_icon',
  Dognose_Island: 'Dognose_Island_icon',
  Drumstick_Isle: 'Drumstick_Isle_icon',
  Grimstone: 'Grimstone_icon',
  Isle_of_Bones: 'Isle_of_Bones_icon',
  Laguna_Aurorae: 'Laguna_Aurorae_icon',
  Lledrith_Island: 'Lledrith_Island_icon',
  "Minotaurs'_Rest": "Minotaurs'_Rest_icon",
  Port_Roberts: 'Port_Roberts_icon',
  "Rainbow's_End": "Rainbow's_End_icon",
  Shimmering_Atoll: 'Shimmering_Atoll_icon',
  Sunbleak_Island: 'Sunbleak_Island_icon',
  Tear_of_the_Soul: 'Tear_of_the_Soul_icon',
  The_Crown_Jewel: 'The_Crown_Jewel_icon',
  The_Great_Conch: 'The_Summer_Shore_icon',
  The_Little_Pearl: 'The_Little_Pearl_icon',
  The_Onyx_Crest: 'The_Onyx_Crest_icon',
  The_Pandemonium: 'The_Pandemonium_icon',
  Vatrachos_Island: 'Vatrachos_Island_icon',
  Wintumber_Island: 'Wintumber_Island_icon',
  Ynysdail: 'Ynysdail_icon',
};

const bossIcons: Record<string, string> = {
  Abyssal_Sire: 'Abyssal_Sire_icon_(mobile)',
  Alchemical_Hydra: 'Alchemical_Hydra_icon_(mobile)',
  Amoxliatl: 'Moxi',
  Araxxor: 'Nid',
  Barrows: 'Barrows_Brothers_icon_(mobile)',
  Bryophyta: 'Bryophyta_icon_(mobile)',
  Callisto: 'Callisto_cub',
  Cerberus: 'Cerberus_icon',
  Chambers_of_Xeric: 'Great_Olm_icon_(mobile)',
  Chaos_Elemental: 'Pet_chaos_elemental',
  Chaos_Fanatic: 'Ancient_staff',
  Commander_Zilyana: 'Commander_Zilyana_icon_(mobile)',
  Corporeal_Beast: 'Corporeal_Beast_icon_(mobile)',
  Corrupted_Hunllef: 'Crystalline_Hunllef_icon_(mobile)',
  Crazy_archaeologist: 'Fedora',
  Dagannoth_Kings: 'Dagannoth_Kings_icon_(mobile)',
  Deranged_archaeologist: 'Unidentified_small_fossil',
  Doom_of_Mokhaiotl: 'Mokhaiotl_waystone_5',
  Duke_Sucellus: 'Baron',
  Gemstone_Crab: 'Bag_full_of_gems_(stardust)',
  General_Graardor: 'General_Graardor_icon_(mobile)',
  Giant_Mole: 'Giant_Mole_icon_(mobile)',
  Grotesque_Guardians: 'Grotesque_Guardians_icon_(mobile)',
  Hespori: 'Hespori_icon_(mobile)',
  Hueycoatl: 'Huberte',
  "K'ril_Tsutsaroth": "K'ril_Tsutsaroth_icon_(mobile)",
  Kalphite_Queen: 'Kalphite_Queen_icon_(mobile)',
  King_Black_Dragon: 'King_Black_Dragon_icon_(mobile)',
  Kraken: 'Kraken_icon_(mobile)',
  "Kree'arra": "Kree'arra_icon_(mobile)",
  Moons_of_Peril: 'Varlamore_crest',
  Nex: 'Nex_icon_(mobile)',
  Obor: 'Obor_icon_(mobile)',
  Phantom_Muspah: 'Muphin_(ranged)',
  Royal_Titans: 'Bran',
  Sarachnis: 'Sarachnis_icon_(mobile)',
  Scorpia: "Scorpia's_offspring",
  Scurrius: 'Scurry',
  Shellbane_Gryphon: 'Gull_(pet)',
  Skotizo: 'Skotizo_icon_(mobile)',
  Sol_Heredit: 'Smol_heredit',
  Tempoross: 'Tempoross_icon_(mobile)',
  The_Gauntlet: 'Youngllef',
  The_Leviathan: "Lil'viathan",
  The_Nightmare: 'The_Nightmare_icon_(mobile)',
  The_Whisperer: 'Wisp',
  Theatre_of_Blood: "Lil'_zik",
  Thermonuclear_smoke_devil: 'Thermonuclear_smoke_devil_icon_(mobile)',
  Tombs_of_Amascut: "Tumeken's_guardian",
  'TzTok-Jad': 'Tzrek-jad',
  'TzKal-Zuk': 'Tzrek-zuk',
  Vardorvis: 'Butch',
  Venenatis: 'Venenatis_spiderling',
  "Vet'ion": "Vet'ion_jr.",
  Vorkath: 'Vorkath_icon_(mobile)',
  Wintertodt: 'Wintertodt_icon_(mobile)',
  Yama: 'Yami',
  Zalcano: 'Zalcano_icon_(mobile)',
  Zulrah: 'Zulrah_icon_(mobile)',
};

const hunterCreatureIcons: Record<string, string> = {
  'Barb-tailed_kebbit': 'Barb-tailed_kebbit_icon',
  'Black_salamander_(Hunter)': 'Black_salamander',
  Black_warlock: 'Black_warlock_icon',
  Carnivorous_chinchompa: 'Red_chinchompa',
  Cerulean_twitch: 'Cerulean_twitch_icon',
  'Chinchompa_(Hunter)': 'Chinchompa',
  Common_kebbit: 'Common_kebbit_icon',
  Copper_longtail: 'Copper_longtail_icon',
  Crimson_swift: 'Crimson_swift_icon',
  Dark_kebbit: 'Dark_kebbit_icon',
  Dashing_kebbit: 'Dashing_kebbit_icon',
  Desert_devil: 'Desert_devil_icon',
  Embertailed_jerboa: 'Embertailed_jerboa_icon',
  Feldip_weasel: 'Feldip_weasel_icon',
  Golden_warbler: 'Golden_warbler_icon',
  Horned_graahk: 'Horned_graahk_icon',
  Maniacal_monkey: 'Monkey_(Monkey_Madness_II)',
  Moonlight_antelope: 'Moonlight_antelope_icon',
  Moonlight_moth: 'Moonlight_moth_icon',
  'Orange_salamander_(Hunter)': 'Orange_salamander',
  Polar_kebbit: 'Polar_kebbit_icon',
  Prickly_kebbit: 'Prickly_kebbit_icon',
  Pyre_fox: 'Pyre_fox_icon',
  Rainbow_crab: 'Rainbow_crab_(1)',
  'Razor-backed_kebbit': 'Razor-backed_kebbit_icon',
  'Red_salamander_(Hunter)': 'Red_salamander',
  Ruby_harvest: 'Ruby_harvest_icon',
  'Sabre-toothed_kebbit': 'Sabre-toothed_kebbit_icon',
  'Sabre-toothed_kyatt': 'Sabre-toothed_kyatt_icon',
  Sapphire_glacialis: 'Sapphire_glacialis_icon',
  Snowy_knight: 'Snowy_knight_icon',
  Spined_larupia: 'Spined_larupia_icon',
  Spotted_kebbit: 'Spotted_kebbit_icon',
  Sunlight_antelope: 'Sunlight_antelope_icon',
  Sunlight_Moth: 'Sunlight_Moth_icon',
  'Swamp_lizard_(Hunter)': 'Swamp_lizard',
  'Tecu_salamander_(Hunter)': 'Tecu_salamander',
  Tropical_wagtail: 'Tropical_wagtail_icon',
  White_rabbit: 'White_rabbit_icon',
  Wild_kebbit: 'Wild_kebbit_icon',
};

const icons: Record<string, string> = {
  ...bossIcons,
  ...hunterCreatureIcons,
  ...islandIcons,
  Ancient_Magicks: 'Ancient_spellbook',
  Anvil: 'Anvil_icon',
  Astral_Altar: 'Astral_rune',
  'Auto-weed': 'Weeds',
  Attas_plant: 'Attas_seed_5',
  Bank: 'Mahogany_chest_icon',
  Bank_chest: 'Mahogany_chest_icon',
  Blast_Furnace: 'Minigame_icon',
  Blood_Altar: 'Blood_talisman',
  Butler: 'Butler_chathead',
  'Cook_(servant)': 'Cook_(servant)_chathead',
  Cooking_range: 'Cooking_range_icon',
  Cosmic_Altar: 'Cosmic_talisman',
  Death_Altar: 'Death_talisman',
  Demon_butler: 'Demon_butler_chathead',
  Fairy_rings: 'Fairy_ring_(Construction)_icon',
  Furnace: 'Furnace_icon',
  Gilded_portal_nexus: 'Gilded_portal_nexus_icon',
  God_Wars_Dungeon: 'Dungeon_map_link_icon',
  Golden_armadyl_special_attack: 'Armadyl_hilt',
  Golden_bandos_special_attack: 'Bandos_hilt',
  Golden_saradomin_special_attack: 'Saradomin_hilt',
  Golden_zamorak_special_attack: 'Zamorak_hilt',
  'Hunter_Kit_(spell)': 'Hunter_Kit',
  Iasor_plant: 'Iasor_seed_5',
  Imbuing: 'Scroll_of_imbuing',
  Kronos_plant: 'Kronos_seed_5',
  Law_Altar: 'Law_talisman',
  Lunar_equipment: 'Lunar_torso',
  Maid: 'Maid_chathead',
  Managing_Miscellania: 'Stats_icon',
  Occult_altar: 'Occult_altar_icon',
  Ornate_jewellery_box: 'Ornate_jewellery_box_icon',
  Ornate_rejuvenation_pool: 'Ornate_rejuvenation_pool_icon',
  Quetzal_Transport_System: 'Quetzin',
  'Redwood_tree_(Farming)': 'Redwood_logs',
  Rick: 'Rick_chathead',
  Sailing: 'Sailing_icon',
  Sea_charting: 'Sea_charting_icon',
  "Sorceress's_Garden": "Summer_sq'irk",
  Spirit_tree: 'Spirit_tree_(Construction)_icon',
  Wrath_Altar: 'Wrath_talisman',
  XP: 'XP_drops_icon',
};

export function getIconForActivity(activity: Activity): string {
  if (
    activity.icon &&
    activity.category !== 'boss' &&
    activity.category !== 'raid'
  ) {
    return activity.icon;
  }

  if (activity.category === 'spell') {
    // @ts-ignore
    const spell = activity as Spell;
    if (spell.spellbook !== 'Standard') {
      const icon = getIconForSpellbook(spell.spellbook);
      if (icon) return icon;
    }
  }

  const sortingGroup =
    activity.sortingGroups?.length > 0 ? activity.sortingGroups[0] : 'misc';

  if (sortingGroup !== 'misc') {
    const icon = getIconForSortingGroup(sortingGroup);
    if (icon) return icon;
  }

  return getIconForSortingGroup(activity.category) || 'Collection_log';
}

export function getIconForSortingGroup(
  sortingGroup: SortingGroup | string,
): string {
  return (
    sortingGroupIcons[sortingGroup] ||
    getIconForCombatStyle(sortingGroup as CombatStyle) ||
    getIconForSkill(sortingGroup as Skill)
  );
}

export function getIconForCombatStyle(style: CombatStyle): string {
  return combatStyleIcons[style];
}

export function getIconForSpellbook(spellbook: Spellbook): string {
  return spellbookIcons[spellbook];
}

export function getIconForSkill(skill: Skill): string {
  return skillIcons[skill];
}

export function getIconForIsland(island: string): string | undefined {
  return islandIcons[island];
}

export function autoDetectItemIcon(id: string): string | undefined {
  return suffixes4.some(str => id.endsWith(str))
    ? `${id}(4)`
    : suffixes5.some(str => id.endsWith(str))
      ? `${id}_5`
      : icons[id];
}
