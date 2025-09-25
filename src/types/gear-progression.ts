import type { EquipmentCategory } from './equipment';
import type { SkillLevelHighlight } from './skill';

export type GearProgressionCategoryId = 'melee' | 'ranged' | 'magic';

export type GearProgressionCategory = Omit<
  EquipmentCategory,
  'id' | 'subcategoryKey'
> & {
  id: GearProgressionCategoryId;
  subcategoryKey: keyof GearProgressionSubcategories;
};

export interface GearProgressionSubcategories {
  meleeSubcategory: string | undefined;
  rangedSubcategory: string | undefined;
  magicSubcategory: string | undefined;
}

export interface GearProgressionTier {
  title: string;
  items?: string[];
  subcategoryItems?: { id: string; subcategory: string }[];
  skills?: SkillLevelHighlight[];
  timeline: GearProgressionTimelineCard[];
  notes?: string[];
  questMilestone?: string;
}

export interface GearProgressionTimelineCard {
  id: string;
  icon: string;
  title?: string;
  subtitle?: string;
  items?: string[];
  subcards?: GearProgressionTimelineSubCard[];
}

export type GearProgressionTimelineSubCard = Omit<
  GearProgressionTimelineCard,
  'items' | 'subcards'
> & {
  setupId?: string;
};
