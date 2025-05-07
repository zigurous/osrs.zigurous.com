import type { DropSource, Sortable, Titled } from './common';

export interface Monster extends DropSource, Sortable, Titled {
  id: string;
  icon?: string;
  category: 'monster' | 'boss';
  requiredCombatLevel?: number;
  locations: string[];
}
