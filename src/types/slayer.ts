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

export interface SlayerDungeon {
  id: string;
  name?: string;
  region: string;
  tags: string[];
}
