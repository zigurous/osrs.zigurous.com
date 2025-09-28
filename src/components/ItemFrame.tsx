import '../styles/item-frame.css';
import { Tooltip } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';
import { useItemsContext } from '../context';
import { useTooltip } from './TooltipWrapper';
import WikiIcon from './WikiIcon';
import WikiLink from './WikiLink';
import { formatNameFromId, toTitleCase } from '../utils';
import type { FoodData, ItemData } from '../types';

interface ItemFrameProps {
  border?: boolean;
  borderless?: boolean;
  className?: string;
  highlights?: 'all' | ('upgrade' | 'pet' | 'leagues' | 'megarare')[] | 'none';
  item?: ItemData;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function ItemFrame({
  border,
  borderless,
  className,
  highlights,
  item,
  size,
}: ItemFrameProps) {
  const { ref, hovering, onTooltipEnter, onTooltipLeave } =
    useTooltip<HTMLAnchorElement>();

  if (!item)
    return <ItemFrameEmpty border={border} className={className} size={size} />;
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
            'item-frame--upgrade':
              item.tags?.includes('upgrade') &&
              (highlights === 'all' ||
                (Array.isArray(highlights) && highlights.includes('upgrade'))),
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
        onMouseEnter={onTooltipEnter}
        onMouseLeave={onTooltipLeave}
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
        {hovering && (
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
      {item.transmutations && <ItemFrameSubitems ids={item.transmutations} />}
    </ParentComponent>
  );
}

function ItemFrameSubitems({ ids }: { ids: string[] }) {
  const { getItemById } = useItemsContext();
  return (
    <div className="item-frame__subitems shadow-sm">
      {ids.map((id, index) => (
        <ItemFrame
          item={{ ...getItemById(id), transmutations: undefined }}
          key={`${id}-${index}`}
        />
      ))}
    </div>
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

function ItemFrameEmpty({ border, className, size }: ItemFrameProps) {
  return (
    <span
      className={classNames(
        'item-frame',
        'item-frame--empty',
        {
          'item-frame--border': border,
        },
        {
          [`item-frame--${size}`]: size,
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
