import type { Skill } from './skill';

export interface DropSource {
  id: string;
  notableDrops: string[];
}

export type SortingGroup =
  | Skill
  | 'boss'
  | 'chest'
  | 'diaries'
  | 'distraction_and_diversion'
  | 'dungeon'
  | 'guild'
  | 'location'
  | 'minigame'
  | 'misc'
  | 'monster'
  | 'music'
  | 'npc'
  | 'pvm'
  | 'pvp'
  | 'quest'
  | 'raid'
  | 'shop'
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
