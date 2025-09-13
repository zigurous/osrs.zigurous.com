import { Button, Stack, Text } from '@zigurous/forge-react';
import React from 'react';
import Slider from './Slider';
import { useGearProgressionContext } from '../context';

export default function GearProgressionSlider() {
  const context = useGearProgressionContext();
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
        {context.current.title || 'Tutorial Island'}
        <Text as="sup" className="ml-xs" color="disabled" type="body-sm">
          {`${context.tierIndex + 1}`}
        </Text>
      </Text>
      <Stack
        align="center"
        className="gear-progression__slider w-full"
        justify="between"
        spacing="md"
      >
        <Button
          disabled={context.tierIndex <= 0}
          icon="chevron_left"
          iconProps={{
            color: 'var(--color-silver)',
            size: 'md',
          }}
          iconAlignment="only"
          onClick={() => context.setTier(tier => tier - 1)}
          style={{ backgroundColor: 'transparent' }}
        />
        <Slider
          className="mb-xxxs"
          id="tier-range"
          min={0}
          max={context.highestTier}
          value={context.tierIndex}
          onChange={context.setTier}
        />
        <Button
          disabled={context.tierIndex >= context.highestTier}
          icon="chevron_right"
          iconProps={{
            color: 'var(--color-silver)',
            size: 'md',
          }}
          iconAlignment="only"
          onClick={() => context.setTier(tier => tier + 1)}
          style={{ backgroundColor: 'transparent' }}
        />
      </Stack>
    </Stack>
  );
}
