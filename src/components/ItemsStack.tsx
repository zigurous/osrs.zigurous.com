import '../styles/items-stack.css';
import classNames from 'classnames';
import React from 'react';
import ItemFrame from './ItemFrame';
import type { ItemData } from '../types/item';

interface ItemsStackProps {
  className?: string;
  highlights?: 'all' | ('pet' | 'leagues' | 'megarare')[] | 'none';
  items: ItemData[];
}

export default function ItemsStack({
  className,
  highlights,
  items,
}: ItemsStackProps) {
  return (
    <div className={classNames('items-stack', className)}>
      {items.map((item, index) => (
        <ItemFrame
          key={`${item.id}-${index}`}
          highlights={highlights}
          item={item}
        />
      ))}
    </div>
  );
}
