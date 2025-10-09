import { Stack } from '@zigurous/forge-react';
import classNames from 'classnames';
import { type HeadFC, type PageProps } from 'gatsby';
import React, { useEffect, useRef, useState } from 'react';
import { FooterBar, HeaderBar, IconToggle, RecommendedSetupModal, RootLayout } from '../components'; // prettier-ignore
import GearProgressionEquipment from '../components/GearProgressionEquipment';
import GearProgressionSlider from '../components/GearProgressionSlider';
import GearProgressionSkills from '../components/GearProgressionSkills';
import GearProgressionTimeline from '../components/GearProgressionTimeline';
import { EquipmentContextProvider, GearProgressionContextProvider, ItemsContextProvider, QuestsContextProvider, RecommendedSetupsContextProvider, useGearProgressionContext, useRecommendedSetupsContext } from '../context'; // prettier-ignore
import { categories } from '../context/GearProgressionContext';
import type { RecommendedSetup } from '../types';
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

function GearProgressionPageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const context = useGearProgressionContext();
  const { currentSetup, previousSetup, closeSetup } =
    useRecommendedSetupsContext();
  const [scale, setScale] = useState<number | undefined>();

  const [observer] = useState(() =>
    typeof window !== 'undefined'
      ? new ResizeObserver((entries: ResizeObserverEntry[]) => {
          setScale(
            Math.min(
              entries[0].contentRect.width / 1024,
              entries[0].contentRect.height / 512,
              1.333333333333333,
            ),
          );
        })
      : null,
  );

  useEffect(() => {
    if (ref.current && observer) {
      observer.observe(ref.current);
      return () => {
        if (ref.current && observer) {
          observer.unobserve(ref.current);
        }
      };
    }
  }, [ref]);

  return (
    <RootLayout id="gear-progression">
      <HeaderBar
        title="Gear Progression"
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
        setup={currentSetup || previousSetup || emptySetup}
      />
    </RootLayout>
  );
}

const emptySetup: RecommendedSetup = {
  id: 'empty',
  title: '',
  loadouts: [],
};
