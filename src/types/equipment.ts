import type { ItemData } from './item';

export interface EquipmentSlot {
  id: string;
  item?: EquipmentItem;
}

export interface EquipmentItem extends ItemData {
  ammo?: Omit<EquipmentItem, 'ammo'>;
}
