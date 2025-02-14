import React, { createContext, useContext, useState } from 'react';
import type { Activity } from '../types';
import { activityFilters } from '../utils';

type Filter = (typeof activityFilters)[number];

interface FilterContextData {
  selectedFilters: Filter[];
  setFilter: (filter: Filter) => void;
  clearFilter: () => void;
  addFilter: (filter: Filter) => void;
  removeFilter: (filter: Filter) => void;
  selectRange: (filter: Filter) => void;
  isActivityFiltered: (activity: Activity) => boolean;
}

const defaultData: FilterContextData = {
  selectedFilters: [],
  setFilter: () => {},
  clearFilter: () => {},
  addFilter: () => {},
  removeFilter: () => {},
  selectRange: () => {},
  isActivityFiltered: () => true,
};

const FilterContext = createContext<FilterContextData>(defaultData);
export default FilterContext;

export function useFilterContext(): FilterContextData {
  return useContext<FilterContextData>(FilterContext);
}

export function FilterContextProvider({ children }: React.PropsWithChildren) {
  const [selection, setSelection] = useState<Filter[]>([]);
  const [pivot, setPivot] = useState<Filter | null>(null);
  return (
    <FilterContext.Provider
      value={{
        selectedFilters: selection,
        setFilter: (filter: Filter) => {
          setPivot(filter);
          setSelection([filter]);
        },
        clearFilter: () => {
          setSelection([]);
        },
        addFilter: (filter: Filter) => {
          setPivot(filter);
          setSelection(previous =>
            previous.includes(filter) ? previous : [...previous, filter],
          );
        },
        removeFilter: (filter: Filter) => {
          setPivot(filter);
          setSelection(previous =>
            previous.includes(filter)
              ? previous.filter(f => f !== filter)
              : previous,
          );
        },
        selectRange(filter: Filter) {
          if (!pivot) {
            setPivot(filter);
            setSelection([filter]);
            return;
          }
          setSelection(previous => {
            const startIndex = activityFilters.indexOf(pivot);
            const endIndex = activityFilters.indexOf(filter);
            const range = activityFilters.slice(
              Math.min(startIndex, endIndex),
              Math.max(startIndex, endIndex) + 1,
            );
            if (endIndex < startIndex) range.reverse();
            return previous.slice(0, previous.indexOf(pivot)).concat(range);
          });
        },
        isActivityFiltered: (activity: Activity) => {
          return selection.some(filter =>
            activity.sortingGroups.includes(filter),
          );
        },
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
