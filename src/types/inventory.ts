import type { ItemData } from './item';

export interface InventorySlot {
  slot: number;
  item?: ItemData;
}

export type Inventory = Partial<Record<number, ItemData>>;
export type InventoryIds = Partial<Record<number, string>>;
