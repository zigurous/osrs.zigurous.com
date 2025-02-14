import classNames from 'classnames';
import React, { useState } from 'react';
import ItemsStack from './ItemsStack';
import TitledCard from './TitledCard';
import { useItemsContext } from '../context';
import type { Activity } from '../types';
import { formatNameFromId, getIconForActivity } from '../utils';

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
  const items = context.getItemsByIds(activity.notableDrops);
  const expandable = items.length > 0;
  return (
    <TitledCard
      className={classNames(
        {
          'titled-card--expanded': expanded,
          'titled-card--collapsed': !expanded,
        },
        className,
      )}
      onClickHeader={expandable ? () => setExpanded(!expanded) : undefined}
      shadow={false}
      subtitle={activity.category === 'boss' ? 'Boss' : undefined}
      title={activity.title || formatNameFromId(activity.id)}
      titleIconId={getIconForActivity(activity)}
      titleIconSize={expandable ? undefined : 14}
      titleLinkId={expandable ? undefined : activity.id}
      titleLinkIcon={
        expandable ? (expanded ? 'expand_less' : 'expand_more') : 'open_in_new'
      }
    >
      {items.length > 0 && <ItemsStack items={items} />}
    </TitledCard>
  );
}
