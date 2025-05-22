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
