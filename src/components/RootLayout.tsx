import '../styles/global.css';
import React from 'react';
import ContextProviders from './ContextProviders';
import PageFrame from './PageFrame';

interface RootLayoutProps {
  children?: React.ReactNode;
  location: Location;
}

export default function RootLayout({ children, location }: RootLayoutProps) {
  return (
    <ContextProviders location={location}>
      <div className="app" id="root">
        {children}
        <PageFrame />
      </div>
    </ContextProviders>
  );
}
