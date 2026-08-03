import type { Quest } from '../types/quest';
import type { SkillExperience, SkillLevels, SkillRequirement } from '../types/skill'; // prettier-ignore

export function meetsQuestReqs(
  quest: Quest,
  completedQuests: string[],
  player: SkillLevels,
  ironman: boolean = false,
): boolean {
  // prettier-ignore
  if (quest.questRequirements && !quest.questRequirements.every(id => completedQuests.includes(id))) {
    return false;
  }
  return meetsQuestSkillReqs(quest, player, ironman);
}

export function meetsQuestSkillReqs(
  quest: Quest,
  player: SkillLevels,
  ironman: boolean = false,
): boolean {
  // prettier-ignore
  if (quest.skillRequirements && !quest.skillRequirements.every(req => player[req.skill] >= req.level || (req.ironman && !ironman))) {
    return false;
  }
  return true;
}

export function helpsMeetMissingQuestReqs(
  quest: Quest,
  player: SkillLevels,
  missingReqs: SkillRequirement[],
  ironman: boolean = false,
): boolean {
  return (
    (quest.rewards?.some(reward =>
      missingReqs.some(req => req.skill === reward.skill),
    ) ??
      false) &&
    meetsQuestSkillReqs(quest, player, ironman)
  );
}

export function applyQuestRewards(
  quest: Quest,
  player: SkillExperience,
  skipLamps: boolean = false,
) {
  quest.rewards?.forEach(reward => {
    if (skipLamps && Boolean(reward.lamp)) {
      // skipped
    } else {
      player[reward.skill] += reward.experience;
    }
  });
}
