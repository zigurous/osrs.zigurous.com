import { Text } from '@zigurous/forge-react';
import React, { useMemo } from 'react';
import ActivityCard from './ActivityCard';
import ActivityFilter from './ActivityFilter';
import RegionPanelSection from './RegionPanelSection';
import { useActivitiesContext, useFilterContext } from '../context';
import type { Region } from '../types';
import { activityFilters, sortByIcon, sortByLevel, sortByName } from '../utils';

interface RegionPanelActivitiesProps {
  region: Region;
}

export default function RegionPanelActivities({
  region,
}: RegionPanelActivitiesProps) {
  const context = useActivitiesContext();
  const filter = useFilterContext();

  const activities = useMemo(
    () =>
      region.activities
        .map(context.getActivityById)
        .filter(activity => !!activity)
        .sort(sortByName)
        .sort(sortByLevel)
        .sort(sortByIcon),
    [region, region.id, filter.selectedFilters, context.getActivityById],
  );

  // sort activities so the selected categories always show first
  const sortedActivities = useMemo(
    () =>
      activities.sort((a, b) => {
        const aGroup = a.sortingGroups.length > 0 ? a.sortingGroups[0] : 'misc';
        const bGroup = b.sortingGroups.length > 0 ? b.sortingGroups[0] : 'misc';
        const aIncluded =
          filter.selectedFilters.includes(aGroup) || a.category === 'boss';
        const bIncluded =
          filter.selectedFilters.includes(bGroup) || b.category === 'boss';
        if (aIncluded && !bIncluded) return -1;
        if (bIncluded && !aIncluded) return 1;
        return 0;
      }),
    [activities, filter.selectedFilters],
  );

  const filteredActivities =
    filter.selectedFilters.length > 0
      ? sortedActivities.filter(filter.isActivityFiltered)
      : sortedActivities;

  const disabledFilters = activityFilters.filter(
    filter =>
      !sortedActivities.some(activity =>
        activity.sortingGroups?.includes(filter),
      ),
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
