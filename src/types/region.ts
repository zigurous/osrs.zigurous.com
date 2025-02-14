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
  raids?: string[];
  bosses: string[];
  minigames: string[];
  guilds?: string[];
  pets: string[];
}
