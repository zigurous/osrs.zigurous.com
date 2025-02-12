import type { CombatStyle } from './combat-style';
import type { DropSource } from './drop-source';
import type { Skill } from './skill';

export interface Boss extends DropSource {
  id: string;
  icon?: string;
  title?: string;
  subtitle?: string;
  category: 'boss' | 'skilling-boss';
  subcategory?:
    | 'slayer'
    | 'wilderness'
    | 'minigame'
    | 'quest'
    | 'gwd'
    | 'dt2'
    | Skill;
  recommendedCombatStyle?: CombatStyle[];
}

export interface Raid extends Omit<Boss, 'category' | 'subcategory'> {
  category: 'raid';
}
