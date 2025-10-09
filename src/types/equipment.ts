import type { ItemData } from './item';
import type { SkillRequirement } from './skill';
import { equipmentSlots } from '../utils';

export type EquipmentSlotId = (typeof equipmentSlots)[number];

export interface EquipmentItem extends Omit<ItemData, 'transmutations'> {
  slot: EquipmentSlotId;
  regions?: string[];
  regions_single?: string[];
  requiredWeapon?: string;
  ammo?: Omit<EquipmentItem, 'ammo'>;
  requirements?: SkillRequirement[];
}

export interface EquipmentSlot {
  id: EquipmentSlotId;
  item?: EquipmentItem;
}

export type EquippedItems = Partial<Record<EquipmentSlotId, EquipmentItem>>;
export type EquippedItemIds = Partial<Record<EquipmentSlotId, string>>;

export type EquipmentCategoryId = 'melee' | 'ranged' | 'magic' | 'prayer';
export type EquipmentSubcategoryId =
  | EquipmentSubcategoryIdMelee
  | EquipmentSubcategoryIdRanged
  | EquipmentSubcategoryIdMagic;

export interface EquipmentCategory {
  id: EquipmentCategoryId;
  title: string;
  icon: string;
  subcategoryKey: keyof EquipmentSubcategories;
  subcategories: { id: EquipmentSubcategoryId; label: string; icon: string }[];
}

export type EquipmentSubcategoryIdMelee =
  | 'melee-stab'
  | 'melee-slash'
  | 'melee-crush'
  | 'melee-spec'
  | 'melee-slayer';

export type EquipmentSubcategoryIdRanged =
  | 'ranged-standard'
  | 'ranged-light'
  | 'ranged-heavy'
  | 'ranged-spec'
  | 'ranged-slayer';

export type EquipmentSubcategoryIdMagic =
  | 'magic-standard'
  | 'magic-ancient'
  | 'magic-arceuus'
  | 'magic-spec'
  | 'magic-slayer';

export interface EquipmentSubcategories {
  meleeSubcategory: EquipmentSubcategoryIdMelee | undefined;
  rangedSubcategory: EquipmentSubcategoryIdRanged | undefined;
  magicSubcategory: EquipmentSubcategoryIdMagic | undefined;
  prayerSubcategory: undefined;
}

export interface BestInSlotQueryData {
  priority: {
    nodes: BestInSlotCategory[];
  };
}

export interface BestInSlotCategory {
  category: string;
  equipment: {
    id: EquipmentSlotId;
    items: string[];
  }[];
}
