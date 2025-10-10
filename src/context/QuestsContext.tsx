import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext } from 'react';
import type { Quest, QuestId, QuestOrder, QuestSeries, QuestSeriesId } from '../types/quest'; // prettier-ignore
import type { SkillLevels } from '../types/skill';

interface QuestsContextData {
  order: QuestOrder;
  quests: Quest[];
  series: QuestSeries[];
  getQuestById: (id: QuestId) => Quest | undefined;
  getQuestsByIds: (ids: QuestId[]) => Quest[];
  getQuestSeriesById: (id: QuestSeriesId) => QuestSeries | undefined;
  setSkillRequirements: (questId: QuestId, levels: SkillLevels) => void;
}

const defaultData: QuestsContextData = {
  order: { id: 'none', mode: 'main', quests: [] },
  quests: [],
  series: [],
  getQuestById: () => undefined,
  getQuestsByIds: () => [],
  getQuestSeriesById: () => undefined,
  setSkillRequirements: () => {},
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
