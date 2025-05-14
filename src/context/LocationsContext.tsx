import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext } from 'react';
import type { Dungeon, GameLocation, GameLocationAndCategory } from '../types';

interface LocationsContextData {
  locations: GameLocation[];
  getLocationById: (id: string) => GameLocationAndCategory;
}

const defaultData: LocationsContextData = {
  locations: [],
  getLocationById: id => ({ id, category: 'location', region: 'unknown' }),
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
    (id: string) => {
      // const dungeon = data.dungeons.nodes.find(dungeon => dungeon.id === id);
      const location = data.locations.nodes.find(
        location => location.id === id,
      );
      if (location) {
        return { ...location, category: 'location' };
      } else {
        return { id, category: 'location', region: 'unknown' };
      }
      // if (dungeon) {
      //   return { ...dungeon, region: 'unknown' };
      // } else if (location) {
      //   return { ...location, category: 'location' };
      // } else {
      //   return { id, category: 'location', region: 'unknown' };
      // }
    },
    [data.locations.nodes, data.dungeons.nodes],
  );
  return (
    <LocationsContext.Provider
      value={{
        locations: data.locations.nodes,
        getLocationById,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
}

interface LocationsQueryData {
  locations: { nodes: GameLocation[] };
  dungeons: { nodes: Dungeon[] };
}

const dataQuery = graphql`
  query LocationsQuery {
    locations: allLocationsJson {
      nodes {
        id: jsonId
        name
        region
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
