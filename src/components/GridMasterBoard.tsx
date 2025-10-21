import { Text, TooltipWrapper } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';
import GridMasterTileImage from './GridMasterTileImage';
import WikiLink from './WikiLink';
import { useGridMasterContext } from '../context/GridMasterContext';
import type { GridMasterTile } from '../types/grid-master';

const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const rows = ['1', '2', '3', '4', '5', '6', '7'];

export default function GridMasterBoard() {
  const { tiles } = useGridMasterContext();
  return (
    <div className="grid-master__board">
      {tiles.map(tile => {
        const key = `${tile.col}${tile.row}`;
        switch (tile.type) {
          case 'empty':
            return <div aria-hidden key={key} />;
          case 'reward':
            return <GridMasterRewardTile tile={tile} key={key} />;
          default:
            return <GridMasterTaskTile tile={tile} key={key} />;
        }
      })}
    </div>
  );
}

function GridMasterTaskTile({ tile }: { tile: GridMasterTile }) {
  const { checked, checkable, flipped, hideUnconfirmed, toggleChecked } =
    useGridMasterContext();
  const cell = `${tile.col}${tile.row}`;
  const checkedIndex = checked.indexOf(cell);
  const unknown =
    (flipped ? !Boolean(tile.reward) : !Boolean(tile.task)) ||
    Boolean(tile.unconfirmed && hideUnconfirmed);
  return (
    <TooltipWrapper
      id={cell}
      className={classNames('grid-master__cell', {
        unchecked: checkable && checkedIndex === -1,
        checked: checkable && checkedIndex !== -1,
      })}
      tooltip={
        flipped && !unknown && tile.rewardDescription ? (
          <div style={{ maxWidth: '360px' }}>
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
          </div>
        ) : (
          <Text type="body-sm">
            {((!unknown && (flipped ? tile.reward : tile.task)) || 'Unknown')
              .split('\n')
              .map((line, index, array) => (
                <React.Fragment key={`${index}:${line}`}>
                  {line}
                  {index != array.length - 1 && <br />}
                </React.Fragment>
              ))}
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
        draggable={false}
        onClick={
          checkable
            ? e => {
                if (!e.ctrlKey) {
                  e.preventDefault();
                  toggleChecked(cell);
                }
              }
            : undefined
        }
        wikiId={
          (!unknown && (flipped ? tile.rewardLink : tile.taskLink)) ||
          'Grid_Master'
        }
      >
        <GridMasterTileImage
          cell={cell}
          unknown={unknown}
          icon={flipped ? tile.rewardIcon : tile.taskIcon}
          type={flipped ? 'task-reward' : 'task'}
        />
        {checkable && checkedIndex !== -1 && <sub>{checkedIndex + 1}</sub>}
      </WikiLink>
    </TooltipWrapper>
  );
}

function GridMasterRewardTile({ tile }: { tile: GridMasterTile }) {
  const { checked, checkable, hideUnconfirmed } = useGridMasterContext();
  const cell = `${tile.col}${tile.row}`;
  const unknown =
    !Boolean(tile.reward) || Boolean(tile.unconfirmed && hideUnconfirmed);
  const completed =
    tile.col === 'R'
      ? cols.every(col => checked.includes(`${col}${tile.row}`))
      : rows.every(row => checked.includes(`${tile.col}${row}`));
  return (
    <TooltipWrapper
      id={cell}
      className={classNames('grid-master__cell', {
        unchecked: checkable && !completed,
        checked: checkable && completed,
      })}
      tooltip={
        !unknown && tile.rewardDescription ? (
          <div style={{ maxWidth: '360px' }}>
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
          </div>
        ) : (
          <Text type="body-sm">{(!unknown && tile.reward) || 'Unknown'}</Text>
        )
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
