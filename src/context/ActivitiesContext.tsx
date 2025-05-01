import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext, useMemo } from 'react';
import type { Activity, Boss, Dungeon, Guild, Minigame, Raid } from '../types'; // prettier-ignore

interface ActivitiesContextData {
  activities: Activity[];
  getActivityById: (id: string) => Activity | undefined;
}

const defaultData: ActivitiesContextData = {
  activities: [],
  getActivityById: () => undefined,
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
  const activities = useMemo(
    () =>
      [
        ...data.raids.nodes,
        ...data.bosses.nodes,
        ...data.minigames.nodes,
        ...data.guilds.nodes,
        ...data.skilling.nodes,
        ...data.dungeons.nodes,
        ...data.monsters.nodes,
        ...data.npcs.nodes,
        ...data.misc.nodes,
      ].sort((a, b) => a.id.localeCompare(b.id)) as Activity[],
    [data],
  );

  const getActivityById = useCallback(
    (id: string) => activities.find(activity => activity.id === id),
    [activities],
  );

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        getActivityById,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}

interface ActivitiesQueryData {
  raids: { nodes: Raid[] };
  bosses: { nodes: Boss[] };
  minigames: { nodes: Minigame[] };
  guilds: { nodes: Guild[] };
  skilling: { nodes: Activity[] };
  dungeons: { nodes: Dungeon[] };
  monsters: { nodes: Activity[] };
  npcs: { nodes: Activity[] };
  misc: { nodes: Activity[] };
}

const dataQuery = graphql`
  query ActivitiesQuery {
    raids: allRaidsJson {
      nodes {
        id: jsonId
        icon
        title
        subtitle
        category
        sortingGroups
        notableDrops
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
        requiredLevel
        notableDrops
      }
    }
    minigames: allMinigamesJson {
      nodes {
        id: jsonId
        title
        subtitle
        caption
        category
        sortingGroups
        requiredLevel
        notableDrops
      }
    }
    guilds: allGuildsJson {
      nodes {
        id: jsonId
        title
        subtitle
        caption
        category
        sortingGroups
        requiredLevel
        notableDrops
      }
    }
    skilling: allSkillingJson {
      nodes {
        id: jsonId
        url
        title
        subtitle
        caption
        category
        sortingGroups
        requiredLevel
        notableDrops
      }
    }
    dungeons: allDungeonsJson {
      nodes {
        id: jsonId
        title
        subtitle
        category
        sortingGroups
        notableDrops
      }
    }
    monsters: allSlayerMonstersJson(filter: { category: { eq: "monster" } }) {
      nodes {
        id: jsonId
        title: name
        subtitle
        category
        sortingGroups
        requiredLevel: requiredSlayerLevel
        notableDrops
      }
    }
    npcs: allNpcsJson {
      nodes {
        id: jsonId
        title
        subtitle
        category
        sortingGroups
        requiredLevel
        notableDrops
      }
    }
    misc: allMiscJson {
      nodes {
        id: jsonId
        title
        subtitle
        caption
        category
        sortingGroups
        requiredLevel
        notableDrops
      }
    }
  }
`;
