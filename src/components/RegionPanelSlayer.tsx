import { graphql, useStaticQuery } from 'gatsby';
import React, { useMemo } from 'react';
import ItemsStack from './ItemsStack';
import RegionPanelSection from './RegionPanelSection';
import SlayerDungeonListItem from './SlayerDungeonListItem';
import SlayerMasterListItem from './SlayerMasterListItem';
import SlayerMonsterListItem from './SlayerMonsterListItem';
import TitledCard from './TitledCard';
import { useItemsContext } from '../context';
import type { GameLocation, Region, SlayerDungeon, SlayerMaster, SlayerMonster} from '../types'; // prettier-ignore
import { formatNameFromId, sortByName } from '../utils';

interface RegionPanelSlayerProps {
  region: Region;
}

export default function RegionPanelSlayer({ region }: RegionPanelSlayerProps) {
  const data = useStaticQuery<SlayerQueryData>(dataQuery);
  const itemsContext = useItemsContext();
  const [masters, monsters, dungeons] = useMemo(
    () => [
      data.masters.nodes.filter(master => master.region === region.id),
      data.monsters.nodes
        .filter(m => isMonsterInRegion(m, region.id, data.locations.nodes))
        .sort(sortByName),
      data.dungeons.nodes.filter(loc => loc.region === region.id),
    ],
    [region.id, data],
  );
  return (
    <>
      <RegionPanelSection title="Slayer">
        {masters.length > 0 && (
          <TitledCard title="Masters" caption="Requirement" type="list">
            <ul>
              {masters.map(master => (
                <SlayerMasterListItem key={master.id} master={master} />
              ))}
            </ul>
          </TitledCard>
        )}
        {monsters.length > 0 && (
          <TitledCard title="Monsters" caption="Requirement" type="list">
            <ul>
              {monsters.map(monster =>
                monster.hideFromMenu ? null : (
                  <SlayerMonsterListItem key={monster.id} monster={monster} />
                ),
              )}
            </ul>
          </TitledCard>
        )}
        {dungeons.length > 0 && (
          <TitledCard title="Locations" type="list">
            <ul>
              {dungeons.map(dungeon => (
                <SlayerDungeonListItem key={dungeon.id} dungeon={dungeon} />
              ))}
            </ul>
          </TitledCard>
        )}
      </RegionPanelSection>
      <hr className="thick" />
      <RegionPanelSection title="Notable Drops">
        <ul className="drops-list">
          {monsters.map(monster => {
            if (!monster.notableDrops) return null;
            const drops = itemsContext.getItemsByIds(monster.notableDrops);
            return (
              <li id={monster.id} key={monster.id}>
                <TitledCard
                  subtitle={monster.subtitle}
                  title={monster.name || formatNameFromId(monster.id)}
                  titleIconSize={14}
                  titleLinkId={monster.id}
                  titleLinkIcon="open_in_new"
                >
                  <ItemsStack items={drops} />
                </TitledCard>
              </li>
            );
          })}
        </ul>
      </RegionPanelSection>
    </>
  );
}

function isMonsterInRegion(
  monster: SlayerMonster,
  regionId: string,
  allLocations: GameLocation[],
) {
  return monster.locations.some(monsterLocationId => {
    const location = allLocations.find(loc => loc.id === monsterLocationId);
    return location && location.region === regionId;
  });
}

interface SlayerQueryData {
  masters: { nodes: SlayerMaster[] };
  monsters: { nodes: SlayerMonster[] };
  dungeons: { nodes: SlayerDungeon[] };
  locations: { nodes: GameLocation[] };
}

const dataQuery = graphql`
  query SlayerQuery {
    masters: allSlayerMastersJson {
      nodes {
        id: jsonId
        image
        region
        requiredCombatLevel
      }
    }
    monsters: allSlayerMonstersJson {
      nodes {
        id: jsonId
        icon
        name
        subtitle
        requiredCombatLevel
        requiredSlayerLevel
        locations
        notableDrops
        hideFromMenu
      }
    }
    dungeons: allLocationsJson(filter: { tags: { in: "slayer" } }) {
      nodes {
        id: jsonId
        name
        region
      }
    }
    locations: allLocationsJson {
      nodes {
        id: jsonId
        name
        region
      }
    }
  }
`;
