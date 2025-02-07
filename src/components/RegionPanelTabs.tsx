import { Stack } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';
import { type RegionPanelTab } from './RegionPanel';

interface RegionPanelTabsProps {
  tabs: { name: RegionPanelTab; disabled?: boolean }[];
  selectedTab: RegionPanelTab;
  onSelectTab?: (tab: RegionPanelTab) => void;
}

export default function RegionPanelTabs({
  tabs,
  selectedTab,
  onSelectTab,
}: RegionPanelTabsProps) {
  return (
    <div className="region-panel__tabs">
      <Stack align="center" justify="between">
        {tabs.map(tab => (
          <button
            key={tab.name}
            aria-selected={selectedTab === tab.name}
            className={classNames('region-panel__tab', {
              active: selectedTab === tab.name,
            })}
            disabled={tab.disabled}
            onClick={() => {
              if (onSelectTab) {
                onSelectTab(tab.name);
              }
            }}
          >
            {tab.name}
          </button>
        ))}
      </Stack>
    </div>
  );
}
