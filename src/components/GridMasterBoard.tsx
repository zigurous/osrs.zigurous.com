import React from 'react';
import GridMasterRewardCell from './GridMasterRewardCell';
import GridMasterTaskCell from './GridMasterTaskCell';
import { useGridMasterContext } from '../context';
import type { GridMasterCellType } from '../types';

// prettier-ignore
const board = [
  'reward=Production_Prodigy', 'task=Gnomeball', 'task=Cabbage', 'task=Steel_pickaxe', 'task=Yama', 'task=Tombs_of_Amascut', 'task=Stronghold_of_Security', 'task=TzHaar_Fight_Cave',
  'reward', "task=Awakener's_orb", 'task=', 'task', 'task', 'task', 'task', 'task',
  'reward', 'task', 'task', 'task', 'task', 'task', 'task', 'task',
  'reward', 'task', 'task', 'task', 'task', 'task', 'task', 'task',
  'reward', 'task', 'task', 'task', 'task', 'task', 'task', 'task',
  'reward', 'task', 'task', 'task', 'task', 'task', 'task', 'task',
  'reward', 'task', 'task', 'task', 'task', 'task', 'task', 'task',
  'nothing', 'reward', 'reward', 'reward', 'reward', 'reward', 'reward', 'reward',
];

export default function GridMasterBoard() {
  const context = useGridMasterContext();
  return (
    <div className="grid-master__board">
      {board.map((id, index) => {
        const type = getTypeForId(id);
        const key = `${index}-${id}`;
        // prettier-ignore
        switch (type) {
          case 'task':
            return <GridMasterTaskCell data={context.getTaskById(id)} key={key} />;
          case 'reward':
            return <GridMasterRewardCell data={context.getRewardById(id)} key={key} />;
          default:
            return <div className="grid-master__cell" key={key} />;
        }
      })}
    </div>
  );
}

function getTypeForId(id: string): GridMasterCellType {
  if (id.includes('task')) return 'task';
  if (id.includes('reward')) return 'reward';
  return 'empty';
}
