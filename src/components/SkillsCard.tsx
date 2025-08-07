import classNames from 'classnames';
import React from 'react';
import SkillsGrid from './SkillsGrid';
import TitledCard from './TitledCard';
import type { Skill, SkillLevels } from '../types';

interface SkillsCardProps {
  className?: string;
  levels: Partial<SkillLevels>;
  previous?: Partial<SkillLevels>;
  skills?: Skill[];
  title?: string;
}

export default function SkillsCard({
  className,
  levels,
  previous,
  skills,
  title,
}: SkillsCardProps) {
  return (
    <TitledCard
      className={classNames('skills-card', className)}
      title={title || 'Skills'}
      titleIcon="Stats_icon"
    >
      <SkillsGrid levels={levels} previous={previous} skills={skills} />
    </TitledCard>
  );
}
