export interface GameLocation {
  id: string;
  icon?: string;
  name?: string;
  category: string;
  region: string;
  tags?: string[];
}

export type Dungeon = GameLocation;
export type Island = GameLocation;
