import { Button } from '@zigurous/forge-react';
import classNames from 'classnames';
import React, { useState } from 'react';
import GridMasterTileImage from './GridMasterTileImage';
import TooltipWrapper from './TooltipWrapper';
import { useGridMasterContext } from '../context';

export default function GridMasterBoard() {
  const { tiles } = useGridMasterContext();
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="grid-master__board">
      {tiles.map(tile => {
        const id = `${tile.col}${tile.row}`;
        const flip = flipped && tile.type !== 'reward';
        if (tile.type === 'empty') {
          return (
            <Button
              className="w-full h-full"
              icon="flip"
              iconAlignment="only"
              iconProps={{ size: 'lg' }}
              onClick={() => setFlipped(state => !state)}
              size="lg"
              variant="text"
            >
              Flip
            </Button>
          );
        }
        return (
          <TooltipWrapper
            className={classNames('grid-master__cell', {
              'grid-master__cell--flipped': flip,
            })}
            id={id}
            key={id}
            tooltip={(flip ? tile.reward : tile.task) || 'Unknown'}
          >
            <div
              className={classNames('grid-master__tile', {
                [`grid-master__tile--${tile.type}`]: tile.type,
                'grid-master__tile--unknown': flip
                  ? !Boolean(tile.reward)
                  : !Boolean(tile.task),
              })}
            >
              <GridMasterTileImage
                cell={id}
                icon={flip ? tile.rewardIcon : tile.icon}
                type={flip ? 'reward' : 'task'}
              />
            </div>
          </TooltipWrapper>
        );
      })}
    </div>
  );
}
