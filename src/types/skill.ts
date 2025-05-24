import { combatSkills, nonCombatSkills, skills, skillingFilters } from '../utils'; // prettier-ignore

export type Skill = (typeof skills)[number];
export type CombatSkill = (typeof combatSkills)[number];
export type NonCombatSkill = (typeof nonCombatSkills)[number];
export type SkillingFilter = (typeof skillingFilters)[number];
