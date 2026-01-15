import '../styles/item-inventory.css';
import classNames from 'classnames';
import React from 'react';
import ItemFrame from './ItemFrame';
import { useItemsContext } from '../context/ItemsContext';
import type { Inventory, InventoryIds } from '../types/inventory';
import type { ItemHighlightOptions } from '../types/item';

interface ItemInventoryProps {
  className?: string;
  highlights?: ItemHighlightOptions;
  items?: Inventory | InventoryIds;
  runePouch?: string[];
}

const slotNumbers = Array.from({ length: 28 }, (_, i) => i + 1);

export default function ItemInventory({
  className,
  highlights,
  items = {},
  runePouch,
}: ItemInventoryProps) {
  const { getItemData } = useItemsContext();
  return (
    <ol className={classNames('item-inventory', className)}>
      {slotNumbers.map(slot => {
        let item = getItemData(items[slot]);
        if (
          item &&
          runePouch &&
          (item.id === 'Rune_pouch' || item.id === 'Divine_rune_pouch')
        ) {
          const limit = Math.min(
            item.id === 'Divine_rune_pouch' ? 4 : 3,
            runePouch.length,
          );
          item = {
            ...item,
            transmutations: runePouch?.slice(0, limit),
          };
        }
        return (
          <li className="item-inventory__slot" key={slot}>
            <ItemFrame highlights={highlights} item={item} size="md" />
          </li>
        );
      })}
    </ol>
  );
}
