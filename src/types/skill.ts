import { combatSkills, nonCombatSkills, skills } from '../utils';

export type Skill = (typeof skills)[number];
export type CombatSkill = (typeof combatSkills)[number];
export type NonCombatSkill = (typeof nonCombatSkills)[number];
