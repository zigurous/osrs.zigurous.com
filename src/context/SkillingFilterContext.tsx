import React, { createContext, useContext, useState } from 'react';
import { skillingFilters } from '../utils';
import type { Activity, SkillFilter } from '../types';

interface SkillingFilterContextData {
  selectedFilters: SkillFilter[];
  setFilter: (filter: SkillFilter) => void;
  clearFilter: () => void;
  addFilter: (filter: SkillFilter) => void;
  removeFilter: (filter: SkillFilter) => void;
  selectRange: (filter: SkillFilter) => void;
  isActivityIncluded: (activity: Activity) => boolean;
}

const defaultData: SkillingFilterContextData = {
  selectedFilters: [],
  setFilter: () => undefined,
  clearFilter: () => undefined,
  addFilter: () => undefined,
  removeFilter: () => undefined,
  selectRange: () => undefined,
  isActivityIncluded: () => true,
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
  const [selection, setSelection] = useState<SkillFilter[]>([]);
  const [pivot, setPivot] = useState<SkillFilter | null>(null);
  return (
    <SkillingFilterContext.Provider
      value={{
        selectedFilters: selection,
        setFilter: (filter: SkillFilter) => {
          setPivot(filter);
          setSelection([filter]);
        },
        clearFilter: () => {
          setSelection([]);
        },
        addFilter: (filter: SkillFilter) => {
          setPivot(filter);
          setSelection(previous =>
            previous.includes(filter) ? previous : [...previous, filter],
          );
        },
        removeFilter: (filter: SkillFilter) => {
          setPivot(filter);
          setSelection(previous =>
            previous.includes(filter)
              ? previous.filter(f => f !== filter)
              : previous,
          );
        },
        selectRange(filter: SkillFilter) {
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
        isActivityIncluded: (activity: Activity) => {
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
