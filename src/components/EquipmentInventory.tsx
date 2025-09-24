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
import { useEquipmentContext } from '../context';
import type { EquipmentSlot, EquipmentSlotId, EquippedItemIds, EquippedItems } from '../types'; // prettier-ignore

interface EquipmentInventoryProps {
  className?: string;
  items?: EquippedItems | EquippedItemIds;
}

export default function EquipmentInventory({
  className,
  items = {},
}: EquipmentInventoryProps) {
  const { getItemData } = useEquipmentContext();
  const weapon = getItemData(items.weapon);
  const ammo = getItemData(items.ammo) ?? weapon?.ammo;
  const shield = weapon?.tags?.includes('2h')
    ? undefined
    : getItemData(items.shield);
  return (
    <div className={classNames('equipment-inventory', className)}>
      <div aria-hidden />
      <EquipmentInventorySlot id="head" item={getItemData(items.head)} />
      <div aria-hidden />
      <EquipmentInventorySlot id="cape" item={getItemData(items.cape)} />
      <EquipmentInventorySlot id="neck" item={getItemData(items.neck)} />
      <EquipmentInventorySlot id="ammo" item={ammo} />
      <EquipmentInventorySlot id="weapon" item={weapon} />
      <EquipmentInventorySlot id="body" item={getItemData(items.body)} />
      <EquipmentInventorySlot id="shield" item={shield} />
      <div aria-hidden />
      <EquipmentInventorySlot id="legs" item={getItemData(items.legs)} />
      <div aria-hidden />
      <EquipmentInventorySlot id="hands" item={getItemData(items.hands)} />
      <EquipmentInventorySlot id="feet" item={getItemData(items.feet)} />
      <EquipmentInventorySlot id="ring" item={getItemData(items.ring)} />
    </div>
  );
}

function EquipmentInventorySlot({ id, item }: EquipmentSlot) {
  return (
    <div className="equipment-inventory__slot" id={id}>
      <ItemFrame
        highlights={['upgrade']}
        item={
          item || {
            id: '#equipmentslot',
            icon: equipmentSlotIcons[id],
            name: id,
          }
        }
      />
    </div>
  );
}

const equipmentSlotIcons: Record<EquipmentSlotId, string> = {
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
