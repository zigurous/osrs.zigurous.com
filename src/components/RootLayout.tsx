import React from 'react';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="app" id="root">
      <main>{children}</main>
    </div>
  );
}
