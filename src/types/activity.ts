import type { DropSource } from './drop-source';
import { activityFilters } from '../utils';

export type ActivityGroup = (typeof activityFilters)[number];

export interface Activity extends DropSource {
  id: string;
  icon?: string;
  title?: string;
  subtitle?: string;
  category?: string;
  sortingGroups: ActivityGroup[];
}

export type CombatStyle = 'melee' | 'ranged' | 'magic' | 'hybrid';
export interface CombatActivity extends Activity {
  recommendedCombatStyle: CombatStyle[];
}

export interface Boss extends CombatActivity {
  category: 'boss';
}

export interface Raid extends Omit<Boss, 'category'> {
  category: 'raid';
}

export interface Minigame extends Activity {
  category: 'minigame';
}

export interface Guild extends Activity {
  category: 'guild';
}
