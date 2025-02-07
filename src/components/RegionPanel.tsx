import { Text } from '@zigurous/forge-react';
import classNames from 'classnames';
import React, { useState } from 'react';
import AreaBadge from './AreaBadge';
import RegionPanelTabs from './RegionPanelTabs';
import { useRegionsContext } from '../context';
import type { Region } from '../types';
import '../styles/region-panel.css';

export type RegionPanelTab =
  | 'Overview'
  | 'Bosses'
  | 'Skilling'
  | 'Pets'
  | 'Best In Slot'
  | 'Slayer'
  | 'Quests';

export default function RegionPanel() {
  const [selectedTab, setSelectedTab] = useState<RegionPanelTab>('Overview');
  const { selectedRegion } = useRegionsContext();
  return (
    <div
      className={classNames('region-panel shadow', {
        open: !!selectedRegion,
        closed: !selectedRegion,
      })}
    >
      {selectedRegion && (
        <>
          <div className="region-panel__header">
            <AreaBadge region={selectedRegion} hideText />
            <Text
              as="h1"
              className="region-panel__title"
              id={selectedRegion.id}
              type="display"
            >
              {selectedRegion.name}
            </Text>
          </div>
          <RegionPanelTabs
            tabs={[
              { name: 'Overview', disabled: false },
              { name: 'Bosses', disabled: false },
              { name: 'Skilling', disabled: false },
              { name: 'Pets', disabled: false },
            ]}
            selectedTab={selectedTab}
            onSelectTab={tab => setSelectedTab(tab)}
          />
          <RegionPanelTabs
            tabs={[
              { name: 'Best In Slot', disabled: false },
              { name: 'Slayer', disabled: false },
              { name: 'Quests', disabled: true },
            ]}
            selectedTab={selectedTab}
            onSelectTab={tab => setSelectedTab(tab)}
          />
          <article className="region-panel__body">
            {renderTab(selectedTab, selectedRegion)}
          </article>
        </>
      )}
    </div>
  );
}

function renderTab(selectedTab: RegionPanelTab, selectedRegion: Region) {
  switch (selectedTab) {
    default:
      return null;
  }
}
