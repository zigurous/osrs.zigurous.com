import React from 'react';
import {
  ActivitiesContextProvider,
  ItemsContextProvider,
  RegionsContextProvider,
  FilterContextProvider,
  LocationsContextProvider,
} from '../context';

interface ContextProvidersProps {
  children?: React.ReactNode;
  location: Location;
}

export default function ContextProviders({
  children,
  location,
}: ContextProvidersProps) {
  return (
    <RegionsContextProvider location={location}>
      <ItemsContextProvider>
        <LocationsContextProvider>
          <ActivitiesContextProvider>
            <FilterContextProvider>{children}</FilterContextProvider>
          </ActivitiesContextProvider>
        </LocationsContextProvider>
      </ItemsContextProvider>
    </RegionsContextProvider>
  );
}
