import { Icon } from '@zigurous/forge-react';
import classNames from 'classnames';
import React, { useState } from 'react';
import ItemsStack from './ItemsStack';
import TitledCard from './TitledCard';
import { useItemsContext } from '../context/ItemsContext';
import { formatNameFromId } from '../utils/formatting';
import { getIconForActivity } from '../utils/icons';
import type { Activity } from '../types/activity';

interface ActivityCardProps {
  className?: string;
  activity: Activity;
}

export default function ActivityCard({
  className,
  activity,
}: ActivityCardProps) {
  const [expanded, setExpanded] = useState(false);
  const context = useItemsContext();
  const items =
    activity.notableDrops &&
    context.getItemsByIds(activity.notableDrops).filter(item => {
      if (item.tags && item.tags.includes('leagues')) return false;
      return true;
    });
  const expandable = items && items.length > 0;
  return (
    <TitledCard
      caption={activity.caption ?? activity.requiredLevel?.toString()}
      captionIcon={
        <span className="inline-flex justify-center align-center w-lg h-lg color-inherit">
          <Icon
            icon={
              expandable
                ? expanded
                  ? 'expand_less'
                  : 'expand_more'
                : 'open_in_new'
            }
            size={expandable ? 16 : 12}
          />
        </span>
      }
      className={classNames(
        {
          'titled-card--expanded': expanded,
          'titled-card--collapsed': !expanded,
        },
        className,
      )}
      onClickHeader={expandable ? () => setExpanded(!expanded) : undefined}
      shadow={false}
      subtitle={activity.subtitle}
      title={activity.title || formatNameFromId(activity.id)}
      titleIcon={getIconForActivity(activity)}
      titleLinkUrl={activity.url}
      titleLinkId={activity.id}
    >
      {expanded && items && items.length > 0 && <ItemsStack items={items} />}
    </TitledCard>
  );
}
