import React from 'react';
import SkillsGrid from './SkillsGrid';
import TitledCard from './TitledCard';
import { useGearProgressionContext } from '../context';
import type { Skill } from '../types';

export default function GearProgressionSkills() {
  const context = useGearProgressionContext();
  const highlighted = context.currentTier.skills?.reduce((skills, stat) => {
    if (stat.highlight) {
      skills.push(stat.skill);
    }
    return skills;
  }, [] as Skill[]);
  return (
    <TitledCard className="gear-progression-card" id="skills" title="Skills">
      <SkillsGrid
        highlighted={highlighted}
        levels={context.currentTier.skillRequirements}
        cols={1}
        rows={8}
      />
    </TitledCard>
  );
}
