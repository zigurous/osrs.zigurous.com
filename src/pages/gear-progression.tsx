import { graphql, type HeadFC, type PageProps } from 'gatsby';
import React from 'react';
import { FooterBar, GearProgressionCard, HeaderBar, RootLayout } from '../components'; // prettier-ignore
import { EquipmentContextProvider, ItemsContextProvider, QuestsContextProvider, SettingsContextProvider } from '../context'; // prettier-ignore
import type { GearProgressionQueryData } from '../types';

export default function GearProgression({
  data,
}: PageProps<GearProgressionQueryData>) {
  return (
    <ContextProviders>
      <RootLayout>
        <main>
          <div className="flex flex-col w-full h-full">
            <HeaderBar title="Gear Progression" />
            <div className="w-full h-full bg-surface-1 flex flex-col justify-center align-center">
              <GearProgressionCard data={data} />
            </div>
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
        <EquipmentContextProvider>
          <QuestsContextProvider>{children}</QuestsContextProvider>
        </EquipmentContextProvider>
      </ItemsContextProvider>
    </SettingsContextProvider>
  );
}

export const Head: HeadFC = () => <title>OSRS Gear Progression</title>;

export const query = graphql`
  query GearProgressionQuery {
    progression: allGearProgressionJson {
      nodes {
        category
        tiers {
          title
          summary
          items
          questMilestone
          optional
        }
      }
    }
  }
`;
