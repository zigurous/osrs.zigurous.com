import { Stack, Text } from '@zigurous/forge-react';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useMemo, useState } from 'react';
import CheckboxToggle from './CheckboxToggle';
import EquipmentInventory from './EquipmentInventory';
import IconToggle from './IconToggle';
import RegionPanelSection from './RegionPanelSection';
import TitledCard from './TitledCard';
import type { EquipmentItem, EquipmentSlotId, EquipmentSlots, Region, RegionId } from '../types'; // prettier-ignore

type MeleeStyle = 'stab' | 'slash' | 'crush';
type BestInSlotCategory = 'melee' | MeleeStyle | 'ranged' | 'magic' | 'prayer';
type BestInSlotToggles = { leagues: boolean; clues: boolean };

const defaultToggles: BestInSlotToggles = {
  leagues: false,
  clues: false,
};

interface RegionPanelBestInSlotProps {
  region: Region;
}

export default function RegionPanelBestInSlot({
  region,
}: RegionPanelBestInSlotProps) {
  const [toggles, setToggles] = useState<BestInSlotToggles>(defaultToggles);
  const [meleeStyle, setMeleeStyle] = useState<MeleeStyle | undefined>();
  const data = useStaticQuery<BestInSlotQueryData>(dataQuery);
  const melee = useEquipment(data, region.id, toggles, 'melee', meleeStyle);
  const ranged = useEquipment(data, region.id, toggles, 'ranged');
  const magic = useEquipment(data, region.id, toggles, 'magic');
  const prayer = useEquipment(data, region.id, toggles, 'prayer');
  return (
    <RegionPanelSection className="best-in-slot" title="Best In Slot">
      <Stack inline className="ml-md" spacing="lg">
        <CheckboxToggle
          id="leagues-toggle"
          label="Leagues"
          checked={toggles.leagues}
          onChange={checked =>
            setToggles(state => ({ ...state, leagues: checked }))
          }
        />
        <CheckboxToggle
          id="clues-toggle"
          label="Clues"
          checked={toggles.clues}
          onChange={checked =>
            setToggles(state => ({ ...state, clues: checked }))
          }
        />
      </Stack>
      <Text className="ml-sm mt-sm mb-xxl" color="disabled" type="caption">
        * Requires components from another region or source
      </Text>
      <TitledCard
        title="Melee"
        titleIconLeft="Attack_style_icon"
        customTitle={
          <>
            <div className="titled-card__title">
              <img
                alt=""
                aria-hidden
                className="titled-card__icon"
                src="https://oldschool.runescape.wiki/images/Attack_style_icon.png"
              />
              <Text size="lg" type="title">
                Melee
              </Text>
            </div>
            <Stack
              inline
              className="h-0"
              align="center"
              justify="end"
              spacing="xxs"
            >
              <IconToggle
                icon="White_dagger"
                label="Stab"
                on={meleeStyle === 'stab'}
                onChange={on => setMeleeStyle(on ? 'stab' : undefined)}
              />
              <IconToggle
                icon="White_scimitar"
                label="Slash"
                on={meleeStyle === 'slash'}
                onChange={on => setMeleeStyle(on ? 'slash' : undefined)}
              />
              <IconToggle
                icon="White_warhammer"
                label="Crush"
                on={meleeStyle === 'crush'}
                onChange={on => setMeleeStyle(on ? 'crush' : undefined)}
              />
            </Stack>
          </>
        }
      >
        <EquipmentInventory slots={melee} />
      </TitledCard>
      <TitledCard title="Ranged" titleIconLeft="Ranged_icon_(detail)">
        <EquipmentInventory slots={ranged} />
      </TitledCard>
      <TitledCard title="Magic" titleIconLeft="Magic_icon_(detail)">
        <EquipmentInventory slots={magic} />
      </TitledCard>
      <TitledCard title="Prayer" titleIconLeft="Prayer_icon_(detail)">
        <EquipmentInventory slots={prayer} />
      </TitledCard>
    </RegionPanelSection>
  );
}

function useEquipment(
  data: BestInSlotQueryData,
  regionId: RegionId,
  toggles: BestInSlotToggles,
  category: BestInSlotCategory,
  subcategory?: BestInSlotCategory,
): EquipmentSlots {
  return useMemo<EquipmentSlots>(() => {
    // Start with an empty set of slots
    const slots = getEmptySlots();
    // Assigns items to each slot based on the category (melee, ranged, magic)
    const assignItems = (category: string) => {
      const bis = data.priority.nodes.find(node => node.category === category);
      bis?.equipment.forEach(slot => {
        // Skip this slot if it has already been assigned an item
        if (slots[slot.id]) return;

        // Filter items based on region, toggles, and melee style
        const ids = slot.items.filter(id => {
          const baseId = id.includes('#') ? id.split('#')[0] : id;
          const item =
            data.equipment.nodes.find(item => item.id === id) ||
            data.equipment.nodes.find(item => item.id === baseId);
          if (!item) return false;
          // Discard items not available in the region
          if (!item.regions.includes(regionId) && !item.regions.includes('all'))
            return false;
          // Discard items based on current toggles
          if (!toggles.leagues) {
            if (item.tags?.includes('leagues') || id.includes('#Leagues'))
              return false;
          }
          if (!toggles.clues) {
            if (item.tags?.includes('clues') || id.includes('#Clues'))
              return false;
          }
          // Discard melee items that don't match the correct style
          if (subcategory) {
            if (id.includes('#Stab') && subcategory !== 'stab') return false;
            if (id.includes('#Slash') && subcategory !== 'slash') return false;
            if (id.includes('#Crush') && subcategory !== 'crush') return false;
          }
          return true;
        });

        // Assign the highest priority item (index 0) to the slot
        if (ids.length > 0) {
          const fullId = ids[0];
          const baseId = fullId.includes('#') ? fullId.split('#')[0] : fullId;
          const item =
            data.equipment.nodes.find(item => item.id === fullId) ||
            data.equipment.nodes.find(item => item.id === baseId);
          if (item) {
            slots[slot.id] = { ...item, id: baseId };
          }
        }
      });
    };
    // First, assign slots based on the subcategory (e.g., stab, slash, crush)
    if (subcategory) assignItems(subcategory);
    // Last, assign slots based on the primary category (e.g., melee, ranged, magic)
    // Slots will be skipped if they have already been assigned by the subcategory
    assignItems(category);
    return slots;
  }, [data, regionId, toggles, category, subcategory]);
}

function getEmptySlots(): EquipmentSlots {
  return {
    ammo: undefined,
    body: undefined,
    cape: undefined,
    feet: undefined,
    hands: undefined,
    head: undefined,
    legs: undefined,
    neck: undefined,
    ring: undefined,
    shield: undefined,
    weapon: undefined,
  };
}

interface BestInSlotQueryData {
  equipment: {
    nodes: EquipmentItem[];
  };
  priority: {
    nodes: {
      category: BestInSlotCategory;
      equipment: {
        id: EquipmentSlotId;
        items: string[];
      }[];
    }[];
  };
}

const dataQuery = graphql`
  query BestInSlotQuery {
    equipment: allEquipmentJson {
      nodes {
        id: jsonId
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
    priority: allBestInSlotJson {
      nodes {
        category
        equipment {
          id
          items
        }
      }
    }
  }
`;
