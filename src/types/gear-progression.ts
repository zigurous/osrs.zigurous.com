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
  items: string[];
  subcategoryItems?: { id: string; subcategory: string }[];
  stats?: SkillLevelHighlight[];
  upgrades: GearProgressionUpgrade[];
  notes?: string[];
  questMilestone?: string;
  optional?: boolean;
}

export interface GearProgressionUpgrade {
  id: string;
  type: string;
  icon?: string;
  title?: string;
  subtitle?: string;
  items?: string[];
  subitems?: GearProgressionUpgradeSubitem[];
}

export type GearProgressionUpgradeSubitem = Omit<
  GearProgressionUpgrade,
  'items' | 'subitems'
> & {
  setupId?: string;
};
