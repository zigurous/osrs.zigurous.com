import { graphql, useStaticQuery } from 'gatsby';
import React, { useMemo } from 'react';
import EquipmentInventory from './EquipmentInventory';
import RegionPanelSection from './RegionPanelSection';
import TitledCard from './TitledCard';
import type { CombatStyle, EquipmentItem, EquipmentSlot, Region } from '../types'; // prettier-ignore

interface RegionPanelBestInSlotProps {
  region: Region;
}

export default function RegionPanelBestInSlot({
  region,
}: RegionPanelBestInSlotProps) {
  const data = useStaticQuery<BestInSlotQueryData>(dataQuery);
  const melee = useEquipment(data, 'melee', region.id);
  const ranged = useEquipment(data, 'ranged', region.id);
  const magic = useEquipment(data, 'magic', region.id);
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
    </RegionPanelSection>
  );
}

function useEquipment(
  data: BestInSlotQueryData,
  combatStyle: CombatStyle,
  regionId: string,
) {
  const node = data.bestInSlot.nodes.find(
    node => node.combatStyle === combatStyle,
  );
  return useMemo<EquipmentSlot[]>(
    () =>
      node?.equipment.map(slot => {
        return {
          id: slot.id,
          item: slot.items.find(
            item =>
              item.regions.includes(regionId) || item.regions.includes('all'),
          ),
        };
      }) ?? [],
    [node, combatStyle, regionId],
  );
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
