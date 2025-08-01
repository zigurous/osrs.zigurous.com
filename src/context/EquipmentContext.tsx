import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext } from 'react';
import type { EquipmentItem } from '../types';

interface EquipmentContextData {
  equipment: EquipmentItem[];
  getItemById: (id: string) => EquipmentItem | undefined;
}

const defaultData: EquipmentContextData = {
  equipment: [],
  getItemById: () => undefined,
};

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
    (id: string) => data.equipment.nodes.find(item => item.id === id),
    [data],
  );

  return (
    <EquipmentContext.Provider
      value={{
        equipment: data.equipment.nodes,
        getItemById,
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
        requiredWeapon
        ammo {
          id
          icon
        }
      }
    }
  }
`;
