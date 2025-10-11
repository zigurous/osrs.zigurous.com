import '../styles/recommended-setup.css';
import { Button, clamp, nativeKeyboardEventHandler as keyEventHandler, Overlay, ReactPortal, Stack, Text, TooltipWrapper } from '@zigurous/forge-react'; // prettier-ignore
import React, { useCallback, useEffect, useState } from 'react';
import EquipmentInventory from './EquipmentInventory';
import ItemInventory from './ItemInventory';
import WikiIcon from './WikiIcon';
import WikiLink from './WikiLink';
import { createExport } from '../utils/inventory-setups-export';
import type { EquippedItemIds } from '../types/equipment';
import type { InventoryIds } from '../types/inventory';
import type { RecommendedSetup } from '../types/recommended-setup';

interface RecommendedSetupModalProps {
  onRequestClose: () => void;
  open: boolean;
  scale?: number;
  setup: RecommendedSetup;
}

export default function RecommendedSetupModal({
  onRequestClose,
  open = false,
  scale,
  setup,
}: RecommendedSetupModalProps) {
  const [loadoutIndex, setLoadoutIndex] = useState(0);
  const currentLoadout =
    setup.loadouts.length > 0
      ? setup.loadouts[clamp(loadoutIndex, 0, setup.loadouts.length - 1)]
      : null;

  const previousLoadout = useCallback(() => {
    setLoadoutIndex(index => Math.max(index - 1, 0));
  }, []);

  const nextLoadout = useCallback(() => {
    setLoadoutIndex(index => Math.min(index + 1, setup.loadouts.length - 1));
  }, [setup.loadouts.length]);

  useEffect(() => {
    setLoadoutIndex(0);
  }, [setup.id]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (setup.loadouts.length <= 1) return;
    const prev = keyEventHandler('ArrowLeft', previousLoadout, true);
    const next = keyEventHandler('ArrowRight', nextLoadout, true);
    window.addEventListener('keydown', prev);
    window.addEventListener('keydown', next);
    return () => {
      window.removeEventListener('keydown', prev);
      window.removeEventListener('keydown', next);
    };
  }, [setup.loadouts.length, previousLoadout, nextLoadout]);

  return (
    <Overlay
      className="modal modal--md"
      closeOnScrimClick
      dialogClassName="modal__dialog"
      dialogZIndex="modal"
      id="recommended-setup"
      onRequestClose={onRequestClose}
      open={open}
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
            {currentLoadout && (
              <TooltipWrapper
                className="inline-block mr-sm"
                tooltip="Export Setup"
              >
                <Button
                  aria-label="Export Setup"
                  icon="ios_share"
                  iconAlignment="only"
                  iconProps={{ color: '', size: 'sm' }}
                  onClick={() => createExport(setup, currentLoadout)}
                  size="sm"
                  variant="text"
                />
              </TooltipWrapper>
            )}
            <WikiLink
              className="btn btn--default btn--rounded btn--solid btn--xs mr-md"
              wikiId={setup.strategiesLinkId || `${setup.id}/Strategies`}
            >
              View Strategies
            </WikiLink>
            <Button
              aria-label="Close"
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
