import { Button, Stack, Text, TooltipWrapper } from '@zigurous/forge-react';
import React from 'react';
import { useGridMasterContext } from '../context/GridMasterContext';

export default function GridMasterHeader() {
  const context = useGridMasterContext();
  return (
    <Stack
      align="center"
      className="grid-master__header w-full mb-sm"
      justify="between"
    >
      <Text className="ml-2xxl" type="title">
        {context.flipped ? 'Unlocks' : 'Tasks'}
      </Text>
      <Stack align="center">
        <TooltipWrapper
          tooltip={
            context.hideUnconfirmed ? 'Show Unconfirmed' : 'Hide Unconfirmed'
          }
        >
          <Button
            icon={context.hideUnconfirmed ? 'visibility' : 'visibility_off'}
            iconAlignment="only"
            onClick={() => context.setHideUnconfirmed(state => !state)}
            variant="text"
          />
        </TooltipWrapper>
        <TooltipWrapper tooltip="Flip Board">
          <Button
            icon="flip"
            iconAlignment="only"
            onClick={() => context.setFlipped(state => !state)}
            variant="text"
          />
        </TooltipWrapper>
      </Stack>
    </Stack>
  );
}
