import { Stack } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';
import EquipmentInventory from './EquipmentInventory';
import IconToggle from './IconToggle';
import TitledCard from './TitledCard';
import { useSettingsContext } from '../context';
import type { EquipmentCategory, EquipmentSlots } from '../types'; // prettier-ignore

interface EquipmentCardProps {
  category: EquipmentCategory;
  children?: React.ReactNode;
  className?: string;
  equipment?: EquipmentSlots;
  style?: React.CSSProperties;
}

export default function EquipmentCard({
  category,
  children,
  className,
  equipment,
  style,
}: EquipmentCardProps) {
  const settings = useSettingsContext();
  const { [category.subcategoryKey]: subcategoryId } = settings;
  return (
    <TitledCard
      captionIcon={
        category.subcategories && (
          <Stack
            inline
            className="h-0"
            align="center"
            justify="end"
            spacing="xxs"
          >
            {category.subcategories.map(subcategory => (
              <IconToggle
                icon={subcategory.icon}
                key={subcategory.id}
                label={subcategory.label}
                on={subcategoryId === subcategory.id}
                onChange={on =>
                  settings.set(
                    category.subcategoryKey,
                    on ? subcategory.id : undefined,
                  )
                }
              />
            ))}
          </Stack>
        )
      }
      className={classNames('overflow-hidden', className)}
      style={style}
      title={category.title}
      titleIcon={category.icon}
    >
      <EquipmentInventory slots={equipment} />
      {children}
    </TitledCard>
  );
}
