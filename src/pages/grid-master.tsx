import classNames from 'classnames';
import { type HeadFC, type PageProps } from 'gatsby';
import React from 'react';
import { FooterBar, GridMasterBoard, HeaderBar, RootLayout } from '../components'; // prettier-ignore
import { GridMasterContextProvider } from '../context';
import { useAspectFitScaling } from '../utils';
import '../styles/grid-master.css';

export const Head: HeadFC = () => <title>OSRS Grid Master</title>;

export default function GridMaster({}: PageProps) {
  const [ref, scale] = useAspectFitScaling(640, 640, 0, 1.25);
  return (
    <GridMasterContextProvider>
      <RootLayout id="grid-master">
        <div className="flex flex-col w-full h-full">
          <HeaderBar title="Grid Master" />
          <div className="grid-master" ref={ref}>
            <div
              className={classNames('flex flex-col align-start', {
                invisible: scale === undefined,
              })}
              style={{ transform: `scale(${scale || 1})` }}
            >
              <GridMasterBoard />
            </div>
          </div>
          <FooterBar />
        </div>
      </RootLayout>
    </GridMasterContextProvider>
  );
}
