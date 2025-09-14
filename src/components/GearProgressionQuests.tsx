import { Stack, Text } from '@zigurous/forge-react';
import React from 'react';
import TitledCard from './TitledCard';
import WikiIcon from './WikiIcon';
import WikiLink from './WikiLink';
import { useGearProgressionContext, useQuestsContext } from '../context';
import { formatNameFromId } from '../utils';

export default function GearProgressionQuests() {
  const context = useGearProgressionContext();
  const { order: questOrder, getQuestsByIds } = useQuestsContext();
  if (!context.current.questMilestone) return null;
  const currentIndex = questOrder.quests.indexOf(
    context.current.questMilestone,
  );
  const previousIndex = context.previous?.questMilestone
    ? questOrder.quests.indexOf(context.previous.questMilestone)
    : -1;
  const quests = getQuestsByIds(
    questOrder.quests.slice(previousIndex + 1, currentIndex + 1),
  );
  if (quests.length === 0) return null;
  return (
    <TitledCard className="gear-progression-card" id="quests" title="Quests">
      {quests.map(quest => (
        <li className="list-none mb-xxs" key={quest.id}>
          <WikiLink className="flex align-center" wikiId={quest.id}>
            <Stack spacing="sm">
              <WikiIcon className="mt-xxs" icon="Quest_point_icon" size={18} />
              <Text className="overflow-ellipsis" color="muted" type="body">
                {quest.title || formatNameFromId(quest.id)}
              </Text>
            </Stack>
          </WikiLink>
        </li>
      ))}
    </TitledCard>
  );
}
