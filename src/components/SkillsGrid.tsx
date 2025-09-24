import '../styles/skills-grid.css';
import { Text } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';
import WikiIcon from './WikiIcon';
import { getIconForSkill, skills as allSkills } from '../utils';
import type { Skill, SkillLevels } from '../types';

interface SkillsGridProps {
  className?: string;
  cols?: number;
  highlighted?: Skill[];
  levels: Partial<SkillLevels>;
  major?: 'row' | 'column';
  rows?: number;
  skills?: Skill[];
  style?: React.CSSProperties;
}

export default function SkillsGrid({
  className,
  cols = 3,
  highlighted,
  levels,
  major = 'column',
  rows = 8,
  skills,
  style,
}: SkillsGridProps) {
  return (
    <ul
      className={classNames('skills-grid', className)}
      style={{
        ...style,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridAutoFlow: major,
      }}
    >
      {(skills || allSkills).map(skill => (
        <li
          aria-label={skill}
          className={classNames({
            changed: highlighted?.includes(skill),
          })}
          key={skill}
        >
          <WikiIcon icon={getIconForSkill(skill)!} />
          <Text className="ml-sm mr-xxs" color="muted" type="body-sm">
            {levels[skill] || (skill === 'hitpoints' ? 10 : 1)}
          </Text>
        </li>
      ))}
    </ul>
  );
}
