import React from 'react';
import TooltipWrapper from './TooltipWrapper';
import WikiIcon from './WikiIcon';
import WikiLink from './WikiLink';
import unknownRewardIcon from '../images/grid-master-unknown-reward.png';
import { formatNameFromId } from '../utils';
import type { GridMasterReward } from '../types'; // prettier-ignore

interface GridMasterRewardCellProps {
  data: GridMasterReward | undefined;
}

export default function GridMasterRewardCell({
  data,
}: GridMasterRewardCellProps) {
  return (
    <TooltipWrapper
      className="grid-master__cell grid-master__cell--reward item-frame"
      id={data?.id}
      tooltip={data ? data.title || formatNameFromId(data.id) : 'Unknown'}
    >
      <WikiLink wikiId={data?.id || 'Grid_Master#Unlocks'}>
        {data ? (
          <WikiIcon icon={data.icon} size={32} />
        ) : (
          <img alt="" aria-hidden src={unknownRewardIcon} />
        )}
      </WikiLink>
    </TooltipWrapper>
  );
}
