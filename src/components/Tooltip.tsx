import { ReactPortal } from '@zigurous/forge-react';
import React from 'react';
import '../styles/tooltip.css';

interface TooltipProps {
  text: React.ReactNode;
  element: HTMLElement;
}

export default function Tooltip({ text, element }: TooltipProps) {
  const rect = element.getBoundingClientRect();
  return (
    <ReactPortal>
      <div
        aria-hidden
        className="custom-tooltip caption line-tight"
        role="tooltip"
        style={{
          top: rect.top,
          left: rect.left + rect.width / 2,
        }}
      >
        {text}
      </div>
    </ReactPortal>
  );
}
