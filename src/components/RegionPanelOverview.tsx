import { Text } from '@zigurous/forge-react';
import React, { useMemo } from 'react';
import RegionPanelSection from './RegionPanelSection';
import TitledCard from './TitledCard';
import WikiLink from './WikiLink';
import { useActivitiesContext } from '../context';
import type { Activity, Region } from '../types';
import { formatNameFromId, getIconForActivity, sortByIcon, sortByName } from '../utils'; // prettier-ignore

interface RegionPanelOverviewProps {
  region: Region;
}

export default function RegionPanelOverview({
  region,
}: RegionPanelOverviewProps) {
  const context = useActivitiesContext();
  const activities = useMemo(() => {
    return {
      raids: (region.raids || [])
        .map(id => context.getActivityById(id))
        .filter(activity => !!activity)
        .sort(sortByName),
      bosses: region.bosses
        .map(id => context.getActivityById(id))
        .filter(activity => !!activity)
        .sort(sortByName),
      minigames: region.minigames
        .filter(id => !region.bosses.includes(id))
        .map(id => context.getActivityById(id))
        .filter(activity => !!activity)
        .sort(sortByName)
        .sort(sortByIcon),
      guilds: (region.guilds || [])
        .map(id => context.getActivityById(id))
        .filter(activity => !!activity)
        .sort(sortByName)
        .sort(sortByIcon),
      misc: (region.misc || [])
        .map(id => context.getActivityById(id))
        .filter(activity => !!activity)
        .sort(sortByName)
        .sort(sortByIcon),
      dungeons: region.dungeons
        .map(id => context.getActivityById(id))
        .filter(activity => !!activity)
        .sort(sortByName),
    };
  }, [region.id, context.getActivityById]);
  return (
    <RegionPanelSection title="Overview">
      <Text className="text-pretty ml-sm mb-xxl" color="muted" type="body-sm">
        {region.description}
      </Text>
      {activities.raids.length > 0 && (
        <TitledCard title="Raids" type="list">
          <ul>
            {activities.raids.map(raid => (
              <ActivityListItem activity={raid} key={raid.id} />
            ))}
          </ul>
        </TitledCard>
      )}
      {activities.bosses.length > 0 && (
        <TitledCard title="Bosses" type="list">
          <ul>
            {activities.bosses.map(boss => (
              <ActivityListItem activity={boss} key={boss.id} />
            ))}
          </ul>
        </TitledCard>
      )}
      {activities.minigames.length > 0 && (
        <TitledCard title="Minigames" type="list">
          <ul>
            {activities.minigames.map(minigame => (
              <ActivityListItem activity={minigame} key={minigame.id} />
            ))}
          </ul>
        </TitledCard>
      )}
      {activities.guilds.length > 0 && (
        <TitledCard title="Guilds" type="list">
          <ul>
            {activities.guilds.map(guild => (
              <ActivityListItem activity={guild} key={guild.id} />
            ))}
          </ul>
        </TitledCard>
      )}
      {activities.misc.length > 0 && (
        <TitledCard title="Misc" type="list">
          <ul>
            {activities.misc.map(guild => (
              <ActivityListItem activity={guild} key={guild.id} />
            ))}
          </ul>
        </TitledCard>
      )}
      {activities.dungeons.length > 0 && (
        <TitledCard title="Dungeons" type="list">
          <ul>
            {activities.dungeons.map(dungeon => (
              <ActivityListItem activity={dungeon} key={dungeon.id} />
            ))}
          </ul>
        </TitledCard>
      )}
    </RegionPanelSection>
  );
}

function ActivityListItem({ activity }: { activity: Activity }) {
  return (
    <li id={activity.id} key={activity.id}>
      <WikiLink className="flex align-center" wikiId={activity.id}>
        <div className="shrink-0 w-xl h-xl">
          <img
            alt=""
            aria-hidden
            className="object-contain w-full h-full"
            src={`https://oldschool.runescape.wiki/images/${getIconForActivity(activity)}.png`}
          />
        </div>
        <div className="flex align-center justify-between w-full ml-md">
          <Text as="span" size="md">
            {activity.title || formatNameFromId(activity.id)}
          </Text>
        </div>
      </WikiLink>
    </li>
  );
}
