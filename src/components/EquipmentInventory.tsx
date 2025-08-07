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
import type { EquipmentSlot, EquipmentSlots, EquipmentSlotId } from '../types';

interface EquipmentInventoryProps {
  className?: string;
  slots?: EquipmentSlots;
}

export default function EquipmentInventory({
  className,
  slots = {},
}: EquipmentInventoryProps) {
  const weapon = slots['weapon'];
  const shield = weapon?.tags?.includes('2h') ? undefined : slots['shield'];
  const ammo = weapon?.ammo ?? slots['ammo'];
  return (
    <div className={classNames('equipment-inventory', className)}>
      <div aria-hidden />
      <ItemSlot id="head" item={slots['head']} />
      <div aria-hidden />
      <ItemSlot id="cape" item={slots['cape']} />
      <ItemSlot id="neck" item={slots['neck']} />
      <ItemSlot id="ammo" item={ammo} />
      <ItemSlot id="weapon" item={weapon} />
      <ItemSlot id="body" item={slots['body']} />
      <ItemSlot id="shield" item={shield} />
      <div aria-hidden />
      <ItemSlot id="legs" item={slots['legs']} />
      <div aria-hidden />
      <ItemSlot id="hands" item={slots['hands']} />
      <ItemSlot id="feet" item={slots['feet']} />
      <ItemSlot id="ring" item={slots['ring']} />
    </div>
  );
}

function ItemSlot({ id, item }: EquipmentSlot) {
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
