import { Tooltip } from '@zigurous/forge-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

type TooltipWrapperProps = {
  tooltip: string | React.ReactNode;
} & React.ComponentProps<'div'>;

export default function TooltipWrapper({
  children,
  tooltip,
  ...rest
}: TooltipWrapperProps) {
  const { ref, hovering, onTooltipEnter, onTooltipLeave } =
    useTooltip<HTMLDivElement>();
  return (
    <div
      {...rest}
      onMouseEnter={onTooltipEnter}
      onMouseLeave={onTooltipLeave}
      ref={ref}
    >
      {children}
      {hovering && <Tooltip element={ref.current}>{tooltip}</Tooltip>}
    </div>
  );
}

export function useTooltip<T>() {
  const ref = useRef<T>(null);
  const [hovering, setHovering] = useState(false);

  const onTooltipEnter = useCallback(() => setHovering(true), []);
  const onTooltipLeave = useCallback(() => setHovering(false), []);

  useEffect(() => {
    if (!ref.current) {
      setHovering(false);
    }
  }, [ref.current]);

  return { hovering, ref, onTooltipEnter, onTooltipLeave };
}
