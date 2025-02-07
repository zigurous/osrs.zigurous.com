import classNames from 'classnames';
import React, { useRef } from 'react';
import WikiLink from './WikiLink';
import type { ItemData } from '../types';
import { formatNameFromId } from '../utils';
import '../styles/item-frame.css';

interface ItemFrameProps {
  border?: boolean;
  borderless?: boolean;
  className?: string;
  disableHighlight?: boolean;
  item?: ItemData;
  size?: 'sm' | 'md' | 'lg';
}

const customFrames = [
  { id: '#empty', Component: ItemFrameEmpty },
  { id: '#placeholder', Component: ItemFramePlaceholder },
  { id: '#newline', Component: ItemFrameNewline },
  { id: '#transmute', Component: ItemFrameTransmute },
  { id: '#plus', Component: ItemFramePlus },
  { id: '#equals', Component: ItemFrameEquals },
];

export default function ItemFrame({
  border,
  borderless,
  className,
  disableHighlight,
  item,
  size,
}: ItemFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  if (!item) return <ItemFrameEmpty border={border} className={className} />;
  const CustomFrame = customFrames.find(frame => item.id.startsWith(frame.id));
  if (CustomFrame) return <CustomFrame.Component />;
  const label = item.name || formatNameFromId(item.id);
  return (
    <WikiLink aria-label={label} className="relative" wikiId={item.id}>
      <div
        className={classNames(
          'item-frame',
          {
            [`item-frame--${size}`]: size,
            'item-frame--border': border,
            'item-frame--borderless': borderless,
            'item-frame--pet': !disableHighlight && item.tags?.includes('pet'),
            'item-frame--unique':
              !disableHighlight && item.tags?.includes('unique'),
            'item-frame--megarare':
              !disableHighlight && item.tags?.includes('megarare'),
          },
          className,
        )}
        ref={ref}
      >
        {item && (
          <img
            alt=""
            aria-hidden
            src={`https://oldschool.runescape.wiki/images/${item.icon || item.id}.png`}
          />
        )}
      </div>
    </WikiLink>
  );
}

function ItemFrameEmpty({ border, className }: Omit<ItemFrameProps, 'item'>) {
  return (
    <div
      className={classNames(
        'item-frame',
        {
          'item-frame--border': border,
        },
        className,
      )}
    />
  );
}

function ItemFramePlaceholder() {
  return <div aria-hidden className="item-frame item-frame--placeholder" />;
}

function ItemFrameNewline() {
  return <div aria-hidden className="item-frame item-frame--newline" />;
}

function ItemFrameTransmute() {
  return <div className="item-frame item-frame--transmute">{'🞂'}</div>;
}

function ItemFramePlus() {
  return <div className="item-frame item-frame--plus">{'+'}</div>;
}

function ItemFrameEquals() {
  return <div className="item-frame item-frame--equals">{'='}</div>;
}
