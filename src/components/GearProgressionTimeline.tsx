import { getWheelDirection, Stack, throttle } from '@zigurous/forge-react';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import GearProgressionNotes from './GearProgressionNotes';
import GearProgressionTimelineCards from './GearProgressionTimelineCards';
import { useGearProgressionContext } from '../context/GearProgressionContext';
import type { GearProgressionCategoryId, GearProgressionTimelineCard } from '../types/gear-progression'; // prettier-ignore

type WheelEventHandler = (e: WheelEvent) => any;

export default function GearProgressionTimeline() {
  const context = useGearProgressionContext();
  const [timeline, setTimeline] = useState<HTMLDivElement | null>();

  const ref = useCallback<React.RefCallback<HTMLDivElement>>(node => {
    setTimeline(node);
  }, []);

  const scroll = useCallback<WheelEventHandler>(
    throttle((e: WheelEvent) => {
      e.preventDefault();
      context.setTimelineDirection(-getWheelDirection(e));
    }, 100) as WheelEventHandler,
    [context.setTimelineDirection],
  );

  useEffect(() => {
    if (timeline && typeof window !== 'undefined') {
      timeline.addEventListener('wheel', scroll, { passive: false });
      return () => {
        timeline?.removeEventListener('wheel', scroll);
      };
    }
  }, [timeline, scroll]);

  useEffect(() => {
    if (timeline && typeof window !== 'undefined') {
      const handleWheel = (e: WheelEvent) => {
        let target: HTMLElement | null = e.target as HTMLElement;
        while (target) {
          if (target === timeline) {
            e.preventDefault();
            return;
          }
          target = target.parentElement;
        }
      };
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => window.removeEventListener('wheel', handleWheel);
    }
  }, [timeline]);

  const transitioningDown =
    context.transitionIndex !== undefined &&
    context.transitionIndex < context.tierIndex;

  const transitioningUp =
    context.transitionIndex !== undefined &&
    context.transitionIndex > context.tierIndex;

  return (
    <div className="gear-progression__timeline-wrapper">
      <div className="gear-progression__timeline" ref={ref}>
        <GearProgressionTimelineTier
          category={context.category.id}
          className={classNames({
            'transition-in': transitioningDown,
          })}
          id="previous"
          order={context.currentTier.tierIndex - 1}
          tier={context.previousTier}
        />
        <GearProgressionTimelineTier
          category={context.category.id}
          className={classNames({
            'transition-down': transitioningDown,
            'transition-up': transitioningUp,
          })}
          id="current"
          order={context.currentTier.tierIndex}
          tier={context.currentTier}
        />
        <GearProgressionTimelineTier
          category={context.category.id}
          className={classNames({
            'transition-in': transitioningUp,
          })}
          id="next"
          order={context.currentTier.tierIndex + 1}
          tier={context.nextTier}
        />
      </div>
    </div>
  );
}

interface GearProgressionTimelineTierProps {
  category: GearProgressionCategoryId;
  className?: string;
  id: string;
  order: number;
  tier?: {
    title: string;
    timeline: GearProgressionTimelineCard[];
    notes?: string[];
  };
}

function GearProgressionTimelineTier({
  category,
  className,
  id,
  order,
  tier,
}: GearProgressionTimelineTierProps) {
  return (
    <Stack
      className={classNames('gear-progression__timeline-tier', className)}
      id={id}
      key={tier?.title || id}
      layout="vertical"
      style={{ order }}
    >
      {tier && (
        <React.Fragment>
          <GearProgressionTimelineCards
            cards={tier.timeline.filter(
              card => card.category === category || !Boolean(card.category),
            )}
          />
          <GearProgressionNotes filter={category} notes={tier.notes} />
        </React.Fragment>
      )}
    </Stack>
  );
}
