import '../styles/recommended-setup.css';
import { Button, clamp, Overlay, ReactPortal, Stack, Text, useKeyboardEvent } from '@zigurous/forge-react'; // prettier-ignore
import React, { useCallback, useEffect, useState } from 'react';
import EquipmentInventory from './EquipmentInventory';
import ItemInventory from './ItemInventory';
import WikiIcon from './WikiIcon';
import WikiLink from './WikiLink';
import type { EquippedItemIds, InventoryIds, RecommendedSetup } from '../types'; // prettier-ignore

const emptySetup: RecommendedSetup = {
  id: 'empty',
  title: '',
  loadouts: [],
};

interface RecommendedSetupModalProps {
  onRequestClose?: () => void;
  scale?: number;
  setup?: RecommendedSetup;
}

export default function RecommendedSetupModal({
  onRequestClose,
  scale,
  setup = emptySetup,
}: RecommendedSetupModalProps) {
  const [loadoutIndex, setLoadoutIndex] = useState(0);
  const currentLoadout =
    setup.loadouts.length > 0
      ? setup.loadouts[clamp(loadoutIndex, 0, setup.loadouts.length - 1)]
      : null;

  useEffect(() => {
    setLoadoutIndex(0);
  }, [setup.id]);

  const previousLoadout = useCallback(() => {
    setLoadoutIndex(index => Math.max(index - 1, 0));
  }, []);

  const nextLoadout = useCallback(() => {
    setLoadoutIndex(index => Math.min(index + 1, setup.loadouts.length - 1));
  }, [setup.loadouts.length]);

  useKeyboardEvent('ArrowLeft', previousLoadout, true);
  useKeyboardEvent('ArrowRight', nextLoadout, true);

  return (
    <Overlay
      className="modal modal--md"
      closeOnScrimClick
      dialogClassName="modal__dialog"
      dialogZIndex="modal"
      id="recommended-setup"
      onRequestClose={onRequestClose}
      open={setup.loadouts.length > 0}
    >
      <div
        className="modal__content"
        style={{ transform: scale ? `scale(${scale})` : undefined }}
      >
        <div className="modal__header">
          <Stack align="baseline">
            <h1 className="modal__title title-sm">
              {setup.title || 'Recommended Setup'}
            </h1>
            {currentLoadout?.title && (
              <Text className="ml-md" color="muted" type="body-sm" weight="400">
                {currentLoadout.title}
              </Text>
            )}
          </Stack>
          <div>
            <WikiLink
              className="btn btn--default btn--rounded btn--solid btn--xs mr-md"
              wikiId={setup.strategiesLinkId || `${setup.id}/Strategies`}
            >
              View Strategies
            </WikiLink>
            <Button
              aria-label="Close"
              className="modal__close-button"
              icon="close"
              iconAlignment="only"
              iconProps={{ color: '', size: 'md' }}
              onClick={onRequestClose}
              size="md"
              variant="text"
            />
          </div>
        </div>
        <Stack
          align="center"
          className="modal__body"
          justify={setup.loadouts.length > 1 ? 'between' : 'center'}
          role="document"
        >
          {setup.loadouts.length > 1 && (
            <Button
              disabled={loadoutIndex <= 0}
              icon="chevron_left"
              iconAlignment="only"
              iconProps={{ size: 'lg' }}
              id="previous-loadout"
              onClick={previousLoadout}
              size="lg"
            />
          )}
          <Stack align="center" justify="center" spacing="2xxl">
            <EquipmentInventory
              items={currentLoadout?.equipment.reduce((slots, equipment) => {
                slots[equipment.slot] = equipment.item;
                return slots;
              }, {} as EquippedItemIds)}
            />
            <ItemInventory
              items={currentLoadout?.inventory.reduce((inventory, el) => {
                inventory[el.slot] = el.item;
                return inventory;
              }, {} as InventoryIds)}
              runePouch={currentLoadout?.runePouch}
            />
          </Stack>
          {setup.loadouts.length > 1 && (
            <Button
              disabled={loadoutIndex >= setup.loadouts.length - 1}
              icon="chevron_right"
              iconAlignment="only"
              iconProps={{ size: 'lg' }}
              id="next-loadout"
              onClick={nextLoadout}
              size="lg"
            />
          )}
        </Stack>
      </div>
      {currentLoadout?.spell && (
        <ReactPortal rootElement=".modal#recommended-setup .item-frame[id*=Rune_pouch i]">
          <WikiIcon
            className="recommended-setup__spell"
            icon={currentLoadout.spell}
            size={16}
          />
        </ReactPortal>
      )}
    </Overlay>
  );
}
