import { Text } from '@zigurous/forge-react';
import React from 'react';
import ItemsStack from './ItemsStack';
import RegionPanelSection from './RegionPanelSection';
import TitledCard from './TitledCard';
import WikiIcon from './WikiIcon';
import WikiLink from './WikiLink';
import { useItemsContext } from '../context/ItemsContext';
import { useQuestsContext } from '../context/QuestsContext';
import { formatNameFromId } from '../utils/formatting';
import type { Region } from '../types/region';

interface RegionPanelQuestsProps {
  region: Region;
}

export default function RegionPanelQuests({ region }: RegionPanelQuestsProps) {
  const { getQuestSeriesById } = useQuestsContext();
  const itemsContext = useItemsContext();
  const storylines = region.storylines
    .map(getQuestSeriesById)
    .filter(series => !!series);
  return (
    <RegionPanelSection title="Quests">
      {storylines.length > 0 ? (
        <Text
          className="text-pretty ml-sm mb-xxl"
          color="muted"
          type="body-sm"
          style={{ marginTop: '-8px' }}
        >
          This is not a comprehensive list of all quests in the region(s),
          rather the main storylines directly associated with the region(s).
          Individual quests may still require travel to other regions.
        </Text>
      ) : (
        <Text className="ml-md" color="disabled">
          No major questlines are available in this region.
        </Text>
      )}
      {storylines.map(series => (
        <TitledCard
          caption={series.caption}
          key={series.id}
          subtitle={
            series.id.includes('#') &&
            storylines.some(
              storyline =>
                storyline.id !== series.id && storyline.title === series.title,
            )
              ? series.id.split('#')[1]
              : undefined
          }
          title={series.title || formatNameFromId(series.id)}
          titleLinkId={series.link || `Quests/Series#${series.id}`}
          type="list"
        >
          <ul>
            {series.quests.map(quest => (
              <li id={quest} key={quest}>
                <WikiLink className="flex align-center" wikiId={quest}>
                  <WikiIcon icon="Quest_point_icon" />
                  <div className="flex align-center justify-between w-full ml-md">
                    <Text as="span" size="md">
                      {formatNameFromId(quest)}
                    </Text>
                  </div>
                </WikiLink>
              </li>
            ))}
          </ul>
          {series.unlocks && series.unlocks.length > 0 && (
            <div className="px-md">
              <div className="flex justify-center align-center">
                <hr className="full mr-md" />
                <Text type="eyebrow" color="disabled">
                  Unlocks
                </Text>
                <hr className="full ml-md" />
              </div>
              <ItemsStack items={itemsContext.getItemsByIds(series.unlocks)} />
            </div>
          )}
        </TitledCard>
      ))}
    </RegionPanelSection>
  );
}
