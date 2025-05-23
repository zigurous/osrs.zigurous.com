import React from 'react';
import { ActivitiesContextProvider } from './ActivitiesContext';
import { FilterContextProvider } from './FilterContext';
import { ItemsContextProvider } from './ItemsContext';
import { LocationsContextProvider } from './LocationsContext';
import { RegionsContextProvider } from './RegionsContext';
import { SettingsContextProvider } from './SettingsContext';

interface ContextProvidersProps {
  children?: React.ReactNode;
  location: Location;
}

export default function ContextProviders({
  children,
  location,
}: ContextProvidersProps) {
  return (
    <SettingsContextProvider>
      <RegionsContextProvider location={location}>
        <ItemsContextProvider>
          <LocationsContextProvider>
            <ActivitiesContextProvider>
              <FilterContextProvider>{children}</FilterContextProvider>
            </ActivitiesContextProvider>
          </LocationsContextProvider>
        </ItemsContextProvider>
      </RegionsContextProvider>
    </SettingsContextProvider>
  );
}
