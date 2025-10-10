import { useQuestsContext } from '../context';
import { convertExperienceToLevels, convertLevelsToExperience, getDefaultSkillLevels, getExperienceForLevel, sortByIndex } from '../utils'; // prettier-ignore
import type { Quest, SkillLevels, SkillRequirement } from '../types';

export function useOptimalQuestOrder(): string[] {
  const { quests, order } = useQuestsContext();
  const experience = convertLevelsToExperience(getDefaultSkillLevels());
  const optimalOrder: string[] = [];
  const allQuests = quests.toSorted((a, b) =>
    sortByIndex(order.quests.indexOf(a.id), order.quests.indexOf(b.id)),
  );
  const availableQuests = [...allQuests];

  console.group('Optimal Quest Order');

  const addNextQuest = (index: number) => {
    const nextQuest = availableQuests[index];
    optimalOrder.push(nextQuest.id);
    availableQuests.splice(index, 1);
    nextQuest.skillRequirements?.forEach(req => {
      experience[req.skill] = Math.max(experience[req.skill], getExperienceForLevel(req.level));
    });
    nextQuest.rewards?.forEach(reward => {
      experience[reward.skill] += reward.experience;
    });
  };

  for (let i = 0; i < allQuests.length; i++) {
    const levels = convertExperienceToLevels(experience);

    if (meetsRequirements(availableQuests[0], optimalOrder, levels)) {
      addNextQuest(0);
    } else if (decisions.length > 0) {
      addNextQuest(availableQuests.findIndex(quest => quest.id === decisions[0]));
      decisions.splice(0, 1);
    } else {
      const missingReqs =
        availableQuests[0].skillRequirements?.filter(req => levels[req.skill] < req.level) ?? [];

      // prettier-ignore
      {
        console.group('Missing Requirements');
        console.log(availableQuests[0]);
        console.log('Current', levels);
        console.log('Missing', Object.fromEntries(missingReqs.map(req => [req.skill, req.level])));
        console.log('Diff', Object.fromEntries(missingReqs.map(req => [req.skill, req.level - levels[req.skill]])));
        console.groupEnd();
      }

      console.groupCollapsed('Potential Quests');
      for (let j = 1; j < availableQuests.length; j++) {
        const potentialQuest = availableQuests[j];
        if (meetsPotentialRequirements(potentialQuest, optimalOrder, missingReqs)) {
          console.log(potentialQuest);
        }
      }
      console.groupEnd();

      break;
    }
  }

  console.groupCollapsed('Quest Table');
  console.table(
    allQuests.map((quest, index) => {
      const optimal = optimalOrder[index];
      return [quest.id, optimal, quest.id === optimal];
    }),
  );
  console.groupEnd();
  console.groupEnd();

  return optimalOrder;
}

function meetsRequirements(quest: Quest, completedQuests: string[], levels: SkillLevels): boolean {
  if (quest.questRequirements?.some(id => !completedQuests.includes(id))) {
    return false;
  }

  if (quest.skillRequirements?.some(req => levels[req.skill] < req.level)) {
    return false;
  }

  return true;
}

function meetsPotentialRequirements(
  quest: Quest,
  completedQuests: string[],
  missingReqs: SkillRequirement[],
): boolean {
  if (
    !Boolean(quest.rewards?.some(reward => missingReqs.some(req => req.skill === reward.skill)))
  ) {
    return false;
  }

  // if (quest.questRequirements?.some(id => !completedQuests.includes(id))) {
  //   return false;
  // }

  // if (
  //   quest.skillRequirements?.some(req =>
  //     missingReqs.some(missing => missing.skill === req.skill && req.level >= missing.level),
  //   )
  // ) {
  //   return false;
  // }

  return true;
}

const decisions: string[] = [
  'The_Depths_of_Despair', // 18 agility
  'The_Grand_Tree', // 25 agility
  'The_Ribbiting_Tale_of_a_Lily_Pad_Labour_Dispute', // 15 woodcutting
  'Lost_City', // 36 woodcutting
  'Troll_Romance', // 45 woodcutting
  'The_Giant_Dwarf', // 16 firemaking
  'Temple_of_the_Eye', // 10 runecraft
  'Animal_Magnetism', // 30 ranged
  'Ghosts_Ahoy', // 20 cooking
  'Enlightened_Journey', // 20 firemaking
  'Recipe_for_Disaster/Freeing_Evil_Dave', // 25 cooking
  'Recipe_for_Disaster/Freeing_the_Lumbridge_Guide', // 40 cooking
  'Recipe_for_Disaster/Freeing_Skrach_Uglogwee', // 41 cooking
  'The_Fremennik_Trials', // 25 fletching
  'The_Fremennik_Isles', // 20 construction, 46 crafting, 56 woodcutting
  "Olaf's_Quest", // 40 firemaking
  'Tears_of_Guthix', // 50 firemaking
  'Spirits_of_the_Elid', // 37 ranged
  'Watchtower', // 40 mining
  'The_Eyes_of_Glouphrie', // 46 magic
  'Cold_War', // 10 hunter, 34 construction
  "Eagles'_Peak", // 27 hunter
  'Tai_Bwo_Wannai_Trio', // 65 fishing
  'The_Slug_Menace', // 30 slayer
  'Between_a_Rock...', // 50 smithing
  'Rag_and_Bone_Man_II', // 40 slayer
  'Rum_Deal', // 40 farming, 42 slayer, 47 prayer
  'Cabin_Fever', // 40 ranged
  'The_Great_Brain_Robbery', // 50 prayer
  "Heroes'_Quest", // 50 mining, 53 cooking
  'Family_Crest', // 59 magic
  "Legends'_Quest", // 45 herblore, 50 thieving, 50 agility, 52 mining
  'Temple_of_Ikov', // 65 fletching for yew shortbow
  'Desert_Treasure_I', // 50 firemaking, 53 thieving
  'Recipe_for_Disaster/Freeing_King_Awowogei', // 70 cooking
  'A_Kingdom_Divided', // 54 agility
  'Fairytale_II_-_Cure_a_Queen', // 49 farming
  "King's_Ransom", // 65 defence
  'Perilous_Moons', // 48 slayer
  'At_First_Light', // 46 hunter
  'Regicide', // 56 agility
  "Mourning's_End_Part_I", // 60 ranged
  'Lunar_Diplomacy', // 60 mining, 61 crafting, 65 magic
  'Swan_Song', // 66 magic
  'Grim_Tales', // 58 thieving, 71 woodcutting
  'Defender_of_Varrock', // 52 hunter, 55 smithing
  'The_Final_Dawn', // 52 runecraft, 66 thieving
  'Scrambled!', // 38 construction
  'Shadows_of_Custodia', // 41 construction, 54 slayer
  'Beneath_Cursed_Sands', // 55 firemaking, 62 agility
  'The_Curse_of_Arrav', // 62 ranged, 64 mining
  'The_Path_of_Glouphrie', // 56 slayer
  'While_Guthix_Sleeps', // 65 farming, 65 herblore, 72 thieving
  'Devious_Minds', // 65 smithing
  'The_Fremennik_Exiles', // 55 runecraft, 60 slayer, 65 crafting
  'Dragon_Slayer_II', // 50 construction, 68 mining, 70 smithing, 75 magic
  'Monkey_Madness_II', // 60 firemaking, 69 slayer, 70 crafting
  'Song_of_the_Elves', // 70 agility, 70 construction, 70 farming, 70 herblore, 70 hunter, 70 mining
  'Making_Friends_with_My_Arm', // 66 firemaking
  'Desert_Treasure_II_-_The_Fallen_Empire', // 60 runecraft, 75 firemaking
];
