import type { Sortable, Titled } from './common';

export type Spellbook = 'Standard' | 'Arceuus' | 'Lunar' | 'Ancient';

export interface Spell extends Sortable, Titled {
  id: string;
  category: 'spell';
  spellbook: Spellbook;
  requiredLevel: number | number[];
}
