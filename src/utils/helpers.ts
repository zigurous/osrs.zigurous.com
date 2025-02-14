import { activityFilters, combatSkills, nonCombatSkills, skills } from './constants'; // prettier-ignore
import { capitalizeFirstLetter } from './formatting';
import type { Activity, ActivityGroup, CombatSkill, CombatStyle, NonCombatSkill, Skill } from '../types'; // prettier-ignore

export function sortByName(
  a: { id: string; title?: string; name?: string },
  b: { id: string; title?: string; name?: string },
): number {
  return (a.title || a.name || a.id).localeCompare(b.title || b.name || b.id);
}

export function sortBySkill(a: Activity, b: Activity): number {
  let aIndex = a.subcategory ? skills.indexOf(a.subcategory as Skill) : -1;
  let bIndex = b.subcategory ? skills.indexOf(b.subcategory as Skill) : -1;
  if (aIndex === -1) aIndex = Number.MAX_SAFE_INTEGER;
  if (bIndex === -1) bIndex = Number.MAX_SAFE_INTEGER;
  return aIndex - bIndex || sortByName(a, b);
}

export function sortByActivity(a: Activity, b: Activity): number {
  let aIndex = activityFilters.indexOf(getActivityGroup(a));
  let bIndex = activityFilters.indexOf(getActivityGroup(b));
  if (aIndex === -1) aIndex = Number.MAX_SAFE_INTEGER;
  if (bIndex === -1) bIndex = Number.MAX_SAFE_INTEGER;
  return aIndex - bIndex || sortByName(a, b);
}

export function getActivityGroup(activity: Activity): ActivityGroup {
  if (activityFilters.includes(activity.subcategory as ActivityGroup)) {
    return activity.subcategory as ActivityGroup;
  }
  // prettier-ignore
  switch (activity.category) {
    case 'boss': return 'pvm';
    case 'raid': return 'pvm';
    default: return 'misc';
  }
}

export function getIconForActivity(activity: Activity): string | undefined {
  const activityGroup = getActivityGroup(activity);
  switch (activityGroup) {
    case 'pvm':
      if (activity.icon) return activity.icon;
      break;
    case 'quest':
    case 'misc':
      // prettier-ignore
      switch (activity.category) {
        case 'boss': return 'Monster_Examine';
        case 'guild': return 'Map_link_icon';
        case 'minigame': return 'Minigame_icon';
        case 'raid': return 'Raids_icon';
      }
      break;
  }
  return getIconForActivityGroup(activityGroup);
}

export function getIconForActivityGroup(
  activityGroup: ActivityGroup,
): string | undefined {
  switch (activityGroup) {
    case 'pvm':
      return 'Combat_icon';
    case 'pvp':
      return 'Skull_(status)_icon';
    case 'melee':
    case 'ranged':
    case 'magic':
      return getIconForCombatStyle(activityGroup as CombatStyle);
    case 'prayer':
    case 'runecraft':
    case 'construction':
    case 'agility':
    case 'herblore':
    case 'thieving':
    case 'crafting':
    case 'fletching':
    case 'slayer':
    case 'hunter':
    case 'mining':
    case 'smithing':
    case 'fishing':
    case 'cooking':
    case 'firemaking':
    case 'woodcutting':
    case 'farming':
      return getIconForSkill(activityGroup as Skill);
    case 'quest':
      return 'Quest_point_icon';
    case 'misc':
      return 'Instruction_manual';
  }
}

export function getIconForCombatStyle(style: CombatStyle): string | undefined {
  // prettier-ignore
  switch (style) {
    case 'melee': return 'Attack_icon';
    case 'ranged': return 'Ranged_icon';
    case 'magic': return 'Magic_icon';
    case 'hybrid': return 'Hybrid';
    // Fallback to skill icons since some bosses and activities are
    // skilling-based combat activities, e.g., Wintertodt, Tempoross, etc.
    default: return getIconForSkill(style as Skill);
  }
}

export function getIconForSkill(skill: Skill): string | undefined {
  return isSkill(skill) ? `${capitalizeFirstLetter(skill)}_icon` : undefined;
}

export function autoDetectItemIcon(id: string): string | undefined {
  return [
    '_arrow',
    '_bolts',
    '_bolts_(e)',
    '_bolt_tips',
    '_javelin_heads',
    '_seed',
  ].some(str => id.endsWith(str))
    ? `${id}_5`
    : undefined;
}

export function isSkill(key: string | undefined): boolean {
  return !!key && skills.includes(key as Skill);
}

export function isCombatSkill(key: string | undefined): boolean {
  return !!key && combatSkills.includes(key as CombatSkill);
}

export function isNonCombatSkill(key: string | undefined): boolean {
  return !!key && nonCombatSkills.includes(key as NonCombatSkill);
}
