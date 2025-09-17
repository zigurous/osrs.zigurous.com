import type { CombatStyle } from './activity';
import type { EquipmentSlotId } from './equipment';

export interface RecommendedSetup {
  id: string;
  title: string;
  strategiesLinkId?: string;
  loadouts: RecommendedSetupLoadout[];
}

export interface RecommendedSetupLoadout {
  type: CombatStyle;
  equipment: RecommendedSetupEquipmentItem[];
  inventory: RecommendedSetupInventoryItem[];
}

export interface RecommendedSetupEquipmentItem {
  slot: EquipmentSlotId;
  item: string;
}

export interface RecommendedSetupInventoryItem {
  slot: number;
  item: string;
}
