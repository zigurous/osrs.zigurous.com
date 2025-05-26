import type { Monster } from './monster';

export interface SlayerMaster {
  id: string;
  image: string;
  region: string;
  requiredCombatLevel?: number;
}

export interface SlayerMonster extends Omit<Monster, 'notableDrops'> {
  slayerMasters: string[];
  requiredSlayerLevel?: number;
  notableDrops?: string[];
  hideFromMenu?: boolean;
}

export interface SlayerDungeon {
  id: string;
  name?: string;
  region: string;
  tags: string[];
}
