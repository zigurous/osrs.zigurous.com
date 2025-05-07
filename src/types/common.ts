import { activityCategories } from '../utils';

export interface DropSource {
  id: string;
  notableDrops: string[];
}

export type SortingGroup = (typeof activityCategories)[number];
export interface Sortable {
  sortingGroups: SortingGroup[];
}

export interface Titled {
  title?: string;
  subtitle?: string;
  caption?: string;
}
