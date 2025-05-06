import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import Tooltip from './Tooltip';
import { useFilterContext } from '../context';
import { activityFilters, formatNameFromId, getIconForActivityGroup } from '../utils'; // prettier-ignore
import '../styles/activity-filter.css';

type Filter = (typeof activityFilters)[number];

interface ActivityFilterProps {
  className?: string;
  disabledFilters?: Filter[];
}

export default function ActivityFilter({
  className,
  disabledFilters = [],
}: ActivityFilterProps) {
  return (
    <div className={classNames('activity-filter', className)}>
      {activityFilters.map(filter => (
        <FilterButton
          disabled={disabledFilters.includes(filter)}
          filter={filter}
          key={filter}
        />
      ))}
    </div>
  );
}

interface FilterButtonProps {
  filter: Filter;
  disabled?: boolean;
}

function FilterButton({ filter, disabled = false }: FilterButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovering, setHovering] = useState(false);
  const context = useFilterContext();
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
        src={`https://oldschool.runescape.wiki/images/${getIconForActivityGroup(filter)}.png`}
      />
      {hovering && ref.current && (
        <Tooltip element={ref.current} text={label} />
      )}
    </button>
  );
}
