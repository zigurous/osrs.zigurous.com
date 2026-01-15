import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { autoDetectItemIcon } from '../utils/icons';
import type { DynamicItemIdGetter, ItemData, ItemTable, PetData } from '../types/item'; // prettier-ignore

// prettier-ignore
interface ItemsContextData {
  items: ItemData[];
  ownedItems: Set<string> | null;
  getItemById: (id: string) => ItemData;
  getItemsByIds: (ids: string[]) => ItemData[];
  getItemData: (item: string | ItemData | undefined) => ItemData | undefined;
  getDynamicItemIdFromTable: DynamicItemIdGetter;
  setOwnedItems: (items: Set<string> | null) => void;
}

const defaultData: ItemsContextData = {
  items: [],
  ownedItems: null,
  getItemById: () => ({ id: 'Nothing' }),
  getItemsByIds: () => [],
  getItemData: () => undefined,
  getDynamicItemIdFromTable: () => '',
  setOwnedItems: () => undefined,
};

const ItemsContext = createContext<ItemsContextData>(defaultData);
export default ItemsContext;

export function useItemsContext(): ItemsContextData {
  return useContext<ItemsContextData>(ItemsContext);
}

const STORAGE_KEY = 'bank-memory';

export function ItemsContextProvider({ children }: React.PropsWithChildren) {
  const data = useStaticQuery<ItemsQueryData>(dataQuery);
  const [ownedItems, _setOwnedItems] = useState<Set<string> | null>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const json = window.localStorage.getItem(STORAGE_KEY);
      if (json) {
        return new Set(JSON.parse(json));
      }
    }
    return null;
  });

  const setOwnedItems = useCallback((items: Set<string> | null) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (items) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...items]));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    _setOwnedItems(items);
  }, []);

  const getItemById = useCallback<(id: string) => ItemData>(
    (id: string) => {
      if (id.includes('#')) {
        if (id.startsWith('#')) {
          return { id } as ItemData;
        }
        const split = id.split('#');
        const baseId = split[0];
        const item = data.items.nodes.find(item => item.id === baseId) || {
          id: baseId,
          icon: autoDetectItemIcon(baseId),
        };
        return {
          ...item,
          tags: [...(item.tags || []), split[1].toLowerCase()],
        } as ItemData;
      }
      return (
        data.items.nodes.find(item => item.id === id) ||
        data.pets.nodes.find(pet => pet.id === id) || {
          id,
          icon: autoDetectItemIcon(id),
        }
      );
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

  const getDynamicItemIdFromTable = useCallback<DynamicItemIdGetter>(
    (id, defaultId, minimumId, predicate) => {
      if (!ownedItems) return defaultId || id;
      const owned = (
        item: string,
        key?: string,
        index?: number,
        table?: ItemTable,
      ) => {
        if (!ownedItems.has(item) && !unmarkedItems.includes(item)) {
          return false;
        } else if (predicate) {
          return predicate(item, ownedItems, key, index, table);
        } else {
          return true;
        }
      };
      if (id.startsWith('{')) {
        const tables = id.split('|');
        // prettier-ignore
        for (let i = 0; i < tables.length; i++) {
          const key = tables[i];
          const optional = key.includes('?');
          const required = key.endsWith('!');
          if (key.startsWith('{item=')) {
            const itemId = key.slice(key.indexOf('=') + 1, key.indexOf('}'));
            if (owned(itemId, key)) {
              return itemId !== 'null' ? itemId : undefined;
            } else if (required || (itemId === minimumId && !optional)) {
              return `${itemId}#Missing`;
            } else if (i === tables.length - 1) {
              return optional ? undefined : `${minimumId || defaultId || itemId}#Missing`;
            }
          } else {
            const tableId = key.slice(0, key.indexOf('}') + 1);
            const table = data.tables.nodes.find(node => node.id === tableId);
            const minimumIndex = (table && minimumId) ? table.items.indexOf(minimumId) : -1;
            const match = table?.items.find((item, index) => {
              return owned(item, key, index, table) && (minimumIndex === -1 || index <= minimumIndex);
            });
            if (match) {
              return match;
            } else if (required) {
              return `${minimumId}#Missing`;
            } else if (i === tables.length - 1) {
              if (key === 'null' || optional) return undefined;
              if (minimumId) return `${minimumId}#Missing`;
              if (defaultId) return `${defaultId}#Missing`;
              return undefined;
            }
          }
        }
      }
      if (!defaultId) return undefined;
      return owned(defaultId) ? defaultId : `${defaultId}#Missing`;
    },
    [ownedItems, data.tables.nodes],
  );

  return (
    <ItemsContext.Provider
      value={{
        items: data.items.nodes,
        ownedItems,
        getItemById,
        getItemsByIds,
        getItemData,
        getDynamicItemIdFromTable,
        setOwnedItems,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

const unmarkedItems = [
  'null',
  'Cooked_bream',
  'Cooked_moss_lizard',
  'Enchanted_symbol',
  'Moonlight_potion',
  'Raw_bream',
  'Raw_moss_lizard',
];

interface ItemsQueryData {
  items: { nodes: ItemData[] };
  pets: { nodes: PetData[] };
  tables: { nodes: ItemTable[] };
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
    tables: allItemTablesJson {
      nodes {
        id: jsonId
        items
      }
    }
  }
`;
