export type ItemTag =
  | 'megarare'
  | 'pet'
  | 'clues'
  | 'leagues'
  | 'cosmetic'
  | '1h'
  | '2h'
  | '*';

export interface ItemData {
  id: string;
  icon?: string;
  name?: string;
  tags?: ItemTag[];
  transmutations?: string[];
}

export interface PetData extends Omit<ItemData, 'transmutations'> {
  source: string | string[];
}
