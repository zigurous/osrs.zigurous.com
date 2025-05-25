import { Button, Text } from '@zigurous/forge-react';
import classNames from 'classnames';
import React, { useState } from 'react';
import RegionPanelBestInSlot from './RegionPanelBestInSlot';
import RegionPanelBosses from './RegionPanelBosses';
import RegionPanelOverview from './RegionPanelOverview';
import RegionPanelPets from './RegionPanelPets';
import RegionPanelQuests from './RegionPanelQuests';
import RegionPanelSkilling from './RegionPanelSkilling';
import RegionPanelSlayer from './RegionPanelSlayer';
import RegionPanelTabs from './RegionPanelTabs';
import { useRegionsContext } from '../context';
import type { Region } from '../types';
import '../styles/region-panel.css';

export type RegionPanelTab =
  | 'Overview'
  | 'Skilling'
  | 'Bosses'
  | 'Pets'
  | 'Best In Slot'
  | 'Slayer'
  | 'Quests';

export default function RegionPanel() {
  const [selectedTab, setSelectedTab] = useState<RegionPanelTab>('Overview');
  const { selectedRegion, deselectRegion } = useRegionsContext();
  return (
    <div
      className={classNames('region-panel shadow', {
        open: !!selectedRegion,
        closed: !selectedRegion,
      })}
    >
      {selectedRegion && (
        <>
          <div className="region-panel__header" id={selectedRegion.id}>
            <Text
              as="h1"
              className="region-panel__title"
              id={selectedRegion.id}
              type="display"
            >
              {selectedRegion.name}
            </Text>
            <Button
              className="region-panel__close-button"
              icon="close"
              iconAlignment="only"
              size="xl"
              variant="unstyled"
              onClick={deselectRegion}
            />
          </div>
          <RegionPanelTabs
            tabs={[
              { name: 'Overview', disabled: false },
              { name: 'Skilling', disabled: false },
              { name: 'Bosses', disabled: selectedRegion.bosses.length <= 0 },
              { name: 'Pets', disabled: selectedRegion.pets.length <= 0 },
            ]}
            selectedTab={selectedTab}
            onSelectTab={tab => setSelectedTab(tab)}
          />
          <RegionPanelTabs
            tabs={[
              { name: 'Best In Slot', disabled: false },
              { name: 'Slayer', disabled: false },
              {
                name: 'Quests',
                disabled: selectedRegion.storylines.length <= 0,
              },
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
    case 'Overview':
      return <RegionPanelOverview region={selectedRegion} />;
    case 'Skilling':
      return <RegionPanelSkilling region={selectedRegion} />;
    case 'Bosses':
      return <RegionPanelBosses region={selectedRegion} />;
    case 'Pets':
      return <RegionPanelPets region={selectedRegion} />;
    case 'Best In Slot':
      return <RegionPanelBestInSlot region={selectedRegion} />;
    case 'Slayer':
      return <RegionPanelSlayer region={selectedRegion} />;
    case 'Quests':
      return <RegionPanelQuests region={selectedRegion} />;
    default:
      return null;
  }
}
