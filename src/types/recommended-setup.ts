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
