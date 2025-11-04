import type { Activity, CombatStyle } from '../types/activity';
import type { SortingGroup } from '../types/common';
import type { Skill } from '../types/skill';
import type { Spellbook } from '../types/spell';

export function getIconForActivity(activity: Activity): string {
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
      const icon = getIconForSpellbook(spell.spellbook);
      if (icon) return icon;
    }
  }

  const sortingGroup =
    activity.sortingGroups?.length > 0 ? activity.sortingGroups[0] : 'misc';

  if (sortingGroup !== 'misc') {
    const icon = getIconForSortingGroup(sortingGroup);
    if (icon) return icon;
  }

  return getIconForSortingGroup(activity.category) || 'Collection_log';
}

export function getIconForSortingGroup(
  sortingGroup: SortingGroup | string,
): string {
  // prettier-ignore
  switch (sortingGroup) {
    case 'pvm': return 'Combat_icon';
    case 'pvp': return 'Skull_(status)_icon';
    case 'boss': return 'Master_Reanimation';
    case 'chest': return 'Crystal_key';
    case 'diary': return 'Achievement_Diaries_icon';
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
    case 'shop': return 'Bank_icon';
    case 'skilling': return 'Stats_icon';
    case 'spellbook': return 'Spellbook';
    default: return getIconForCombatStyle(sortingGroup as CombatStyle) || getIconForSkill(sortingGroup as Skill);
  }
}

export function getIconForCombatStyle(style: CombatStyle): string {
  // prettier-ignore
  switch (style) {
    case 'melee': return 'Attack_icon';
    case 'ranged': return 'Ranged_icon';
    case 'magic': return 'Magic_icon';
    case 'hybrid': return 'Hybrid';
    case 'stab': return 'White_dagger';
    case 'slash': return 'White_scimitar';
    case 'crush': return 'White_warhammer';
  }
}

export function getIconForSpellbook(spellbook: Spellbook): string {
  // prettier-ignore
  switch (spellbook) {
    case 'Ancient': return 'Ancient_spellbook';
    case 'Arceuus': return 'Arceuus_spellbook';
    case 'Lunar': return 'Lunar_spellbook';
    case 'Standard': return 'Standard_spellbook';
  }
}

export function getIconForSkill(skill: Skill): string {
  // prettier-ignore
  switch (skill) {
    case 'attack': return 'Attack_icon';
    case 'strength': return 'Strength_icon';
    case 'defence': return 'Defence_icon';
    case 'ranged': return 'Ranged_icon';
    case 'prayer': return 'Prayer_icon';
    case 'magic': return 'Magic_icon';
    case 'runecraft': return 'Runecraft_icon';
    case 'construction': return 'Construction_icon';
    case 'hitpoints': return 'Hitpoints_icon';
    case 'agility': return 'Agility_icon';
    case 'herblore': return 'Herblore_icon';
    case 'thieving': return 'Thieving_icon';
    case 'crafting': return 'Crafting_icon';
    case 'fletching': return 'Fletching_icon';
    case 'slayer': return 'Slayer_icon';
    case 'hunter': return 'Hunter_icon';
    case 'mining': return 'Mining_icon';
    case 'smithing': return 'Smithing_icon';
    case 'fishing': return 'Fishing_icon';
    case 'cooking': return 'Cooking_icon';
    case 'firemaking': return 'Firemaking_icon';
    case 'woodcutting': return 'Woodcutting_icon';
    case 'farming': return 'Farming_icon';
    case 'sailing': return 'Sailing_icon';
  }
}

const suffixes4 = ['_potion', '_brew'];
const suffixes5 = [
  '_arrow',
  '_arrowheads',
  '_arrows',
  '_bolts',
  '_bolts_(e)',
  '_bolts_(unf)',
  '_bolts(unf)',
  '_bolt_tips',
  '_dart_tips',
  '_frag',
  '_javelin_heads',
  '_seed',
  '_shaft',
];

export function autoDetectItemIcon(id: string): string | undefined {
  return suffixes4.some(str => id.endsWith(str))
    ? `${id}(4)`
    : suffixes5.some(str => id.endsWith(str))
      ? `${id}_5`
      : undefined;
}
