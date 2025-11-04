import { Stack, Text } from '@zigurous/forge-react';
import React from 'react';
import ItemsStack from './ItemsStack';
import RegionPanelSection from './RegionPanelSection';
import TitledCard from './TitledCard';
import WikiIcon from './WikiIcon';
import { useItemsContext } from '../context/ItemsContext';
import type { FoodData, ItemData } from '../types/item';
import type { Region } from '../types/region';

interface RegionPanelResourcesProps {
  region: Region;
}

export default function RegionPanelResources({
  region,
}: RegionPanelResourcesProps) {
  const itemsContext = useItemsContext();
  const items = itemsContext.getItemsByIds(region.resources);

  const bars = items
    .filter(item => itemIds.bars.includes(item.id))
    .sort(sortWithKey('bars'));

  const food = items
    .filter(item => itemIds.food.includes(item.id))
    .map(item => ({ ...item, healing: healing[item.id] }) as FoodData)
    .sort(sortWithKey('food'));

  const gems = items
    .filter(item => itemIds.gems.includes(item.id))
    .sort(sortWithKey('gems'));

  const hides = items
    .filter(item => itemIds.hides.includes(item.id))
    .sort(sortWithKey('hides'));

  const logs = items
    .filter(item => itemIds.logs.includes(item.id))
    .sort(sortWithKey('logs'));

  const misc = items
    .filter(item => itemIds.misc.includes(item.id))
    .sort(sortWithKey('misc'));

  const ores = items
    .filter(item => itemIds.ores.includes(item.id))
    .sort(sortWithKey('ores'));

  const remains = items
    .filter(item => itemIds.remains.includes(item.id))
    .sort(sortWithKey('remains'));

  const runes = items
    .filter(item => itemIds.runes.includes(item.id))
    .sort(sortWithKey('runes'));

  const secondaries = items
    .filter(item => itemIds.secondaries.includes(item.id))
    .sort(sortWithKey('secondaries'));

  return (
    <RegionPanelSection title="Resources">
      <Text
        className="text-pretty ml-sm mb-xxl"
        color="muted"
        type="body-sm"
        style={{ marginTop: '-8px' }}
      >
        This is not a comprehensive list of all resources in the region(s). It
        includes the most accessible items found throughout the region(s) via
        gathering, crafting, loot drops, and shops.
      </Text>
      <ul className="drops-list">
        {runes.length > 0 && (
          <TitledCard
            title="Runes"
            captionIcon={
              <Stack align="center" spacing="sm">
                <WikiIcon icon="Magic_icon" size={18} />
                <WikiIcon icon="Runecraft_icon" size={18} />
              </Stack>
            }
          >
            <ItemsStack items={runes} />
          </TitledCard>
        )}
        {(ores.length > 0 || bars.length > 0) && (
          <TitledCard
            title="Ores | Bars"
            captionIcon={
              <Stack align="center" spacing="sm">
                <WikiIcon icon="Mining_icon" size={18} />
                <WikiIcon icon="Smithing_icon" size={18} />
              </Stack>
            }
          >
            <ItemsStack items={[...ores, ...bars]} />
          </TitledCard>
        )}
        {logs.length > 0 && (
          <TitledCard
            title="Logs"
            captionIcon={
              <Stack align="center" spacing="sm">
                <WikiIcon icon="Woodcutting_icon" size={18} />
                <WikiIcon icon="Firemaking_icon" size={18} />
                <WikiIcon icon="Fletching_icon" size={18} />
              </Stack>
            }
          >
            <ItemsStack items={logs} />
          </TitledCard>
        )}
        {food.length > 0 && (
          <TitledCard
            title="Food"
            captionIcon={
              <Stack align="center" spacing="sm">
                <WikiIcon icon="Fishing_icon" size={18} />
                <WikiIcon icon="Cooking_icon" size={18} />
              </Stack>
            }
          >
            <ItemsStack items={food} />
          </TitledCard>
        )}
        {secondaries.length > 0 && (
          <TitledCard
            title="Secondaries"
            captionIcon={
              <Stack align="center" spacing="sm">
                <WikiIcon icon="Herblore_icon" size={18} />
                <WikiIcon icon="Farming_icon" size={18} />
              </Stack>
            }
          >
            <ItemsStack items={secondaries} />
          </TitledCard>
        )}
        {remains.length > 0 && (
          <TitledCard
            title="Remains"
            captionIcon={<WikiIcon icon="Prayer_icon" size={18} />}
          >
            <ItemsStack items={remains} />
          </TitledCard>
        )}
        {(gems.length > 0 || hides.length > 0 || misc.length > 0) && (
          <TitledCard
            title="Crafting"
            captionIcon={
              <Stack align="center" spacing="sm">
                <WikiIcon icon="Crafting_icon" size={18} />
                <WikiIcon icon="Construction_icon" size={18} />
              </Stack>
            }
          >
            <ItemsStack items={[...gems, ...hides, ...misc]} />
          </TitledCard>
        )}
      </ul>
    </RegionPanelSection>
  );
}

function sortWithKey(
  key: keyof typeof itemIds,
): (a: ItemData, b: ItemData) => number {
  return (a, b) => {
    let aIndex = itemIds[key].indexOf(a.id);
    let bIndex = itemIds[key].indexOf(b.id);
    if (aIndex === -1) aIndex = Number.MAX_SAFE_INTEGER;
    if (bIndex === -1) bIndex = Number.MAX_SAFE_INTEGER;
    return aIndex - bIndex;
  };
}

const itemIds = {
  bars: [
    'Bronze_bar',
    'Blurite_bar',
    'Lunar_bar',
    'Iron_bar',
    'Elemental_metal',
    'Silver_bar',
    'Lead_bar',
    'Steel_bar',
    'Gold_bar',
    'Lovakite_bar',
    'Mithril_bar',
    'Adamantite_bar',
    'Cupronickel_bar',
    'Runite_bar',
  ],
  food: [
    'Shrimps',
    'Cooked_chicken',
    'Cooked_meat',
    'Bread',
    'Trout',
    'Red_crab_meat',
    'Salmon',
    'Tuna',
    'Jug_of_wine',
    'Stew',
    'Cake',
    'Lobster',
    'Bass',
    'Blue_crab_meat',
    'Plain_pizza',
    'Swordfish',
    'Swordtip_squid',
    'Snowy_knight_mix',
    'Potato_with_cheese',
    'Monkfish',
    'Giant_krill',
    'Cooked_karambwan',
    'Blighted_karambwan',
    'Jumbo_squid',
    'Haddock',
    'Rainbow_crab_meat',
    'Yellowfin_tuna',
    'Curry',
    'Ugthanki_kebab',
    'Guthix_rest',
    'Shark',
    'Halibut',
    'Mushroom_potato',
    'Sea_turtle',
    'Cooked_sunlight_antelope',
    'Pineapple_pizza',
    'Wild_pie',
    'Summer_pie',
    'Tuna_potato',
    'Manta_ray',
    'Blighted_manta_ray',
    'Anglerfish',
    'Blighted_anglerfish',
    'Dark_crab',
    'Bluefin_tuna',
    'Cooked_dashing_kebbit',
    'Marlin',
    'Cooked_moonlight_antelope',
    'Saradomin_brew',
  ],
  gems: [
    'Opal',
    'Jade',
    'Red_topaz',
    'Sapphire',
    'Emerald',
    'Ruby',
    'Diamond',
    'Dragonstone',
    'Onyx',
    'Zenyte',
  ],
  hides: [
    'Green_dragonhide',
    'Blue_dragonhide',
    'Red_dragonhide',
    'Black_dragonhide',
    'Wool',
    'Cowhide',
    'Snake_hide',
    'Yak-hide',
  ],
  logs: [
    'Achey_tree_logs',
    'Logs',
    'Oak_logs',
    'Willow_logs',
    'Teak_logs',
    'Jatoba_logs',
    'Juniper_logs',
    'Bark',
    'Maple_logs',
    'Mahogany_logs',
    'Arctic_pine_logs',
    'Yew_logs',
    'Blisterwood_logs',
    'Camphor_logs',
    'Magic_logs',
    'Ironwood_logs',
    'Redwood_logs',
    'Rosewood_logs',
  ],
  misc: [
    'Plank',
    'Oak_plank',
    'Teak_plank',
    'Mahogany_plank',
    'Camphor_plank',
    'Ironwood_plank',
    'Rosewood_plank',
    'Mushroom',
    'Swamp_paste',
    'Flax',
    'Hemp',
    'Cotton_boll',
    'Bow_string',
    'Seaweed',
    'Bucket_of_sand',
    'Soda_ash',
    'Clay',
    'Soft_clay',
    'Te_salt',
    'Efh_salt',
    'Urt_salt',
    'Basalt',
    'Saltpetre',
    'Volcanic_sulphur',
    'Granite',
    'Sandstone',
    'Limestone',
    'Limestone_brick',
    'Marble_block',
    'Magic_stone',
    'Gold_leaf',
    'Condensed_gold',
  ],
  ores: [
    'Copper_ore',
    'Tin_ore',
    'Blurite_ore',
    'Iron_ore',
    'Daeyalt_ore',
    'Silver_ore',
    'Lead_ore',
    'Coal',
    'Gold_ore',
    'Rubium',
    'Mithril_ore',
    'Lunar_ore',
    'Lovakite_ore',
    'Adamantite_ore',
    'Nickel_ore',
    'Runite_ore',
    'Amethyst',
    'Infernal_shale',
  ],
  remains: [
    'Bones',
    'Monkey_bones',
    'Bat_bones',
    'Big_bones',
    'Jogre_bones',
    'Zogre_bones',
    'Shaikahan_bones',
    'Babydragon_bones',
    'Dragon_bones',
    'Lava_dragon_bones',
    'Dagannoth_bones',
    'Superior_dragon_bones',
    'Wyrmling_bones',
    'Wyrm_bones',
    'Wyvern_bones',
    'Drake_bones',
    'Hydra_bones',
    'Sun-kissed_bones',
    'Blessed_bone_shards',
    'Fayrg_bones',
    'Raurg_bones',
    'Ourg_bones',
    'Loar_remains',
    'Phrin_remains',
    'Riyl_remains',
    'Asyn_remains',
    'Fiyr_remains',
    'Urium_remains',
    'Fiendish_ashes',
    'Vile_ashes',
    'Malicious_ashes',
    'Abyssal_ashes',
    'Infernal_ashes',
  ],
  runes: [
    'Air_rune',
    'Mind_rune',
    'Water_rune',
    'Mist_rune',
    'Earth_rune',
    'Dust_rune',
    'Mud_rune',
    'Fire_rune',
    'Smoke_rune',
    'Steam_rune',
    'Body_rune',
    'Lava_rune',
    'Cosmic_rune',
    'Sunfire_rune',
    'Chaos_rune',
    'Astral_rune',
    'Nature_rune',
    'Law_rune',
    'Death_rune',
    'Blood_rune',
    'Soul_rune',
    'Aether_rune',
    'Wrath_rune',
    'Rune_essence',
    'Pure_essence',
    'Dense_essence_block',
    'Dark_essence_block',
    'Daeyalt_essence',
    'Blood_essence',
    'Tainted_essence_chunk',
  ],
  secondaries: [
    'Unicorn_horn',
    'Desert_goat_horn',
    'Gorak_claws',
    'Kebbit_teeth',
    'Nail_beast_nails',
    "Toad's_legs",
    'Araxyte_venom_sack',
    'Cactus_spine',
    'Potato_cactus',
    'Mort_myre_fungus',
    'Yew_roots',
    'Magic_roots',
    'Limpwurt_root',
    'Snape_grass',
    'Elkhorn_coral',
    'Pillar_coral',
    'Umbral_coral',
    'Bird_nest',
    'Lily_of_the_sands',
    'Nightshade',
    'Jangerberries',
    'Poison_ivy_berries',
    'White_berries',
    "Red_spiders'_eggs",
    'Amylase_crystal',
    'Lava_scale_shard',
    'Lava_scale',
    'Blue_dragon_scale',
    'Eye_of_newt',
    'Garlic',
    'Chocolate_bar',
    'Demonic_tallow',
    'Ashes',
    'Crushed_superior_dragon_bones',
    'Crystal_dust',
    'Nihil_dust',
    'Silver_dust',
    'Volcanic_ash',
    'Wine_of_zamorak',
    'Coconut_milk',
    'Vial_of_blood',
    'Aldarium',
    'Ancient_essence',
    "Zulrah's_scales",
    'Marlin_scales',
    'Haddock_eye',
    'Yellow_tuna_fin',
    'Swamp_tar',
    'Crab_paste',
    'Squid_paste',
    'Rainbow_crab_paste',
  ],
};

const healing: Record<string, number | string> = {
  ['Anglerfish']: '3-22',
  ['Bass']: 13,
  ['Blighted_anglerfish']: '3-22',
  ['Blighted_karambwan']: 18,
  ['Blighted_manta_ray']: 22,
  ['Blue_crab_meat']: 14,
  ['Bluefin_tuna']: 22,
  ['Bread']: 5,
  ['Cake']: '4x3',
  ['Cooked_chicken']: 3,
  ['Cooked_dashing_kebbit']: '13+10',
  ['Cooked_karambwan']: 18,
  ['Cooked_meat']: 3,
  ['Cooked_moonlight_antelope']: '14+12',
  ['Cooked_sunlight_antelope']: '12+9',
  ['Curry']: 19,
  ['Dark_crab']: 22,
  ['Giant_krill']: 17,
  ['Guthix_rest']: '5x4',
  ['Haddock']: 18,
  ['Halibut']: 20,
  ['Jug_of_wine']: 11,
  ['Jumbo_squid']: 18,
  ['Lobster']: 12,
  ['Manta_ray']: 22,
  ['Marlin']: 24,
  ['Monkfish']: 16,
  ['Mushroom_potato']: 20,
  ['Pineapple_pizza']: '11x2',
  ['Plain_pizza']: '7x2',
  ['Potato_with_cheese']: 16,
  ['Rainbow_crab_meat']: 19,
  ['Red_crab_meat']: 8,
  ['Salmon']: 9,
  ['Saradomin_brew']: '16x4',
  ['Sea_turtle']: 21,
  ['Shark']: 20,
  ['Shrimps']: 3,
  ['Snowy_knight_mix']: '8x2',
  ['Stew']: 11,
  ['Summer_pie']: '11x2',
  ['Swordfish']: 14,
  ['Swordtip_squid']: 15,
  ['Trout']: 7,
  ['Tuna_potato']: 22,
  ['Tuna']: 10,
  ['Ugthanki_kebab']: 19,
  ['Wild_pie']: '11x2',
  ['Yellowfin_tuna']: 19,
};
