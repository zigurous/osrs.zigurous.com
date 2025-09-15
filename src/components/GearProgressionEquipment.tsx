import { Stack } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';
import EquipmentInventory from './EquipmentInventory';
import IconToggle from './IconToggle';
import TitledCard from './TitledCard';
import { useGearProgressionContext } from '../context';
import { EQUIPMENT_OVERALL } from '../context/GearProgressionContext';
import { equipmentSlots } from '../utils';

export default function GearProgressionEquipment() {
  const context = useGearProgressionContext();
  return (
    <TitledCard
      className="gear-progression-card"
      id="equipment"
      title={context.selectedCategory.title}
      captionIcon={
        context.selectedCategory.subcategories && (
          <Stack
            inline
            className="h-0"
            align="center"
            justify="end"
            spacing="xxxs"
          >
            {context.selectedCategory.subcategories.map(subcategory => {
              const changed = Boolean(
                context.current.equipment[subcategory.id] &&
                  equipmentSlots.some(slot =>
                    context.current.equipment[subcategory.id][
                      slot
                    ]?.tags?.includes('upgrade'),
                  ),
              );
              return (
                <IconToggle
                  className={classNames({ changed })}
                  icon={subcategory.icon}
                  key={subcategory.id}
                  label={subcategory.label}
                  on={subcategory.id === context.selectedSubcategory}
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
          slots={context.current.equipment[EQUIPMENT_OVERALL]}
        />
      </Stack>
    </TitledCard>
  );
}
