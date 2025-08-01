import React, { useMemo } from 'react';
import EquipmentCard from './EquipmentCard';
import { useEquipmentContext, useSettingsContext } from '../context';
import { isInRegion } from '../utils';
import type { BestInSlotQueryData, EquipmentCategory, EquipmentSlots } from '../types'; // prettier-ignore

interface BestInSlotEquipmentCardProps {
  category: EquipmentCategory;
  data: BestInSlotQueryData;
  region: string;
}

export default function BestInSlotEquipmentCard({
  category,
  data,
  region,
}: BestInSlotEquipmentCardProps) {
  const settings = useSettingsContext();
  const { getItemById } = useEquipmentContext();
  const { [category.subcategoryKey]: subcategoryId } = settings;

  const equipment: EquipmentSlots = useMemo(() => {
    // Start with an empty set of slots
    const slots = getEmptySlots();
    // Assigns items to each slot based on the category (melee, ranged, magic)
    const assignItems = (category: string) => {
      const bis = data.priority.nodes.find(node => node.category === category);
      bis?.equipment.forEach(slot => {
        // Skip this slot if it has already been assigned an item
        if (slots[slot.id]) return;

        const ids = slot.items.filter(id => {
          // Find the matching item based on id
          const baseId = id.includes('#') ? id.split('#')[0] : id;
          const item = getItemById(id) || getItemById(baseId);
          if (!item) return false;

          // Discard items not available in the region
          const available = !item.regions || isInRegion(region, item.regions);
          if (!available) return false;

          // Discard items based on toggles
          if (!settings.leagues) {
            if (id.includes('#Leagues') || item.tags?.includes('leagues'))
              return false;
          }
          if (!settings.bisClues) {
            if (id.includes('#Clues') || item.tags?.includes('clues'))
              return false;
          }
          if (settings.bisStrict) {
            if (id.includes('#*') || item.tags?.includes('*')) {
              return false;
            }
          }

          // Discard melee items that don't match the correct style
          if (id.includes('#Stab') && subcategoryId !== 'melee-stab')
            return false;
          if (id.includes('#Slash') && subcategoryId !== 'melee-slash')
            return false;
          if (id.includes('#Crush') && subcategoryId !== 'melee-crush')
            return false;

          // Discard items that require a specific weapon to be equipped
          if (item.requiredWeapon) {
            if (slots.weapon?.id !== item.requiredWeapon) {
              return false;
            }
          }

          return true;
        });

        // Assign the highest priority item (index 0) to the slot
        if (ids.length > 0) {
          const fullId = ids[0];
          const baseId = fullId.includes('#') ? fullId.split('#')[0] : fullId;
          const item = getItemById(fullId) || getItemById(baseId);
          if (item) {
            slots[slot.id] = { ...item, id: baseId };
          }
        }
      });
    };
    // First, assign slots based on the subcategory (e.g., stab, slash, crush)
    if (subcategoryId) {
      assignItems(subcategoryId);
    }
    // Last, assign slots based on the primary category (e.g., melee, ranged, magic)
    // Slots will be skipped if they have already been assigned by the subcategory
    assignItems(category.id);
    return slots;
  }, [data, region, category.id, subcategoryId, settings, getItemById]);

  return <EquipmentCard category={category} equipment={equipment} />;
}

function getEmptySlots(): EquipmentSlots {
  return {
    weapon: undefined,
    shield: undefined,
    head: undefined,
    body: undefined,
    legs: undefined,
    hands: undefined,
    feet: undefined,
    cape: undefined,
    neck: undefined,
    ring: undefined,
    ammo: undefined,
  };
}
