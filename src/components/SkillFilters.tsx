import { Tooltip } from '@zigurous/forge-react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { useSkillingFilterContext } from '../context';
import { formatNameFromId, getIconForSortingGroup, skillingFilters } from '../utils'; // prettier-ignore
import type { SkillFilter } from '../types';
import '../styles/skill-filters.css';

interface SkillFiltersProps {
  className?: string;
  disabledFilters?: SkillFilter[];
}

export default function SkillFilters({
  className,
  disabledFilters = [],
}: SkillFiltersProps) {
  return (
    <div className={classNames('skill-filters', className)}>
      {skillingFilters.map(filter => (
        <SkillFilterButton
          disabled={disabledFilters.includes(filter)}
          filter={filter}
          key={filter}
        />
      ))}
    </div>
  );
}

interface SkillFilterButtonProps {
  filter: SkillFilter;
  disabled?: boolean;
}

function SkillFilterButton({
  filter,
  disabled = false,
}: SkillFilterButtonProps) {
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
        <Tooltip element={ref.current}>{label}</Tooltip>
      )}
    </button>
  );
}
