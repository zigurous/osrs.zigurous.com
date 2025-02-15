import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext, useMemo } from 'react';
import type { Activity, Boss, Guild, Minigame, Raid } from '../types'; // prettier-ignore

interface ActivitiesContextData {
  all: Activity[];
  raids: Raid[];
  bosses: Boss[];
  minigames: Minigame[];
  guilds: Guild[];
  getActivityById: (id: string) => Activity | undefined;
  getBossById: (id: string) => Boss | undefined;
  getRaidById: (id: string) => Raid | undefined;
  getMinigameById: (id: string) => Minigame | undefined;
  getGuildById: (id: string) => Guild | undefined;
}

const defaultData: ActivitiesContextData = {
  all: [],
  raids: [],
  bosses: [],
  minigames: [],
  guilds: [],
  getActivityById: () => undefined,
  getBossById: () => undefined,
  getRaidById: () => undefined,
  getMinigameById: () => undefined,
  getGuildById: () => undefined,
};

const ActivitiesContext = createContext<ActivitiesContextData>(defaultData);
export default ActivitiesContext;

export function useActivitiesContext(): ActivitiesContextData {
  return useContext<ActivitiesContextData>(ActivitiesContext);
}

export function ActivitiesContextProvider({
  children,
}: React.PropsWithChildren) {
  const data = useStaticQuery<ActivitiesQueryData>(dataQuery);

  const allActivities = useMemo(
    () =>
      [
        ...data.skilling.nodes,
        ...data.raids.nodes,
        ...data.bosses.nodes,
        ...data.minigames.nodes,
        ...data.guilds.nodes,
        ...data.misc.nodes,
      ].sort((a, b) => a.id.localeCompare(b.id)) as Activity[],
    [data],
  );

  const getActivityById = useCallback(
    (id: string) => allActivities.find(activity => activity.id === id),
    [allActivities],
  );

  const getRaidById = useCallback(
    (id: string) => data.raids.nodes.find(raid => raid.id === id),
    [data.raids.nodes],
  );

  const getBossById = useCallback(
    (id: string) => data.bosses.nodes.find(boss => boss.id === id),
    [data.bosses.nodes],
  );

  const getMinigameById = useCallback(
    (id: string) => data.minigames.nodes.find(minigame => minigame.id === id),
    [data.minigames.nodes],
  );

  const getGuildById = useCallback(
    (id: string) => data.guilds.nodes.find(guild => guild.id === id),
    [data.guilds.nodes],
  );

  return (
    <ActivitiesContext.Provider
      value={{
        all: allActivities,
        raids: data.raids.nodes,
        bosses: data.bosses.nodes,
        minigames: data.minigames.nodes,
        guilds: data.guilds.nodes,
        getActivityById,
        getRaidById,
        getBossById,
        getMinigameById,
        getGuildById,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}

interface ActivitiesQueryData {
  skilling: {
    nodes: Activity[];
  };
  raids: {
    nodes: Raid[];
  };
  bosses: {
    nodes: Boss[];
  };
  minigames: {
    nodes: Minigame[];
  };
  guilds: {
    nodes: Guild[];
  };
  misc: {
    nodes: Activity[];
  };
}

const dataQuery = graphql`
  query ActivitiesQuery {
    skilling: allSkillingJson {
      nodes {
        id: jsonId
        title
        subtitle
        category
        sortingGroups
        notableDrops
      }
    }
    raids: allRaidsJson {
      nodes {
        id: jsonId
        icon
        title
        subtitle
        category
        sortingGroups
        notableDrops
        recommendedCombatStyle
      }
    }
    bosses: allBossesJson {
      nodes {
        id: jsonId
        icon
        title
        subtitle
        category
        sortingGroups
        notableDrops
        recommendedCombatStyle
      }
    }
    minigames: allMinigamesJson {
      nodes {
        id: jsonId
        title
        subtitle
        category
        sortingGroups
        notableDrops
        recommendedCombatStyle
      }
    }
    guilds: allGuildsJson {
      nodes {
        id: jsonId
        title
        subtitle
        category
        sortingGroups
        notableDrops
      }
    }
    misc: allMiscJson {
      nodes {
        id: jsonId
        title
        subtitle
        category
        sortingGroups
        notableDrops
      }
    }
  }
`;
