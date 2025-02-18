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
  const items =
    activity.notableDrops && context.getItemsByIds(activity.notableDrops);
  const expandable = items && items.length > 0;
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
      subtitle={getSubtitle(activity)}
      title={activity.title || formatNameFromId(activity.id)}
      titleIconId={getIconForActivity(activity)}
      titleIconSize={expandable ? undefined : 14}
      titleLinkId={expandable ? undefined : activity.id}
      titleLinkIcon={
        expandable ? (expanded ? 'expand_less' : 'expand_more') : 'open_in_new'
      }
    >
      {items && items.length > 0 && <ItemsStack items={items} />}
    </TitledCard>
  );
}

function getSubtitle(activity: Activity) {
  // prettier-ignore
  switch (activity.category) {
    case 'boss': return 'Boss';
    case 'raid': return 'Raid';
    default: return undefined;
  }
}
