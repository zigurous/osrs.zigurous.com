import React from 'react';
import { ItemsContextProvider, RegionsContextProvider } from '../context';

interface ClientProvidersProps {
  children?: React.ReactNode;
  location: Location;
}

export default function ClientProviders({
  children,
  location,
}: ClientProvidersProps) {
  return (
    <ItemsContextProvider>
      <RegionsContextProvider location={location}>
        {children}
      </RegionsContextProvider>
    </ItemsContextProvider>
  );
}
