import { type HeadFC, type PageProps } from 'gatsby';
import React from 'react';
import { FooterBar, HeaderBar, RootLayout } from '../components'; // prettier-ignore

export const Head: HeadFC = () => <title>OSRS Grid Master</title>;

export default function GridMaster({ location }: PageProps) {
  return (
    <ContextProviders location={location}>
      <RootLayout id="grid-master">
        <div className="flex flex-col w-full h-full">
          <HeaderBar title="Grid Master" />
          <div className="w-full h-full" />
          <FooterBar />
        </div>
      </RootLayout>
    </ContextProviders>
  );
}

interface ContextProvidersProps {
  children: React.ReactNode;
  location: Location;
}

function ContextProviders({ children, location }: ContextProvidersProps) {
  return children;
}
