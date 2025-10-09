import { Stack } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';
import EquipmentInventory from './EquipmentInventory';
import IconToggle from './IconToggle';
import TitledCard from './TitledCard';
import { useEquipmentContext, useGearProgressionContext } from '../context';

export default function GearProgressionEquipment() {
  const context = useGearProgressionContext();
  const { getItemById } = useEquipmentContext();
  return (
    <TitledCard
      className="gear-progression-card"
      id="equipment"
      title={context.category.title}
      captionIcon={
        context.category.subcategories && (
          <Stack
            inline
            className="h-0"
            align="center"
            justify="end"
            spacing="xxxs"
          >
            {context.category.subcategories.map(subcategory => {
              const changed = Boolean(
                context.currentTier.subcategoryItems?.some(el => {
                  if (el.subcategory !== subcategory.id) return false;
                  const item = getItemById(el.id);
                  return (
                    item &&
                    context.currentTier.equipment[subcategory.id][
                      item.slot
                    ]?.tags?.includes('upgrade')
                  );
                }),
              );
              return (
                <IconToggle
                  className={classNames({ changed })}
                  icon={subcategory.icon}
                  key={subcategory.id}
                  label={subcategory.label}
                  on={subcategory.id === context.subcategory}
                  onChange={on =>
                    context.setSubcategory(on ? subcategory.id : undefined)
                  }
                  size="xs"
                />
              );
            })}
          </Stack>
        )
      }
    >
      <Stack
        align="center"
        className="mt-md mb-lg"
        layout="vertical"
        spacing="lg"
        style={{ minWidth: '240px' }}
      >
        <EquipmentInventory
          items={
            context.subcategory
              ? context.currentTier.equipment[context.subcategory]
              : context.currentTier.equipment[context.category.id]
          }
        />
      </Stack>
    </TitledCard>
  );
}
