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
  locations: string[];
  skilling: string[];
  raids: string[];
  bosses: string[];
  minigames: string[];
  guilds: string[];
  dungeons: string[];
  monsters: string[];
  npcs: string[];
  misc: string[];
  pets: string[];
  activities: string[];
}
