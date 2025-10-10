import type { EquipmentCategory, GearProgressionCategory } from '../types';

export const equipmentCategories: EquipmentCategory[] = [
  {
    id: 'melee',
    title: 'Melee',
    icon: 'Attack_style_icon',
    subcategoryKey: 'meleeSubcategory',
    subcategories: [
      { id: 'melee-stab', label: 'Stab', icon: 'White_dagger' },
      { id: 'melee-slash', label: 'Slash', icon: 'White_scimitar' },
      { id: 'melee-crush', label: 'Crush', icon: 'White_warhammer' },
      { id: 'melee-spec', label: 'Special', icon: 'Special_attack_orb' },
    ],
  },
  {
    id: 'ranged',
    title: 'Ranged',
    icon: 'Ranged_icon_(detail)',
    subcategoryKey: 'rangedSubcategory',
    subcategories: [
      { id: 'ranged-spec', label: 'Special', icon: 'Special_attack_orb' },
    ],
  },
  {
    id: 'magic',
    title: 'Magic',
    icon: 'Magic_icon_(detail)',
    subcategoryKey: 'magicSubcategory',
    subcategories: [
      { id: 'magic-spec', label: 'Special', icon: 'Special_attack_orb' },
    ],
  },
  {
    id: 'prayer',
    title: 'Prayer',
    icon: 'Prayer_icon_(detail)',
    subcategoryKey: 'prayerSubcategory',
    subcategories: [],
  },
];

export const gearProgressionCategories: GearProgressionCategory[] = [
  {
    id: 'melee',
    title: 'Melee',
    icon: 'Attack_style_icon',
    subcategoryKey: 'meleeSubcategory',
    subcategories: [
      { id: 'melee-stab', label: 'Stab', icon: 'White_dagger' },
      { id: 'melee-slash', label: 'Slash', icon: 'White_scimitar' },
      { id: 'melee-crush', label: 'Crush', icon: 'White_warhammer' },
      { id: 'melee-spec', label: 'Special', icon: 'Special_attack_orb' },
      { id: 'melee-slayer', label: 'Slayer', icon: 'Slayer_icon' },
    ],
  },
  {
    id: 'ranged',
    title: 'Ranged',
    icon: 'Ranged_icon_(detail)',
    subcategoryKey: 'rangedSubcategory',
    subcategories: [
      { id: 'ranged-standard', label: 'Standard', icon: 'Steel_arrow_5' },
      { id: 'ranged-light', label: 'Light', icon: 'Steel_dart' },
      { id: 'ranged-heavy', label: 'Heavy', icon: 'Steel_bolts_5' },
      { id: 'ranged-spec', label: 'Special', icon: 'Special_attack_orb' },
      { id: 'ranged-slayer', label: 'Slayer', icon: 'Slayer_icon' },
    ],
  },
  {
    id: 'magic',
    title: 'Magic',
    icon: 'Magic_icon_(detail)',
    subcategoryKey: 'magicSubcategory',
    subcategories: [
      { id: 'magic-standard', label: 'Standard', icon: 'Standard_spellbook' },
      { id: 'magic-ancient', label: 'Ancient', icon: 'Ancient_spellbook' },
      { id: 'magic-arceuus', label: 'Arceuus', icon: 'Arceuus_spellbook' },
      { id: 'magic-spec', label: 'Special', icon: 'Special_attack_orb' },
      { id: 'magic-slayer', label: 'Slayer', icon: 'Slayer_icon' },
    ],
  },
];
