import { Text } from '@zigurous/forge-react';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import ItemsStack from './ItemsStack';
import RegionPanelSection from './RegionPanelSection';
import TitledCard from './TitledCard';
import WikiLink from './WikiLink';
import { useItemsContext } from '../context';
import type { QuestSeries, Region } from '../types';
import { formatNameFromId } from '../utils';

interface RegionPanelQuestsProps {
  region: Region;
}

export default function RegionPanelQuests({ region }: RegionPanelQuestsProps) {
  const data = useStaticQuery<QuestsQueryData>(dataQuery);
  const itemsContext = useItemsContext();
  const storylines = region.storylines
    .map(id => data.quests.nodes.find(series => series.id === id))
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
          This is not a comprehensive list of all quests in the region, rather
          the main storylines directly associated with the region. Many quests
          still require travel to other regions.
        </Text>
      ) : (
        <Text className="ml-md" color="disabled">
          No major questlines are available in this region.
        </Text>
      )}
      {storylines.map(series => (
        <TitledCard
          title={series.title || formatNameFromId(series.id)}
          titleIconRight="open_in_new"
          titleLinkId={series.link || `Quests/Series#${series.id}`}
          caption={series.caption}
          type="list"
          key={series.id}
        >
          <ul>
            {series.quests.map(quest => (
              <li id={quest} key={quest}>
                <WikiLink className="flex align-center" wikiId={quest}>
                  <div
                    className="inline-flex justify-center align-center shrink-0"
                    style={{ width: '21px', height: '21px' }}
                  >
                    <img
                      alt=""
                      aria-hidden
                      className="object-contain w-full h-full"
                      src="https://oldschool.runescape.wiki/images/Quest_point_icon.png"
                    />
                  </div>
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

interface QuestsQueryData {
  quests: {
    nodes: QuestSeries[];
  };
}

const dataQuery = graphql`
  query QuestsQuery {
    quests: allQuestsJson {
      nodes {
        id: jsonId
        link
        title
        caption
        quests
        unlocks
      }
    }
  }
`;
