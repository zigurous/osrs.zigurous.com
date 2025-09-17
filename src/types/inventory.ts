import type { ItemData } from './item';

export interface InventorySlot {
  slot: number;
  item?: ItemData;
}

export type InventorySlots = Partial<Record<number, ItemData>>;
