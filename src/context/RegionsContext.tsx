import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'; // prettier-ignore
import type { Region, RegionId } from '../types';

interface RegionsContextData {
  regions: Region[];
  selectedRegion: Region | null;
  setSelectedRegion: (region: Region) => void;
  getRegionById: (id: RegionId) => Region | undefined;
}

const defaultData: RegionsContextData = {
  regions: [],
  selectedRegion: null,
  setSelectedRegion: () => {},
  getRegionById: () => undefined,
};

const RegionsContext = createContext<RegionsContextData>(defaultData);
export default RegionsContext;

export function useRegionsContext(): RegionsContextData {
  return useContext<RegionsContextData>(RegionsContext);
}

export function RegionsContextProvider({
  children,
  location,
}: React.PropsWithChildren & { location: Location }) {
  const data = useStaticQuery<RegionsQueryData>(dataQuery);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const regions = useMemo(
    () =>
      data.regions.nodes.map(region => ({
        ...region,
        activities: [
          ...new Set([
            ...(region.raids || []),
            ...region.bosses,
            ...region.minigames,
            ...(region.guilds || []),
            ...region.skilling,
            ...region.dungeons,
            ...region.monsters,
            ...(region.misc || []),
          ]),
        ],
      })),
    [data.regions.nodes],
  );

  const getRegionById = useCallback(
    (id: string) => data.regions.nodes.find(node => node.id === id),
    [regions],
  );

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    const region = regions.find(node => node.id === hash);
    setSelectedRegion(region || null);
  }, [regions, location.hash]);

  return (
    <RegionsContext.Provider
      value={{
        regions,
        selectedRegion,
        setSelectedRegion,
        getRegionById,
      }}
    >
      {children}
    </RegionsContext.Provider>
  );
}

interface RegionsQueryData {
  regions: {
    nodes: Region[];
  };
}

const dataQuery = graphql`
  query RegionsQuery {
    regions: allRegionsJson {
      nodes {
        id: jsonId
        name
        description
        skilling
        raids
        bosses
        minigames
        guilds
        dungeons
        monsters
        misc
        pets
      }
    }
  }
`;
