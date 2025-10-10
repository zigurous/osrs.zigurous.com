import { Text } from '@zigurous/forge-react';
import React from 'react';
import WikiLink from './WikiLink';
import { formatNameFromId } from '../utils/formatting';
import type { SlayerMaster } from '../types/slayer';

interface SlayerMasterListItemProps {
  master: SlayerMaster;
}

export default function SlayerMasterListItem({
  master,
}: SlayerMasterListItemProps) {
  const name = formatNameFromId(master.id);
  return (
    <li id={master.id} key={master.id}>
      <WikiLink
        aria-label={name}
        className="flex align-center"
        wikiId={master.id}
      >
        <div className="shrink-0 w-xxl h-xxl">
          <img
            alt=""
            aria-hidden
            className="object-contain w-full h-full"
            src={`https://oldschool.runescape.wiki/images/${master.image}.png`}
          />
        </div>
        <div className="flex align-center justify-between w-full ml-md">
          <Text as="span" size="md">
            {name}
          </Text>
          <Text
            as="span"
            aria-label={`Combat level requirement: ${master.requiredCombatLevel || 1}`}
            className="inline-flex align-center ml-md"
            color="muted"
            type="caption"
          >
            <img
              alt=""
              aria-hidden
              className="object-contain mr-xs"
              src="https://oldschool.runescape.wiki/images/Attack_style_icon.png"
              style={{ width: 18, height: 18 }}
            />
            {master.requiredCombatLevel || 1}
          </Text>
        </div>
      </WikiLink>
    </li>
  );
}
