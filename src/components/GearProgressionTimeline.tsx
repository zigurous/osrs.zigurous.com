import { getWheelDirection, Stack, throttle } from '@zigurous/forge-react';
import classNames from 'classnames';
import React, { useCallback, useEffect, useRef } from 'react';
import GearProgressionNotes from './GearProgressionNotes';
import GearProgressionTimelineCards from './GearProgressionTimelineCards';
import { useGearProgressionContext } from '../context';
import type { GearProgressionTier } from '../types';

type WheelEventHandler = (e: WheelEvent) => any;

export default function GearProgressionTimeline() {
  const context = useGearProgressionContext();
  const transition = useRef<NodeJS.Timeout>();
  const ref = useRef<HTMLDivElement>(null);

  const scroll = useCallback<WheelEventHandler>(
    throttle((e: WheelEvent) => {
      e.preventDefault();
      if (!transition.current) {
        context.setTimelineDirection(-getWheelDirection(e));
      }
    }, 100) as WheelEventHandler,
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
  }, [ref]);

  useEffect(() => {
    const direction = context.timelineDirection;
    if (direction !== 0) {
      const lower = context.tierIndex === 0 && direction < 0;
      const higher = context.tierIndex === context.highestTier && direction > 0;
      if (lower || higher) {
        context.setTimelineDirection(0);
      } else {
        transition.current = setTimeout(() => {
          transition.current = undefined;
          context.setTier(tier => tier + direction);
          context.setTimelineDirection(0);
        }, 300);
      }
    }
  }, [context.timelineDirection, context.tierIndex, context.highestTier]);

  return (
    <div className="gear-progression__timeline-wrapper">
      <div className="gear-progression__timeline" ref={ref}>
        {context.previous && (
          <GearProgressionTimelineTier
            className={classNames({
              'transition-in': context.timelineDirection < 0,
            })}
            id="previous"
            order={context.tierIndex - 1}
            tier={context.previous}
          />
        )}
        <GearProgressionTimelineTier
          className={classNames({
            'transition-down': context.timelineDirection < 0,
            'transition-up': context.timelineDirection > 0,
          })}
          id="current"
          order={context.tierIndex}
          tier={context.current}
        />
        {context.next && (
          <GearProgressionTimelineTier
            className={classNames({
              'transition-in': context.timelineDirection > 0,
            })}
            id="next"
            order={context.tierIndex + 1}
            tier={context.next}
          />
        )}
      </div>
    </div>
  );
}

interface GearProgressionTimelineTierProps {
  className?: string;
  id: string;
  order: number;
  tier: GearProgressionTier;
}

function GearProgressionTimelineTier({
  className,
  id,
  order,
  tier,
}: GearProgressionTimelineTierProps) {
  return (
    <Stack
      className={classNames('gear-progression__timeline-tier', className)}
      id={id}
      key={tier.title || id}
      layout="vertical"
      style={{ order }}
    >
      <GearProgressionTimelineCards cards={tier.timeline} />
      <GearProgressionNotes notes={tier.notes} />
    </Stack>
  );
}
