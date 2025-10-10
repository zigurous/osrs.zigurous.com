import { itemId } from './ids';
import type {
  EquipmentSlotId,
  InventorySetupsExport,
  InventorySetupsItem,
  InventorySetupsItemList,
  RecommendedSetup,
  RecommendedSetupLoadout,
  Spellbook,
} from '../types';

const defaultAmmoQuantity = 5000;
const defaultRuneQuantity = 10000;

export async function createExport(
  setup: RecommendedSetup,
  loadout: RecommendedSetupLoadout,
): Promise<InventorySetupsExport> {
  const layout = Array.from({ length: 56 }).fill(-1) as number[];

  // create equipment data
  const eq = Array.from({ length: 14 }).fill(null) as InventorySetupsItemList;
  loadout.equipment.forEach(el => {
    const id = itemId[el.item];
    const data: InventorySetupsItem = { id };
    if (fuzzy.includes(el.item)) data.f = true;
    if (el.slot === 'ammo' && !el.item.includes('blessing')) {
      data.q = defaultAmmoQuantity;
    }
    eq[slotIndex[el.slot]] = data;
  });
  let layoutIndex = 0;
  eq.forEach(item => {
    if (item && item.id !== -1) {
      layout[eqLayoutOrder[layoutIndex++]] = item.id;
    }
  });

  // create inventory data
  let pouchSize = 3;
  layoutIndex = 0;
  const inv = Array.from({ length: 28 }).fill(null) as InventorySetupsItemList;
  loadout.inventory.forEach(el => {
    const id = itemId[el.item];
    const data: InventorySetupsItem = { id };
    if (fuzzy.includes(el.item)) data.f = true;
    inv[el.slot - 1] = data;
    layout[invLayoutOrder[layoutIndex++]] = id;
    if (el.item === 'Divine_rune_pouch') {
      pouchSize = 4;
    }
  });

  // create rune pouch data
  const rp = Array.from({ length: pouchSize }).fill(
    null,
  ) as InventorySetupsItemList;
  loadout.runePouch?.forEach((item, index) => {
    const id = itemId[item];
    rp[index] = { id, q: defaultRuneQuantity };
    layout[invLayoutOrder[layoutIndex++]] = id;
  });

  // free up empty slots from the end of the layout array
  while (layout[layout.length - 1] === -1) {
    layout.splice(layout.length - 1, 1);
  }

  const _export: InventorySetupsExport = {
    setup: {
      inv,
      eq,
      rp,
      qv: [null],
      name: loadout.title
        ? `${setup.title} (${loadout.title.replace(' Setup', '')})`
        : setup.title,
      notes: `https://oldschool.runescape.wiki/w/${setup.id}`,
      hc: '#80808080',
      fb: true,
      sb: loadout.spellbook ? spellbookIndex[loadout.spellbook] : 0,
    },
    layout,
  };

  try {
    const json = JSON.stringify(_export);
    await navigator.clipboard.writeText(json);
    alert('Setup data was copied to clipboard.');
  } catch (err) {
    console.log('Failed to export setup: ', err);
  }

  return _export;
}

// export function collectIds(items: string[]): Record<string, number> {
//   const record: Record<string, number> = {};
//   items.forEach(id => {
//     record[id] = findMatchingId(id) || itemId[id] || -1;
//     if (record[id] === -1) {
//       console.log(encode(id));
//     }
//   });
//   return record;
// }

// function findMatchingId(id: string): number {
//   id = encode(id);
//   const search = (str: string): number => {
//     let start = itemTableHTML.indexOf(`/${str}"`);
//     if (start !== -1) {
//       start = itemTableHTML.indexOf('id=', start) + 3;
//       const end = itemTableHTML.indexOf('"', start);
//       return Number.parseInt(itemTableHTML.substring(start, end));
//     }
//     return 0;
//   };
//   return (
//     search(id) ||
//     search(`${id}#Active`) ||
//     search(`${id}#Charged`) ||
//     search(`${id}#Closed`) ||
//     search(`${id}#Emir's_Arena`) ||
//     search(`${id}#Equipable`) ||
//     search(`${id}#Full`) ||
//     search(`${id}#Lit`) ||
//     search(`${id}#New`) ||
//     search(`${id}#Normal`) ||
//     search(`${id}#Recoil`) ||
//     search(`${id}#Restored`) ||
//     search(`${id}#(unp)`) ||
//     search(`${id}#(8)`) ||
//     search(`${id}#(4)`) ||
//     search(`${id}#4_dose`) ||
//     search(`${id}#2_dose`) ||
//     search(`${id}#100`) ||
//     search(`${id}#8`)
//   );
// }

// function encode(str: string): string {
//   return escape(str)
//     .replace('%28', '(')
//     .replace('%29', ')')
//     .replaceAll('+', '%2B');
// }

const eqLayoutOrder = [0, 8, 1, 9, 2, 10, 3, 11, 4, 12, 5, 13, 6, 14, 7];
const invLayoutOrder = [
  16, 24, 17, 25, 18, 26, 19, 27, 20, 28, 21, 29, 22, 30, 23, 31, 32, 40, 33,
  41, 34, 42, 35, 43, 36, 44, 37, 45, 38, 46, 39, 47,
];

const slotIndex: Record<EquipmentSlotId, number> = {
  head: 0,
  cape: 1,
  neck: 2,
  weapon: 3,
  body: 4,
  shield: 5,
  legs: 7,
  hands: 9,
  feet: 10,
  ring: 12,
  ammo: 13,
};

const spellbookIndex: Record<Spellbook, number> = {
  Standard: 0,
  Ancient: 1,
  Lunar: 2,
  Arceuus: 3,
};

const fuzzy: string[] = [
  "Ahrim's_hood",
  "Ahrim's_robebottom",
  "Ahrim's_robetop",
  "Ahrim's_staff",
  'Ardougne_cloak_1',
  'Ardougne_cloak_2',
  'Ardougne_cloak_3',
  'Ardougne_cloak_4',
  'Black_mask_(i)',
  'Bow_of_faerdhinen',
  'Crystal_body',
  'Crystal_helm',
  'Crystal_legs',
  "Dharok's_greataxe",
  "Dharok's_helm",
  "Dharok's_platebody",
  "Dharok's_platelegs",
  'Fremennik_sea_boots_1',
  'Fremennik_sea_boots_2',
  'Fremennik_sea_boots_3',
  'Fremennik_sea_boots_4',
  "Ghommal's_hilt_1",
  "Ghommal's_hilt_2",
  "Ghommal's_hilt_3",
  "Ghommal's_hilt_4",
  "Ghommal's_hilt_5",
  "Ghommal's_hilt_6",
  "Guthan's_chainskirt",
  "Guthan's_helm",
  "Guthan's_platebody",
  "Guthan's_warspear",
  "Iban's_staff_(u)",
  'Infernal_cape',
  "Karil's_coif",
  "Karil's_crossbow",
  "Karil's_leatherskirt",
  "Karil's_leathertop",
  "Rada's_blessing_1",
  "Rada's_blessing_2",
  "Rada's_blessing_3",
  "Rada's_blessing_4",
  'Ring_of_suffering_(i)',
  "Verac's_brassard",
  "Verac's_flail",
  "Verac's_helm",
  "Verac's_plateskirt",
  'Wilderness_sword_1',
  'Wilderness_sword_2',
  'Wilderness_sword_3',
  'Wilderness_sword_4',
];
