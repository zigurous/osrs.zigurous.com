import React from 'react';
import {
  ActivitiesContextProvider,
  ItemsContextProvider,
  RegionsContextProvider,
  FilterContextProvider,
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
        <ActivitiesContextProvider>
          <FilterContextProvider>{children}</FilterContextProvider>
        </ActivitiesContextProvider>
      </ItemsContextProvider>
    </RegionsContextProvider>
  );
}
