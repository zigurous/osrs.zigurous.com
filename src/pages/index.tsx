import React from 'react';
import { type HeadFC, type PageProps } from 'gatsby';
import { RootLayout } from '../components';

export default function IndexPage(props: PageProps) {
  return (
    <RootLayout location={props.location}>
      <div></div>
    </RootLayout>
  );
}

export const Head: HeadFC = () => <title>OSRS Region Planner</title>;
