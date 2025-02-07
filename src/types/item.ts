export type ItemTag = 'unique' | 'megarare' | 'pet';

export interface ItemData {
  id: string;
  icon?: string;
  name?: string;
  tags?: ItemTag[];
}

export interface PetData extends Omit<ItemData, 'tags'> {
  source: string | string[];
  tags: ['pet'];
}
