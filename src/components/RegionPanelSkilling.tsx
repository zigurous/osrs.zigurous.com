import { Text } from '@zigurous/forge-react';
import React, { useCallback, useMemo } from 'react';
import ActivityCard from './ActivityCard';
import ActivityFilter from './SkillingFilters';
import RegionPanelSection from './RegionPanelSection';
import { useActivitiesContext, useSkillingFilterContext } from '../context';
import { skillingFilters, sortByIcon, sortByLevel, sortByName } from '../utils';
import type { Activity, Region, SkillingFilter } from '../types';

interface RegionPanelSkillingProps {
  region: Region;
}

export default function RegionPanelSkilling({
  region,
}: RegionPanelSkillingProps) {
  const context = useActivitiesContext();
  const filter = useSkillingFilterContext();

  const getActivityById = useCallback(
    (id: string) => {
      const activity = context.getActivityById(id);
      switch (activity?.category) {
        case 'boss':
          return { ...activity, subtitle: 'Boss' };
        case 'monster':
          return { ...activity, icon: 'Slayer_icon' };
      }
      return activity;
    },
    [context.getActivityById],
  );

  const activities = useMemo(
    () =>
      [
        ...new Set([
          ...region.raids,
          ...region.bosses,
          ...region.minigames,
          ...region.guilds,
          ...region.skilling,
          ...region.dungeons,
          ...region.monsters,
          ...region.npcs,
          ...region.misc,
        ]),
      ]
        .map(getActivityById)
        .filter(activity => !!activity)
        .filter(filterActivity)
        .sort(sortByName)
        .sort(sortByLevel)
        .sort(sortByIcon),
    [region, region.id, getActivityById],
  );

  // sort activities so the selected categories always show first
  const sortedActivities = useMemo(
    () =>
      activities.toSorted((a, b) => {
        const aGroup = a.sortingGroups.length > 0 ? a.sortingGroups[0] : 'misc';
        const bGroup = b.sortingGroups.length > 0 ? b.sortingGroups[0] : 'misc';
        const aInc = filter.selectedFilters.includes(aGroup as SkillingFilter);
        const bInc = filter.selectedFilters.includes(bGroup as SkillingFilter);
        if (aInc && !bInc) return -1;
        if (bInc && !aInc) return 1;
        return 0;
      }),
    [activities, filter.selectedFilters],
  );

  const filteredActivities =
    filter.selectedFilters.length > 0
      ? sortedActivities.filter(filter.isActivityFiltered)
      : sortedActivities;

  const disabledFilters = skillingFilters.filter(
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
        <Text align="center" color="disabled">
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

  switch (activity.category) {
    case 'boss':
      return (
        activity.subcategory === 'skilling' ||
        activity.sortingGroups[0] === 'slayer'
      );
    case 'monster':
      return Boolean(activity.requiredLevel);
  }

  return activity.sortingGroups.some(
    group =>
      group === 'skilling' || skillingFilters.includes(group as SkillingFilter),
  );
}
