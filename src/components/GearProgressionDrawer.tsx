import { Button, Drawer, Input } from '@zigurous/forge-react';
import React, { useState } from 'react';
import { useItemsContext } from '../context/ItemsContext';
import { useSettingsContext } from '../context/SettingsContext';
import { importData } from '../utils/plugin-bank-memory';

export default function GearProgressionDrawer() {
  const [bankMemory, setBankMemory] = useState<string>();
  const settings = useSettingsContext();
  const { setOwnedItems } = useItemsContext();
  return (
    <Drawer
      anchor="right"
      open={settings.open}
      onRequestClose={() => settings.set('open', false)}
      size="lg"
    >
      <div className="p-xl">
        <form
          id="bank-memory-import"
          onSubmit={e => {
            e.preventDefault();
            if (bankMemory) {
              setOwnedItems(importData(bankMemory));
            }
            return false;
          }}
        >
          <Input
            onPaste={e => setBankMemory(e.clipboardData.getData('text'))}
            placeholder="Paste data here"
            required
            type="text"
          />
          <Button className="ml-md" type="submit">
            Import
          </Button>
        </form>
      </div>
    </Drawer>
  );
}
