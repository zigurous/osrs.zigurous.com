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

export interface EquipmentSlot {
  id: EquipmentSlotId;
  item?: EquipmentItem;
}

export interface EquipmentItem extends Omit<ItemData, 'transmutations'> {
  ammo?: Omit<EquipmentItem, 'ammo'>;
  regions: string[];
}

export type EquipmentSlots = Record<EquipmentSlotId, EquipmentItem | undefined>;

export interface BestInSlotToggles {
  leagues: boolean;
  clues: boolean;
}

export interface BestInSlotCategory {
  id: 'melee' | 'ranged' | 'magic' | 'prayer';
  title: string;
  icon: string;
  subcategories?: { id: string; label: string; icon: string }[];
}

export interface BestInSlotQueryData {
  equipment: {
    nodes: EquipmentItem[];
  };
  priority: {
    nodes: {
      category: string;
      equipment: {
        id: EquipmentSlotId;
        items: string[];
      }[];
    }[];
  };
}
