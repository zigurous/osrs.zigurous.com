import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext } from 'react';
import type { Quest, QuestId, QuestSeries, QuestSeriesId, SkillLevels } from '../types'; // prettier-ignore

interface QuestsContextData {
  quests: Quest[];
  series: QuestSeries[];
  getQuestById: (id: QuestId) => Quest | undefined;
  getQuestSeriesById: (id: QuestSeriesId) => QuestSeries | undefined;
  setSkillRequirements: (questId: QuestId, levels: SkillLevels) => void;
  updateSkillTotals: (milestone: QuestId, levels: SkillLevels) => void;
}

const defaultData: QuestsContextData = {
  quests: [],
  series: [],
  getQuestById: () => undefined,
  getQuestSeriesById: () => undefined,
  setSkillRequirements: () => {},
  updateSkillTotals: () => {},
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
        levels[req.skill] = Math.max(levels[req.skill] || 0, req.level);
      });
    },
    [getQuestById],
  );

  const updateSkillTotals = useCallback(
    (milestone: QuestId, levels: SkillLevels) => {
      const endIndex = data.quests.nodes.findIndex(
        quest => quest.id === milestone,
      );
      for (let i = 0; i <= endIndex; i++) {
        const quest = data.quests.nodes[i];
        setSkillRequirements(quest.id, levels);
        if (quest.newSkillLevels) {
          quest.newSkillLevels.forEach(change => {
            levels[change.skill] = Math.max(
              levels[change.skill] || 0,
              change.level,
            );
          });
        }
      }
    },
    [data, setSkillRequirements],
  );

  return (
    <QuestsContext.Provider
      value={{
        quests: data.quests.nodes,
        series: data.series.nodes,
        getQuestById,
        getQuestSeriesById,
        setSkillRequirements,
        updateSkillTotals,
      }}
    >
      {children}
    </QuestsContext.Provider>
  );
}

interface QuestsQueryData {
  quests: { nodes: Quest[] };
  series: { nodes: QuestSeries[] };
}

const dataQuery = graphql`
  query QuestsQuery {
    quests: allQuestsJson {
      nodes {
        id: jsonId
        title
        questRequirements
        skillRequirements {
          skill
          level
        }
        newSkillLevels {
          skill
          level
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
