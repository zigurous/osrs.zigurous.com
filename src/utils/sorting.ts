import { skills } from './constants';
import { getIconForActivity } from './icons';
import type { Activity } from '../types/activity';
import type { Skill } from '../types/skill';

export function sortById(a: string, b: string): number {
  return a.localeCompare(b);
}

export function sortByName(
  a: { id: string; title?: string; name?: string },
  b: { id: string; title?: string; name?: string },
): number {
  return (a.title || a.name || a.id).localeCompare(b.title || b.name || b.id);
}

export function sortByIndex(a: number, b: number): number {
  if (a === -1) a = Number.MAX_SAFE_INTEGER;
  if (b === -1) b = Number.MAX_SAFE_INTEGER;
  return a - b;
}

export function sortByIcon(a: Activity, b: Activity): number {
  const aIcon = getIconForActivity(a);
  const bIcon = getIconForActivity(b);
  return sortByIndex(
    aIcon ? iconSortOrder.indexOf(aIcon) : -1,
    bIcon ? iconSortOrder.indexOf(bIcon) : -1,
  );
}

export function sortByLevel(a: Activity, b: Activity): number {
  let aLevel = Array.isArray(a.requiredLevel)
    ? a.requiredLevel[0]
    : a.requiredLevel;
  let bLevel = Array.isArray(b.requiredLevel)
    ? b.requiredLevel[0]
    : b.requiredLevel;
  if (aLevel === bLevel && aLevel !== 0) {
    if (a.caption && !b.caption) {
      return 1;
    } else if (b.caption && !a.caption) {
      return -1;
    } else if (a.caption && b.caption) {
      return a.caption.localeCompare(b.caption, undefined, { numeric: true });
    }
  }
  return (aLevel || 0) - (bLevel || 0);
}

export function sortBySkill(a: Activity, b: Activity): number {
  const aSkill = a.sortingGroups.find(g =>
    skills.includes(g as Skill),
  ) as Skill;
  const bSkill = b.sortingGroups.find(g =>
    skills.includes(g as Skill),
  ) as Skill;
  return sortByIndex(
    aSkill ? skills.indexOf(aSkill) : -1,
    bSkill ? skills.indexOf(bSkill) : -1,
  );
}

const iconSortOrder = [
  // combat
  'Raids',
  'Master_Reanimation',
  'Monster_Examine',
  'Combat_icon',
  'Skull_(status)_icon',
  'Hitpoints_icon',
  'Attack_icon',
  'Strength_icon',
  'Defence_icon',
  'Ranged_icon',
  'Prayer_icon',
  'Magic_icon',
  'Standard_spellbook',
  'Ancient_spellbook',
  'Arceuus_spellbook',
  'Lunar_spellbook',
  // skilling
  'Runecraft_icon',
  'Construction_icon',
  'Agility_icon',
  'Herblore_icon',
  'Thieving_icon',
  'Crafting_icon',
  'Fletching_icon',
  'Slayer_icon',
  'Hunter_icon',
  'Mining_icon',
  'Smithing_icon',
  'Fishing_icon',
  'Cooking_icon',
  'Firemaking_icon',
  'Woodcutting_icon',
  'Farming_icon',
  'Sailing_icon',
  // other
  'Flax',
  'Crystal_key',
  'Minigame_icon',
  'Quest_point_icon',
  'Achievement_Diaries_icon',
  'Distractions_and_Diversions',
  'Music',
  'Stats_icon',
  'Collection_log',
  'Map_link_icon',
  'Dungeon_map_link_icon',
  'Anvil_icon',
  'Furnace_icon',
  'Cooking_range_icon',
  'Port_map_icon',
];
