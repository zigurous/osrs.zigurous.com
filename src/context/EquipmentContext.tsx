import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext } from 'react';
import type { EquipmentItem, EquipmentSlotId } from '../types/equipment';
import type { ItemTag } from '../types/item';

// prettier-ignore
interface EquipmentContextData {
  equipment: EquipmentItem[];
  getItemById: (id: string, slot?: EquipmentSlotId) => EquipmentItem | undefined;
  getItemData: (item: string | EquipmentItem | undefined, slot?: EquipmentSlotId) => EquipmentItem | undefined;
}

const defaultData: EquipmentContextData = {
  equipment: [],
  getItemById: () => undefined,
  getItemData: () => undefined,
};

const specialTags = ['*', 'Leagues', 'Clues', 'Missing'];

const EquipmentContext = createContext<EquipmentContextData>(defaultData);
export default EquipmentContext;

export function useEquipmentContext(): EquipmentContextData {
  return useContext<EquipmentContextData>(EquipmentContext);
}

export function EquipmentContextProvider({
  children,
}: React.PropsWithChildren) {
  const data = useStaticQuery<EquipmentQueryData>(dataQuery);

  const getItemById = useCallback(
    (id: string, slot?: EquipmentSlotId) => {
      if (id.includes('#')) {
        const split = id.split('#');
        const baseId = split[0];
        const item =
          data.equipment.nodes.find(item => item.id === id) ||
          data.equipment.nodes.find(item => item.id === baseId);
        if (!item) return undefined;
        const specialIdentifier = split[1];
        const tags = [...(item.tags || [])];
        if (specialTags.includes(specialIdentifier)) {
          tags.push(split[1].toLowerCase() as ItemTag);
        }
        const requiredWeapon = specialIdentifier.includes('Weapon=')
          ? specialIdentifier.split('Weapon=')[1]
          : undefined;
        return {
          ...item,
          id: baseId,
          tags,
          regions: item.regions_single || item.regions,
          requiredWeapon,
        } as EquipmentItem;
      }
      return (
        data.equipment.nodes.find(item => item.id === id) ||
        (slot && { id, slot })
      );
    },
    [data],
  );

  const getItemData = useCallback(
    (item: string | EquipmentItem | undefined, slot?: EquipmentSlotId) => {
      if (!item) return undefined;
      if (typeof item === 'string') return getItemById(item, slot);
      return item;
    },
    [getItemById],
  );

  return (
    <EquipmentContext.Provider
      value={{
        equipment: data.equipment.nodes,
        getItemById,
        getItemData,
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
}

interface EquipmentQueryData {
  equipment: { nodes: EquipmentItem[] };
}

const dataQuery = graphql`
  query EquipmentQuery {
    equipment: allEquipmentJson {
      nodes {
        id: jsonId
        icon
        name
        slot
        tags
        regions
        regions_single
        requiredWeapon
        ammo {
          id
          icon
        }
        requirements {
          skill
          level
        }
      }
    }
  }
`;
