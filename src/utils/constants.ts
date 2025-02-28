// Skills are ordered the same way as they appear in the game.
export const skills = [
  'attack',
  'strength',
  'defence',
  'ranged',
  'prayer',
  'magic',
  'runecraft',
  'construction',
  'hitpoints',
  'agility',
  'herblore',
  'thieving',
  'crafting',
  'fletching',
  'slayer',
  'hunter',
  'mining',
  'smithing',
  'fishing',
  'cooking',
  'firemaking',
  'woodcutting',
  'farming',
] as const;

// Combat skills contribute to combat level. Slayer is not included here as it
// does not increase combat level despite revolving entirely around combat.
export const combatSkills = [
  'attack',
  'strength',
  'defence',
  'ranged',
  'prayer',
  'magic',
  'hitpoints',
] as const;

// Non-combat skills do not contribute to combat level but sometimes are still
// used in combat activities (e.g. skilling bosses).
export const nonCombatSkills = [
  'runecraft',
  'construction',
  'agility',
  'herblore',
  'thieving',
  'crafting',
  'fletching',
  'slayer',
  'hunter',
  'mining',
  'smithing',
  'fishing',
  'cooking',
  'firemaking',
  'woodcutting',
  'farming',
] as const;

// Activities are categorized into different groups for better ordering and
// filtering in the UI.
export const activityFilters = [
  // combat
  'pvm',
  'pvp',
  'melee',
  'ranged',
  'magic',
  // skilling
  'prayer',
  'runecraft',
  'construction',
  'agility',
  'herblore',
  'thieving',
  'crafting',
  'fletching',
  'slayer',
  'hunter',
  'mining',
  'smithing',
  'fishing',
  'cooking',
  'firemaking',
  'woodcutting',
  'farming',
  // other
  'dungeon',
  'misc',
] as const;

export const iconOrder = [
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
  'Magic_icon',
  'Prayer_icon',
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
  // other
  'Minigame_icon',
  'Distractions_and_Diversions',
  'Achievement_Diaries_icon',
  'Quest_point_icon',
  'Crystal_key',
  'Music',
  'Stats_icon',
  'Collection_log',
  'Map_link_icon',
  'Dungeon_map_link_icon',
];
