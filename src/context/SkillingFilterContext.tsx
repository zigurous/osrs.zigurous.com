import React, { createContext, useContext, useState } from 'react';
import { skillingFilters } from '../utils';
import type { Activity, SkillingFilter } from '../types';

interface SkillingFilterContextData {
  selectedFilters: SkillingFilter[];
  setFilter: (filter: SkillingFilter) => void;
  clearFilter: () => void;
  addFilter: (filter: SkillingFilter) => void;
  removeFilter: (filter: SkillingFilter) => void;
  selectRange: (filter: SkillingFilter) => void;
  isActivityFiltered: (activity: Activity) => boolean;
}

const defaultData: SkillingFilterContextData = {
  selectedFilters: [],
  setFilter: () => undefined,
  clearFilter: () => undefined,
  addFilter: () => undefined,
  removeFilter: () => undefined,
  selectRange: () => undefined,
  isActivityFiltered: () => true,
};

const SkillingFilterContext =
  createContext<SkillingFilterContextData>(defaultData);
export default SkillingFilterContext;

export function useSkillingFilterContext(): SkillingFilterContextData {
  return useContext<SkillingFilterContextData>(SkillingFilterContext);
}

export function SkillingFilterContextProvider({
  children,
}: React.PropsWithChildren) {
  const [selection, setSelection] = useState<SkillingFilter[]>([]);
  const [pivot, setPivot] = useState<SkillingFilter | null>(null);
  return (
    <SkillingFilterContext.Provider
      value={{
        selectedFilters: selection,
        setFilter: (filter: SkillingFilter) => {
          setPivot(filter);
          setSelection([filter]);
        },
        clearFilter: () => {
          setSelection([]);
        },
        addFilter: (filter: SkillingFilter) => {
          setPivot(filter);
          setSelection(previous =>
            previous.includes(filter) ? previous : [...previous, filter],
          );
        },
        removeFilter: (filter: SkillingFilter) => {
          setPivot(filter);
          setSelection(previous =>
            previous.includes(filter)
              ? previous.filter(f => f !== filter)
              : previous,
          );
        },
        selectRange(filter: SkillingFilter) {
          if (!pivot) {
            setPivot(filter);
            setSelection([filter]);
            return;
          }
          setSelection(previous => {
            const startIndex = skillingFilters.indexOf(pivot);
            const endIndex = skillingFilters.indexOf(filter);
            const range = skillingFilters.slice(
              Math.min(startIndex, endIndex),
              Math.max(startIndex, endIndex) + 1,
            );
            if (endIndex < startIndex) range.reverse();
            return previous.slice(0, previous.indexOf(pivot)).concat(range);
          });
        },
        isActivityFiltered: (activity: Activity) => {
          return selection.length > 0
            ? selection.some(filter => activity.sortingGroups.includes(filter))
            : true;
        },
      }}
    >
      {children}
    </SkillingFilterContext.Provider>
  );
}
