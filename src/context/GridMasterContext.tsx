import { useLocalStorage } from '@zigurous/forge-react';
import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext, useState } from 'react';
import type { GridMasterTile } from '../types/grid-master';

interface GridMasterContextData {
  tiles: GridMasterTile[];
  flipped: boolean;
  checkable: boolean;
  checked: string[];
  hideUnconfirmed: boolean;
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckable: React.Dispatch<React.SetStateAction<boolean>>;
  setHideUnconfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  toggleChecked: (cell: string) => void;
}

const defaultData: GridMasterContextData = {
  tiles: [],
  flipped: false,
  checkable: false,
  checked: ['D4'],
  hideUnconfirmed: true,
  setFlipped: () => defaultData.flipped,
  setCheckable: () => defaultData.checkable,
  setHideUnconfirmed: () => defaultData.hideUnconfirmed,
  toggleChecked: () => undefined,
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
  const [checkable, setCheckable] = useState(defaultData.flipped);
  const [checked, setChecked] = useLocalStorage(
    'grid-master',
    defaultData.checked,
  );
  const [hideUnconfirmed, setHideUnconfirmed] = useState(
    defaultData.hideUnconfirmed,
  );

  const toggleChecked = (cell: string) => {
    const index = checked?.indexOf(cell) ?? -1;
    if (checked && index !== -1) {
      setChecked(checked.toSpliced(index, 1));
    } else {
      setChecked([...(checked || []), cell]);
    }
  };

  return (
    <GridMasterContext.Provider
      value={{
        tiles: data.tiles.nodes,
        flipped,
        checked: checked || defaultData.checked,
        checkable,
        hideUnconfirmed,
        setFlipped,
        setCheckable,
        setHideUnconfirmed,
        toggleChecked,
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
