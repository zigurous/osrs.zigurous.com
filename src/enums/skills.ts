import type { Skill } from '../types';

export enum Skills {
  attack = 'Attack',
  strength = 'Strength',
  defence = 'Defence',
  ranged = 'Ranged',
  prayer = 'Prayer',
  magic = 'Magic',
  runecraft = 'Runecraft',
  construction = 'Construction',
  hitpoints = 'Hitpoints',
  agility = 'Agility',
  herblore = 'Herblore',
  thieving = 'Thieving',
  crafting = 'Crafting',
  fletching = 'Fletching',
  slayer = 'Slayer',
  hunter = 'Hunter',
  mining = 'Mining',
  smithing = 'Smithing',
  fishing = 'Fishing',
  cooking = 'Cooking',
  firemaking = 'Firemaking',
  woodcutting = 'Woodcutting',
  farming = 'Farming',
}

export const SkillsList: Skill[] = Object.keys(Skills) as Skill[];
