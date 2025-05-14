export interface GameLocation {
  id: string;
  name?: string;
  region: string;
  tags?: string[];
}

export type GameLocationAndCategory = GameLocation & { category: string };
