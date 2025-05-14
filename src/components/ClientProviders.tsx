import React from 'react';
import {
  ActivitiesContextProvider,
  ItemsContextProvider,
  RegionsContextProvider,
  FilterContextProvider,
  LocationsContextProvider,
} from '../context';

interface ClientProvidersProps {
  children?: React.ReactNode;
  location: Location;
}

export default function ClientProviders({
  children,
  location,
}: ClientProvidersProps) {
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
