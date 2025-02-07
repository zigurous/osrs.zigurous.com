import React from 'react';
import PageFrame from './PageFrame';

interface RootLayoutProps {
  children?: React.ReactNode;
  location: Location;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="app" id="root">
      <main className="flex w-full h-full">{children}</main>
      <PageFrame />
    </div>
  );
}
