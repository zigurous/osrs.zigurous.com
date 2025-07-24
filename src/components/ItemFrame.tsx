import { Tooltip } from '@zigurous/forge-react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { useItemsContext } from '../context';
import WikiIcon from './WikiIcon';
import WikiLink from './WikiLink';
import { formatNameFromId, toTitleCase } from '../utils';
import type { FoodData, ItemData } from '../types';
import '../styles/item-frame.css';

interface ItemFrameProps {
  border?: boolean;
  borderless?: boolean;
  className?: string;
  highlights?: 'all' | ('pet' | 'leagues' | 'megarare')[] | 'none';
  item?: ItemData;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export default function ItemFrame({
  border,
  borderless,
  className,
  highlights,
  item,
  size,
}: ItemFrameProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovering, setHovering] = useState(false);
  const { getItemById } = useItemsContext();

  if (!item) return <ItemFrameEmpty border={border} className={className} />;
  const CustomFrame = customFrames.find(frame => item.id.startsWith(frame.id));
  if (CustomFrame) return <CustomFrame.Component border={border} item={item} />;

  const label = item.name || formatNameFromId(item.id);
  const ParentComponent = item.transmutations ? 'div' : React.Fragment;
  const parentProps = item.transmutations ? { className: 'relative' } : {};

  return (
    <ParentComponent {...parentProps}>
      <WikiLink
        aria-label={label}
        className={classNames(
          'item-frame',
          {
            [`item-frame--${size}`]: size,
            'item-frame--border': border,
            'item-frame--borderless': borderless,
            'item-frame--pet':
              item.tags?.includes('pet') &&
              (highlights === 'all' ||
                (Array.isArray(highlights) && highlights.includes('pet'))),
            'item-frame--leagues':
              item.tags?.includes('leagues') &&
              (highlights === 'all' ||
                (Array.isArray(highlights) && highlights.includes('leagues'))),
            'item-frame--megarare':
              item.tags?.includes('megarare') &&
              (highlights === 'all' ||
                (Array.isArray(highlights) && highlights.includes('megarare'))),
          },
          className,
        )}
        onMouseEnter={e => setHovering(true)}
        onMouseLeave={e => setHovering(false)}
        wikiId={item.id}
        ref={ref}
      >
        <img
          alt=""
          aria-hidden
          src={`https://oldschool.runescape.wiki/images/${item.icon || item.id}.png`}
        />
        {item.tags && item.tags.includes('*') && (
          <span aria-hidden className="item-frame__asterisk">
            *
          </span>
        )}
        {hovering && ref.current && (
          <Tooltip element={ref.current}>
            {item.tooltip || (
              <>
                {label}
                {Boolean((item as FoodData).healing) && (
                  <>
                    <br />
                    <span
                      aria-label={`Heals ${(item as FoodData).healing}`}
                      className="inline-flex justify-center align-center"
                    >
                      {(item as FoodData).healing}
                      <WikiIcon
                        aria-hidden
                        className="ml-xxxs"
                        icon="Hitpoints_icon"
                        size={12}
                      />
                    </span>
                  </>
                )}
              </>
            )}
          </Tooltip>
        )}
      </WikiLink>
      {item.transmutations && (
        <div className="item-frame__sub-items shadow-sm">
          {item.transmutations.map((id, index) => (
            <ItemFrame
              item={{ ...getItemById(id), transmutations: undefined }}
              key={`${id}-${index}`}
            />
          ))}
        </div>
      )}
    </ParentComponent>
  );
}

const customFrames = [
  { id: '#empty', Component: ItemFrameEmpty },
  { id: '#equipmentslot', Component: ItemFrameEquipmentSlot },
  { id: '#placeholder', Component: ItemFramePlaceholder },
  { id: '#spacer', Component: ItemFrameSpacer },
  { id: '#newline', Component: ItemFrameNewline },
  { id: '#transmute', Component: ItemFrameTransmute },
  { id: '#plus', Component: ItemFramePlus },
  { id: '#equals', Component: ItemFrameEquals },
];

function ItemFrameEmpty({ border, className }: ItemFrameProps) {
  return (
    <span
      className={classNames(
        'item-frame',
        'item-frame--empty',
        {
          'item-frame--border': border,
        },
        className,
      )}
    />
  );
}

function ItemFrameEquipmentSlot({ border, className, item }: ItemFrameProps) {
  return (
    <span
      aria-label={item?.name ? toTitleCase(`${item?.name} slot`) : undefined}
      className={classNames(
        'item-frame',
        'item-frame--equipment-slot',
        {
          'item-frame--border': border,
        },
        className,
      )}
    >
      <img aria-hidden src={item?.icon} />
    </span>
  );
}

function ItemFramePlaceholder() {
  return <span aria-hidden className="item-frame item-frame--placeholder" />;
}

function ItemFrameSpacer() {
  return <span aria-hidden className="item-frame item-frame--spacer" />;
}

function ItemFrameNewline() {
  return <span aria-hidden className="item-frame item-frame--newline" />;
}

function ItemFrameTransmute() {
  return <span className="item-frame item-frame--transmute"> </span>;
}

function ItemFramePlus() {
  return <span className="item-frame item-frame--plus">{'+'}</span>;
}

function ItemFrameEquals() {
  return <span className="item-frame item-frame--equals">{'='}</span>;
}
