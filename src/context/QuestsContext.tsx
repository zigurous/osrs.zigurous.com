import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { sortByIndex } from '../utils/sorting';
import type { Quest, QuestId, QuestOrder, QuestSeries, QuestSeriesId } from '../types/quest'; // prettier-ignore
import type { SkillLevels } from '../types/skill';

interface QuestsContextData {
  quests: Quest[];
  series: QuestSeries[];
  order: QuestOrder;
  getQuestById: (id: QuestId) => Quest | undefined;
  getQuestsByIds: (ids: QuestId[]) => Quest[];
  getQuestSeriesById: (id: QuestSeriesId) => QuestSeries | undefined;
  setSkillRequirements: (questId: QuestId, levels: SkillLevels) => void;
}

const defaultData: QuestsContextData = {
  quests: [],
  series: [],
  order: { id: 'none', mode: 'ironman', quests: [] },
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

  const quests = useMemo(() => {
    return data.quests.nodes
      .toSorted((a, b) => a.id.localeCompare(b.id))
      .sort((a, b) =>
        sortByIndex(
          data.order.quests.indexOf(a.id),
          data.order.quests.indexOf(b.id),
        ),
      );
  }, [data]);

  const getQuestById = useCallback(
    (id: QuestId) => quests.find(item => item.id === id),
    [quests],
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
        quests: quests,
        series: data.series.nodes,
        order: data.order,
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
