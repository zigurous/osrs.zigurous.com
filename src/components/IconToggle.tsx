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
  const { ref, Tooltip } = useTooltip<HTMLButtonElement>();
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
      ref={ref}
    >
      <img
        alt=""
        aria-hidden
        width={iconSize}
        height={iconSize}
        src={`https://oldschool.runescape.wiki/images/${icon}.png`}
      />
      {!hideTooltip && <Tooltip>{label}</Tooltip>}
    </button>
  );
}
