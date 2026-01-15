import { useIsMounted } from '@zigurous/forge-react';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'; // prettier-ignore
import { useItemsContext } from './ItemsContext';
import type { EquipmentSlotId, EquippedItemIds } from '../types/equipment';
import type { InventoryIds } from '../types/inventory';
import type { DynamicItemIdGetter } from '../types/item';
import type { RecommendedSetup, RecommendedSetupNode, RecommendedSetupNodeLoadout } from '../types/recommended-setup'; // prettier-ignore

interface RecommendedSetupsContextData {
  setups: RecommendedSetup[];
  currentSetup: RecommendedSetup | null;
  previousSetup: RecommendedSetup | null;
  getSetupById: (id: string) => RecommendedSetup | undefined;
  viewSetup: (id: string) => void;
  closeSetup: () => void;
}

const defaultData: RecommendedSetupsContextData = {
  setups: [],
  currentSetup: null,
  previousSetup: null,
  getSetupById: () => undefined,
  viewSetup: () => undefined,
  closeSetup: () => undefined,
};

const RecommendedSetupsContext =
  createContext<RecommendedSetupsContextData>(defaultData);
export default RecommendedSetupsContext;

export function useRecommendedSetupsContext(): RecommendedSetupsContextData {
  return useContext<RecommendedSetupsContextData>(RecommendedSetupsContext);
}

export function RecommendedSetupsContextProvider({
  children,
}: React.PropsWithChildren) {
  const mounted = useIsMounted();
  const data = useStaticQuery<RecommendedSetupsQueryData>(dataQuery);
  const { ownedItems, getDynamicItemIdFromTable } = useItemsContext();
  const [setup, setSetup] = useState<{
    current: RecommendedSetup | null;
    previous: RecommendedSetup | null;
  }>({ current: null, previous: null });

  const setups = useMemo<RecommendedSetup[]>(
    () =>
      data.setups.nodes.map(setup => ({
        ...setup,
        loadouts: setup.loadouts.map(loadout => {
          const equipment = getDynamicEquipment(
            loadout,
            getDynamicItemIdFromTable,
          );
          const inventory = getDynamicInventory(
            loadout,
            getDynamicItemIdFromTable,
            equipment,
          );
          equipment.ammo = getDynamicAmmo(
            equipment,
            inventory,
            loadout,
            getDynamicItemIdFromTable,
          );
          return { ...loadout, equipment, inventory };
        }),
      })),
    [data, ownedItems, getDynamicItemIdFromTable],
  );

  const getSetupById = useCallback(
    (id: string) => setups.find(setup => setup.id === id),
    [setups],
  );

  const viewSetup = useCallback(
    (id: string) =>
      setSetup(state => ({
        current: getSetupById(id) || null,
        previous: state.current,
      })),
    [getSetupById],
  );

  const closeSetup = useCallback(
    () => setSetup(state => ({ current: null, previous: state.current })),
    [],
  );

  useEffect(() => {
    if (mounted) {
      const query = location.search.replace('?setup=', '');
      setSetup({ current: getSetupById(query) || null, previous: null });
    }
  }, [mounted]);

  useEffect(() => {
    if (setup.current) {
      navigate(`?setup=${setup.current.id}`, { replace: true });
    } else if (mounted) {
      navigate(`/gear-progression`, { replace: true });
    }
  }, [setup.current]);

  return (
    <RecommendedSetupsContext.Provider
      value={{
        setups,
        currentSetup: setup.current,
        previousSetup: setup.previous,
        getSetupById,
        viewSetup,
        closeSetup,
      }}
    >
      {children}
    </RecommendedSetupsContext.Provider>
  );
}

function getDynamicEquipment(
  loadout: RecommendedSetupNodeLoadout,
  getDynamicItemIdFromTable: DynamicItemIdGetter,
): EquippedItemIds {
  const equipment: EquippedItemIds = {};
  loadout.equipment.forEach(el => {
    equipment[el.slot] = getDynamicItemIdFromTable(
      el.item,
      el.default,
      el.minimum,
      (_, ownedItems, key) => {
        if (!key) return true;
        // conditional based on whether a specific item is owned
        if (key.includes('?owns')) {
          const startIndex = key.indexOf('?') + 1;
          const endIndex = key.indexOf('=', startIndex);
          const item = key.slice(endIndex + 1);
          return ownedItems.has(item);
        }
        // conditional based on another equipped item
        if (key.includes('?') && !key.endsWith('?')) {
          const startIndex = key.indexOf('?') + 1;
          const endIndex = key.indexOf('=', startIndex);
          const requiredItem = key.slice(endIndex + 1);
          const slot = key
            .slice(startIndex, endIndex)
            .replace('!', '') as EquipmentSlotId;
          return key.includes('!=')
            ? equipment[slot]?.split('#')[0] !== requiredItem
            : equipment[slot]?.split('#')[0] === requiredItem;
        }
        return true;
      },
    );
  });
  return equipment;
}

function getDynamicInventory(
  loadout: RecommendedSetupNodeLoadout,
  getDynamicItemIdFromTable: DynamicItemIdGetter,
  equipment: EquippedItemIds = {},
): InventoryIds {
  const inventory: InventoryIds = {};
  loadout.inventory.forEach(el => {
    inventory[el.slot] = getDynamicItemIdFromTable(
      el.item,
      el.default,
      el.minimum,
      (item, ownedItems, key, index, table) => {
        // prevent duplicate weapon or offhand
        if (item === equipment.weapon || item === equipment.shield) {
          return false;
        }
        // prevent downgrade to equipped offhand
        if (table && index !== undefined && equipment.shield) {
          const equippedIndex = table.items.indexOf(equipment.shield);
          if (equippedIndex !== -1 && equippedIndex < index) {
            return false;
          }
        }
        // prettier-ignore
        // fairy ring staff is not needed after lumbridge elite diary
        if ((item === 'Dramen_staff' || item === 'Lunar_staff') && ownedItems.has("Explorer's_ring_4")) {
          return false;
        }
        if (!key) return true;
        // conditional based on another inventory slot
        if (key.includes('?slot')) {
          const startIndex = key.indexOf('?slot') + 5;
          const endIndex = key.indexOf('=', startIndex);
          const slot = Number.parseInt(key.slice(startIndex, endIndex));
          const requiredItem = key.slice(endIndex + 1);
          return key.includes('!=')
            ? inventory[slot]?.split('#')[0] !== requiredItem
            : inventory[slot]?.split('#')[0] === requiredItem;
        }
        // conditional based on whether a specific item is owned
        if (key.includes('?owns')) {
          const startIndex = key.indexOf('?') + 1;
          const endIndex = key.indexOf('=', startIndex);
          const item = key.slice(endIndex + 1);
          return ownedItems.has(item);
        }
        if (key.includes('?noduplicate')) {
          for (let i = 0; i < 28; i++) {
            if (inventory[i] === item) {
              return false;
            }
          }
          return true;
        }
        // conditional based on an equipped item
        if (key.includes('?') && !key.endsWith('?')) {
          const startIndex = key.indexOf('?') + 1;
          const endIndex = key.indexOf('=', startIndex);
          const requiredItem = key.slice(endIndex + 1);
          const slot = key
            .slice(startIndex, endIndex)
            .replace('!', '') as EquipmentSlotId;
          return key.includes('!=')
            ? equipment[slot]?.split('#')[0] !== requiredItem
            : equipment[slot]?.split('#')[0] === requiredItem;
        }
        return true;
      },
    );
  });
  return inventory;
}

function getDynamicAmmo(
  equipment: EquippedItemIds,
  inventory: InventoryIds,
  loadout: RecommendedSetupNodeLoadout,
  getDynamicItemIdFromTable: DynamicItemIdGetter,
): string | undefined {
  const ammo = loadout.equipment.find(el => el.slot === 'ammo');
  if (!ammo) return equipment.ammo;
  return getDynamicItemIdFromTable(
    ammo.item,
    ammo.default,
    ammo.minimum,
    (_, ownedItems, key) => {
      if (!key) return true;
      // conditional based on an inventory slot
      if (key.includes('?inv')) {
        const startIndex = key.indexOf('?inv') + 4;
        const endIndex = key.indexOf('=', startIndex);
        const slot = Number.parseInt(key.slice(startIndex, endIndex));
        const requiredItem = key.slice(endIndex + 1);
        return key.includes('!=')
          ? inventory[slot]?.split('#')[0] !== requiredItem
          : inventory[slot]?.split('#')[0] === requiredItem;
      }
      // conditional based on whether a specific item is owned
      if (key.includes('?owns')) {
        const startIndex = key.indexOf('?') + 1;
        const endIndex = key.indexOf('=', startIndex);
        const item = key.slice(endIndex + 1);
        return ownedItems.has(item);
      }
      // conditional based on another equipped item
      if (key.includes('?') && !key.endsWith('?')) {
        const startIndex = key.indexOf('?') + 1;
        const endIndex = key.indexOf('=', startIndex);
        const requiredItem = key.slice(endIndex + 1);
        const slot = key
          .slice(startIndex, endIndex)
          .replace('!', '') as EquipmentSlotId;
        return key.includes('!=')
          ? equipment[slot]?.split('#')[0] !== requiredItem
          : equipment[slot]?.split('#')[0] === requiredItem;
      }
      return true;
    },
  );
}

interface RecommendedSetupsQueryData {
  setups: {
    nodes: RecommendedSetupNode[];
  };
}

const dataQuery = graphql`
  query RecommendedSetupsQuery {
    setups: allRecommendedSetupsJson {
      nodes {
        id: jsonId
        title
        strategiesLinkId
        loadouts {
          title
          equipment {
            slot
            item
            default
            minimum
          }
          inventory {
            slot
            item
            default
            minimum
          }
          runePouch
          spell
          spellbook
        }
      }
    }
  }
`;
