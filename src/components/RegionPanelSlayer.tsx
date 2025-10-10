import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import ItemsStack from './ItemsStack';
import RegionPanelSection from './RegionPanelSection';
import SlayerDungeonListItem from './SlayerDungeonListItem';
import SlayerMasterListItem from './SlayerMasterListItem';
import SlayerMonsterListItem from './SlayerMonsterListItem';
import TitledCard from './TitledCard';
import { useItemsContext } from '../context/ItemsContext';
import { useLocationsContext } from '../context/LocationsContext';
import { formatNameFromId } from '../utils/formatting';
import { sortByName } from '../utils/sorting';
import type { Region } from '../types/region';
import type { SlayerDungeon, SlayerMaster, SlayerMonster} from '../types/slayer'; // prettier-ignore

interface RegionPanelSlayerProps {
  region: Region;
}

export default function RegionPanelSlayer({ region }: RegionPanelSlayerProps) {
  const data = useStaticQuery<SlayerQueryData>(dataQuery);
  const { getItemsByIds } = useItemsContext();
  const { getLocationById } = useLocationsContext();

  const masters = data.masters.nodes.filter(master =>
    region.id.includes(master.region),
  );
  const dungeons = data.dungeons.nodes.filter(location =>
    region.id.includes(location.region),
  );
  const monsters = data.monsters.nodes
    .filter(monster =>
      monster.locations.some(id =>
        region.id.includes(getLocationById(id).region),
      ),
    )
    .reduce((monsters: SlayerMonster[], monster: SlayerMonster) => {
      const existingIndex = monsters.findIndex(m => m.id === monster.id);
      if (existingIndex !== -1) {
        const existingMonster = monsters[existingIndex];
        const combined: SlayerMonster = {
          ...existingMonster,
          locations: [
            ...new Set(existingMonster.locations.concat(monster.locations)),
          ],
          notableDrops: [
            ...new Set(
              (existingMonster.notableDrops || []).concat(
                monster.notableDrops || [],
              ),
            ),
          ],
        };
        monsters[existingIndex] = combined;
      } else {
        monsters.push(monster);
      }
      return monsters;
    }, [])
    .sort(sortByName);

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
            const drops = getItemsByIds(monster.notableDrops);
            return (
              <li id={monster.id} key={monster.id}>
                <TitledCard
                  subtitle={monster.subtitle}
                  title={monster.title || formatNameFromId(monster.id)}
                  titleLinkId={monster.id}
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

interface SlayerQueryData {
  masters: { nodes: SlayerMaster[] };
  monsters: { nodes: SlayerMonster[] };
  dungeons: { nodes: SlayerDungeon[] };
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
        title
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
  }
`;
