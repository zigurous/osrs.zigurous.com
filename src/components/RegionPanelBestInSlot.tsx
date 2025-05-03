import { graphql, useStaticQuery } from 'gatsby';
import React, { useMemo } from 'react';
import EquipmentInventory from './EquipmentInventory';
import RegionPanelSection from './RegionPanelSection';
import TitledCard from './TitledCard';
import type { CombatStyle, EquipmentItem, EquipmentSlot, Region } from '../types'; // prettier-ignore

interface RegionPanelBestInSlotProps {
  region: Region;
  leagues?: boolean;
}

export default function RegionPanelBestInSlot({
  region,
  leagues = false,
}: RegionPanelBestInSlotProps) {
  const data = useStaticQuery<BestInSlotQueryData>(dataQuery);
  const melee = useEquipment(data, 'melee', region.id, leagues);
  const ranged = useEquipment(data, 'ranged', region.id, leagues);
  const magic = useEquipment(data, 'magic', region.id, leagues);
  const prayer = useEquipment(data, 'prayer', region.id, leagues);
  return (
    <RegionPanelSection className="best-in-slot" title="Best In Slot">
      <TitledCard title="Melee" titleIconId="Attack_style_icon">
        <EquipmentInventory slots={melee} />
      </TitledCard>
      <TitledCard title="Ranged" titleIconId="Ranged_icon_(detail)">
        <EquipmentInventory slots={ranged} />
      </TitledCard>
      <TitledCard title="Magic" titleIconId="Magic_icon_(detail)">
        <EquipmentInventory slots={magic} />
      </TitledCard>
      <TitledCard title="Prayer" titleIconId="Prayer_icon_(detail)">
        <EquipmentInventory slots={prayer} />
      </TitledCard>
    </RegionPanelSection>
  );
}

function useEquipment(
  data: BestInSlotQueryData,
  combatStyle: 'melee' | 'ranged' | 'magic' | 'prayer',
  regionId: string,
  leagues: boolean,
) {
  const node = data.bestInSlot.nodes.find(
    node => node.combatStyle === combatStyle,
  );
  return useMemo<EquipmentSlot[]>(() => {
    if (!node) return [];
    return node.equipment.map(slot => ({
      id: slot.id,
      item: slot.items.find(
        item =>
          (item.regions.includes(regionId) || item.regions.includes('all')) &&
          (leagues || !item.tags || !item.tags.includes('leagues')),
      ),
    }));
  }, [node, combatStyle, regionId, leagues]);
}

interface BestInSlotQueryData {
  bestInSlot: {
    nodes: BestInSlotNode[];
  };
}

interface BestInSlotNode {
  combatStyle: CombatStyle;
  equipment: BestInSlotEquipmentSlot[];
}

interface BestInSlotEquipmentSlot {
  id: string;
  items: BestInSlotItem[];
}

type BestInSlotItem = EquipmentItem & { regions: string[] };

const dataQuery = graphql`
  query BestInSlotQuery {
    bestInSlot: allBestInSlotJson {
      nodes {
        combatStyle
        equipment {
          id
          items {
            id
            icon
            name
            tags
            regions
            ammo {
              id
              icon
            }
          }
        }
      }
    }
  }
`;
