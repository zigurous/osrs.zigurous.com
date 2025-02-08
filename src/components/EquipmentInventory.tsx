import React from 'react';
import ItemFrame from './ItemFrame';
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
      <ItemFrame item={item} disableHighlight />
    </div>
  );
}

function getItemInSlot(
  slots: EquipmentSlot[],
  slotId: string,
): EquipmentItem | undefined {
  return slots.find(slot => slot.id === slotId)?.item;
}
