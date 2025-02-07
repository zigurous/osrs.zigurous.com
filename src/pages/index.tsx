import React from 'react';
import { type HeadFC, type PageProps } from 'gatsby';
import { RegionPanel, RootLayout, WorldMap } from '../components';

export default function IndexPage(props: PageProps) {
  return (
    <RootLayout location={props.location}>
      <WorldMap />
      <RegionPanel />
    </RootLayout>
  );
}

export const Head: HeadFC = () => <title>OSRS Region Planner</title>;
