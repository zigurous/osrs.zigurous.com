export type RegionId =
  | 'asgarnia'
  | 'desert'
  | 'fremennik'
  | 'kandarin'
  | 'karamja'
  | 'kourend'
  | 'misthalin'
  | 'morytania'
  | 'tirannwn'
  | 'varlamore'
  | 'wilderness';

export interface Region {
  id: RegionId;
  name: string;
  description: string;
  storylines: string[];
  skilling: string[];
  raids: string[];
  bosses: string[];
  minigames: string[];
  guilds: string[];
  locations: string[];
  dungeons: string[];
  monsters: string[];
  npcs: string[];
  misc: string[];
  pets: string[];
  resources: Resources;
}

export interface Resources {
  bars: string[];
  bones: string[];
  food: string[];
  logs: string[];
  misc: string[];
  ores: string[];
  runes: string[];
  secondaries: string[];
}
