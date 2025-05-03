import React from 'react';
import ItemFrame from './ItemFrame';
import icon2h from '../images/equipment-slot-2h.png';
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
import type { EquipmentItem, EquipmentSlot } from '../types';
import '../styles/equipment-inventory.css';

interface EquipmentInventoryProps {
  slots: EquipmentSlot[];
}

export default function EquipmentInventory({ slots }: EquipmentInventoryProps) {
  const weapon = getItemInSlot(slots, 'weapon');
  const shield = weapon?.tags?.includes('2h')
    ? undefined
    : getItemInSlot(slots, 'shield');
  const ammo = weapon?.ammo ?? getItemInSlot(slots, 'ammo');
  return (
    <div className="equipment-inventory">
      <div aria-hidden />
      <Slot id="head" item={getItemInSlot(slots, 'head')} />
      <div aria-hidden />
      <Slot id="cape" item={getItemInSlot(slots, 'cape')} />
      <Slot id="neck" item={getItemInSlot(slots, 'neck')} />
      <Slot id="ammo" item={ammo} />
      <Slot id="weapon" item={weapon} />
      <Slot id="body" item={getItemInSlot(slots, 'body')} />
      <Slot id="shield" item={shield} />
      <div aria-hidden />
      <Slot id="legs" item={getItemInSlot(slots, 'legs')} />
      <div aria-hidden />
      <Slot id="hands" item={getItemInSlot(slots, 'hands')} />
      <Slot id="feet" item={getItemInSlot(slots, 'feet')} />
      <Slot id="ring" item={getItemInSlot(slots, 'ring')} />
    </div>
  );
}

function Slot({ id, item }: EquipmentSlot) {
  return (
    <div className="equipment-inventory__slot" id={id}>
      <ItemFrame
        item={item || { id: '#equipmentslot', icon: equipmentSlotIcons[id] }}
        disableHighlight
      />
    </div>
  );
}

function getItemInSlot(
  slots: EquipmentSlot[],
  slotId: string,
): EquipmentItem | undefined {
  return slots.find(slot => slot.id === slotId)?.item;
}

const equipmentSlotIcons: Record<string, string> = {
  ['2h']: icon2h,
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
