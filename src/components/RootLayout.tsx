import React from 'react';
import ClientProviders from './ClientProviders';
import PageFrame from './PageFrame';

interface RootLayoutProps {
  children?: React.ReactNode;
  location: Location;
}

export default function RootLayout({ children, location }: RootLayoutProps) {
  return (
    <ClientProviders location={location}>
      <div className="app" id="root">
        <main className="flex w-full h-full">{children}</main>
        <PageFrame />
      </div>
    </ClientProviders>
  );
}
