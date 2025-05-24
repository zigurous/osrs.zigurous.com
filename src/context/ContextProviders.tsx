import React from 'react';
import { ActivitiesContextProvider } from './ActivitiesContext';
import { ItemsContextProvider } from './ItemsContext';
import { LocationsContextProvider } from './LocationsContext';
import { RegionsContextProvider } from './RegionsContext';
import { SettingsContextProvider } from './SettingsContext';
import { SkillingFilterContextProvider } from './SkillingFilterContext';

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
              <SkillingFilterContextProvider>
                {children}
              </SkillingFilterContextProvider>
            </ActivitiesContextProvider>
          </LocationsContextProvider>
        </ItemsContextProvider>
      </RegionsContextProvider>
    </SettingsContextProvider>
  );
}
