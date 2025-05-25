import classNames from 'classnames';
import React from 'react';
import ItemFrame from './ItemFrame';
import type { ItemData } from '../types';
import '../styles/items-stack.css';

interface ItemsStackProps {
  className?: string;
  highlights?: boolean;
  items: ItemData[];
}

export default function ItemsStack({
  className,
  highlights = false,
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
