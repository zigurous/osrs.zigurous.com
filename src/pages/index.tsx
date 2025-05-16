import React from 'react';
import { type HeadFC, type PageProps } from 'gatsby';
import { FooterBar, HeaderBar, RegionPanel, RootLayout, WorldMap } from '../components'; // prettier-ignore

export default function IndexPage({ location }: PageProps) {
  return (
    <RootLayout location={location}>
      <main>
        <div className="flex flex-col w-full h-full">
          <HeaderBar location={location} />
          <WorldMap />
          <FooterBar />
        </div>
        <RegionPanel />
      </main>
    </RootLayout>
  );
}

export const Head: HeadFC = () => <title>OSRS Region Analyzer</title>;
