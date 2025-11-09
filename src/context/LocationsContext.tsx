import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext } from 'react';
import { getIconForIsland } from '../utils/icons';
import type { Dungeon, GameLocation, Island } from '../types/location';

interface LocationsContextData {
  getLocationById: (id: string) => GameLocation;
  getDungeonById: (id: string) => Dungeon;
  getIslandById: (id: string) => Island;
}

const defaultData: LocationsContextData = {
  getLocationById: id => ({
    id,
    icon: icons.location,
    category: 'location',
    region: 'unknown',
  }),
  getDungeonById: id => ({
    id,
    icon: icons.dungeon,
    category: 'dungeon',
    region: 'unknown',
  }),
  getIslandById: id => ({
    id,
    icon: getIconForIsland(id) || icons.island,
    category: 'location',
    region: 'unknown',
  }),
};

const icons = {
  location: 'Map_link_icon',
  dungeon: 'Dungeon_map_link_icon',
  island: 'Map_link_icon',
};

const LocationsContext = createContext<LocationsContextData>(defaultData);
export default LocationsContext;

export function useLocationsContext(): LocationsContextData {
  return useContext<LocationsContextData>(LocationsContext);
}

export function LocationsContextProvider({
  children,
}: React.PropsWithChildren) {
  const data = useStaticQuery<LocationsQueryData>(dataQuery);

  const getLocationById = useCallback(
    (id: string): GameLocation => {
      const node = data.locations.nodes.find(location => location.id === id);
      return node
        ? {
            ...node,
            icon: icons.location,
            category: 'location',
          }
        : defaultData.getLocationById(id);
    },
    [data],
  );

  const getDungeonById = useCallback(
    (id: string): Dungeon => {
      const node = data.dungeons.nodes.find(dungeon => dungeon.id === id);
      const region = data.locations.nodes.find(node => node.id === id)?.region;
      return node
        ? {
            ...node,
            icon: icons.dungeon,
            category: 'dungeon',
            region: region || 'unknown',
          }
        : defaultData.getDungeonById(id);
    },
    [data],
  );

  const getIslandById = useCallback((id: string): Island => {
    return defaultData.getIslandById(id);
  }, []);

  return (
    <LocationsContext.Provider
      value={{
        getLocationById,
        getDungeonById,
        getIslandById,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
}

interface LocationsQueryData {
  locations: {
    nodes: { id: string; name?: string; region: string; tags?: string[] }[];
  };
  dungeons: {
    nodes: { id: string; name?: string; category: string }[];
  };
}

const dataQuery = graphql`
  query LocationsQuery {
    locations: allLocationsJson {
      nodes {
        id: jsonId
        name
        region
        tags
      }
    }
    dungeons: allDungeonsJson {
      nodes {
        id: jsonId
        name: title
        category
      }
    }
  }
`;
