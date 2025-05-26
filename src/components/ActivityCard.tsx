import classNames from 'classnames';
import React, { useState } from 'react';
import ItemsStack from './ItemsStack';
import TitledCard from './TitledCard';
import { useItemsContext } from '../context';
import { formatNameFromId, getIconForActivity } from '../utils';
import type { Activity } from '../types';

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
      titleIconLeft={getIconForActivity(activity)}
      titleIconRight={
        expandable ? (expanded ? 'expand_less' : 'expand_more') : 'open_in_new'
      }
      titleIconSize={expandable ? 16 : 12}
      titleLinkUrl={activity.url}
      titleLinkId={expandable ? undefined : activity.id}
    >
      {expanded && items && items.length > 0 && <ItemsStack items={items} />}
    </TitledCard>
  );
}
