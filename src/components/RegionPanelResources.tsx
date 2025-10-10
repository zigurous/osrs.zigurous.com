import { Stack, Text } from '@zigurous/forge-react';
import React from 'react';
import ItemsStack from './ItemsStack';
import RegionPanelSection from './RegionPanelSection';
import TitledCard from './TitledCard';
import WikiIcon from './WikiIcon';
import { useItemsContext } from '../context';
import { healing, itemWikiIds } from '../utils';
import type { FoodData, ItemData, Region } from '../types';

interface RegionPanelResourcesProps {
  region: Region;
}

export default function RegionPanelResources({
  region,
}: RegionPanelResourcesProps) {
  const itemsContext = useItemsContext();
  const items = itemsContext.getItemsByIds(region.resources);

  const bars = items
    .filter(item => itemWikiIds.bars.includes(item.id))
    .sort(sortWithKey('bars'));

  const food = items
    .filter(item => itemWikiIds.food.includes(item.id))
    .map(item => ({ ...item, healing: healing[item.id] }) as FoodData)
    .sort(sortWithKey('food'));

  const gems = items
    .filter(item => itemWikiIds.gems.includes(item.id))
    .sort(sortWithKey('gems'));

  const hides = items
    .filter(item => itemWikiIds.hides.includes(item.id))
    .sort(sortWithKey('hides'));

  const logs = items
    .filter(item => itemWikiIds.logs.includes(item.id))
    .sort(sortWithKey('logs'));

  const misc = items
    .filter(item => itemWikiIds.misc.includes(item.id))
    .sort(sortWithKey('misc'));

  const ores = items
    .filter(item => itemWikiIds.ores.includes(item.id))
    .sort(sortWithKey('ores'));

  const remains = items
    .filter(item => itemWikiIds.remains.includes(item.id))
    .sort(sortWithKey('remains'));

  const runes = items
    .filter(item => itemWikiIds.runes.includes(item.id))
    .sort(sortWithKey('runes'));

  const secondaries = items
    .filter(item => itemWikiIds.secondaries.includes(item.id))
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
        only includes the most accessible items that are gathered and crafted
        from skills as well as items bought from shops and common loot drops
        from monsters.
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
            captionIcon={<WikiIcon icon="Herblore_icon" size={18} />}
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
  key: keyof typeof itemWikiIds,
): (a: ItemData, b: ItemData) => number {
  return (a, b) => {
    let aIndex = itemWikiIds[key].indexOf(a.id);
    let bIndex = itemWikiIds[key].indexOf(b.id);
    if (aIndex === -1) aIndex = Number.MAX_SAFE_INTEGER;
    if (bIndex === -1) bIndex = Number.MAX_SAFE_INTEGER;
    return aIndex - bIndex;
  };
}
