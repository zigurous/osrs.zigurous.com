import { useIsMounted } from '@zigurous/forge-react';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'; // prettier-ignore
import type { Region, RegionId } from '../types/region';

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
  const mounted = useIsMounted();

  const [selectedRegions, setSelectedRegions] = useState<RegionId[]>([]);
  const [multiRegionMode, setMultiRegionMode] = useState(
    defaultData.multiRegionMode,
  );

  const getRegionById = useCallback(
    (id: string) => data.regions.nodes.find(node => node.id === id),
    [data],
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

  // Parse selected regions from URL on initial load
  useEffect(() => {
    if (mounted) {
      const query = location.search.replace('?region=', '');
      const regions = query
        .split(',')
        .filter(regionId =>
          data.regions.nodes.some(node => node.id === regionId),
        ) as RegionId[];
      setSelectedRegions(regions);
      setMultiRegionMode(regions.length > 1 || defaultData.multiRegionMode);
    }
  }, [mounted]);

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
      navigate(`?region=${selectedRegions.join(',')}`, options);
    } else {
      navigate('/region-analyzer', options);
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
