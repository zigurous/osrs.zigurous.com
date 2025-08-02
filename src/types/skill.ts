import { combatSkills, nonCombatSkills, skills, skillingFilters } from '../utils'; // prettier-ignore

export type Skill = (typeof skills)[number];
export type CombatSkill = (typeof combatSkills)[number];
export type NonCombatSkill = (typeof nonCombatSkills)[number];
export type SkillFilter = (typeof skillingFilters)[number];

export type SkillLevels = Record<Skill, number>;

export interface SkillLevel {
  skill: Skill;
  level: number;
}

export type SkillRequirement = SkillLevel & {
  boostable?: boolean;
  ironman?: boolean;
};
