import { skills } from '../utils/constants';

export type Skill = (typeof skills)[number];
export type SkillLevels = Record<Skill, number>;

export interface SkillLevel {
  skill: Skill;
  level: number;
}

export type SkillRequirement = SkillLevel & {
  boostable?: boolean;
  ironman?: boolean;
};

export type SkillLevelHighlight = SkillLevel & {
  highlight?: boolean;
};
