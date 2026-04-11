import { Badge, Stack, Text } from '@zigurous/forge-react';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useCallback } from 'react';
import CheckboxToggle from './CheckboxToggle';
import ItemsStack from './ItemsStack';
import RegionPanelSection from './RegionPanelSection';
import TitledCard from './TitledCard';
import { useItemsContext } from '../context/ItemsContext';
import { useRegionsContext } from '../context/RegionsContext';
import { useSettingsContext } from '../context/SettingsContext';
import { formatNameFromId } from '../utils/formatting';
import { sortByName } from '../utils/sorting';
import type { Boss, Raid } from '../types/activity';
import type { ItemData } from '../types/item';
import type { Region } from '../types/region';

interface RegionPanelBossesProps {
  region: Region;
}

export default function RegionPanelBosses({ region }: RegionPanelBossesProps) {
  const data = useStaticQuery<BossingQueryData>(dataQuery);
  const regions = useRegionsContext();
  const settings = useSettingsContext();
  const itemsContext = useItemsContext();

  const getBossById = useCallback(
    (id: string) =>
      data.bosses.nodes.find(boss => boss.id === id) ||
      data.raids.nodes.find(raid => raid.id === id),
    [data],
  );

  const bosses = regions.selectedRegions
    .map(regionId => {
      const region = regions.getRegionById(regionId);
      if (!region) return [];
      return [...region.bosses, ...region.raids].map(id => {
        const boss = getBossById(id);
        if (!boss) return undefined;
        return { ...boss, badge: region.badge };
      });
    })
    .flat()
    .filter(boss => !!boss)
    .sort(sortByName);

  const dropFilter = useCallback(
    (item: ItemData) => {
      const pet = Boolean(item.tags?.includes('pet'));
      const leagues = Boolean(item.tags?.includes('leagues'));
      const cosmetic = Boolean(item.tags?.includes('cosmetic'));
      if (!settings.leagues && leagues) return false;
      if (!settings.dropsPets && pet) return false;
      if (!settings.dropsCosmetics && cosmetic) return false;
      return true;
    },
    [settings],
  );

  return (
    <RegionPanelSection title="Bosses" titleMargin="lg" counter={bosses.length}>
      <Text className="ml-sm mb-xxxs" color="disabled" type="body-sm">
        Show the following drops:
      </Text>
      <Stack inline className="mb-xxl ml-sm" spacing="lg">
        <CheckboxToggle
          id="pets-toggle"
          label="Pets"
          checked={settings.dropsPets}
          onChange={checked => settings.set('dropsPets', checked)}
        />
        <CheckboxToggle
          id="leagues-toggle"
          label="Leagues"
          checked={settings.leagues}
          onChange={checked => settings.set('leagues', checked)}
        />
        <CheckboxToggle
          id="cosmetics-toggle"
          label="Cosmetics"
          checked={settings.dropsCosmetics}
          onChange={checked => settings.set('dropsCosmetics', checked)}
        />
      </Stack>
      {bosses.length > 0 && (
        <ul className="drops-list">
          {bosses.map(boss => {
            const drops = itemsContext
              .getItemsByIds(boss.notableDrops)
              .filter(dropFilter);
            return (
              <li id={boss.id} key={boss.id}>
                <TitledCard
                  titleIcon={
                    regions.selectedRegions.length > 1 ? boss.badge : undefined
                  }
                  subtitle={
                    boss.subtitle ||
                    (Boolean(boss.echoVariant) ? (
                      <Badge
                        className="ml-sm"
                        color="danger"
                        size="sm"
                        variant="tint"
                        onClick={e => {
                          if (typeof window !== 'undefined') {
                            e.preventDefault();
                            window.open(
                              `https://oldschool.runescape.wiki/w/${boss.id}_(Echo)`,
                              '_blank',
                            );
                          }
                        }}
                      >
                        Echo
                      </Badge>
                    ) : null)
                  }
                  title={boss.title || formatNameFromId(boss.id)}
                  titleLinkId={boss.id}
                >
                  <ItemsStack highlights="all" items={drops} />
                </TitledCard>
              </li>
            );
          })}
        </ul>
      )}
    </RegionPanelSection>
  );
}

interface BossingQueryData {
  bosses: { nodes: Boss[] };
  raids: { nodes: Raid[] };
}

const dataQuery = graphql`
  query BossingQuery {
    bosses: allBossesJson {
      nodes {
        id: jsonId
        icon
        title
        subtitle
        notableDrops
        echoVariant
      }
    }
    raids: allRaidsJson {
      nodes {
        id: jsonId
        icon
        title
        subtitle
        notableDrops
      }
    }
  }
`;
