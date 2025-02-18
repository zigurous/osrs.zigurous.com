import { Text } from '@zigurous/forge-react';
import React, { useMemo } from 'react';
import ActivityCard from './ActivityCard';
import ActivityFilter from './ActivityFilter';
import RegionPanelSection from './RegionPanelSection';
import { useActivitiesContext, useFilterContext } from '../context';
import type { Region } from '../types';
import { activityFilters, sortByIcon } from '../utils';

interface RegionPanelActivitiesProps {
  region: Region;
}

export default function RegionPanelActivities({
  region,
}: RegionPanelActivitiesProps) {
  const context = useActivitiesContext();
  const filter = useFilterContext();

  const activities = useMemo(() => {
    const ids = [
      ...new Set([
        ...(region.raids || []),
        ...region.bosses,
        ...region.minigames,
        ...(region.guilds || []),
        ...region.skilling,
        ...region.dungeons,
        ...region.monsters,
        ...(region.misc || []),
      ]),
    ];
    return ids
      .map(context.getActivityById)
      .filter(activity => !!activity)
      .sort(sortByIcon);
  }, [region, region.id, context.getActivityById]);

  const filteredActivities =
    filter.selectedFilters.length > 0
      ? activities.filter(filter.isActivityFiltered)
      : activities;

  const disabledFilters = activityFilters.filter(
    filter =>
      !activities.some(activity => activity.sortingGroups?.includes(filter)),
  );

  return (
    <RegionPanelSection title="Activities">
      <ActivityFilter className="mb-xxl" disabledFilters={disabledFilters} />
      {filteredActivities.length > 0 ? (
        <ul className="drops-list drops-list--accordion mb-lg">
          {filteredActivities.map(activity => (
            <li id={activity.id} key={activity.id}>
              <ActivityCard activity={activity} />
            </li>
          ))}
        </ul>
      ) : (
        <Text className="text-center" color="disabled">
          No activities found for the selected skill(s).
        </Text>
      )}
    </RegionPanelSection>
  );
}
