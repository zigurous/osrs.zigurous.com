import { graphql, navigate, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'; // prettier-ignore
import type { Region, RegionId } from '../types';

interface RegionsContextData {
  regions: Region[];
  selectedRegions: RegionId[];
  multiRegionMode: boolean;
  getRegionById: (id: RegionId) => Region | undefined;
  selectRegion: (id: RegionId) => void;
  deselectRegion: (id: RegionId) => void;
  clearRegions: () => void;
  setMultiRegionMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultData: RegionsContextData = {
  regions: [],
  selectedRegions: [],
  multiRegionMode: false,
  getRegionById: () => undefined,
  selectRegion: () => undefined,
  deselectRegion: () => undefined,
  clearRegions: () => undefined,
  setMultiRegionMode: () => undefined,
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

  const [selectedRegions, setSelectedRegions] = useState<RegionId[]>(() => {
    if (typeof window === 'undefined') return [];
    const query = location.search.replace('?region=', '');
    const regions = query.split(',');
    return regions.filter(regionId =>
      data.regions.nodes.some(node => node.id === regionId),
    ) as RegionId[];
  });

  const [multiRegionMode, setMultiRegionMode] = useState(
    selectedRegions.length > 1 || defaultData.multiRegionMode,
  );

  const getRegionById = useCallback(
    (id: string) => data.regions.nodes.find(node => node.id === id),
    [data.regions.nodes],
  );

  const selectRegion = useCallback(
    (region: RegionId) => {
      if (multiRegionMode) {
        setSelectedRegions(regions => {
          if (regions.includes(region)) {
            return regions; // already selected
          } else {
            return [...regions, region];
          }
        });
      } else {
        setSelectedRegions([region]);
      }
    },
    [multiRegionMode],
  );

  const deselectRegion = useCallback((region: RegionId) => {
    setSelectedRegions(regions =>
      regions.filter(selectedRegion => selectedRegion !== region),
    );
  }, []);

  const clearRegions = useCallback(() => {
    setSelectedRegions([]);
  }, []);

  // Reset regions when multi-region is toggled off
  useEffect(() => {
    if (!multiRegionMode) {
      setSelectedRegions(regions =>
        regions.length > 0 ? [regions[regions.length - 1]] : regions,
      );
    }
  }, [multiRegionMode]);

  // Set URL query based on selected regions
  useEffect(() => {
    const options = { replace: true };
    if (selectedRegions.length > 0) {
      return navigate(`?region=${selectedRegions.join(',')}`, options);
    } else {
      return navigate('/region-analyzer', options);
    }
  }, [selectedRegions]);

  return (
    <RegionsContext.Provider
      value={{
        regions: data.regions.nodes,
        selectedRegions,
        multiRegionMode,
        getRegionById,
        selectRegion,
        deselectRegion,
        clearRegions,
        setMultiRegionMode,
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
        resources
      }
    }
  }
`;
