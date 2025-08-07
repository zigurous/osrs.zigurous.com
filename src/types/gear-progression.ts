import type { EquipmentCategory, EquipmentSlots } from './equipment';
import type { SkillLevels } from './skill';

export interface GearProgressionQueryData {
  progression: {
    nodes: GearProgressionCategory[];
  };
}

export interface GearProgressionCategory {
  category: 'melee' | 'ranged' | 'magic';
  tiers: GearProgressionTier[];
}

export interface GearProgressionTier {
  title: string;
  summary: string[];
  items: string[];
  questMilestone?: string;
  optional?: boolean;
}

export interface GearProgressionContext {
  tierIndex: number;
  highestTier: number;
  setTier: React.Dispatch<React.SetStateAction<number>>;
  category: EquipmentCategory;
  current: GearProgressionContextTier;
  previous: GearProgressionContextTier;
}

export type GearProgressionContextTier = GearProgressionTier & {
  equipment: EquipmentSlots;
  skillRequirements: Partial<SkillLevels>;
};
