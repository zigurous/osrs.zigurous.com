import type { EquipmentCategory, EquipmentItem, EquipmentSubcategoryId, EquippedItems } from './equipment'; // prettier-ignore
import type { Quest } from './quest';
import type { SkillLevelHighlight, SkillLevels } from './skill';

export type GearProgressionCategoryId = 'melee' | 'ranged' | 'magic';
export type GearProgressionSubcategoryId = EquipmentSubcategoryId;

export type GearProgressionCategory = Omit<EquipmentCategory, 'id'> & {
  id: GearProgressionCategoryId;
};

export interface GearProgressionTier {
  title: string;
  categories: (GearProgressionCategoryId | 'all')[];
  items?: GearProgressionCategoryItem[];
  subcategoryItems?: GearProgressionSubcategoryItem[];
  skills?: SkillLevelHighlight[];
  timeline: GearProgressionTimelineCard[];
  notes?: string[];
  questMilestone?: string;
}

export interface GearProgressionCategoryItem {
  id: string;
  category: GearProgressionCategoryId | 'all';
}

export interface GearProgressionSubcategoryItem {
  id: string;
  subcategory: GearProgressionSubcategoryId;
}

export interface GearProgressionTimelineCard {
  id: string;
  icon: string;
  category?: GearProgressionCategoryId;
  title?: string;
  subtitle?: string;
  items?: string[];
  subcards?: GearProgressionTimelineSubCard[];
}

export type GearProgressionTimelineSubCard = Omit<
  GearProgressionTimelineCard,
  'items' | 'subcards' | 'category'
> & {
  setupId?: string;
};

export type GearProgressionContextCategory = GearProgressionCategory & {
  tiers: GearProgressionContextTier[];
  sequence: GearProgressionContextTier[];
};

export type GearProgressionContextTier = Omit<
  GearProgressionTier,
  'categories'
> & {
  equipment: Record<string, EquippedItems>;
  trackedItems: Set<string>;
  skillRequirements: Partial<SkillLevels>;
  tierIndex: number;
  sequenceIndex?: number;
  previous?: GearProgressionContextTier;
  next?: GearProgressionContextTier;
  hidden?: boolean;
};

export interface GearProgressionWorkerInput {
  tiers: GearProgressionTier[];
  category: GearProgressionCategory;
  equipment: EquipmentItem[];
  quests: Quest[];
}
