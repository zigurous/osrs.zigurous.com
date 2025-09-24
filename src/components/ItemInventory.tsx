import '../styles/item-inventory.css';
import classNames from 'classnames';
import React from 'react';
import ItemFrame from './ItemFrame';
import { useItemsContext } from '../context';
import type { Inventory, InventoryIds } from '../types';

interface ItemInventoryProps {
  className?: string;
  items?: Inventory | InventoryIds;
  runePouch?: string[];
}

const slotNumbers = Array.from({ length: 28 }, (_, i) => i + 1);

export default function ItemInventory({
  className,
  items = {},
  runePouch,
}: ItemInventoryProps) {
  const { getItemData } = useItemsContext();
  return (
    <ol className={classNames('item-inventory', className)}>
      {slotNumbers.map(slot => {
        let item = getItemData(items[slot]);
        if (item?.id === 'Rune_pouch' || item?.id === 'Divine_rune_pouch') {
          item = { ...item, transmutations: runePouch };
        }
        return (
          <li className="item-inventory__slot" key={slot}>
            <ItemFrame item={item} size="md" />
          </li>
        );
      })}
    </ol>
  );
}
