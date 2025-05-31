import { Button } from '@zigurous/forge-react';
import React, { useRef, useState } from 'react';
import Tooltip from './Tooltip';

interface HelpTooltipProps {
  text: React.ReactNode;
}

export default function HelpTooltip({ text }: HelpTooltipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  return (
    <div className="help-tooltip ml-sm" ref={ref}>
      <Button
        className="opacity-muted"
        icon="help_outline"
        iconAlignment="only"
        onMouseEnter={e => setHovering(true)}
        onMouseLeave={e => setHovering(false)}
        shape="circle"
        variant="unstyled"
      />
      {hovering && ref.current && text && (
        <Tooltip element={ref.current} text={text} />
      )}
    </div>
  );
}
