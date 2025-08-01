import { Button, Stack } from '@zigurous/forge-react';
import { graphql, type HeadFC, type PageProps } from 'gatsby';
import React, { useState } from 'react';
import { FooterBar, GearProgressionCard, HeaderBar, RootLayout } from '../components'; // prettier-ignore
import { EquipmentContextProvider, ItemsContextProvider, SettingsContextProvider } from '../context'; // prettier-ignore
import type { EquipmentCategory, GearProgressionQueryData } from '../types'; // prettier-ignore

export default function GearProgression({
  data,
}: PageProps<GearProgressionQueryData>) {
  const [tier, setTier] = useState(0);
  const [categoryId, setCategoryId] = useState('melee');
  const category = categories.find(category => category.id === categoryId);
  const progression = data.progression.nodes.find(
    node => node.category === categoryId,
  );
  const highestTier = progression?.equipment.length ?? 0;
  return (
    <ContextProviders>
      <RootLayout>
        <main>
          <div className="flex flex-col w-full h-full">
            <HeaderBar title="Gear Progression" />
            {category && (
              <div className="w-full h-full bg-surface-1 flex flex-col justify-center align-center">
                <div style={{ transform: 'scale(1.25)' }}>
                  <GearProgressionCard
                    category={category}
                    data={progression}
                    tier={tier}
                  />
                  <Stack className="mt-xl" justify="center" spacing="md">
                    <Button
                      disabled={tier <= 0}
                      onClick={() => setTier(tier => tier - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      disabled={tier >= highestTier - 1}
                      onClick={() => setTier(tier => tier + 1)}
                    >
                      Next
                    </Button>
                  </Stack>
                </div>
              </div>
            )}
            <FooterBar />
          </div>
        </main>
      </RootLayout>
    </ContextProviders>
  );
}

interface ContextProvidersProps {
  children?: React.ReactNode;
}

function ContextProviders({ children }: ContextProvidersProps) {
  return (
    <SettingsContextProvider>
      <ItemsContextProvider>
        <EquipmentContextProvider>{children}</EquipmentContextProvider>
      </ItemsContextProvider>
    </SettingsContextProvider>
  );
}

const categories: EquipmentCategory[] = [
  {
    id: 'melee',
    title: 'Melee',
    icon: 'Attack_style_icon',
    subcategoryKey: 'meleeSubcategory',
    // subcategories: [
    //   { id: 'melee-stab', label: 'Stab', icon: 'White_dagger' },
    //   { id: 'melee-slash', label: 'Slash', icon: 'White_scimitar' },
    //   { id: 'melee-crush', label: 'Crush', icon: 'White_warhammer' },
    // ],
  },
  {
    id: 'ranged',
    title: 'Ranged',
    icon: 'Ranged_icon_(detail)',
    subcategoryKey: 'rangedSubcategory',
  },
  {
    id: 'magic',
    title: 'Magic',
    icon: 'Magic_icon_(detail)',
    subcategoryKey: 'magicSubcategory',
  },
];

export const Head: HeadFC = () => <title>OSRS Gear Progression</title>;

export const query = graphql`
  query GearProgressionQuery {
    progression: allGearProgressionJson {
      nodes {
        category
        equipment
      }
    }
  }
`;
