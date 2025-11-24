import '../styles/region-panel.css';
import { Button, Text } from '@zigurous/forge-react';
import classNames from 'classnames';
import React, { useState } from 'react';
import RegionPanelBestInSlot from './RegionPanelBestInSlot';
import RegionPanelBosses from './RegionPanelBosses';
import RegionPanelOverview from './RegionPanelOverview';
import RegionPanelPets from './RegionPanelPets';
import RegionPanelQuests from './RegionPanelQuests';
import RegionPanelResources from './RegionPanelResources';
import RegionPanelSkilling from './RegionPanelSkilling';
import RegionPanelSlayer from './RegionPanelSlayer';
import RegionPanelTabs from './RegionPanelTabs';
import { useRegionsContext } from '../context/RegionsContext';
import { sortById } from '../utils/sorting';
import type { Region, RegionId } from '../types/region';

export type RegionPanelTab =
  | 'Best In Slot'
  | 'Bosses'
  | 'Overview'
  | 'Pets'
  | 'Quests'
  | 'Resources'
  | 'Skilling'
  | 'Slayer';

export default function RegionPanel() {
  const [selectedTab, setSelectedTab] = useState<RegionPanelTab>('Overview');
  const context = useRegionsContext();
  const open = context.selectedRegions.length > 0;
  return (
    <div
      className={classNames('region-panel shadow', {
        open,
        closed: !open,
      })}
    >
      {open && (
        <>
          <div
            className="region-panel__header"
            id={context.selectedRegions[context.selectedRegions.length - 1]}
          >
            <Text as="h1" className="region-panel__title" type="display">
              {context.selectedRegions.length == 1
                ? context.getRegionById(context.selectedRegions[0])?.name
                : context.selectedRegions.length >= 11
                  ? 'Gielinor'
                  : `${context.selectedRegions.length} Regions`}
            </Text>
            <Button
              className="region-panel__close-button"
              icon="close"
              iconAlignment="only"
              size="xl"
              variant="unstyled"
              onClick={context.clearRegions}
            />
          </div>
          <RegionPanelTabs
            tabs={[
              { name: 'Overview', disabled: false },
              { name: 'Skilling', disabled: false },
              { name: 'Bosses', disabled: false },
              { name: 'Slayer', disabled: false },
            ]}
            selectedTab={selectedTab}
            onSelectTab={tab => setSelectedTab(tab)}
          />
          <RegionPanelTabs
            tabs={[
              { name: 'Best In Slot', disabled: false },
              { name: 'Resources', disabled: false },
              { name: 'Quests', disabled: false },
              { name: 'Pets', disabled: false },
            ]}
            selectedTab={selectedTab}
            onSelectTab={tab => setSelectedTab(tab)}
          />
          <article className="region-panel__body">
            {renderTab(
              selectedTab,
              combineRegions(
                context.selectedRegions
                  .map(id => context.getRegionById(id))
                  .filter(region => !!region),
              ),
            )}
          </article>
        </>
      )}
    </div>
  );
}

function renderTab(selectedTab: RegionPanelTab, selectedRegion: Region) {
  switch (selectedTab) {
    case 'Best In Slot':
      return <RegionPanelBestInSlot region={selectedRegion} />;
    case 'Bosses':
      return <RegionPanelBosses region={selectedRegion} />;
    case 'Overview':
      return <RegionPanelOverview region={selectedRegion} />;
    case 'Pets':
      return <RegionPanelPets region={selectedRegion} />;
    case 'Quests':
      return <RegionPanelQuests region={selectedRegion} />;
    case 'Resources':
      return <RegionPanelResources region={selectedRegion} />;
    case 'Skilling':
      return <RegionPanelSkilling region={selectedRegion} />;
    case 'Slayer':
      return <RegionPanelSlayer region={selectedRegion} />;
    default:
      return null;
  }
}

function combineRegions(regions: Region[]): Region {
  if (regions.length <= 1) return regions[0];
  return {
    id: regions.map(region => region.id).join(',') as RegionId,
    name: 'Regions',
    description: '',
    storylines: combineUniqueIds(regions, 'storylines'),
    skilling: combineUniqueIds(regions, 'skilling'),
    raids: combineUniqueIds(regions, 'raids'),
    bosses: combineUniqueIds(regions, 'bosses'),
    minigames: combineUniqueIds(regions, 'minigames'),
    guilds: combineUniqueIds(regions, 'guilds'),
    locations: combineUniqueIds(regions, 'locations'),
    dungeons: combineUniqueIds(regions, 'dungeons'),
    islands: combineUniqueIds(regions, 'islands'),
    monsters: combineUniqueIds(regions, 'monsters'),
    npcs: combineUniqueIds(regions, 'npcs'),
    misc: combineUniqueIds(regions, 'misc'),
    pets: combineUniqueIds(regions, 'pets'),
    resources: combineUniqueIds(regions, 'resources'),
  };
}

function combineUniqueIds(regions: Region[], prop: keyof Region): string[] {
  return [
    ...new Set(
      regions
        .map(region => region[prop])
        .flat()
        .sort(sortById),
    ),
  ];
}
