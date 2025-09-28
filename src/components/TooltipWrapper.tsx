import { Tooltip } from '@zigurous/forge-react';
import React, { useEffect, useRef, useState } from 'react';

type TooltipWrapperProps = {
  tooltip: string | React.ReactNode;
} & React.ComponentProps<'div'>;

export default function TooltipWrapper({
  children,
  tooltip,
  ...rest
}: TooltipWrapperProps) {
  const { ref, Tooltip } = useTooltip<HTMLDivElement>();
  return (
    <div {...rest} ref={ref}>
      {children}
      <Tooltip>{tooltip}</Tooltip>
    </div>
  );
}

export function useTooltip<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const onTooltipEnter = () => setHovering(true);
      const onTooltipLeave = () => setHovering(false);
      ref.current.addEventListener('mouseenter', onTooltipEnter);
      ref.current.addEventListener('mouseleave', onTooltipLeave);
      return () => {
        ref.current?.removeEventListener('mouseenter', onTooltipEnter);
        ref.current?.removeEventListener('mouseleave', onTooltipLeave);
      };
    } else {
      setHovering(false);
    }
  }, [ref.current]);

  return {
    ref,
    Tooltip: ({ children }: { children: React.ReactNode }) => (
      <React.Fragment>
        {hovering && <Tooltip element={ref.current}>{children}</Tooltip>}
      </React.Fragment>
    ),
  };
}
