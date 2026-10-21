import { type HeadFC, type PageProps } from 'gatsby';
import React from 'react';
import FooterBar from '../components/FooterBar';
import HeaderBar from '../components/HeaderBar';
import RootLayout from '../components/RootLayout';
import SkillsGrid from '../components/SkillsGrid';
import { QuestsContextProvider, useQuestsContext } from '../context/QuestsContext'; // prettier-ignore
import { formatNameFromId } from '../utils/formatting';
import { applyQuestRewards, meetsQuestReqs } from '../utils/quests';
import { convertExperienceToLevels, convertLevelsToExperience, getDefaultSkillLevels, printLevels } from '../utils/xp'; // prettier-ignore
import type { SkillExperience } from '../types/skill';
import type { Quest, QuestId } from '../types/quest';
import { useOptimalQuestOrder } from '../hooks/useOptimalQuestOrder';

export const Head: HeadFC = () => <title>OSRS Region Analyzer</title>;

export default function QuestingPage(props: PageProps) {
  return (
    <QuestsContextProvider>
      <RootLayout id="questing">
        <div className="flex flex-col w-full h-full">
          <HeaderBar title="Quest Leveling" />
          <QuestLeveling />
          <FooterBar />
        </div>
      </RootLayout>
    </QuestsContextProvider>
  );
}

type Player = {
  experience: SkillExperience;
  completedQuests: QuestId[];
  skippedQuests: QuestId[];
  lampedQuests: QuestId[];
};

function QuestLeveling() {
  const { getQuestById, order } = useQuestsContext();
  const player: Player = {
    experience: convertLevelsToExperience(getDefaultSkillLevels()),
    completedQuests: [],
    skippedQuests: [],
    lampedQuests: [],
  };
  let changed = true;
  let iterations = 0;
  while (changed) {
    changed = false;
    player.skippedQuests = [];
    for (let i = 0; i < order.quests.length; i++) {
      const questId = order.quests[i];
      const quest = getQuestById(questId);
      if (!quest) continue; // invalid quest
      if (player.completedQuests.includes(questId)) continue; // already completed
      const levels = convertExperienceToLevels(player.experience);
      if (meetsQuestReqs(quest, player.completedQuests, levels)) {
        player.completedQuests.push(questId);
        applyQuestRewards(quest, player.experience, false);
        if (quest.rewards?.some(reward => Boolean(reward.lamp))) {
          player.lampedQuests.push(questId);
        }
        console.log(`${player.completedQuests.length}: Completed '${questId}'`);
        changed = true;
        if (player.skippedQuests.length > 0) {
          console.log('Retrying previous quests...');
          i = -1;
          continue;
        }
      } else if (!player.skippedQuests.includes(questId)) {
        player.skippedQuests.push(questId);
        console.log(`Skipped '${questId}'`);
      }
    }
    if (changed) {
      console.log(
        `Iteration ${++iterations}: ${player.completedQuests.length} quests completed, stopped at ${player.skippedQuests[0]}`,
      );
    }
  }
  console.log('Completed quests:', player.completedQuests);
  console.log('Lamped quests:', player.lampedQuests.map(quest => `${player.completedQuests.indexOf(quest)+1}: ${quest} - ` + getQuestById(quest)?.rewards?.filter(reward => Boolean(reward.lamp)).map(reward => `${reward.skill}: ${reward.experience}xp`))); // prettier-ignore
  console.log('Skipped quests:', player.skippedQuests);
  return (
    <div className="w-full h-full">
      <div className="p-2xxl">
        <SkillsGrid
          className="mb-2xl"
          levels={convertExperienceToLevels(player.experience)}
        />
        <ol>
          {player.completedQuests.map((questId, index) => (
            <li key={questId}>
              {index + 1}. {formatNameFromId(questId)}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
