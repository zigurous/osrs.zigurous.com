import React from 'react';

interface RootLayoutProps {
  children: React.ReactNode;
  id?: string;
}

export default function RootLayout({ children, id }: RootLayoutProps) {
  return (
    <div className="app" id="root">
      <main id={id}>{children}</main>
    </div>
  );
}
