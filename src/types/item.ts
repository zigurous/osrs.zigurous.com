import { itemHighlights } from '../utils/constants';

export type ItemTag =
  | 'pet'
  | 'megarare'
  | 'leagues'
  | 'clues'
  | 'cosmetic'
  | 'upgrade'
  | 'owned'
  | 'missing'
  | 'unmarked'
  | '1h'
  | '2h'
  | '*';

export type ItemHighlightOptions =
  | 'all'
  | 'none'
  | (typeof itemHighlights)[number][];

export interface ItemData {
  id: string;
  icon?: string;
  name?: string;
  tags?: ItemTag[];
  transmutations?: string[];
  tooltip?: string;
}

export interface ItemTable {
  id: string;
  items: string[];
}

export interface FoodData extends ItemData {
  healing: string | number;
}

export interface PetData extends Omit<ItemData, 'transmutations'> {
  source: string | string[];
}

export type DynamicItemIdGetter = (
  id: string,
  defaultId?: string,
  minimumId?: string,
  predicate?: (
    itemId: string,
    ownedItems: Set<string>,
    key?: string,
    index?: number,
    table?: ItemTable,
  ) => boolean,
) => string | undefined;
