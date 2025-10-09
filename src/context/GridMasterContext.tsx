import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useContext } from 'react';
import type { GridMasterTile } from '../types';

interface GridMasterContextData {
  tiles: GridMasterTile[];
}

const defaultData: GridMasterContextData = {
  tiles: [],
};

const GridMasterContext = createContext<GridMasterContextData>(defaultData);
export default GridMasterContext;

export function useGridMasterContext(): GridMasterContextData {
  return useContext<GridMasterContextData>(GridMasterContext);
}

export function GridMasterContextProvider({
  children,
}: React.PropsWithChildren) {
  const data = useStaticQuery<GridMasterQueryData>(dataQuery);
  return (
    <GridMasterContext.Provider
      value={{
        tiles: data.tiles.nodes,
      }}
    >
      {children}
    </GridMasterContext.Provider>
  );
}

interface GridMasterQueryData {
  tiles: { nodes: GridMasterTile[] };
}

const dataQuery = graphql`
  query GridMasterQuery {
    tiles: allGridMasterTilesJson {
      nodes {
        col
        row
        type
        icon
        task
        reward
        rewardIcon
      }
    }
  }
`;
