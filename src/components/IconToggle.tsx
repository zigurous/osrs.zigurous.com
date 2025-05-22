import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import Tooltip from './Tooltip';

interface IconToggleProps {
  icon: string;
  label: string;
  on: boolean;
  onChange: (on: boolean) => void;
}

export default function IconToggle({
  icon,
  label,
  on,
  onChange,
}: IconToggleProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovering, setHovering] = useState(false);
  return (
    <button
      className={classNames('icon-toggle item-frame item-frame--xs', {
        active: on,
      })}
      onClick={() => onChange(!on)}
      onMouseEnter={e => setHovering(true)}
      onMouseLeave={e => setHovering(false)}
      ref={ref}
    >
      <img
        alt=""
        aria-hidden
        src={`https://oldschool.runescape.wiki/images/${icon}.png`}
      />
      {hovering && ref.current && (
        <Tooltip element={ref.current} text={label} />
      )}
    </button>
  );
}
