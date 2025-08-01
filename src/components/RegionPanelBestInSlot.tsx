import { Stack, Text } from '@zigurous/forge-react';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import BestInSlotEquipmentCard from './BestInSlotEquipmentCard';
import CheckboxToggle from './CheckboxToggle';
import RegionPanelSection from './RegionPanelSection';
import { useSettingsContext } from '../context';
import type { BestInSlotQueryData, EquipmentCategory, Region } from '../types';

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
      {categories.map(category => (
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

const categories: EquipmentCategory[] = [
  {
    id: 'melee',
    title: 'Melee',
    icon: 'Attack_style_icon',
    subcategoryKey: 'meleeSubcategory',
    subcategories: [
      { id: 'melee-stab', label: 'Stab', icon: 'White_dagger' },
      { id: 'melee-slash', label: 'Slash', icon: 'White_scimitar' },
      { id: 'melee-crush', label: 'Crush', icon: 'White_warhammer' },
      { id: 'melee-spec', label: 'Special', icon: 'Special_attack_orb' },
    ],
  },
  {
    id: 'ranged',
    title: 'Ranged',
    icon: 'Ranged_icon_(detail)',
    subcategoryKey: 'rangedSubcategory',
    subcategories: [
      { id: 'ranged-spec', label: 'Special', icon: 'Special_attack_orb' },
    ],
  },
  {
    id: 'magic',
    title: 'Magic',
    icon: 'Magic_icon_(detail)',
    subcategoryKey: 'magicSubcategory',
    subcategories: [
      { id: 'magic-spec', label: 'Special', icon: 'Special_attack_orb' },
    ],
  },
  {
    id: 'prayer',
    title: 'Prayer',
    icon: 'Prayer_icon_(detail)',
    subcategoryKey: 'prayerSubcategory',
  },
];

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
