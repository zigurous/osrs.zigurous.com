import { Tooltip } from '@zigurous/forge-react';
import React, { useCallback, useEffect, useState } from 'react';

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
  const [element, setElement] = useState<T | null>(null);
  const [hovering, setHovering] = useState(false);

  const ref = useCallback<React.RefCallback<T>>(node => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (element) {
      const onTooltipEnter = () => setHovering(true);
      const onTooltipLeave = () => setHovering(false);
      element.addEventListener('mouseenter', onTooltipEnter);
      element.addEventListener('mouseleave', onTooltipLeave);
      return () => {
        element?.removeEventListener('mouseenter', onTooltipEnter);
        element?.removeEventListener('mouseleave', onTooltipLeave);
      };
    } else {
      setHovering(false);
    }
  }, [element]);

  return {
    ref,
    Tooltip: ({ children }: { children: React.ReactNode }) => (
      <React.Fragment>
        {hovering && <Tooltip element={element}>{children}</Tooltip>}
      </React.Fragment>
    ),
  };
}
