import type { SkillLevel, SkillRequirement } from './skill';

export type QuestId = string;
export interface Quest {
  id: QuestId;
  title?: string;
  questRequirements?: QuestRequirement[];
  skillRequirements?: SkillRequirement[];
  newSkillLevels?: SkillLevel[];
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
