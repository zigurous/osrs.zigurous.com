import type { EquipmentSlotId } from './equipment';
import type { Spellbook } from './spell';

export interface RecommendedSetup {
  id: string;
  title: string;
  strategiesLinkId?: string;
  loadouts: RecommendedSetupLoadout[];
}

export interface RecommendedSetupLoadout {
  title?: string;
  equipment: RecommendedSetupEquipmentItem[];
  inventory: RecommendedSetupInventoryItem[];
  runePouch?: string[];
  spell?: string;
  spellbook?: Spellbook;
}

export interface RecommendedSetupEquipmentItem {
  slot: EquipmentSlotId;
  item: string;
}

export interface RecommendedSetupInventoryItem {
  slot: number;
  item: string;
}

export interface InventorySetupsExport {
  setup: {
    name: string;
    notes: string;
    hc: string; // hexcode
    fb: boolean; // ???
    sb: number; // spellbook: 0=standard, 1=ancient, 2=lunar, 3=arceuus
    inv: InventorySetupsItemList; // inventory
    eq: InventorySetupsItemList; // equipment
    rp?: InventorySetupsItemList; // rune pouch
    qv?: InventorySetupsItemList; // quiver
    afi?: InventorySetupsItemList; // additional filtered items
  };
  layout: number[];
}

export type InventorySetupsItemList = (InventorySetupsItem | null)[];

export interface InventorySetupsItem {
  id: number;
  q?: number; // quantity
  f?: boolean; // fuzzy
}
