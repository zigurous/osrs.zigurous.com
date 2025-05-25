import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import Tooltip from './Tooltip';
import WikiLink from './WikiLink';
import type { ItemData } from '../types';
import { autoDetectItemIcon, formatNameFromId, toTitleCase } from '../utils';
import '../styles/item-frame.css';

interface ItemFrameProps {
  border?: boolean;
  borderless?: boolean;
  className?: string;
  highlights?: boolean;
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
            'item-frame--pet': highlights && item.tags?.includes('pet'),
            'item-frame--leagues': highlights && item.tags?.includes('leagues'),
            'item-frame--megarare':
              highlights && item.tags?.includes('megarare'),
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
          <Tooltip element={ref.current} text={label} />
        )}
      </WikiLink>
      {item.transmutations && (
        <div className="item-frame__sub-items shadow-sm">
          {item.transmutations.map((id, index) => (
            <ItemFrame
              item={{ id, icon: autoDetectItemIcon(id) }}
              key={`${id}-${index}`}
              size="sm"
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
