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
  setSelectedRegion: () => undefined,
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
            ...region.raids,
            ...region.bosses,
            ...region.minigames,
            ...region.guilds,
            ...region.skilling,
            ...region.dungeons,
            ...region.monsters,
            ...region.npcs,
            ...region.misc,
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
    const id = location.search.replace('?region=', '');
    const region = regions.find(region => region.id === id);
    setSelectedRegion(region || null);
  }, [regions, location.search]);

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
        storylines
        skilling
        raids
        bosses
        minigames
        guilds
        locations
        dungeons
        monsters
        npcs
        misc
        pets
      }
    }
  }
`;
