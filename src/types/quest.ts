import type { Skill, SkillRequirement } from './skill';

export type QuestId = string;
export interface Quest {
  id: QuestId;
  title?: string;
  questRequirements?: QuestRequirement[];
  skillRequirements?: SkillRequirement[];
  rewards?: QuestReward[];
}

export type QuestSeriesId = string;
export interface QuestSeries {
  id: QuestSeriesId;
  link?: string;
  title?: string;
  caption?: string;
  quests: string[];
  unlocks?: string[];
}

export type QuestRequirement = string;

export interface QuestReward {
  skill: Skill;
  experience: number;
  lamp?: boolean;
}

export interface QuestOrder {
  mode: string;
  quests: QuestId[];
}
