export interface GridMasterTile {
  col: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'R';
  row: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  type: 'reward' | 'beginner' | 'easy' | 'medium' | 'hard' | 'empty';
  icon?: string;
  task?: string;
  reward?: string;
  rewardIcon?: string;
}
