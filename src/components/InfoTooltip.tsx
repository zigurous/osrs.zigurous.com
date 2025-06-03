import { Button, Tooltip } from '@zigurous/forge-react';
import React, { useRef, useState } from 'react';

interface InfoTooltipProps {
  children: React.ReactNode;
}

export default function InfoTooltip({ children }: InfoTooltipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  return (
    <div className="info-tooltip ml-sm" ref={ref}>
      <Button
        className="opacity-muted"
        icon="info_outline"
        iconAlignment="only"
        onMouseEnter={e => setHovering(true)}
        onMouseLeave={e => setHovering(false)}
        shape="circle"
        variant="unstyled"
      />
      {hovering && ref.current && children && (
        <Tooltip element={ref.current}>{children}</Tooltip>
      )}
    </div>
  );
}
