import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext } from 'react';
import { autoDetectItemIcon } from '../utils/icons';
import type { ItemData, PetData } from '../types/item';

interface ItemsContextData {
  items: ItemData[];
  getItemById: (id: string) => ItemData;
  getItemsByIds: (ids: string[]) => ItemData[];
  getItemData: (item: string | ItemData | undefined) => ItemData | undefined;
}

const defaultData: ItemsContextData = {
  items: [],
  getItemById: () => ({ id: 'Nothing' }),
  getItemsByIds: () => [],
  getItemData: () => undefined,
};

const ItemsContext = createContext<ItemsContextData>(defaultData);
export default ItemsContext;

export function useItemsContext(): ItemsContextData {
  return useContext<ItemsContextData>(ItemsContext);
}

export function ItemsContextProvider({ children }: React.PropsWithChildren) {
  const data = useStaticQuery<ItemsQueryData>(dataQuery);

  const getItemById = useCallback<(id: string) => ItemData>(
    (id: string) =>
      data.items.nodes.find(item => item.id === id) ||
      data.pets.nodes.find(pet => pet.id === id) || {
        id,
        icon: autoDetectItemIcon(id),
      },
    [data],
  );

  const getItemsByIds = useCallback(
    (ids: string[]) => ids?.map(getItemById) ?? [],
    [getItemById],
  );

  const getItemData = useCallback(
    (item: string | ItemData | undefined) => {
      if (!item) return undefined;
      if (typeof item === 'string') return getItemById(item);
      return item;
    },
    [getItemById],
  );

  return (
    <ItemsContext.Provider
      value={{
        items: data.items.nodes,
        getItemById,
        getItemsByIds,
        getItemData,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

interface ItemsQueryData {
  items: { nodes: ItemData[] };
  pets: { nodes: PetData[] };
}

const dataQuery = graphql`
  query ItemsQuery {
    items: allItemsJson {
      nodes {
        id: jsonId
        icon
        name
        tags
        transmutations
        tooltip
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
