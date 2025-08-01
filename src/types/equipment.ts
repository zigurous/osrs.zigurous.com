import type { ItemData } from './item';

export type EquipmentSlotId =
  | 'ammo'
  | 'body'
  | 'cape'
  | 'feet'
  | 'hands'
  | 'head'
  | 'legs'
  | 'neck'
  | 'ring'
  | 'shield'
  | 'weapon';

export interface EquipmentItem extends Omit<ItemData, 'transmutations'> {
  slot: EquipmentSlotId;
  ammo?: Omit<EquipmentItem, 'ammo'>;
  regions?: string[];
  requiredWeapon?: string;
}

export interface EquipmentSlot {
  id: EquipmentSlotId;
  item?: EquipmentItem;
}

export type EquipmentSlots = Record<EquipmentSlotId, EquipmentItem | undefined>;

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

export interface GearProgressionQueryData {
  progression: {
    nodes: GearProgressionCategory[];
  };
}

export interface GearProgressionCategory {
  category: 'melee' | 'ranged' | 'magic';
  equipment: string[][];
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
