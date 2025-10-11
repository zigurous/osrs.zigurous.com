import { Button, TooltipWrapper } from '@zigurous/forge-react';
import React from 'react';

interface InfoTooltipProps {
  children: React.ReactNode;
}

export default function InfoTooltip({ children }: InfoTooltipProps) {
  return (
    <TooltipWrapper className="info-tooltip ml-sm" tooltip={children}>
      <Button
        className="opacity-muted"
        icon="info_outline"
        iconAlignment="only"
        shape="circle"
        variant="unstyled"
      />
    </TooltipWrapper>
  );
}
