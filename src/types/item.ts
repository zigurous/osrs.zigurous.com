export type ItemTag = 'unique' | 'megarare' | 'pet';

export interface ItemData {
  id: string;
  icon?: string;
  name?: string;
  tags?: ItemTag[];
}
