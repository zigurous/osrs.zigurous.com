import { Text } from '@zigurous/forge-react';
import React, { useMemo } from 'react';
import RegionPanelSection from './RegionPanelSection';
import TitledCard from './TitledCard';
import WikiIcon from './WikiIcon';
import WikiLink from './WikiLink';
import { useActivitiesContext, useLocationsContext } from '../context';
import { formatNameFromId, getIconForActivity, sortByIcon, sortByName } from '../utils'; // prettier-ignore
import type { Activity, Region } from '../types';

interface RegionPanelOverviewProps {
  region: Region;
}

export default function RegionPanelOverview({
  region,
}: RegionPanelOverviewProps) {
  const { getActivityById } = useActivitiesContext();
  const { getLocationById, getDungeonById } = useLocationsContext();

  // prettier-ignore
  const activities = useMemo(
    () => ({
      raids: region.raids
        .map(getActivityById)
        .filter(activity => !!activity)
        .sort(sortByName),
      bosses: region.bosses
        .map(getActivityById)
        .filter(activity => !!activity)
        .sort(sortByName),
      minigames: region.minigames
        .filter(id => !region.bosses.includes(id))
        .map(getActivityById)
        .filter(activity => !!activity)
        .sort(sortByName)
        .sort(sortByIcon),
      misc: region.misc
        .map(id => {
          const activity = getActivityById(id);
          if (!activity) return null;
          return activity.category === 'monster'
            ? { ...activity, icon: undefined }
            : activity;
        })
        .filter(activity => !!activity)
        .sort(sortByName)
        .sort(sortByIcon),
      guilds: region.guilds
        .map(getActivityById)
        .filter(activity => !!activity)
        .sort(sortByName)
        .sort(sortByIcon),
      locations: region.locations
        .map(getLocationById)
        .sort(sortByName),
      dungeons: region.dungeons
        .map(getDungeonById)
        .sort(sortByName),
      storylines: [...new Set(region.storylines.map(id => id.split('#')[0]))]
        .map(series => ({
          id: series,
          icon: 'Quest_point_icon',
          link: `Quests/Series#${series}`,
        }))
        .sort(sortByName)
    }),
    [region.id, getActivityById, getLocationById, getDungeonById],
  );

  return (
    <RegionPanelSection title="Overview">
      {region.description && (
        <Text
          className="text-pretty ml-sm mb-xxl"
          color="muted"
          type="body-sm"
          style={{ marginTop: '-8px' }}
        >
          {region.description}
        </Text>
      )}
      {activities.raids.length > 0 && (
        <TitledCard title="Raids" type="list">
          <ul>
            {activities.raids.map(raid => (
              <OverviewListItem item={raid} key={raid.id} />
            ))}
          </ul>
        </TitledCard>
      )}
      {activities.bosses.length > 0 && (
        <TitledCard title="Bosses" type="list">
          <ul>
            {activities.bosses.map(boss => (
              <OverviewListItem item={boss} key={boss.id} />
            ))}
          </ul>
        </TitledCard>
      )}
      {activities.minigames.length > 0 && (
        <TitledCard title="Minigames" type="list">
          <ul>
            {activities.minigames.map(minigame => (
              <OverviewListItem item={minigame} key={minigame.id} />
            ))}
          </ul>
        </TitledCard>
      )}
      {activities.misc.length > 0 && (
        <TitledCard title="Misc" type="list">
          <ul>
            {activities.misc.map(guild => (
              <OverviewListItem item={guild} key={guild.id} />
            ))}
          </ul>
        </TitledCard>
      )}
      {activities.guilds.length > 0 && (
        <TitledCard title="Guilds" type="list">
          <ul>
            {activities.guilds.map(guild => (
              <OverviewListItem item={guild} key={guild.id} />
            ))}
          </ul>
        </TitledCard>
      )}
      {activities.locations.length > 0 && (
        <TitledCard title="Locations" type="list">
          <ul>
            {activities.locations.map(location => (
              <OverviewListItem item={location} key={location.id} />
            ))}
          </ul>
        </TitledCard>
      )}
      {activities.dungeons.length > 0 && (
        <TitledCard title="Dungeons" type="list">
          <ul>
            {activities.dungeons.map(dungeon => (
              <OverviewListItem item={dungeon} key={dungeon.id} />
            ))}
          </ul>
        </TitledCard>
      )}
      {activities.storylines.length > 0 && (
        <TitledCard title="Storylines" type="list">
          <ul>
            {activities.storylines.map(series => (
              <OverviewListItem item={series} key={series.id} />
            ))}
          </ul>
        </TitledCard>
      )}
    </RegionPanelSection>
  );
}

function OverviewListItem({
  item,
}: {
  item: {
    id: string;
    icon?: string;
    title?: string;
    name?: string;
    link?: string;
  };
}) {
  return (
    <li id={item.id} key={item.id}>
      <WikiLink className="flex align-center" wikiId={item.link || item.id}>
        <WikiIcon icon={item.icon || getIconForActivity(item as Activity)} />
        <div className="flex align-center justify-between w-full ml-md">
          <Text as="span" size="md">
            {item.title || item.name || formatNameFromId(item.id)}
          </Text>
        </div>
      </WikiLink>
    </li>
  );
}
