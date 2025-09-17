import { Button, clamp, Overlay, Stack } from '@zigurous/forge-react';
import React, { useState } from 'react';
import EquipmentInventory from './EquipmentInventory';
import ItemInventory from './ItemInventory';
import WikiLink from './WikiLink';
import { useEquipmentContext, useItemsContext } from '../context';
import type { EquipmentSlots, InventorySlots, RecommendedSetup } from '../types'; // prettier-ignore

interface RecommendedSetupModalProps {
  onRequestClose?: () => void;
  setup: RecommendedSetup;
}

export default function RecommendedSetupModal({
  onRequestClose,
  setup,
}: RecommendedSetupModalProps) {
  const [loadoutIndex, setLoadoutIndex] = useState(0);
  const equipmentContext = useEquipmentContext();
  const itemsContext = useItemsContext();
  const currentLoadout =
    setup.loadouts.length > 0
      ? setup.loadouts[clamp(loadoutIndex, 0, setup.loadouts.length - 1)]
      : null;
  return (
    <Overlay
      animated={false}
      className="modal modal--md"
      closeOnScrimClick
      dialogClassName="modal__dialog"
      dialogZIndex="modal"
      id="recommended-setup"
      onRequestClose={onRequestClose}
      open={setup.loadouts.length > 0}
    >
      <div className="modal__content">
        <div className="modal__header">
          <Stack align="center">
            <h1 className="modal__title title-sm">
              {setup.title || 'Recommended Setup'}
            </h1>
            <WikiLink
              className="btn btn--default btn--rounded btn--solid btn--xs ml-lg"
              wikiId={setup.strategiesLinkId || `${setup.id}/Strategies`}
            >
              View Strategies
            </WikiLink>
          </Stack>
          <Button
            aria-label="Close"
            className="modal__close-button"
            icon="close"
            iconAlignment="only"
            iconProps={{ color: '', size: 'md' }}
            onClick={onRequestClose}
            size="lg"
            variant="text"
          />
        </div>
        <Stack
          align="center"
          className="modal__body"
          justify={setup.loadouts.length > 1 ? 'between' : 'center'}
          role="document"
        >
          {setup.loadouts.length > 1 && (
            <Button
              className={loadoutIndex <= 0 ? 'invisible' : undefined}
              disabled={loadoutIndex <= 0}
              icon="chevron_left"
              iconAlignment="only"
              iconProps={{ size: 'lg' }}
              onClick={() => setLoadoutIndex(index => index - 1)}
              size="lg"
            />
          )}
          <Stack align="center" justify="center" spacing="2xxl">
            <EquipmentInventory
              slots={currentLoadout?.equipment.reduce((slots, equipment) => {
                slots[equipment.slot] = equipmentContext.getItemById(
                  equipment.item,
                );
                return slots;
              }, {} as EquipmentSlots)}
            />
            <ItemInventory
              slots={currentLoadout?.inventory.reduce((inventory, el) => {
                inventory[el.slot] = itemsContext.getItemById(el.item);
                return inventory;
              }, {} as InventorySlots)}
            />
          </Stack>
          {setup.loadouts.length > 1 && (
            <Button
              className={
                loadoutIndex >= setup.loadouts.length - 1
                  ? 'invisible'
                  : undefined
              }
              disabled={loadoutIndex >= setup.loadouts.length - 1}
              icon="chevron_right"
              iconAlignment="only"
              iconProps={{ size: 'lg' }}
              onClick={() => setLoadoutIndex(index => index + 1)}
              size="lg"
            />
          )}
        </Stack>
      </div>
    </Overlay>
  );
}
