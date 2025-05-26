import React, { createContext, useContext, useState } from 'react'; // prettier-ignore
import type { BestInSlotSubcategories } from '../types';

type Settings = {
  includePets: boolean;
  includeClues: boolean;
  includeLeagues: boolean;
  includeCosmetics: boolean;
} & BestInSlotSubcategories;

const defaultSettings: Settings = {
  includePets: false,
  includeClues: false,
  includeLeagues: false,
  includeCosmetics: false,
  bisMeleeSubcategory: undefined,
  bisRangedSubcategory: undefined,
  bisMagicSubcategory: undefined,
  bisPrayerSubcategory: undefined,
};

interface SettingsContextData {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const SettingsContext = createContext<SettingsContextData>({
  settings: defaultSettings,
  setSettings: () => undefined,
});

export default SettingsContext;

export function useSettingsContext(): SettingsContextData {
  return useContext<SettingsContextData>(SettingsContext);
}

export function SettingsContextProvider({ children }: React.PropsWithChildren) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
