import { Text } from '@zigurous/forge-react';
import React from 'react';
import WikiLink from './WikiLink';
import { formatNameFromId } from '../utils';
import type { SlayerMonster } from '../types';

interface SlayerMonsterListItemProps {
  monster: SlayerMonster;
}

export default function SlayerMonsterListItem({
  monster,
}: SlayerMonsterListItemProps) {
  return (
    <li id={monster.id} key={monster.id}>
      <WikiLink className="flex align-center" wikiId={monster.id}>
        <div className="shrink-0 w-xxl h-xxl">
          <img
            alt=""
            aria-hidden
            className="object-contain w-full h-full"
            src={`https://oldschool.runescape.wiki/images/${monster.icon || `${monster.id}_icon`}.png`}
          />
        </div>
        <div className="flex align-center justify-between w-full ml-md">
          <Text as="span" size="md">
            {monster.title || formatNameFromId(monster.id)}
          </Text>
          <span className="inline-flex align-center">
            {monster.requiredCombatLevel && monster.requiredCombatLevel > 1 && (
              <Text
                aria-label={`Combat level requirement: ${monster.requiredCombatLevel}`}
                className="inline-flex align-center ml-md"
                color="muted"
                style={{ minWidth: '38px' }}
                type="caption"
              >
                <img
                  alt=""
                  aria-hidden
                  className="object-contain mr-xxs"
                  src="https://oldschool.runescape.wiki/images/Attack_style_icon.png"
                  style={{ width: 18, height: 18 }}
                />
                {monster.requiredCombatLevel}
              </Text>
            )}
            <Text
              aria-label={`Slayer level requirement: ${monster.requiredSlayerLevel ?? 1}`}
              className="inline-flex align-center ml-md"
              color="muted"
              style={{ minWidth: '38px' }}
              type="caption"
            >
              <img
                alt=""
                aria-hidden
                className="object-contain mr-xxs"
                src="https://oldschool.runescape.wiki/images/Slayer_icon_(detail).png"
                style={{ width: 18, height: 18 }}
              />
              {monster.requiredSlayerLevel ?? 1}
            </Text>
          </span>
        </div>
      </WikiLink>
    </li>
  );
}
