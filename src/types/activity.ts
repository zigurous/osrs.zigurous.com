import type { DropSource, Sortable, Titled } from './common';

export interface Activity extends DropSource, Sortable, Titled {
  id: string;
  url?: string;
  icon?: string;
  category: string;
  subcategory?: string;
  requiredLevel?: number;
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

export interface Dungeon extends Activity {
  category: 'dungeon';
}
