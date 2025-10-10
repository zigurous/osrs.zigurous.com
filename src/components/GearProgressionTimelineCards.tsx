import { Button, Stack, Text } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';
import ItemFrame from './ItemFrame';
import WikiIcon from './WikiIcon';
import WikiLink from './WikiLink';
import { useItemsContext } from '../context/ItemsContext';
import { useRecommendedSetupsContext } from '../context/RecommendedSetupsContext';
import { formatNameFromId } from '../utils/formatting'; // prettier-ignore
import type { GearProgressionTimelineCard, GearProgressionTimelineSubCard } from '../types/gear-progression'; // prettier-ignore

interface GearProgressionTimelineCardsProps {
  cards?: GearProgressionTimelineCard[];
}

export default function GearProgressionTimelineCards({
  cards,
}: GearProgressionTimelineCardsProps) {
  const itemsContext = useItemsContext();
  if (!cards || cards.length === 0) return null;
  return (
    <ul className="gear-progression__timeline-cards w-full">
      {cards.map(card => (
        <React.Fragment key={card.id}>
          <li
            className={classNames('gear-progression__timeline-card', {
              parent: Boolean(card.subcards && card.subcards.length > 0),
            })}
          >
            <div className="relative">
              <WikiLink
                className="gear-progression__timeline-link p-md"
                wikiId={card.id}
              >
                <WikiIcon className="mr-sm" icon={card.icon} size={20} />
                <Text type="body">
                  {card.title || formatNameFromId(card.id)}
                  {card.subtitle && (
                    <Text
                      as="span"
                      className="ml-sm"
                      color="muted"
                      type="caption"
                    >
                      {card.subtitle}
                    </Text>
                  )}
                </Text>
              </WikiLink>
              {card.items && (
                <Stack spacing="xs">
                  {itemsContext.getItemsByIds(card.items).map(item => (
                    <ItemFrame
                      key={item.id}
                      item={{ ...item, transmutations: undefined }}
                      size="sm"
                    />
                  ))}
                </Stack>
              )}
            </div>
          </li>
          {card.subcards?.map((subcard, index) => (
            <GearProgressionTimelineChildCard
              className={
                index === card.subcards!.length - 1 ? 'last' : undefined
              }
              key={`${card.id}-${subcard.id}`}
              subcard={subcard}
            />
          ))}
        </React.Fragment>
      ))}
    </ul>
  );
}

interface GearProgressionTimelineChildCardProps {
  className?: string;
  subcard: GearProgressionTimelineSubCard;
}

function GearProgressionTimelineChildCard({
  className,
  subcard,
}: GearProgressionTimelineChildCardProps) {
  const { viewSetup } = useRecommendedSetupsContext();
  return (
    <li
      className={classNames('gear-progression__timeline-card child', className)}
    >
      {subcard.setupId ? (
        <div
          className="relative px-md py-xs h-xxxl"
          onClick={e => {
            e.preventDefault();
            viewSetup(subcard.setupId!);
          }}
        >
          <Button size="xs">
            {subcard.icon && (
              <WikiIcon className="mr-xs" icon={subcard.icon} size={18} />
            )}
            View Recommended Setup
          </Button>
        </div>
      ) : (
        <div className="relative">
          <WikiLink
            className="gear-progression__timeline-link px-md py-xs"
            wikiId={subcard.id}
          >
            <WikiIcon className="mr-sm" icon={subcard.icon} size={18} />
            <Text type="body-sm">
              {subcard.title || formatNameFromId(subcard.id)}
              {subcard.subtitle && (
                <Text as="span" className="ml-sm" color="muted" type="caption">
                  {subcard.subtitle}
                </Text>
              )}
            </Text>
          </WikiLink>
        </div>
      )}
    </li>
  );
}
