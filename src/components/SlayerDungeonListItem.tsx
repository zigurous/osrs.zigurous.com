import { Text } from '@zigurous/forge-react';
import React from 'react';
import WikiLink from './WikiLink';
import type { SlayerDungeon } from '../types';
import { formatNameFromId } from '../utils';

interface SlayerDungeonListItemProps {
  dungeon: SlayerDungeon;
}

export default function SlayerDungeonListItem({
  dungeon,
}: SlayerDungeonListItemProps) {
  const name = dungeon.name || formatNameFromId(dungeon.id);
  return (
    <li id={dungeon.id} key={dungeon.id}>
      <WikiLink
        aria-label={name}
        className="flex align-center"
        wikiId={dungeon.id}
      >
        <div className="shrink-0 w-xxl h-xxl">
          <img
            alt=""
            aria-hidden
            className="object-contain w-full h-full p-xxs"
            src={`https://oldschool.runescape.wiki/images/Dungeon_icon.png`}
          />
        </div>
        <div className="flex align-center justify-between w-full ml-md">
          <Text as="span" size="md">
            {name}
          </Text>
        </div>
      </WikiLink>
    </li>
  );
}
