import { useIsMounted } from '@zigurous/forge-react';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'; // prettier-ignore
import type { RecommendedSetup } from '../types/recommended-setup';

interface RecommendedSetupsContextData {
  setups: RecommendedSetup[];
  currentSetup: RecommendedSetup | null;
  previousSetup: RecommendedSetup | null;
  getSetupById: (id: string) => RecommendedSetup | undefined;
  viewSetup: (id: string) => void;
  closeSetup: () => void;
}

const defaultData: RecommendedSetupsContextData = {
  setups: [],
  currentSetup: null,
  previousSetup: null,
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
  const [setup, setSetup] = useState<{
    current: RecommendedSetup | null;
    previous: RecommendedSetup | null;
  }>({ current: null, previous: null });

  const getSetupById = useCallback(
    (id: string) => data.setups.nodes.find(setup => setup.id === id),
    [data],
  );

  const viewSetup = useCallback(
    (id: string) =>
      setSetup(state => ({
        current: getSetupById(id) || null,
        previous: state.current,
      })),
    [getSetupById],
  );

  const closeSetup = useCallback(
    () => setSetup(state => ({ current: null, previous: state.current })),
    [],
  );

  useEffect(() => {
    if (mounted) {
      const query = location.search.replace('?setup=', '');
      setSetup({ current: getSetupById(query) || null, previous: null });
    }
  }, [mounted]);

  useEffect(() => {
    if (setup.current) {
      navigate(`?setup=${setup.current.id}`, { replace: true });
    } else if (mounted) {
      navigate(`/gear-progression`, { replace: true });
    }
  }, [setup.current]);

  return (
    <RecommendedSetupsContext.Provider
      value={{
        setups: data.setups.nodes,
        currentSetup: setup.current,
        previousSetup: setup.previous,
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
