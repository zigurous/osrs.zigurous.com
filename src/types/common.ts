import type { Skill } from './skill';

export interface DropSource {
  id: string;
  notableDrops: string[];
}

export type SortingGroup =
  | Skill
  | 'chest'
  | 'diaries'
  | 'dungeon'
  | 'location'
  | 'melee'
  | 'misc'
  | 'music'
  | 'npc'
  | 'pvm'
  | 'pvp'
  | 'quest'
  | 'skilling'
  | 'spell'
  | 'spellbook';

export interface Sortable {
  sortingGroups: SortingGroup[];
}

export interface Titled {
  title?: string;
  subtitle?: string;
  caption?: string;
}
