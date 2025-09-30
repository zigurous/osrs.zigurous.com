import { Button, Overlay, Stack } from '@zigurous/forge-react'; // prettier-ignore
import React from 'react';
import { formatNameFromId } from '../utils';
import type { GridMasterTask } from '../types'; // prettier-ignore

interface GridMasterTaskModalProps {
  onRequestClose: () => void;
  open: boolean;
  scale?: number;
  task: GridMasterTask;
}

export default function GridMasterTaskModal({
  onRequestClose,
  open = false,
  scale,
  task,
}: GridMasterTaskModalProps) {
  return (
    <Overlay
      className="modal modal--md"
      closeOnScrimClick
      dialogClassName="modal__dialog"
      dialogZIndex="modal"
      id="grid-master"
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
              {task.title || formatNameFromId(task.id)}
            </h1>
            {/* <Text className="ml-md" color="muted" type="body-sm" weight="400">
              {task.description}
            </Text> */}
          </Stack>
          <Stack align="center">
            {/* <WikiLink
              className="btn btn--default btn--rounded btn--solid btn--xs mr-md"
              wikiId={setup.strategiesLinkId || `${setup.id}/Strategies`}
            >
              View Strategies
            </WikiLink> */}
            <Button
              aria-label="Close"
              icon="close"
              iconAlignment="only"
              iconProps={{ color: '', size: 'md' }}
              onClick={onRequestClose}
              size="md"
              variant="text"
            />
          </Stack>
        </div>
        <Stack
          align="center"
          className="modal__body"
          justify="between"
          role="document"
        >
          <div />
          <div />
        </Stack>
      </div>
    </Overlay>
  );
}
