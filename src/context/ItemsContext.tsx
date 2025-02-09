import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext } from 'react';
import type { ItemData, PetData } from '../types';

interface ItemsContextData {
  items: ItemData[];
  getItemById: (id: string) => ItemData;
  getItemsByIds: (ids: string[]) => ItemData[];
}

const defaultData: ItemsContextData = {
  items: [],
  getItemById: () => ({ id: 'Nothing' }),
  getItemsByIds: () => [],
};

const ItemsContext = createContext<ItemsContextData>(defaultData);
export default ItemsContext;

export function useItemsContext(): ItemsContextData {
  return useContext<ItemsContextData>(ItemsContext);
}

export function ItemsContextProvider({ children }: React.PropsWithChildren) {
  const data = useStaticQuery<ItemsQueryData>(dataQuery);

  const getItemById = useCallback(
    (id: string) =>
      data.items.nodes.find(item => item.id === id) ||
      data.pets.nodes.find(pet => pet.id === id) || {
        id,
        icon: autoDetectIcon(id),
      },
    [data.items.nodes],
  );

  const getItemsByIds = useCallback(
    (ids: string[]) => ids.map(getItemById),
    [getItemById],
  );

  return (
    <ItemsContext.Provider
      value={{
        items: data.items.nodes,
        getItemById,
        getItemsByIds,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

function autoDetectIcon(id: string): string | undefined {
  return [
    '_arrow',
    '_bolts',
    '_bolts_(e)',
    '_bolt_tips',
    '_javelin_heads',
    '_seed',
  ].some(str => id.endsWith(str))
    ? `${id}_5`
    : undefined;
}

interface ItemsQueryData {
  items: {
    nodes: ItemData[];
  };
  pets: {
    nodes: PetData[];
  };
}

const dataQuery = graphql`
  query ItemsQuery {
    items: allItemsJson {
      nodes {
        id: jsonId
        icon
        name
        tags
      }
    }
    pets: allPetsJson {
      nodes {
        id: jsonId
        icon
        name
        source
        tags
      }
    }
  }
`;
