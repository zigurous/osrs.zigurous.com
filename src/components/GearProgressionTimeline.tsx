import { getWheelDirection, Stack, throttle } from '@zigurous/forge-react';
import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import GearProgressionNotes from './GearProgressionNotes';
import GearProgressionUpgrades from './GearProgressionUpgrades';
import { useGearProgressionContext } from '../context';

type WheelEventHandler = (e: WheelEvent) => any;

export default function GearProgressionTimeline() {
  const context = useGearProgressionContext();
  const ref = useRef<HTMLDivElement>(null);

  const scroll = useCallback<WheelEventHandler>(
    throttle((e: WheelEvent) => {
      e.preventDefault();
      context.setTimelineDirection(-getWheelDirection(e));
    }, 50) as WheelEventHandler,
    [context.setTimelineDirection],
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ref.current?.addEventListener('wheel', scroll, { passive: false });
      return () => {
        ref.current?.removeEventListener('wheel', scroll);
      };
    }
  }, [ref, scroll]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleWheel = (e: WheelEvent) => {
        let target: HTMLElement | null = e.target as HTMLElement;
        while (target) {
          if (target === ref.current) {
            e.preventDefault();
            return;
          }
          target = target.parentElement;
        }
      };
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => window.removeEventListener('wheel', handleWheel);
    }
  }, []);

  useEffect(() => {
    if (context.timelineDirection !== 0) {
      const lower = context.tierIndex === 0 && context.timelineDirection < 0;
      const higher =
        context.tierIndex === context.highestTier &&
        context.timelineDirection > 0;
      if (lower || higher) {
        context.setTimelineDirection(0);
      } else {
        setTimeout(() => {
          context.setTier(tier => tier + context.timelineDirection);
          context.setTimelineDirection(0);
        }, 400);
      }
    }
  }, [context.timelineDirection, context.tierIndex, context.highestTier]);

  return (
    <div className="gear-progression__timeline-wrapper">
      <div className="gear-progression__timeline" ref={ref}>
        <Stack align="stretch" justify="start" layout="vertical">
          {context.previous && (
            <Stack
              className={classNames('gear-progression__summary previous', {
                'transition-in': context.timelineDirection < 0,
              })}
              key={context.previous.title}
              layout="vertical"
              style={{ order: context.tierIndex - 1 }}
            >
              <GearProgressionUpgrades upgrades={context.previous.upgrades} />
              <GearProgressionNotes notes={context.previous.notes} />
            </Stack>
          )}
          <Stack
            className={classNames('gear-progression__summary current', {
              'transition-down': context.timelineDirection < 0,
              'transition-up': context.timelineDirection > 0,
            })}
            key={context.current.title}
            layout="vertical"
            style={{ order: context.tierIndex }}
          >
            <GearProgressionUpgrades upgrades={context.current.upgrades} />
            <GearProgressionNotes notes={context.current.notes} />
          </Stack>
          {context.next && (
            <Stack
              className={classNames('gear-progression__summary next', {
                'transition-in': context.timelineDirection > 0,
              })}
              key={context.next.title}
              layout="vertical"
              style={{ order: context.tierIndex + 1 }}
            >
              <GearProgressionUpgrades upgrades={context.next.upgrades} />
              <GearProgressionNotes notes={context.next.notes} />
            </Stack>
          )}
        </Stack>
      </div>
    </div>
  );
}
