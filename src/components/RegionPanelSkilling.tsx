import { Text } from '@zigurous/forge-react';
import React, { useMemo } from 'react';
import ActivityCard from './ActivityCard';
import ActivityFilter from './ActivityFilter';
import RegionPanelSection from './RegionPanelSection';
import { useActivitiesContext, useFilterContext } from '../context';
import type { Activity, Region } from '../types';
import { activityFilters, sortByIcon, sortByLevel, sortByName } from '../utils';

type Filter = (typeof activityFilters)[number];

interface RegionPanelSkillingProps {
  region: Region;
}

export default function RegionPanelSkilling({
  region,
}: RegionPanelSkillingProps) {
  const context = useActivitiesContext();
  const filter = useFilterContext();

  const activities = useMemo(
    () =>
      region.activities
        .map(context.getActivityById)
        .filter(activity => !!activity)
        .filter(filterActivity)
        .sort(sortByName)
        .sort(sortByLevel)
        .sort(sortByIcon),
    [region, region.id, context.getActivityById],
  );

  // sort activities so the selected categories always show first
  // bosses and raids always show first
  const sortedActivities = useMemo(
    () =>
      activities.toSorted((a, b) => {
        const aGroup = a.sortingGroups.length > 0 ? a.sortingGroups[0] : 'misc';
        const bGroup = b.sortingGroups.length > 0 ? b.sortingGroups[0] : 'misc';
        const aIncluded = filter.selectedFilters.includes(aGroup as Filter);
        const bIncluded = filter.selectedFilters.includes(bGroup as Filter);
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
    <RegionPanelSection title="Skilling">
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

const excludedCategories = ['raid', 'chest', 'spellbook', null, undefined];

function filterActivity(activity: Activity) {
  if (excludedCategories.includes(activity.category)) {
    return false;
  }

  if (!activity.sortingGroups) return false;

  if (activity.category === 'boss') {
    return activity.subcategory === 'skilling';
  }

  if (activity.category === 'monster') {
    return Boolean(activity.requiredLevel);
  }

  return activity.sortingGroups.some(
    group => group === 'skilling' || activityFilters.includes(group as Filter),
  );
}
