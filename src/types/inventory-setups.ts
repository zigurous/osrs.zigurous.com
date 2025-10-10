export interface InventorySetupsExport {
  setup: {
    name: string;
    notes: string;
    hc: string; // hexcode
    fb: boolean; // ???
    sb: number; // spellbook: 0=standard, 1=ancient, 2=lunar, 3=arceuus
    inv: InventorySetupsItemList; // inventory
    eq: InventorySetupsItemList; // equipment
    rp?: InventorySetupsItemList; // rune pouch
    qv?: InventorySetupsItemList; // quiver
    afi?: InventorySetupsItemList; // additional filtered items
  };
  layout: number[];
}

export type InventorySetupsItemList = (InventorySetupsItem | null)[];

export interface InventorySetupsItem {
  id: number;
  q?: number; // quantity
  f?: boolean; // fuzzy
}
