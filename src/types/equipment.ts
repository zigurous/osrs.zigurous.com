import type { ItemData } from './item';
import type { SkillRequirement } from './skill';
import { equipmentSlots } from '../utils';

export type EquipmentSlotId = (typeof equipmentSlots)[number];

export interface EquipmentItem extends Omit<ItemData, 'transmutations'> {
  slot: EquipmentSlotId;
  regions?: string[];
  requiredWeapon?: string;
  ammo?: Omit<EquipmentItem, 'ammo'>;
  skillRequirements?: SkillRequirement[];
}

export interface EquipmentSlot {
  id: EquipmentSlotId;
  item?: EquipmentItem;
}

export type EquipmentSlots = Partial<Record<EquipmentSlotId, EquipmentItem>>;

export interface EquipmentCategory {
  id: 'melee' | 'ranged' | 'magic' | 'prayer';
  title: string;
  icon: string;
  subcategoryKey: keyof EquipmentSubcategories;
  subcategories?: { id: string; label: string; icon: string }[];
}

export interface EquipmentSubcategories {
  meleeSubcategory: string | undefined;
  rangedSubcategory: string | undefined;
  magicSubcategory: string | undefined;
  prayerSubcategory: string | undefined;
}

export interface BestInSlotQueryData {
  priority: {
    nodes: BestInSlotCategory[];
  };
}

export interface BestInSlotCategory {
  category: string;
  equipment: {
    id: EquipmentSlotId;
    items: string[];
  }[];
}
