import React from 'react';
import SkillsGrid from './SkillsGrid';
import TitledCard from './TitledCard';
import { useGearProgressionContext } from '../context';
import type { SkillLevels } from '../types';

export default function GearProgressionStats() {
  const context = useGearProgressionContext();
  const diff =
    context.current.stats?.reduce((diff, stat) => {
      if (stat.highlight) {
        diff[stat.skill] = context.previous?.skillRequirements[stat.skill] || 1;
      }
      return diff;
    }, {} as Partial<SkillLevels>) || {};
  return (
    <TitledCard className="gear-progression-card" id="stats" title="Skills">
      <SkillsGrid
        levels={context.current.skillRequirements}
        previous={diff}
        cols={1}
        rows={8}
      />
    </TitledCard>
  );
}
