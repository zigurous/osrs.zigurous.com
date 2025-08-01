import React from 'react';
import PageFrame from './PageFrame';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="app" id="root">
      {children}
      <PageFrame />
    </div>
  );
}
