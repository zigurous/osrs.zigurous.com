import { Toggle } from '@zigurous/forge-react';
import { type HeadFC, type PageProps } from 'gatsby';
import React from 'react';
import { FooterBar, HeaderBar, RegionPanel, RootLayout, WorldMap } from '../components'; // prettier-ignore
import { ActivitiesContextProvider, EquipmentContextProvider, ItemsContextProvider, LocationsContextProvider, QuestsContextProvider, RegionsContextProvider, SettingsContextProvider, SkillingFilterContextProvider, useRegionsContext } from '../context'; // prettier-ignore

export const Head: HeadFC = () => <title>OSRS Region Analyzer</title>;

export default function RegionAnalyzer({ location }: PageProps) {
  return (
    <ContextProviders location={location}>
      <RootLayout id="region-analyzer">
        <div className="flex flex-col w-full h-full">
          <HeaderBar title="Region Analyzer" right={<MultiRegionToggle />} />
          <WorldMap />
          <FooterBar />
        </div>
        <RegionPanel />
      </RootLayout>
    </ContextProviders>
  );
}

interface ContextProvidersProps {
  children: React.ReactNode;
  location: Location;
}

function ContextProviders({ children, location }: ContextProvidersProps) {
  return (
    <SettingsContextProvider>
      <RegionsContextProvider location={location}>
        <ItemsContextProvider>
          <EquipmentContextProvider>
            <LocationsContextProvider>
              <QuestsContextProvider>
                <ActivitiesContextProvider>
                  <SkillingFilterContextProvider>
                    {children}
                  </SkillingFilterContextProvider>
                </ActivitiesContextProvider>
              </QuestsContextProvider>
            </LocationsContextProvider>
          </EquipmentContextProvider>
        </ItemsContextProvider>
      </RegionsContextProvider>
    </SettingsContextProvider>
  );
}

function MultiRegionToggle() {
  const context = useRegionsContext();
  return (
    <Toggle
      className="mx-lg"
      id="multi-region-toggle"
      label="Multi-Region"
      labelAlignment="leading"
      onToggle={context.setMultiRegionMode}
      toggled={context.multiRegionMode}
      size="md"
    />
  );
}
