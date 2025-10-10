import { Text } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';
import GridMasterTileImage from './GridMasterTileImage';
import TooltipWrapper from './TooltipWrapper';
import WikiLink from './WikiLink';
import { useGridMasterContext } from '../context';
import type { GridMasterTile } from '../types';

export default function GridMasterBoard() {
  const { tiles } = useGridMasterContext();
  return (
    <div className="grid-master__board">
      {tiles.map(tile => {
        const key = `${tile.col}${tile.row}`;
        if (tile.type === 'empty') {
          return <div aria-hidden key={key} />;
        } else if (tile.type === 'reward') {
          return <GridMasterRewardTile tile={tile} key={key} />;
        } else {
          return <GridMasterTaskTile tile={tile} key={key} />;
        }
      })}
    </div>
  );
}

function GridMasterTaskTile({ tile }: { tile: GridMasterTile }) {
  const { flipped, hideUnconfirmed } = useGridMasterContext();
  const cell = `${tile.col}${tile.row}`;
  const unknown =
    (flipped ? !Boolean(tile.reward) : !Boolean(tile.task)) ||
    Boolean(tile.unconfirmed && hideUnconfirmed);
  return (
    <TooltipWrapper
      id={cell}
      className="grid-master__cell"
      tooltip={
        flipped && !unknown && tile.rewardDescription ? (
          <Text style={{ maxWidth: '360px' }}>
            <Text type="body-md" weight="500">
              {tile.reward}
            </Text>
            <Text className="px-xxs pb-xxs text-wrap" type="body-sm">
              {tile.rewardDescription.split('\n').map((line, index, array) => (
                <React.Fragment key={`${index}:${line}`}>
                  {line}
                  {index != array.length - 1 && <br />}
                </React.Fragment>
              ))}
            </Text>
          </Text>
        ) : (
          <Text type="body-sm">
            {(!unknown && (flipped ? tile.reward : tile.task)) || 'Unknown'}
          </Text>
        )
      }
    >
      <WikiLink
        aria-label={tile.task || 'Unknown'}
        className={classNames('grid-master__tile', {
          [`grid-master__tile--${tile.type}`]: tile.type,
          'grid-master__tile--unknown': unknown,
        })}
        wikiId={
          (!unknown && (flipped ? tile.rewardLink : tile.taskLink)) ||
          'Grid_Master'
        }
      >
        <GridMasterTileImage
          cell={cell}
          unknown={unknown}
          icon={flipped ? tile.rewardIcon : tile.icon}
          type={flipped ? 'task-reward' : 'task'}
        />
      </WikiLink>
    </TooltipWrapper>
  );
}

function GridMasterRewardTile({ tile }: { tile: GridMasterTile }) {
  const { hideUnconfirmed } = useGridMasterContext();
  const cell = `${tile.col}${tile.row}`;
  const unknown =
    !Boolean(tile.reward) || Boolean(tile.unconfirmed && hideUnconfirmed);
  return (
    <TooltipWrapper
      id={cell}
      className="grid-master__cell"
      tooltip={
        <Text type="body-sm">{(!unknown && tile.reward) || 'Unknown'}</Text>
      }
    >
      <WikiLink
        aria-label={tile.reward || 'Unknown'}
        className={classNames(
          'grid-master__tile',
          'grid-master__tile--reward',
          {
            'grid-master__tile--unknown': unknown,
          },
        )}
        wikiId={(!unknown && tile.rewardLink) || 'Grid_Master'}
      >
        <GridMasterTileImage
          cell={cell}
          unknown={unknown}
          icon={tile.rewardIcon}
          type="reward"
        />
      </WikiLink>
    </TooltipWrapper>
  );
}
