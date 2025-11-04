import { Button, TooltipWrapper } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';

interface InfoTooltipProps {
  children: React.ReactNode;
  className?: string;
}

export default function InfoTooltip({ children, className }: InfoTooltipProps) {
  return (
    <TooltipWrapper
      className={classNames('info-tooltip', className)}
      tooltip={children}
      style={{ marginLeft: '-16px', marginTop: '-12px' }}
    >
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
