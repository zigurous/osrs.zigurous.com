import { graphql, useStaticQuery } from 'gatsby';
import React, { useMemo } from 'react';
import ItemsStack from './ItemsStack';
import RegionPanelSection from './RegionPanelSection';
import TitledCard from './TitledCard';
import { useItemsContext } from '../context';
import type { Boss, Raid, Region } from '../types';
import { formatNameFromId } from '../utils';

interface RegionPanelBossesProps {
  region: Region;
}

export default function RegionPanelBosses({ region }: RegionPanelBossesProps) {
  const data = useStaticQuery<BossingQueryData>(dataQuery);
  const itemsContext = useItemsContext();
  const bosses = useMemo(
    () =>
      (region.bosses || [])
        .map(bossId => data.bosses.nodes.find(boss => boss.id === bossId))
        .filter(Boolean) as Boss[],
    [region.id, region.bosses, data.bosses.nodes],
  );
  const raids = useMemo(
    () =>
      (region.raids || [])
        .map(raidId => data.raids.nodes.find(raid => raid.id === raidId))
        .filter(Boolean) as Raid[],
    [region.id, region.raids, data.raids.nodes],
  );
  return (
    <>
      {raids.length > 0 && (
        <RegionPanelSection title="Raids">
          <ul className="drops-list">
            {raids.map(raid => {
              const drops = itemsContext.getItemsByIds(raid.notableDrops);
              return (
                <li id={raid.id} key={raid.id}>
                  <TitledCard
                    subtitle={raid.subtitle}
                    title={raid.title || formatNameFromId(raid.id)}
                    titleIconSize={14}
                    titleLinkId={raid.id}
                    titleLinkIcon="open_in_new"
                  >
                    <ItemsStack items={drops} />
                  </TitledCard>
                </li>
              );
            })}
          </ul>
        </RegionPanelSection>
      )}
      {raids.length > 0 && bosses.length > 0 && <hr className="thick" />}
      {bosses.length > 0 && (
        <RegionPanelSection title="Bosses">
          <ul className="drops-list">
            {bosses.map(boss => {
              const drops = itemsContext.getItemsByIds(boss.notableDrops);
              return (
                <li id={boss.id} key={boss.id}>
                  <TitledCard
                    subtitle={boss.subtitle}
                    title={boss.title || formatNameFromId(boss.id)}
                    titleIconSize={14}
                    titleLinkId={boss.id}
                    titleLinkIcon="open_in_new"
                  >
                    <ItemsStack items={drops} />
                  </TitledCard>
                </li>
              );
            })}
          </ul>
        </RegionPanelSection>
      )}
    </>
  );
}

interface BossingQueryData {
  bosses: {
    nodes: Boss[];
  };
  raids: {
    nodes: Raid[];
  };
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
