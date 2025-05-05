import { graphql, useStaticQuery } from 'gatsby';
import React, { useMemo, useState } from 'react';
import EquipmentInventory from './EquipmentInventory';
import RegionPanelSection from './RegionPanelSection';
import TitledCard from './TitledCard';
import type { CombatStyle, EquipmentItem, EquipmentSlot, Region } from '../types'; // prettier-ignore
import { Text } from '@zigurous/forge-react';

interface RegionPanelBestInSlotProps {
  region: Region;
}

export default function RegionPanelBestInSlot({
  region,
}: RegionPanelBestInSlotProps) {
  const [toggles, setToggles] = useState({ leagues: false, clues: false });
  const data = useStaticQuery<BestInSlotQueryData>(dataQuery);
  const melee = useEquipment(data, 'melee', region.id, toggles);
  const ranged = useEquipment(data, 'ranged', region.id, toggles);
  const magic = useEquipment(data, 'magic', region.id, toggles);
  const prayer = useEquipment(data, 'prayer', region.id, toggles);
  return (
    <RegionPanelSection className="best-in-slot" title="Best In Slot">
      <div className="flex flex-col justify-end ml-sm mb-xxl">
        <div>
          <Toggle
            id="leagues-toggle"
            label="Leagues"
            checked={toggles.leagues}
            onChange={checked =>
              setToggles(state => ({ ...state, leagues: checked }))
            }
          />
          <Toggle
            id="clues-toggle"
            label="Clues"
            checked={toggles.clues}
            onChange={checked =>
              setToggles(state => ({ ...state, clues: checked }))
            }
          />
        </div>
        <Text marginTop="sm" color="disabled" type="caption">
          * Requires components from another region or source
        </Text>
      </div>
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

function Toggle({
  checked,
  id,
  label,
  onChange,
}: {
  checked: boolean;
  id: string;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <span className="toggle mr-lg">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        style={{ transform: 'scale(1.25)' }}
      />
      <label className="ml-xs" htmlFor={id} style={{ userSelect: 'none' }}>
        {label}
      </label>
    </span>
  );
}

function useEquipment(
  data: BestInSlotQueryData,
  combatStyle: 'melee' | 'ranged' | 'magic' | 'prayer',
  regionId: string,
  toggles: { leagues: boolean; clues: boolean },
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
          (toggles.leagues || !item.tags || !item.tags.includes('leagues')) &&
          (toggles.clues || !item.tags || !item.tags.includes('clues')),
      ),
    }));
  }, [node, combatStyle, regionId, toggles.leagues, toggles.clues]);
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
