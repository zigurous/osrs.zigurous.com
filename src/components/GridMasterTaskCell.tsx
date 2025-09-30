import React from 'react';
import TooltipWrapper from './TooltipWrapper';
import WikiIcon from './WikiIcon';
import unknownTaskIcon from '../images/grid-master-unknown-task.png';
import { useGridMasterContext } from '../context';
import { formatNameFromId } from '../utils';
import type { GridMasterTask } from '../types'; // prettier-ignore

interface GridMasterTaskCellProps {
  data: GridMasterTask | undefined;
}

export default function GridMasterTaskCell({ data }: GridMasterTaskCellProps) {
  const { viewTask } = useGridMasterContext();
  return (
    <TooltipWrapper
      className="grid-master__cell grid-master__cell--task item-frame"
      id={data?.id}
      onClick={data ? () => viewTask(data.id) : undefined}
      tooltip={data ? data.title || formatNameFromId(data.id) : 'Unknown'}
    >
      {data ? (
        <WikiIcon icon={data.icon} size={32} />
      ) : (
        <img alt="" aria-hidden src={unknownTaskIcon} />
      )}
    </TooltipWrapper>
  );
}
