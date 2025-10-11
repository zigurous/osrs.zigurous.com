import { Badge, Stack } from '@zigurous/forge-react';
import classNames from 'classnames';
import { type HeadFC, type PageProps } from 'gatsby';
import React from 'react';
import FooterBar from '../components/FooterBar';
import HeaderBar from '../components/HeaderBar';
import IconToggle from '../components/IconToggle';
import RecommendedSetupModal from '../components/RecommendedSetupModal';
import RootLayout from '../components/RootLayout';
import GearProgressionEquipment from '../components/GearProgressionEquipment';
import GearProgressionSlider from '../components/GearProgressionSlider';
import GearProgressionSkills from '../components/GearProgressionSkills';
import GearProgressionTimeline from '../components/GearProgressionTimeline';
import { EquipmentContextProvider } from '../context/EquipmentContext';
import { categories, GearProgressionContextProvider, useGearProgressionContext } from '../context/GearProgressionContext'; // prettier-ignore
import { ItemsContextProvider } from '../context/ItemsContext';
import { QuestsContextProvider } from '../context/QuestsContext';
import { RecommendedSetupsContextProvider, useRecommendedSetupsContext } from '../context/RecommendedSetupsContext'; // prettier-ignore
import { useAspectFitScaling } from '../hooks/useAspectFitScaling';
import '../styles/gear-progression.css';

export const Head: HeadFC = () => <title>OSRS Gear Progression</title>;

export default function GearProgression({}: PageProps) {
  return (
    <ContextProviders>
      <GearProgressionPageContent />
    </ContextProviders>
  );
}

function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <ItemsContextProvider>
      <EquipmentContextProvider>
        <QuestsContextProvider>
          <GearProgressionContextProvider>
            <RecommendedSetupsContextProvider>
              {children}
            </RecommendedSetupsContextProvider>
          </GearProgressionContextProvider>
        </QuestsContextProvider>
      </EquipmentContextProvider>
    </ItemsContextProvider>
  );
}

const aspectSize = { width: 1024, height: 512 };

function GearProgressionPageContent() {
  const context = useGearProgressionContext();
  const { currentSetup, previousSetup, closeSetup } =
    useRecommendedSetupsContext();
  const [scale, ref] = useAspectFitScaling(aspectSize, 0, 1.333333333333333);
  return (
    <RootLayout id="gear-progression">
      <HeaderBar
        title="Gear Progression"
        left={
          <Badge className="ml-lg" color="secondary">
            Work In Progress
          </Badge>
        }
        center={
          <Stack
            inline
            className="ml-lg h-0"
            align="center"
            justify="end"
            spacing="xs"
          >
            {categories.map(category => (
              <IconToggle
                hideTooltip
                icon={category.icon}
                iconSize={24}
                key={category.id}
                label={category.title}
                on={context.category.id === category.id}
                onChange={on => {
                  if (on) {
                    context.setCategory(category.id);
                  }
                }}
                size="lg"
              />
            ))}
          </Stack>
        }
      />
      <div className="gear-progression" ref={ref}>
        <div
          className={classNames('flex flex-col align-center', {
            invisible: scale === undefined,
          })}
          style={{ transform: `scale(${scale || 1})` }}
        >
          <GearProgressionSlider />
          <Stack
            className="gear-progression__body"
            justify="center"
            spacing="lg"
          >
            <GearProgressionEquipment />
            <GearProgressionSkills />
            <GearProgressionTimeline />
          </Stack>
        </div>
      </div>
      <FooterBar />
      <RecommendedSetupModal
        onRequestClose={closeSetup}
        open={Boolean(currentSetup)}
        scale={scale}
        setup={
          currentSetup ||
          previousSetup || {
            id: 'empty',
            title: '',
            loadouts: [],
          }
        }
      />
    </RootLayout>
  );
}
