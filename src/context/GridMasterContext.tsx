import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useContext, useState } from 'react';
import type { GridMasterTile } from '../types/grid-master';

interface GridMasterContextData {
  tiles: GridMasterTile[];
  flipped: boolean;
  hideUnconfirmed: boolean;
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  setHideUnconfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultData: GridMasterContextData = {
  tiles: [],
  flipped: false,
  hideUnconfirmed: true,
  setFlipped: () => defaultData.flipped,
  setHideUnconfirmed: () => defaultData.hideUnconfirmed,
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
  const [flipped, setFlipped] = useState(defaultData.flipped);
  const [hideUnconfirmed, setHideUnconfirmed] = useState(
    defaultData.hideUnconfirmed,
  );
  return (
    <GridMasterContext.Provider
      value={{
        tiles: data.tiles.nodes,
        flipped,
        hideUnconfirmed,
        setFlipped,
        setHideUnconfirmed,
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
        task
        taskIcon
        taskLink
        reward
        rewardDescription
        rewardIcon
        rewardLink
        unconfirmed
      }
    }
  }
`;
