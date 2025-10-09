import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext } from 'react';
import { convertExperienceToLevels, convertLevelsToExperience, getDefaultSkillLevels, getExperienceForLevel } from '../utils'; // prettier-ignore
import type { Quest, QuestId, QuestOrder, QuestSeries, QuestSeriesId, SkillLevels } from '../types'; // prettier-ignore

interface QuestsContextData {
  order: QuestOrder;
  quests: Quest[];
  series: QuestSeries[];
  getQuestById: (id: QuestId) => Quest | undefined;
  getQuestsByIds: (ids: QuestId[]) => Quest[];
  getQuestSeriesById: (id: QuestSeriesId) => QuestSeries | undefined;
  setSkillRequirements: (questId: QuestId, levels: SkillLevels) => void;
  calculateSkillTotals: (
    milestone: QuestId,
    includeRewardXP?: boolean,
  ) => SkillLevels;
}

const defaultData: QuestsContextData = {
  order: { id: 'none', mode: 'main', quests: [] },
  quests: [],
  series: [],
  getQuestById: () => undefined,
  getQuestsByIds: () => [],
  getQuestSeriesById: () => undefined,
  setSkillRequirements: () => {},
  calculateSkillTotals: () => getDefaultSkillLevels(),
};

const QuestsContext = createContext<QuestsContextData>(defaultData);
export default QuestsContext;

export function useQuestsContext(): QuestsContextData {
  return useContext<QuestsContextData>(QuestsContext);
}

export function QuestsContextProvider({ children }: React.PropsWithChildren) {
  const data = useStaticQuery<QuestsQueryData>(dataQuery);

  const getQuestById = useCallback(
    (id: QuestId) => data.quests.nodes.find(item => item.id === id),
    [data],
  );

  const getQuestsByIds = useCallback(
    (ids: QuestId[]) => ids?.map(getQuestById).filter(quest => !!quest) ?? [],
    [getQuestById],
  );

  const getQuestSeriesById = useCallback(
    (id: QuestSeriesId) => data.series.nodes.find(item => item.id === id),
    [data],
  );

  const setSkillRequirements = useCallback(
    (questId: QuestId, levels: SkillLevels) => {
      const quest = getQuestById(questId);
      quest?.questRequirements?.forEach(req => {
        setSkillRequirements(req, levels);
      });
      quest?.skillRequirements?.forEach(req => {
        levels[req.skill] = Math.max(levels[req.skill], req.level);
      });
    },
    [getQuestById],
  );

  const calculateSkillTotals = useCallback(
    (milestone: QuestId, includeRewardXP?: boolean): SkillLevels => {
      const experience = convertLevelsToExperience(getDefaultSkillLevels());
      const endIndex = data.order.quests.findIndex(id => milestone === id);
      for (let i = 0; i <= endIndex; i++) {
        const quest = getQuestById(data.order.quests[i]);
        if (quest) {
          quest.skillRequirements?.forEach(req => {
            experience[req.skill] = Math.max(
              experience[req.skill],
              getExperienceForLevel(req.level),
            );
          });
          if (includeRewardXP) {
            quest.rewards?.forEach(reward => {
              experience[reward.skill] += reward.experience;
            });
          }
        }
      }
      return convertExperienceToLevels(experience);
    },
    [data.order.quests, getQuestById],
  );

  return (
    <QuestsContext.Provider
      value={{
        order: data.order,
        quests: data.quests.nodes,
        series: data.series.nodes,
        getQuestById,
        getQuestsByIds,
        getQuestSeriesById,
        setSkillRequirements,
        calculateSkillTotals,
      }}
    >
      {children}
    </QuestsContext.Provider>
  );
}

interface QuestsQueryData {
  order: QuestOrder;
  quests: { nodes: Quest[] };
  series: { nodes: QuestSeries[] };
}

const dataQuery = graphql`
  query QuestsQuery {
    order: questOrderJson(jsonId: { eq: "custom" }) {
      id: jsonId
      mode
      quests
    }
    quests: allQuestsJson {
      nodes {
        id: jsonId
        title
        questRequirements
        skillRequirements {
          skill
          level
        }
        rewards {
          skill
          experience
        }
      }
    }
    series: allQuestSeriesJson {
      nodes {
        id: jsonId
        link
        title
        caption
        quests
        unlocks
      }
    }
  }
`;
