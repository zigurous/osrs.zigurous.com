import { skills } from './skills';
import type { Quest, Skill, SkillLevels } from '../types';

export const MAX_XP = 200_000_000;

export const XpTable = [
  0, 0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107,
  2411, 2746, 3115, 3523, 3973, 4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730,
  10824, 12031, 13363, 14833, 16456, 18247, 20224, 22406, 24815, 27473, 30408,
  33648, 37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721,
  101333, 111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466,
  247886, 273742, 302288, 333804, 368599, 407015, 449428, 496254, 547953,
  605032, 668051, 737627, 814445, 899257, 992895, 1096278, 1210421, 1336443,
  1475581, 1629200, 1798808, 1986068, 2192818, 2421087, 2673114, 2951373,
  3258594, 3597792, 3972294, 4385776, 4842295, 5346332, 5902831, 6517253,
  7195629, 7944614, 8771558, 9684577, 10692629, 11805606, 13034431, 14391160,
  15889109, 17542976, 19368992, 21385073, 23611006, 26068632, 28782069,
  31777943, 35085654, 38737661, 42769801, 47221641, 52136869, 57563718,
  63555443, 70170840, 77474828, 85539082, 94442737, 104273167, 115126838,
  127110260, 140341028, 154948977, 171077457, 188884740, 200000000,
];

export function getExperienceForLevel(level: number): number {
  return XpTable[level];
}

export function getLevelForExperience(xp: number): number {
  let lvl = 1;
  for (let l = 1; l < XpTable.length; l++) {
    if (xp >= XpTable[l]) {
      lvl = l;
    } else {
      break;
    }
  }
  return lvl;
}

export function calculateExperienceForLevel(level: number): number {
  let sum = 0;
  for (let l = 1; l < level; l++) {
    sum += Math.floor(l + 300 * Math.pow(2, l / 7));
  }
  return Math.min(Math.floor(sum / 4), MAX_XP);
}

export function calculateExpectedHitpointsLevel(skills: SkillLevels): number {
  let xp = getExperienceForLevel(skills.attack) / 3;
  xp += getExperienceForLevel(skills.strength) / 3;
  xp += getExperienceForLevel(skills.defence) / 3;
  xp += getExperienceForLevel(skills.magic) / 3;
  xp += getExperienceForLevel(skills.ranged) / 3;
  return Math.min(getLevelForExperience(xp), 99);
}

export function convertLevelsToExperience(
  levels: SkillLevels,
): Record<Skill, number> {
  return skills.reduce(
    (experience, skill) => {
      experience[skill] = getExperienceForLevel(levels[skill]);
      return experience;
    },
    {} as Record<Skill, number>,
  );
}

export function convertExperienceToLevels(
  experience: Record<Skill, number>,
): SkillLevels {
  return skills.reduce((levels, skill) => {
    levels[skill] = getLevelForExperience(experience[skill]);
    return levels;
  }, {} as SkillLevels);
}

export function diffSkillLevels(
  a: SkillLevels,
  b: SkillLevels,
): Partial<SkillLevels> {
  return skills.reduce((levels, skill) => {
    const diff = b[skill] - a[skill];
    if (diff > 0) {
      levels[skill] = diff;
    }
    return levels;
  }, {} as SkillLevels);
}

export function sumQuestExperienceLevels(
  quests: Quest[],
  includeRequirements: boolean = true,
  includeRewards: boolean = false,
): SkillLevels {
  const experience = convertLevelsToExperience(getDefaultSkillLevels());
  for (let i = 0; i < quests.length; i++) {
    const quest = quests[i];
    if (includeRequirements) {
      quest.skillRequirements?.forEach(req => {
        experience[req.skill] = Math.max(
          experience[req.skill],
          getExperienceForLevel(req.level),
        );
      });
    }
    if (includeRewards) {
      quest.rewards?.forEach(reward => {
        experience[reward.skill] += reward.experience;
      });
    }
  }
  return convertExperienceToLevels(experience);
}

export function getDefaultSkillLevels(): SkillLevels {
  return {
    attack: 1,
    strength: 1,
    defence: 1,
    ranged: 1,
    prayer: 1,
    magic: 1,
    runecraft: 1,
    construction: 1,
    hitpoints: 10,
    agility: 1,
    herblore: 1,
    thieving: 1,
    crafting: 1,
    fletching: 1,
    slayer: 1,
    hunter: 1,
    mining: 1,
    smithing: 1,
    fishing: 1,
    cooking: 1,
    firemaking: 1,
    woodcutting: 1,
    farming: 1,
    sailing: 1,
  };
}

export function getMaxedSkillLevels(): SkillLevels {
  return {
    attack: 99,
    strength: 99,
    defence: 99,
    ranged: 99,
    prayer: 99,
    magic: 99,
    runecraft: 99,
    construction: 99,
    hitpoints: 99,
    agility: 99,
    herblore: 99,
    thieving: 99,
    crafting: 99,
    fletching: 99,
    slayer: 99,
    hunter: 99,
    mining: 99,
    smithing: 99,
    fishing: 99,
    cooking: 99,
    firemaking: 99,
    woodcutting: 99,
    farming: 99,
    sailing: 99,
  };
}
