import type { EquipmentSlotId, EquippedItemIds } from './equipment';
import type { InventoryIds } from './inventory';
import type { Spellbook } from './spell';

export interface RecommendedSetup {
  id: string;
  title: string;
  strategiesLinkId?: string;
  loadouts: RecommendedSetupLoadout[];
}

export interface RecommendedSetupLoadout {
  title?: string;
  equipment: EquippedItemIds;
  inventory: InventoryIds;
  runePouch?: string[];
  spell?: string;
  spellbook?: Spellbook;
}

export interface RecommendedSetupNode {
  id: string;
  title: string;
  strategiesLinkId?: string;
  loadouts: RecommendedSetupNodeLoadout[];
}

export interface RecommendedSetupNodeLoadout {
  title?: string;
  equipment: RecommendedSetupNodeEquipmentItem[];
  inventory: RecommendedSetupNodeInventoryItem[];
  runePouch?: string[];
  spell?: string;
  spellbook?: Spellbook;
}

export interface RecommendedSetupNodeEquipmentItem {
  slot: EquipmentSlotId;
  item: string;
  default?: string;
  minimum?: string;
}

export interface RecommendedSetupNodeInventoryItem {
  slot: number;
  item: string;
  default?: string;
  minimum?: string;
}
