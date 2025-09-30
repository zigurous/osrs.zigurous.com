export type GridMasterCellType = 'task' | 'reward' | 'empty';

export interface GridMasterTask {
  id: string;
  icon: string;
  title?: string;
}

export interface GridMasterReward {
  id: string;
  icon: string;
  title?: string;
}
