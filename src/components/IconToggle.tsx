import { Tooltip } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';
import { useTooltip } from './TooltipWrapper';

interface IconToggleProps {
  className?: string;
  hideTooltip?: boolean;
  icon: string;
  iconSize?: string | number;
  label: string;
  on: boolean;
  onChange: (on: boolean) => void;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export default function IconToggle({
  className,
  hideTooltip = false,
  icon,
  iconSize,
  label,
  on,
  onChange,
  size = 'md',
}: IconToggleProps) {
  const { ref, hovering, onTooltipEnter, onTooltipLeave } =
    useTooltip<HTMLButtonElement>();
  return (
    <button
      className={classNames(
        `icon-toggle item-frame item-frame--${size}`,
        {
          active: on,
        },
        className,
      )}
      onClick={() => onChange(!on)}
      onMouseEnter={onTooltipEnter}
      onMouseLeave={onTooltipLeave}
      ref={ref}
    >
      <img
        alt=""
        aria-hidden
        width={iconSize}
        height={iconSize}
        src={`https://oldschool.runescape.wiki/images/${icon}.png`}
      />
      {hovering && !hideTooltip && (
        <Tooltip element={ref.current}>{label}</Tooltip>
      )}
    </button>
  );
}
