import '../styles/equipment-inventory.css';
import classNames from 'classnames';
import React from 'react';
import ItemFrame from './ItemFrame';
import iconAmmo from '../images/equipment-slot-ammo.png';
import iconBody from '../images/equipment-slot-body.png';
import iconCape from '../images/equipment-slot-cape.png';
import iconFeet from '../images/equipment-slot-feet.png';
import iconHands from '../images/equipment-slot-hands.png';
import iconHead from '../images/equipment-slot-head.png';
import iconLegs from '../images/equipment-slot-legs.png';
import iconNeck from '../images/equipment-slot-neck.png';
import iconRing from '../images/equipment-slot-ring.png';
import iconShield from '../images/equipment-slot-shield.png';
import iconWeapon from '../images/equipment-slot-weapon.png';
import { useEquipmentContext } from '../context/EquipmentContext';
import type { ItemHighlightOptions } from '../types/item';
import type { EquipmentItem, EquipmentSlot, EquipmentSlotId, EquippedItemIds, EquippedItems } from '../types/equipment'; // prettier-ignore

interface EquipmentInventoryProps {
  className?: string;
  highlights?: ItemHighlightOptions;
  items?: EquippedItems | EquippedItemIds;
}

export default function EquipmentInventory({
  className,
  highlights,
  items = {},
}: EquipmentInventoryProps) {
  const equipment = useEquipment(items);
  return (
    <div className={classNames('equipment-inventory', className)}>
      {slots.map((slot, index) =>
        slot ? (
          <EquipmentInventorySlot
            key={slot}
            id={slot}
            item={equipment[slot]}
            highlights={highlights}
          />
        ) : (
          <div aria-hidden key={`null-${index}`} />
        ),
      )}
    </div>
  );
}

function EquipmentInventorySlot({ id, item, highlights }: EquipmentSlot) {
  if (item && item.id.includes('#equipmentslot')) {
    item.icon = icons[id];
  }
  return (
    <div className="equipment-inventory__slot" id={id}>
      <ItemFrame
        highlights={highlights}
        item={
          item || {
            id: '#equipmentslot',
            icon: icons[id],
            name: id,
          }
        }
      />
    </div>
  );
}

function useEquipment(
  items: EquippedItems | EquippedItemIds,
): Record<EquipmentSlotId, EquipmentItem | undefined> {
  const { getItemData } = useEquipmentContext();
  const weapon = getItemData(items.weapon, 'weapon');
  const ammo = weapon?.ammo ?? getItemData(items.ammo, 'ammo');
  const shield = weapon?.tags?.includes('2h')
    ? undefined
    : getItemData(items.shield, 'shield');
  return {
    ammo,
    body: getItemData(items.body, 'body'),
    cape: getItemData(items.cape, 'cape'),
    feet: getItemData(items.feet, 'feet'),
    hands: getItemData(items.hands, 'hands'),
    head: getItemData(items.head, 'head'),
    legs: getItemData(items.legs, 'legs'),
    neck: getItemData(items.neck, 'neck'),
    ring: getItemData(items.ring, 'ring'),
    shield,
    weapon,
  };
}

const slots: (EquipmentSlotId | null)[] = [
  null,
  'head',
  null,
  'cape',
  'neck',
  'ammo',
  'weapon',
  'body',
  'shield',
  null,
  'legs',
  null,
  'hands',
  'feet',
  'ring',
];

const icons: Record<EquipmentSlotId, string> = {
  ammo: iconAmmo,
  body: iconBody,
  cape: iconCape,
  feet: iconFeet,
  hands: iconHands,
  head: iconHead,
  legs: iconLegs,
  neck: iconNeck,
  ring: iconRing,
  shield: iconShield,
  weapon: iconWeapon,
};
