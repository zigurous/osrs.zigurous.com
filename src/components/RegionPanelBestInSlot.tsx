import { Stack, Text } from '@zigurous/forge-react';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import BestInSlotEquipmentCard from './BestInSlotEquipmentCard';
import CheckboxToggle from './CheckboxToggle';
import RegionPanelSection from './RegionPanelSection';
import { useSettingsContext } from '../context';
import { equipmentCategories } from '../utils';
import type { BestInSlotQueryData, Region } from '../types';

interface RegionPanelBestInSlotProps {
  region: Region;
}

export default function RegionPanelBestInSlot({
  region,
}: RegionPanelBestInSlotProps) {
  const data = useStaticQuery<BestInSlotQueryData>(dataQuery);
  const settings = useSettingsContext();
  return (
    <RegionPanelSection title="Best In Slot" titleMargin="lg">
      <Stack inline className="ml-sm" spacing="lg">
        <CheckboxToggle
          id="clues-toggle"
          label="Clue Items"
          checked={settings.bisClues}
          onChange={checked => settings.set('bisClues', checked)}
        />
        <CheckboxToggle
          id="leagues-toggle"
          label="Leagues"
          checked={settings.leagues}
          onChange={checked => settings.set('leagues', checked)}
        />
        <CheckboxToggle
          id="strict-toggle"
          label="Strict Mode"
          checked={settings.bisStrict}
          onChange={checked => settings.set('bisStrict', checked)}
        />
      </Stack>
      <Text
        className="ml-xs mt-sm mb-xxl"
        color={settings.bisStrict ? 'soft' : 'disabled'}
        decoration={settings.bisStrict ? 'line-through' : undefined}
        type="caption"
      >
        * Requires components from another region or source
      </Text>
      {equipmentCategories.map(category => (
        <BestInSlotEquipmentCard
          category={category}
          data={data}
          key={category.id}
          region={region.id}
        />
      ))}
    </RegionPanelSection>
  );
}

const dataQuery = graphql`
  query BestInSlotQuery {
    priority: allBestInSlotJson {
      nodes {
        category
        equipment {
          id
          items
        }
      }
    }
  }
`;
