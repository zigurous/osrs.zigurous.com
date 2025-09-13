import { Tooltip } from '@zigurous/forge-react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';

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
  const ref = useRef<HTMLButtonElement>(null);
  const [hovering, setHovering] = useState(false);
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
      onMouseEnter={e => setHovering(true)}
      onMouseLeave={e => setHovering(false)}
      ref={ref}
    >
      <img
        alt=""
        aria-hidden
        width={iconSize}
        height={iconSize}
        src={`https://oldschool.runescape.wiki/images/${icon}.png`}
      />
      {hovering && ref.current && !hideTooltip && (
        <Tooltip element={ref.current}>{label}</Tooltip>
      )}
    </button>
  );
}
