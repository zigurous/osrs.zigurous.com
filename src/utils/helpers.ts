import { combatSkills, iconOrder, nonCombatSkills, skills } from './constants'; // prettier-ignore
import { capitalizeFirstLetter } from './formatting';
import type { Activity, CombatSkill, CombatStyle, NonCombatSkill, Skill, SortingGroup, Spell, Spellbook } from '../types'; // prettier-ignore

const autoDetectedItemSuffixes = [
  '_arrow',
  '_bolts',
  '_bolts_(e)',
  '_bolts_(unf)',
  '_bolts(unf)',
  '_bolt_tips',
  '_javelin_heads',
  '_seed',
];

export function sortByName(
  a: { id: string; title?: string; name?: string },
  b: { id: string; title?: string; name?: string },
): number {
  return (a.title || a.name || a.id).localeCompare(b.title || b.name || b.id);
}

export function sortByIcon(a: Activity, b: Activity): number {
  const aIcon = getIconForActivity(a);
  const bIcon = getIconForActivity(b);
  let aIndex = aIcon ? iconOrder.indexOf(aIcon) : -1;
  let bIndex = bIcon ? iconOrder.indexOf(bIcon) : -1;
  if (aIndex === -1) aIndex = Number.MAX_SAFE_INTEGER;
  if (bIndex === -1) bIndex = Number.MAX_SAFE_INTEGER;
  return aIndex - bIndex;
}

export function sortByLevel(a: Activity, b: Activity): number {
  let aLevel = a.requiredLevel ?? 0;
  let bLevel = b.requiredLevel ?? 0;
  if (aLevel === bLevel && aLevel !== 0) {
    if (a.caption && !b.caption) {
      return 1;
    } else if (b.caption && !a.caption) {
      return -1;
    } else if (a.caption && b.caption) {
      return a.caption.localeCompare(b.caption);
    }
  }
  return aLevel - bLevel;
}

export function sortBySkill(a: Activity, b: Activity): number {
  const aSkill = getAssociatedSkill(a);
  const bSkill = getAssociatedSkill(b);
  let aIndex = aSkill ? skills.indexOf(aSkill) : -1;
  let bIndex = bSkill ? skills.indexOf(bSkill) : -1;
  if (aIndex === -1) aIndex = Number.MAX_SAFE_INTEGER;
  if (bIndex === -1) bIndex = Number.MAX_SAFE_INTEGER;
  return aIndex - bIndex;
}

export function getAssociatedSkill(activity: Activity): Skill | undefined {
  return activity.sortingGroups.find(g => skills.includes(g as Skill)) as Skill;
}

export function getIconForActivity(activity: Activity): string | undefined {
  if (
    activity.icon &&
    activity.category !== 'boss' &&
    activity.category !== 'raid'
  ) {
    return activity.icon;
  }

  if (activity.category === 'spell') {
    // @ts-ignore
    const spell = activity as Spell;
    if (spell.spellbook !== 'Standard') {
      return getIconForSpellbook(spell.spellbook);
    }
  }

  const sortingGroup =
    activity.sortingGroups.length > 0 ? activity.sortingGroups[0] : 'misc';

  if (sortingGroup !== 'misc') {
    const icon = getIconForSortingGroup(sortingGroup);
    if (icon) return icon;
  }

  return getIconForSortingGroup(activity.category) || 'Collection_log';
}

export function getIconForSortingGroup(
  sortingGroup: SortingGroup | string,
): string | undefined {
  // prettier-ignore
  switch (sortingGroup) {
    case 'pvm': return 'Combat_icon';
    case 'pvp': return 'Skull_(status)_icon';
    case 'melee':
    case 'ranged':
    case 'magic':
      return getIconForCombatStyle(sortingGroup as CombatStyle);
    case 'attack':
    case 'strength':
    case 'defence':
    case 'hitpoints':
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
      return getIconForSkill(sortingGroup as Skill);
    case 'boss': return 'Master_Reanimation';
    case 'chest': return 'Crystal_key';
    case 'diaries': return 'Achievement_Diaries_icon';
    case 'distraction_and_diversion': return 'Distractions_and_Diversions';
    case 'dungeon': return 'Dungeon_map_link_icon';
    case 'guild': return 'Map_link_icon';
    case 'location': return 'Map_link_icon';
    case 'minigame': return 'Minigame_icon';
    case 'misc': return 'Collection_log';
    case 'monster': return 'Monster_Examine';
    case 'music': return 'Music';
    case 'npc': return 'NPC_Contact';
    case 'quest': return 'Quest_point_icon';
    case 'raid': return 'Raids';
    case 'skilling': return 'Stats_icon';
    case 'spellbook': return 'Spellbook';
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

export function getIconForSpellbook(spellbook: Spellbook): string | undefined {
  // prettier-ignore
  switch (spellbook) {
    case 'Ancient': return 'Ancient_spellbook';
    case 'Arceuus': return 'Arceuus_spellbook';
    case 'Lunar': return 'Lunar_spellbook';
    case 'Standard': return 'Standard_spellbook';
    default: return undefined;
  }
}

export function getIconForSkill(skill: Skill): string | undefined {
  return isSkill(skill) ? `${capitalizeFirstLetter(skill)}_icon` : undefined;
}

export function autoDetectItemIcon(id: string): string | undefined {
  return autoDetectedItemSuffixes.some(str => id.endsWith(str))
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
