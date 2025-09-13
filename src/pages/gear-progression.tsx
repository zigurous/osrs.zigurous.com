import { Stack } from '@zigurous/forge-react';
import { type HeadFC, type PageProps } from 'gatsby';
import React from 'react';
import { FooterBar, HeaderBar, IconToggle, RootLayout } from '../components'; // prettier-ignore
import GearProgressionEquipment from '../components/GearProgressionEquipment';
import GearProgressionNotes from '../components/GearProgressionNotes';
import GearProgressionSlider from '../components/GearProgressionSlider';
import GearProgressionStats from '../components/GearProgressionStats';
import GearProgressionUpgrades from '../components/GearProgressionUpgrades';
import { EquipmentContextProvider, GearProgressionContextProvider, ItemsContextProvider, QuestsContextProvider, useGearProgressionContext } from '../context'; // prettier-ignore
import { categories } from '../context/GearProgressionContext';
import '../styles/gear-progression.css';

export default function GearProgression({}: PageProps) {
  return (
    <ContextProviders>
      <RootLayout id="gear-progression">
        <HeaderBar title="Gear Progression" center={<HeaderContent />} />
        <Stack align="center" className="gear-progression" layout="vertical">
          <GearProgressionSlider />
          <Stack
            className="gear-progression__body w-full"
            justify="center"
            spacing="lg"
            wrap
          >
            <GearProgressionEquipment />
            <GearProgressionStats />
            <Stack
              className="gear-progression__summary"
              layout="vertical"
              spacing="lg"
            >
              <GearProgressionUpgrades />
              <GearProgressionNotes />
            </Stack>
          </Stack>
        </Stack>
        <FooterBar />
      </RootLayout>
    </ContextProviders>
  );
}

export const Head: HeadFC = () => <title>OSRS Gear Progression</title>;

interface ContextProvidersProps {
  children?: React.ReactNode;
}

function ContextProviders({ children }: ContextProvidersProps) {
  return (
    <ItemsContextProvider>
      <EquipmentContextProvider>
        <QuestsContextProvider>
          <GearProgressionContextProvider>
            {children}
          </GearProgressionContextProvider>
        </QuestsContextProvider>
      </EquipmentContextProvider>
    </ItemsContextProvider>
  );
}

function HeaderContent() {
  const context = useGearProgressionContext();
  return (
    <Stack
      inline
      className="ml-lg h-0"
      align="center"
      justify="end"
      spacing="sm"
    >
      {categories.map(category => (
        <IconToggle
          hideTooltip
          icon={category.icon}
          iconSize={20}
          key={category.id}
          label={category.title}
          on={context.selectedCategory.id === category.id}
          onChange={on => {
            if (on) {
              context.setCategory(category.id);
            }
          }}
        />
      ))}
    </Stack>
  );
}
