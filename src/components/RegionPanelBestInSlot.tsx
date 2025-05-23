import { Stack, Text } from '@zigurous/forge-react';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import BestInSlotEquipmentCard from './BestInSlotEquipmentCard';
import CheckboxToggle from './CheckboxToggle';
import RegionPanelSection from './RegionPanelSection';
import type { BestInSlotCategory, BestInSlotQueryData, BestInSlotToggles, Region } from '../types'; // prettier-ignore

interface RegionPanelBestInSlotProps {
  region: Region;
}

export default function RegionPanelBestInSlot({
  region,
}: RegionPanelBestInSlotProps) {
  const data = useStaticQuery<BestInSlotQueryData>(dataQuery);
  const [toggles, setToggles] = useState<BestInSlotToggles>({
    leagues: false,
    clues: false,
  });
  return (
    <RegionPanelSection className="best-in-slot" title="Best In Slot">
      <Stack inline className="ml-md" spacing="lg">
        <CheckboxToggle
          id="leagues-toggle"
          label="Leagues"
          checked={toggles.leagues}
          onChange={checked =>
            setToggles(state => ({ ...state, leagues: checked }))
          }
        />
        <CheckboxToggle
          id="clues-toggle"
          label="Clues"
          checked={toggles.clues}
          onChange={checked =>
            setToggles(state => ({ ...state, clues: checked }))
          }
        />
      </Stack>
      <Text className="ml-sm mt-sm mb-xxl" color="disabled" type="caption">
        * Requires components from another region or source
      </Text>
      {categories.map(category => (
        <BestInSlotEquipmentCard
          category={category}
          data={data}
          key={category.id}
          regionId={region.id}
          toggles={toggles}
        />
      ))}
    </RegionPanelSection>
  );
}

const categories: BestInSlotCategory[] = [
  {
    id: 'melee',
    title: 'Melee',
    icon: 'Attack_style_icon',
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
    subcategories: [
      { id: 'ranged-spec', label: 'Special', icon: 'Special_attack_orb' },
    ],
  },
  {
    id: 'magic',
    title: 'Magic',
    icon: 'Magic_icon_(detail)',
    subcategories: [
      { id: 'magic-spec', label: 'Special', icon: 'Special_attack_orb' },
    ],
  },
  {
    id: 'prayer',
    title: 'Prayer',
    icon: 'Prayer_icon_(detail)',
  },
];

const dataQuery = graphql`
  query BestInSlotQuery {
    equipment: allEquipmentJson {
      nodes {
        id: jsonId
        icon
        name
        tags
        regions
        ammo {
          id
          icon
        }
      }
    }
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
