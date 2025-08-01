import React, { useMemo } from 'react';
import EquipmentCard from './EquipmentCard';
import { useEquipmentContext, useSettingsContext } from '../context';
import type { EquipmentCategory, EquipmentSlots, GearProgressionCategory } from '../types'; // prettier-ignore

interface GearProgressionCardProps {
  category: EquipmentCategory;
  data?: GearProgressionCategory;
  tier: number;
}

export default function GearProgressionCard({
  category,
  data,
  tier,
}: GearProgressionCardProps) {
  const settings = useSettingsContext();
  const { getItemById } = useEquipmentContext();
  const { [category.subcategoryKey]: subcategoryId } = settings;

  const equipment: EquipmentSlots = useMemo(() => {
    if (!data) return getEmptySlots();
    const getItems = (tier: number) => {
      const slots = getEmptySlots();
      for (let i = 0; i <= tier; i++) {
        const ids = data.equipment[i];
        ids.forEach(id => {
          const item = getItemById(id);
          if (item) slots[item.slot] = item;
        });
      }
      return slots;
    };
    const slots = getItems(tier);
    if (tier > 0) {
      const previous = getItems(tier - 1);
      (Object.keys(previous) as Array<keyof EquipmentSlots>).forEach(slot => {
        const item = slots[slot];
        if (item && item.id !== previous[slot]?.id) {
          slots[slot] = { ...item, tags: [...(item.tags || []), 'upgrade'] };
        }
      });
    }
    return slots;
  }, [data, category.id, subcategoryId, settings, getItemById]);

  return (
    <EquipmentCard
      category={category}
      equipment={equipment}
      style={{ width: '320px' }}
    />
  );
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
