import classNames from 'classnames';
import { type HeadFC, type PageProps } from 'gatsby';
import React from 'react';
import FooterBar from '../components/FooterBar';
import GridMasterBoard from '../components/GridMasterBoard';
import GridMasterHeader from '../components/GridMasterHeader';
import HeaderBar from '../components/HeaderBar';
import RootLayout from '../components/RootLayout';
import { GridMasterContextProvider } from '../context/GridMasterContext';
import { useAspectFitScaling } from '../hooks/useAspectFitScaling';
import '../styles/grid-master.css';

export const Head: HeadFC = () => <title>OSRS Grid Master</title>;

export default function GridMaster({}: PageProps) {
  const [ref, scale] = useAspectFitScaling(640, 720, 0, 1.25);
  return (
    <GridMasterContextProvider>
      <RootLayout id="grid-master">
        <div className="flex flex-col w-full h-full">
          <HeaderBar title="Grid Master" />
          <div className="grid-master" ref={ref}>
            <div
              className={classNames({
                invisible: scale === undefined,
              })}
              style={{ transform: `scale(${scale || 1})` }}
            >
              <GridMasterHeader />
              <GridMasterBoard />
            </div>
          </div>
          <FooterBar />
        </div>
      </RootLayout>
    </GridMasterContextProvider>
  );
}
