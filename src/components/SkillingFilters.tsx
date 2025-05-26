import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import Tooltip from './Tooltip';
import { useSkillingFilterContext } from '../context';
import { formatNameFromId, getIconForSortingGroup, skillingFilters } from '../utils'; // prettier-ignore
import type { SkillingFilter } from '../types';
import '../styles/activity-filter.css';

interface SkillingFiltersProps {
  className?: string;
  disabledFilters?: SkillingFilter[];
}

export default function SkillingFilters({
  className,
  disabledFilters = [],
}: SkillingFiltersProps) {
  return (
    <div className={classNames('activity-filter', className)}>
      {skillingFilters.map(filter => (
        <SkillingFilterButton
          disabled={disabledFilters.includes(filter)}
          filter={filter}
          key={filter}
        />
      ))}
    </div>
  );
}

interface SkillingFilterButtonProps {
  filter: SkillingFilter;
  disabled?: boolean;
}

function SkillingFilterButton({
  filter,
  disabled = false,
}: SkillingFilterButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovering, setHovering] = useState(false);
  const context = useSkillingFilterContext();
  const selected = !disabled && context.selectedFilters.includes(filter);
  const label = formatNameFromId(filter);
  return (
    <button
      aria-label={label}
      className={classNames({ selected })}
      disabled={disabled}
      id={filter}
      onClick={e => {
        if (e.shiftKey) {
          context.selectRange(filter);
        } else if (e.ctrlKey) {
          if (selected) {
            context.removeFilter(filter);
          } else {
            context.addFilter(filter);
          }
        } else {
          if (selected && context.selectedFilters.length === 1) {
            context.clearFilter();
          } else {
            context.setFilter(filter);
          }
        }
      }}
      onMouseEnter={e => setHovering(true)}
      onMouseLeave={e => setHovering(false)}
      ref={ref}
    >
      <img
        alt=""
        aria-hidden
        src={`https://oldschool.runescape.wiki/images/${getIconForSortingGroup(filter)}.png`}
      />
      {hovering && ref.current && (
        <Tooltip element={ref.current} text={label} />
      )}
    </button>
  );
}
