import { useIsMounted } from '@zigurous/forge-react';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'; // prettier-ignore
import type { RecommendedSetup } from '../types';

interface RecommendedSetupsContextData {
  setups: RecommendedSetup[];
  currentSetup: RecommendedSetup | undefined;
  getSetupById: (id: string) => RecommendedSetup | undefined;
  viewSetup: (id: string) => void;
  closeSetup: () => void;
}

const defaultData: RecommendedSetupsContextData = {
  setups: [],
  currentSetup: undefined,
  getSetupById: () => undefined,
  viewSetup: () => undefined,
  closeSetup: () => undefined,
};

const RecommendedSetupsContext =
  createContext<RecommendedSetupsContextData>(defaultData);
export default RecommendedSetupsContext;

export function useRecommendedSetupsContext(): RecommendedSetupsContextData {
  return useContext<RecommendedSetupsContextData>(RecommendedSetupsContext);
}

export function RecommendedSetupsContextProvider({
  children,
}: React.PropsWithChildren) {
  const data = useStaticQuery<RecommendedSetupsQueryData>(dataQuery);
  const mounted = useIsMounted();
  const [currentSetup, setCurrentSetup] = useState<
    RecommendedSetup | undefined
  >();

  const getSetupById = useCallback(
    (id: string) => data.setups.nodes.find(setup => setup.id === id),
    [data],
  );

  const viewSetup = useCallback(
    (id: string) => setCurrentSetup(getSetupById(id)),
    [getSetupById],
  );

  const closeSetup = useCallback(() => setCurrentSetup(undefined), []);

  useEffect(() => {
    if (mounted) {
      const query = location.search.replace('?setup=', '');
      setCurrentSetup(getSetupById(query));
    }
  }, [mounted]);

  useEffect(() => {
    if (currentSetup) {
      navigate(`?setup=${currentSetup.id}`, { replace: true });
    } else if (mounted) {
      navigate(`/gear-progression`, { replace: true });
    }
  }, [currentSetup]);

  return (
    <RecommendedSetupsContext.Provider
      value={{
        setups: data.setups.nodes,
        currentSetup,
        getSetupById,
        viewSetup,
        closeSetup,
      }}
    >
      {children}
    </RecommendedSetupsContext.Provider>
  );
}

interface RecommendedSetupsQueryData {
  setups: {
    nodes: RecommendedSetup[];
  };
}

const dataQuery = graphql`
  query RecommendedSetupsQuery {
    setups: allRecommendedSetupsJson {
      nodes {
        id: jsonId
        title
        strategiesLinkId
        loadouts {
          title
          equipment {
            slot
            item
          }
          inventory {
            slot
            item
          }
          runePouch
          spell
          spellbook
        }
      }
    }
  }
`;
