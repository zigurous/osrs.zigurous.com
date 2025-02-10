import type { GameLocation } from './location';
import type { Monster } from './monster';

export interface SlayerMaster {
  id: string;
  image: string;
  region: string;
  requiredCombatLevel?: number;
}

export interface SlayerMonster extends Monster {
  slayerMasters: string[];
  requiredSlayerLevel?: number;
  hideFromMenu?: boolean;
}

export type SlayerDungeon = Omit<GameLocation, 'tags'> & {
  tags: ['slayer'];
};
