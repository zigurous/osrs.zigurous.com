export type ItemTag =
  | 'megarare'
  | 'pet'
  | 'clues'
  | 'leagues'
  | 'cosmetic'
  | 'upgrade'
  | '1h'
  | '2h'
  | '*';

export interface ItemData {
  id: string;
  icon?: string;
  name?: string;
  tags?: ItemTag[];
  transmutations?: string[];
  tooltip?: string;
}

export interface FoodData extends ItemData {
  healing: string | number;
}

export interface PetData extends Omit<ItemData, 'transmutations'> {
  source: string | string[];
}
