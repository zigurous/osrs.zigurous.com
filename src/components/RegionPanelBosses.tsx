import { Stack, Text } from '@zigurous/forge-react';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useCallback } from 'react';
import CheckboxToggle from './CheckboxToggle';
import ItemsStack from './ItemsStack';
import RegionPanelSection from './RegionPanelSection';
import TitledCard from './TitledCard';
import { useItemsContext, useSettingsContext } from '../context';
import { formatNameFromId } from '../utils';
import type { Boss, ItemData, Raid, Region } from '../types';

interface RegionPanelBossesProps {
  region: Region;
}

export default function RegionPanelBosses({ region }: RegionPanelBossesProps) {
  const data = useStaticQuery<BossingQueryData>(dataQuery);
  const settings = useSettingsContext();
  const itemsContext = useItemsContext();

  const raids = region.raids
    .map(id => data.raids.nodes.find(raid => raid.id === id))
    .filter(raid => !!raid);
  const bosses = region.bosses
    .map(id => data.bosses.nodes.find(boss => boss.id === id))
    .filter(boss => !!boss);

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
    <RegionPanelSection title="Bosses" titleMargin="lg">
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
      {raids.length > 0 && (
        <ul className="drops-list">
          {raids.map(raid => {
            const drops = itemsContext
              .getItemsByIds(raid.notableDrops)
              .filter(dropFilter);
            return (
              <li id={raid.id} key={raid.id}>
                <TitledCard
                  subtitle={raid.subtitle}
                  title={raid.title || formatNameFromId(raid.id)}
                  titleLinkId={raid.id}
                >
                  <ItemsStack highlights="all" items={drops} />
                </TitledCard>
              </li>
            );
          })}
        </ul>
      )}
      {raids.length > 0 && bosses.length > 0 && <hr className="thick" />}
      {bosses.length > 0 && (
        <ul className="drops-list">
          {bosses.map(boss => {
            const drops = itemsContext
              .getItemsByIds(boss.notableDrops)
              .filter(dropFilter);
            return (
              <li id={boss.id} key={boss.id}>
                <TitledCard
                  subtitle={boss.subtitle}
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
