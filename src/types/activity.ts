import type { DropSource } from './drop-source';
import type { Skill } from './skill';
import { activityFilters } from '../utils';

export type ActivityGroup = (typeof activityFilters)[number];
export interface Activity extends Omit<DropSource, 'name'> {
  id: string;
  icon?: string;
  title?: string;
  subtitle?: string;
  category: string;
  subcategory?: string;
  sortingGroup?: ActivityGroup;
}

export type CombatStyle = 'melee' | 'ranged' | 'magic' | 'hybrid';
export interface CombatActivity extends Activity {
  recommendedCombatStyle: CombatStyle[];
}

export interface Boss extends CombatActivity {
  category: 'boss';
  subcategory?:
    | 'slayer'
    | 'wilderness'
    | 'minigame'
    | 'quest'
    | 'gwd'
    | 'dt2'
    | Skill;
}

export interface Raid extends Omit<Boss, 'category' | 'subcategory'> {
  category: 'raid';
}

export interface Minigame extends Activity {
  category: 'minigame';
  subcategory: Skill | 'pvm' | 'pvp' | 'misc';
}

export interface Guild extends Activity {
  category: 'guild';
  subcategory: Skill | 'quest' | 'melee';
}
