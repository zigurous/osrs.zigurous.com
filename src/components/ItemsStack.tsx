import { type SpacingToken, Stack } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';
import ItemFrame from './ItemFrame';
import type { ItemData } from '../types';

interface ItemsStackProps {
  className?: string;
  highlights?: boolean;
  items: ItemData[];
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const spacing: Record<string, SpacingToken> = {
  undefined: 'sm',
  xs: 'xxs',
  sm: 'xs',
  md: 'sm',
  lg: 'md',
};

export default function ItemsStack({
  className,
  highlights = false,
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
        <ItemFrame
          key={`${item.id}-${index}`}
          highlights={highlights}
          item={item}
          size={size}
        />
      ))}
    </Stack>
  );
}
