import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useContext, useMemo, useState } from 'react';
import type { GridMasterTile } from '../types';

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
  hideUnconfirmed: false,
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
  const tiles = useMemo(() => data.tiles.nodes, [data]);
  const [flipped, setFlipped] = useState(defaultData.flipped);
  const [hideUnconfirmed, setHideUnconfirmed] = useState(
    defaultData.hideUnconfirmed,
  );
  return (
    <GridMasterContext.Provider
      value={{
        tiles,
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
        icon
        task
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
