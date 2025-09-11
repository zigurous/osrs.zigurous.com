import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext, useMemo } from 'react';
import type { Boss } from '../types'; // prettier-ignore

interface BossesContextData {
  bosses: Boss[];
  getBossById: (id: string) => Boss | undefined;
}

const defaultData: BossesContextData = {
  bosses: [],
  getBossById: () => undefined,
};

const BossesContext = createContext<BossesContextData>(defaultData);
export default BossesContext;

export function useBossesContext(): BossesContextData {
  return useContext<BossesContextData>(BossesContext);
}

export function BossesContextProvider({ children }: React.PropsWithChildren) {
  const data = useStaticQuery<BossesQueryData>(dataQuery);
  const bosses = useMemo(
    () => data.bosses.nodes.sort((a, b) => a.id.localeCompare(b.id)),
    [data],
  );

  const getBossById = useCallback(
    (id: string) => bosses.find(boss => boss.id === id),
    [bosses],
  );

  return (
    <BossesContext.Provider
      value={{
        bosses,
        getBossById,
      }}
    >
      {children}
    </BossesContext.Provider>
  );
}

interface BossesQueryData {
  bosses: { nodes: Boss[] };
}

const dataQuery = graphql`
  query BossesQuery {
    bosses: allBossesJson {
      nodes {
        id: jsonId
        icon
        title
        subtitle
        category
        subcategory
        sortingGroups
        requiredLevel
        notableDrops
      }
    }
  }
`;
