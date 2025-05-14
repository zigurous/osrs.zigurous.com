import { Text } from '@zigurous/forge-react';
import React, { useMemo } from 'react';
import RegionPanelSection from './RegionPanelSection';
import TitledCard from './TitledCard';
import WikiLink from './WikiLink';
import { useActivitiesContext, useLocationsContext } from '../context';
import type { Activity, Region } from '../types';
import { formatNameFromId, getIconForActivity, sortByIcon, sortByName } from '../utils'; // prettier-ignore

interface RegionPanelOverviewProps {
  region: Region;
}

export default function RegionPanelOverview({
  region,
}: RegionPanelOverviewProps) {
  const { getActivityById } = useActivitiesContext();
  const { getLocationById } = useLocationsContext();
  const activities = useMemo(
    () => ({
      raids: region.raids
        .map(id => getActivityById(id))
        .filter(activity => !!activity)
        .sort(sortByName),
      bosses: region.bosses
        .map(id => getActivityById(id))
        .filter(activity => !!activity)
        .sort(sortByName),
      minigames: region.minigames
        .filter(id => !region.bosses.includes(id))
        .map(id => getActivityById(id))
        .filter(activity => !!activity)
        .sort(sortByName)
        .sort(sortByIcon),
      guilds: region.guilds
        .map(id => getActivityById(id))
        .filter(activity => !!activity)
        .sort(sortByName)
        .sort(sortByIcon),
      misc: region.misc
        .map(id => getActivityById(id))
        .filter(activity => !!activity)
        .sort(sortByName)
        .sort(sortByIcon),
      locations: region.locations
        .map(id => getLocationById(id))
        .sort(sortByName),
      // .sort((a, b) => b.category.localeCompare(a.category)),
    }),
    [region.id, getActivityById, getLocationById],
  );
  return (
    <RegionPanelSection title="Overview">
      <Text
        className="text-pretty ml-sm mb-xxl"
        color="muted"
        type="body-sm"
        style={{ marginTop: '-8px' }}
      >
        {region.description}
      </Text>
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
      {activities.guilds.length > 0 && (
        <TitledCard title="Guilds" type="list">
          <ul>
            {activities.guilds.map(guild => (
              <OverviewListItem item={guild} key={guild.id} />
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
      {activities.locations.length > 0 && (
        <TitledCard title="Locations" type="list">
          <ul>
            {activities.locations.map(location => (
              <OverviewListItem item={location} key={location.id} />
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
  item: { id: string; icon?: string; title?: string; name?: string };
}) {
  return (
    <li id={item.id} key={item.id}>
      <WikiLink className="flex align-center" wikiId={item.id}>
        <div className="shrink-0 w-xl h-xl">
          <img
            alt=""
            aria-hidden
            className="object-contain w-full h-full"
            src={`https://oldschool.runescape.wiki/images/${item.icon || getIconForActivity(item as Activity)}.png`}
          />
        </div>
        <div className="flex align-center justify-between w-full ml-md">
          <Text as="span" size="md">
            {item.title || item.name || formatNameFromId(item.id)}
          </Text>
        </div>
      </WikiLink>
    </li>
  );
}
