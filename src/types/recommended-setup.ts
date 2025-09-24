import type { EquipmentSlotId } from './equipment';

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
}

export interface RecommendedSetupEquipmentItem {
  slot: EquipmentSlotId;
  item: string;
}

export interface RecommendedSetupInventoryItem {
  slot: number;
  item: string;
}
