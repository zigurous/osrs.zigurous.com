import { Button, nativeKeyboardEventHandler as keyEventHandler, Stack, Text } from '@zigurous/forge-react'; // prettier-ignore
import React, { useCallback, useEffect } from 'react';
import Slider from './Slider';
import { useGearProgressionContext, useRecommendedSetupsContext } from '../context'; // prettier-ignore

export default function GearProgressionSlider() {
  const context = useGearProgressionContext();
  const tier =
    (context.timelineDirection === 0
      ? context.current
      : context.timelineDirection > 0
        ? context.next
        : context.previous) ?? context.current;
  const tierIndex = context.tierIndex + context.timelineDirection;
  const { currentSetup: recommendedSetup } = useRecommendedSetupsContext();

  const previousTier = useCallback(() => context.setTimelineDirection(-1), []);
  const nextTier = useCallback(() => context.setTimelineDirection(1), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (recommendedSetup) return;
    const prev = keyEventHandler(['ArrowLeft', 'ArrowUp'], previousTier, true);
    const next = keyEventHandler(['ArrowRight', 'ArrowDown'], nextTier, true);
    window.addEventListener('keydown', prev);
    window.addEventListener('keydown', next);
    return () => {
      window.removeEventListener('keydown', prev);
      window.removeEventListener('keydown', next);
    };
  }, [recommendedSetup, previousTier, nextTier]);

  return (
    <Stack
      align="center"
      className="gear-progression__header"
      layout="vertical"
    >
      <Text
        className="gear-progression__title"
        marginBottom="xs"
        type="subtitle"
      >
        {tier.title || 'Tutorial Island'}
        <Text as="sup" className="ml-xs" color="disabled" type="body-sm">
          {`${tierIndex + 1}`}
        </Text>
      </Text>
      <Stack
        align="center"
        className="gear-progression__slider w-full"
        justify="between"
        spacing="md"
      >
        <Button
          disabled={tierIndex <= 0}
          icon="chevron_left"
          iconProps={{
            color: 'var(--color-silver)',
            size: 'md',
          }}
          iconAlignment="only"
          onClick={previousTier}
          style={{ backgroundColor: 'transparent' }}
        />
        <Slider
          className="mb-xxxs"
          id="tier-range"
          min={0}
          max={context.highestTier}
          value={tierIndex}
          onChange={context.setTier}
        />
        <Button
          disabled={tierIndex >= context.highestTier}
          icon="chevron_right"
          iconProps={{
            color: 'var(--color-silver)',
            size: 'md',
          }}
          iconAlignment="only"
          onClick={nextTier}
          style={{ backgroundColor: 'transparent' }}
        />
      </Stack>
    </Stack>
  );
}
