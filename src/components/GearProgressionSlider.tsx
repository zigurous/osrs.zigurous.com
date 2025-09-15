import { Button, Stack, Text } from '@zigurous/forge-react';
import React from 'react';
import Slider from './Slider';
import { useGearProgressionContext } from '../context';

export default function GearProgressionSlider() {
  const context = useGearProgressionContext();
  const tier =
    (context.timelineDirection === 0
      ? context.current
      : context.timelineDirection > 0
        ? context.next
        : context.previous) ?? context.current;
  const tierIndex = context.tierIndex + context.timelineDirection;
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
          onClick={() => context.setTimelineDirection(-1)}
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
          onClick={() => context.setTimelineDirection(1)}
          style={{ backgroundColor: 'transparent' }}
        />
      </Stack>
    </Stack>
  );
}
