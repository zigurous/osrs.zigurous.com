import { Stack, Text } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';
import ItemFrame from './ItemFrame';
import WikiIcon from './WikiIcon';
import WikiLink from './WikiLink';
import { useGearProgressionContext, useItemsContext } from '../context';
import { formatNameFromId, getIconForSkill, getIconForSortingGroup } from '../utils'; // prettier-ignore
import type { GearProgressionUpgrade, Skill } from '../types';

export default function GearProgressionUpgrades() {
  const context = useGearProgressionContext();
  const itemsContext = useItemsContext();
  if (context.current.upgrades.length === 0) return null;
  return (
    <ul className="gear-progression__upgrades w-full">
      {context.current.upgrades.map((upgrade, index) => (
        <React.Fragment key={upgrade.id}>
          <li
            className={classNames('gear-progression__upgrade', {
              'parent-item': Boolean(upgrade.subitems),
            })}
          >
            <div className="relative">
              <WikiLink
                className="gear-progression__upgrade-link p-md"
                wikiId={upgrade.id}
              >
                <WikiIcon
                  className="mr-sm"
                  icon={upgrade.icon || getIconForType(upgrade)}
                  size={20}
                />
                <Text type="body">
                  {upgrade.title || formatNameFromId(upgrade.id)}
                  {upgrade.subtitle && (
                    <Text
                      as="span"
                      className="ml-sm"
                      color="muted"
                      type="caption"
                    >
                      {upgrade.subtitle}
                    </Text>
                  )}
                </Text>
              </WikiLink>
              {upgrade.items && (
                <Stack spacing="xs">
                  {itemsContext.getItemsByIds(upgrade.items).map(item => (
                    <ItemFrame
                      key={item.id}
                      item={{ ...item, transmutations: undefined }}
                      size="sm"
                    />
                  ))}
                </Stack>
              )}
            </div>
          </li>
          {upgrade.subitems?.map((subitem, index) => (
            <li
              className={classNames('gear-progression__upgrade sub-item', {
                last: index === upgrade.subitems!.length - 1,
              })}
              key={subitem.id}
            >
              <div className="relative">
                <WikiLink
                  className="gear-progression__upgrade-link px-md py-sm"
                  wikiId={subitem.id}
                >
                  <WikiIcon
                    icon={subitem.icon || getIconForType(subitem)}
                    size={18}
                    style={{
                      marginLeft: '1px',
                      marginRight: 'calc(var(--spacing-sm) + 1px)',
                    }}
                  />
                  <Text type="body-sm">
                    {subitem.title || formatNameFromId(subitem.id)}
                    {subitem.subtitle && (
                      <Text
                        as="span"
                        className="ml-sm"
                        color="muted"
                        type="caption"
                      >
                        {subitem.subtitle}
                      </Text>
                    )}
                  </Text>
                </WikiLink>
              </div>
            </li>
          ))}
        </React.Fragment>
      ))}
    </ul>
  );
}

function getIconForType(upgrade: GearProgressionUpgrade): string {
  switch (upgrade.type) {
    case 'skill':
      return getIconForSkill(upgrade.id as Skill) || '';
    case 'custom':
      return upgrade.id;
    default:
      return getIconForSortingGroup(upgrade.type) || '';
  }
}
