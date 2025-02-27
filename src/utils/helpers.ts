import { activityFilters, combatSkills, iconOrder, nonCombatSkills, skills } from './constants'; // prettier-ignore
import { capitalizeFirstLetter } from './formatting';
import type { Activity, ActivityGroup, CombatSkill, CombatStyle, NonCombatSkill, Skill } from '../types'; // prettier-ignore

export function sortByName(
  a: { id: string; title?: string; name?: string },
  b: { id: string; title?: string; name?: string },
): number {
  return (a.title || a.name || a.id).localeCompare(b.title || b.name || b.id);
}

export function sortByActivity(a: Activity, b: Activity): number {
  const aGroup = a.sortingGroups.length > 0 ? a.sortingGroups[0] : 'misc';
  const bGroup = b.sortingGroups.length > 0 ? b.sortingGroups[0] : 'misc';
  let aIndex = activityFilters.indexOf(aGroup);
  let bIndex = activityFilters.indexOf(bGroup);
  if (aIndex === -1) aIndex = Number.MAX_SAFE_INTEGER;
  if (bIndex === -1) bIndex = Number.MAX_SAFE_INTEGER;
  return aIndex - bIndex || sortByName(a, b);
}

export function sortByIcon(a: Activity, b: Activity): number {
  const aIcon = getIconForActivity(a);
  const bIcon = getIconForActivity(b);
  let aIndex = aIcon ? iconOrder.indexOf(aIcon) : -1;
  let bIndex = bIcon ? iconOrder.indexOf(bIcon) : -1;
  if (aIndex === -1) aIndex = Number.MAX_SAFE_INTEGER;
  if (bIndex === -1) bIndex = Number.MAX_SAFE_INTEGER;
  if (a.icon && a.sortingGroups[0] === 'pvm') aIndex = Number.MIN_SAFE_INTEGER;
  if (b.icon && b.sortingGroups[0] === 'pvm') bIndex = Number.MIN_SAFE_INTEGER;
  return aIndex - bIndex || sortByName(a, b);
}

export function sortByIconAndLevel(a: Activity, b: Activity): number {
  const aIcon = getIconForActivity(a);
  const bIcon = getIconForActivity(b);
  let aIndex = aIcon ? iconOrder.indexOf(aIcon) : -1;
  let bIndex = bIcon ? iconOrder.indexOf(bIcon) : -1;
  let aLevel = a.requiredLevel ?? 0;
  let bLevel = b.requiredLevel ?? 0;
  if (aIndex === -1) aIndex = Number.MAX_SAFE_INTEGER;
  if (bIndex === -1) bIndex = Number.MAX_SAFE_INTEGER;
  if (a.icon && a.sortingGroups[0] === 'pvm') aIndex = Number.MIN_SAFE_INTEGER;
  if (b.icon && b.sortingGroups[0] === 'pvm') bIndex = Number.MIN_SAFE_INTEGER;
  return aIndex - bIndex || aLevel - bLevel || sortByName(a, b);
}

export function sortBySkill(a: Activity, b: Activity): number {
  const aSkill = getAssociatedSkill(a);
  const bSkill = getAssociatedSkill(b);
  let aIndex = aSkill ? skills.indexOf(aSkill) : -1;
  let bIndex = bSkill ? skills.indexOf(bSkill) : -1;
  if (aIndex === -1) aIndex = Number.MAX_SAFE_INTEGER;
  if (bIndex === -1) bIndex = Number.MAX_SAFE_INTEGER;
  return aIndex - bIndex || sortByName(a, b);
}

export function getAssociatedSkill(activity: Activity): Skill | undefined {
  return activity.sortingGroups.find(g => skills.includes(g as Skill)) as Skill;
}

export function getIconForActivity(activity: Activity): string | undefined {
  // prettier-ignore
  switch (activity.category) {
    case 'chest': return 'Crystal_key';
    case 'dungeon': return 'Dungeon_map_link_icon';
    case 'location': return 'Map_link_icon';
  }

  const sortingGroup =
    activity.sortingGroups.length > 0 ? activity.sortingGroups[0] : 'misc';
  if (sortingGroup === 'pvm' && activity.icon) return activity.icon;

  const icon = getIconForActivityGroup(sortingGroup);
  if (icon && sortingGroup !== 'misc') return icon;

  // prettier-ignore
  switch (activity.category) {
    case 'boss': return 'Master_Reanimation';
    case 'distraction_and_diversion': return 'Distractions_and_Diversions';
    case 'guild': return 'Map_link_icon';
    case 'minigame': return 'Minigame_icon';
    case 'monster': return 'Monster_Examine';
    case 'raid': return 'Raids';
  }

  return 'Collection_log';
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
    case 'dungeon':
      return 'Dungeon_map_link_icon';
    case 'misc':
      return 'Collection_log';
    default:
      return undefined;
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
