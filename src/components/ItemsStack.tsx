import { type SpacingToken, Stack } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';
import ItemFrame from './ItemFrame';
import type { ItemData } from '../types';

interface ItemsStackProps {
  className?: string;
  items: ItemData[];
  size?: 'sm' | 'md' | 'lg';
}

const spacing: Record<string, SpacingToken> = {
  undefined: 'sm',
  sm: 'xs',
  md: 'sm',
  lg: 'md',
};

export default function ItemsStack({
  className,
  items,
  size,
}: ItemsStackProps) {
  return (
    <Stack
      className={classNames('items-stack', className)}
      align="center"
      spacing={spacing[size as keyof typeof spacing]}
      wrap
    >
      {items.map((item, index) => (
        <ItemFrame key={`${item.id}-${index}`} item={item} size={size} />
      ))}
    </Stack>
  );
}
