import React, { createContext, useContext, useState } from 'react';
import { skills } from '../utils/constants';
import type { Activity } from '../types/activity';
import type { Skill } from '../types/skill';

interface SkillingFilterContextData {
  selectedFilters: Skill[];
  setFilter: (filter: Skill) => void;
  clearFilter: () => void;
  addFilter: (filter: Skill) => void;
  removeFilter: (filter: Skill) => void;
  selectRange: (filter: Skill) => void;
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
  const [selection, setSelection] = useState<Skill[]>([]);
  const [pivot, setPivot] = useState<Skill | null>(null);
  return (
    <SkillingFilterContext.Provider
      value={{
        selectedFilters: selection,
        setFilter: (filter: Skill) => {
          setPivot(filter);
          setSelection([filter]);
        },
        clearFilter: () => {
          setSelection([]);
        },
        addFilter: (filter: Skill) => {
          setPivot(filter);
          setSelection(previous =>
            previous.includes(filter) ? previous : [...previous, filter],
          );
        },
        removeFilter: (filter: Skill) => {
          setPivot(filter);
          setSelection(previous =>
            previous.includes(filter)
              ? previous.filter(f => f !== filter)
              : previous,
          );
        },
        selectRange(filter: Skill) {
          if (!pivot) {
            setPivot(filter);
            setSelection([filter]);
            return;
          }
          setSelection(previous => {
            const startIndex = skills.indexOf(pivot);
            const endIndex = skills.indexOf(filter);
            const range = skills.slice(
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
