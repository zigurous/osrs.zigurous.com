import classNames from 'classnames';
import { type HeadFC, type PageProps } from 'gatsby';
import React from 'react';
import { FooterBar, GridMasterBoard, GridMasterTaskModal, HeaderBar, RootLayout } from '../components'; // prettier-ignore
import { GridMasterContextProvider, useGridMasterContext } from '../context';
import { useAspectFitElement } from '../utils';
import type { GridMasterTask } from '../types';
import '../styles/grid-master.css';

export const Head: HeadFC = () => <title>OSRS Grid Master</title>;

export default function GridMaster({}: PageProps) {
  return (
    <GridMasterContextProvider>
      <GridMasterPageContent />
    </GridMasterContextProvider>
  );
}

function GridMasterPageContent() {
  const context = useGridMasterContext();
  const [ref, scale] = useAspectFitElement(512, 512, 1, 1.25);
  return (
    <RootLayout id="grid-master">
      <div className="flex flex-col w-full h-full">
        <HeaderBar title="Grid Master" />
        <div className="grid-master" ref={ref}>
          <div
            className={classNames('flex flex-col align-center', {
              invisible: scale === undefined,
            })}
            style={{ transform: `scale(${scale || 1})` }}
          >
            <GridMasterBoard />
          </div>
        </div>
        <FooterBar />
      </div>
      <GridMasterTaskModal
        onRequestClose={context.closeTask}
        open={Boolean(context.selectedTask)}
        scale={scale}
        task={context.selectedTask || context.previousTask || emptyTask}
      />
    </RootLayout>
  );
}

const emptyTask: GridMasterTask = {
  id: 'Unknown',
  icon: 'Lumbridge_guide_icon',
};
