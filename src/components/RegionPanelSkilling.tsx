import { Stack, Text } from '@zigurous/forge-react';
import React, { useMemo } from 'react';
import ActivityCard from './ActivityCard';
import HelpTooltip from './HelpTooltip';
import ActivityFilter from './SkillFilters';
import SkillLevelInput from './SkillLevelInput';
import { useActivitiesContext, useSettingsContext, useSkillingFilterContext } from '../context'; // prettier-ignore
import { skillingFilters, sortByIcon, sortByLevel, sortByName } from '../utils';
import type { Activity, Region, SkillFilter } from '../types';

interface RegionPanelSkillingProps {
  region: Region;
}

export default function RegionPanelSkilling({
  region,
}: RegionPanelSkillingProps) {
  const context = useActivitiesContext();
  const filter = useSkillingFilterContext();
  const settings = useSettingsContext();

  const activities = useMemo(() => {
    const ids = [
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
    ];
    return ids
      .map((id: string) => {
        const activity = context.getActivityById(id);
        switch (activity?.category) {
          case 'boss':
            return {
              ...activity,
              subtitle: 'Boss',
              requiredLevel: activity.requiredLevel || 1,
              sortingGroups: activity.sortingGroups.includes('slayer')
                ? ['slayer', ...activity.sortingGroups]
                : activity.sortingGroups,
            } as Activity;
          case 'monster':
            return { ...activity, icon: 'Slayer_icon' };
        }
        return activity;
      })
      .filter(activity => !!activity)
      .filter(activityFilter)
      .sort(sortByName)
      .sort(sortByLevel)
      .sort(sortByIcon);
  }, [region, region.id, context.getActivityById]);

  const filteredActivities = activities
    .filter(activity => {
      const min = settings.minSkillLevel;
      const max = settings.maxSkillLevel;
      const lvl = activity.requiredLevel || 1;
      if (min && lvl < min) return false;
      if (max && lvl > max) return false;
      return filter.isActivityFiltered(activity);
    })
    .sort((a, b) => {
      // sort activities so the selected categories always show first
      const aGroup = a.sortingGroups.length > 0 ? a.sortingGroups[0] : 'misc';
      const bGroup = b.sortingGroups.length > 0 ? b.sortingGroups[0] : 'misc';
      const aInc = filter.selectedFilters.includes(aGroup as SkillFilter);
      const bInc = filter.selectedFilters.includes(bGroup as SkillFilter);
      if (aInc && !bInc) return -1;
      if (bInc && !aInc) return 1;
      return 0;
    });

  return (
    <section className="panel__section">
      <Stack className="mb-xl">
        <Text as="h2" className="ml-sm" type="title-lg">
          Skilling
        </Text>
        <HelpTooltip
          text={
            <>
              <p className="mb-xxxs">Click a skill below to filter the list</p>
              <p>
                <b className="font-500">• Shift+Click</b> to select a range of
                skills
                <br />
                <b className="font-500">• Ctrl/Cmd+Click</b> to select
                individual skills
              </p>
            </>
          }
        />
      </Stack>
      <ActivityFilter disabledFilters={['sailing']} />
      <Stack align="center" className="my-xl" spacing="sm">
        <SkillLevelInput
          placeholder="Min Lvl"
          level={settings.minSkillLevel}
          setLevel={lvl => settings.set('minSkillLevel', lvl)}
        />
        <SkillLevelInput
          placeholder="Max Lvl"
          level={settings.maxSkillLevel}
          setLevel={lvl => settings.set('maxSkillLevel', lvl)}
        />
      </Stack>
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
    </section>
  );
}

const excludedCategories = ['raid', 'chest', 'spellbook', null, undefined];

function activityFilter(activity: Activity) {
  if (excludedCategories.includes(activity.category)) {
    return false;
  }

  switch (activity.category) {
    case 'boss':
      return (
        activity.subcategory === 'skilling' ||
        activity.sortingGroups.includes('slayer')
      );
    case 'monster':
      return Boolean(activity.requiredLevel);
    case 'dungeon':
    case 'location':
      if (!activity.notableDrops) return false;
      break;
    case 'npc':
      if (activity.subtitle === 'Skill Master') return false;
      break;
  }

  return activity.sortingGroups.some(
    group =>
      group === 'skilling' || skillingFilters.includes(group as SkillFilter),
  );
}
