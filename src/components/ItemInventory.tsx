import '../styles/item-inventory.css';
import classNames from 'classnames';
import React from 'react';
import ItemFrame from './ItemFrame';
import type { InventorySlots } from '../types';

interface ItemInventoryProps {
  className?: string;
  slots?: InventorySlots;
}

const slotNumbers = Array.from({ length: 28 }, (_, i) => i + 1);

export default function ItemInventory({
  className,
  slots = {},
}: ItemInventoryProps) {
  return (
    <ol className={classNames('item-inventory', className)}>
      {slotNumbers.map(number => (
        <li className="item-inventory__slot" key={number}>
          <ItemFrame item={slots[number]} size="md" />
        </li>
      ))}
    </ol>
  );
}
