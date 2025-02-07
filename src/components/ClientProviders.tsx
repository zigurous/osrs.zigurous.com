import React from 'react';
import { RegionsContextProvider } from '../context';

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
      {children}
    </RegionsContextProvider>
  );
}
