export function importData(data: string): Set<string> | null {
  if (!data) return null;
  const rows = data.split(/\r?\n/);
  const items: string[] = [];
  for (let i = 1; i < rows.length; i++) {
    const fields = rows[i].split('\t');
    if (fields.length >= 2) {
      items.push(
        ...getItemsForId(
          fields[1].replaceAll(' ', '_').replace('_(Members)', ''),
        ),
      );
    }
  }
  for (let i = 0; i < sets.length; i++) {
    const setItems = sets[i][0];
    let fullSet = true;
    for (let j = 0; j < setItems.length; j++) {
      if (!items.includes(setItems[j])) {
        fullSet = false;
        break;
      }
    }
    if (fullSet) {
      items.push(sets[i][1]);
    }
  }
  return new Set(items.sort());
}

function getItemsForId(id: string): string[] {
  const items = [id];
  for (let i = 0; i < variants.length; i++) {
    const modifier = variants[i][0];
    if (id.endsWith(modifier)) {
      variants[i][1].forEach(replacement => {
        let variant = id.replace(modifier, replacement);
        if (variant.endsWith('_'))
          variant = variant.substring(0, variant.length - 1);
        items.push(variant);
      });
      break;
    }
  }
  for (let i = items.length - 1; i >= 0; i--) {
    const override = overrides[items[i]];
    if (override) {
      items.push(override);
    }
  }
  return items;
}

// prettier-ignore
const variants: [string, string[]][] = [
  ['_0', ['']],
  ['_1', ['']],
  ['_2', ['_1', '']],
  ['_3', ['_2', '_1', '']],
  ['_4', ['_3', '_2', '_1', '']],
  ['_25', ['']],
  ['_50', ['']],
  ['_75', ['']],
  ['_100', ['']],
  ['(1)', ['']],
  ['(2)', ['']],
  ['(3)', ['']],
  ['(4)', ['']],
  ['(5)', ['']],
  ['(6)', ['']],
  ['(7)', ['']],
  ['(8)', ['']],
  ['(a)', ['']],
  ['(c)', ['']],
  ['(combat)', ['']],
  ['(cr)', ['']],
  ['(dark)', ['']],
  ['(deadman)', ['']],
  ['(disease)', ['']],
  ['(dusk)', ['']],
  ['(e)', ['']],
  ['(ei)', ['(e)', '']],
  ['(empty)', ['']],
  ['(eternal)', ['']],
  ['(f)', ['']],
  ['(full)', ['']],
  ['(g)', ['']],
  ['(i)', ['']],
  ['(l)', ['']],
  ['(lit)', ['']],
  ['(light)', ['']],
  ['(o)', ['']],
  ['(off-hand)', ['']],
  ['(or)', ['']],
  ['(p)', ['']],
  ['(p+)', ['(p)', '']],
  ['(p++)', ['(p+)', '(p)', '']],
  ['(poison)', ['']],
  ['(r)', ['']],
  ['(ri)', ['(r)', '(i)', '']],
  ['(s)', ['']],
  ['(t)', ['']],
  ['(u)', ['']],
  ['(uncharged)', ['']],
  ['(upgraded)', ['']],
  ['Damaged_book', ['Damaged_book_(Ancient)', 'Damaged_book_(Armadyl)', 'Damaged_book_(Bandos)', 'Damaged_book_(Guthix)', 'Damaged_book_(Saradomin)', 'Damaged_book_(Zamorak)']],
];

// prettier-ignore
const overrides: Partial<Record<string, string>> = {
  "Amulet_of_blood_fury": 'Amulet_of_fury',
  "Ancient_bracers": 'Blessed_bracers',
  "Ancient_chaps": 'Blessed_chaps',
  "Ancient_coif": 'Blessed_coif',
  "Ancient_d'hide_body": 'Blessed_body',
  "Ancient_d'hide_boots": "Blessed_boots",
  "Ancient_d'hide_shield": 'Blessed_shield',
  "Araxyte_slayer_helmet_(i)": 'Slayer_helmet_(i)',
  "Araxyte_slayer_helmet": 'Slayer_helmet',
  "Armadyl_bracers": 'Blessed_bracers',
  "Armadyl_chaps": 'Blessed_chaps',
  "Armadyl_coif": 'Blessed_coif',
  "Armadyl_d'hide_body": 'Blessed_body',
  "Armadyl_d'hide_boots": "Blessed_boots",
  "Armadyl_d'hide_shield": 'Blessed_shield',
  "Bandos_bracers": 'Blessed_bracers',
  "Bandos_chaps": 'Blessed_chaps',
  "Bandos_coif": 'Blessed_coif',
  "Bandos_d'hide_body": 'Blessed_body',
  "Bandos_d'hide_boots": "Blessed_boots",
  "Bandos_d'hide_shield": 'Blessed_shield',
  "Black_slayer_helmet_(i)": 'Slayer_helmet_(i)',
  "Black_slayer_helmet": 'Slayer_helmet',
  "Blazing_blowpipe": 'Toxic_blowpipe',
  "Dinh's_blazing_bulwark": "Dinh's_bulwark",
  "Echo_ahrim's_hood": "Ahrim's_hood",
  "Echo_ahrim's_robeskirt": "Ahrim's_robeskirt",
  "Echo_ahrim's_robetop": "Ahrim's_robetop",
  "Echo_ahrim's_staff": "Ahrim's_staff",
  "Echo_venator_bow": 'Venator_bow',
  "Echo_virtus_mask": 'Virtus_mask',
  "Echo_virtus_robe_bottom": 'Virtus_robe_bottom',
  "Echo_virtus_robe_top": 'Virtus_robe_top',
  "Ghommal's_avernic_defender_6": 'Avernic_defender',
  "Green_slayer_helmet_(i)": 'Slayer_helmet_(i)',
  "Green_slayer_helmet": 'Slayer_helmet',
  "Guthix_bracers": 'Blessed_bracers',
  "Guthix_chaps": 'Blessed_chaps',
  "Guthix_coif": 'Blessed_coif',
  "Guthix_d'hide_body": 'Blessed_body',
  "Guthix_d'hide_boots": "Blessed_boots",
  "Guthix_d'hide_shield": 'Blessed_shield',
  "Holy_ghrazi_rapier": 'Ghrazi_rapier',
  "Holy_sanguinesti_staff": 'Sanguinesti_staff',
  "Holy_scythe_of_vitur": 'Scythe_of_vitur',
  "Hydra_slayer_helmet_(i)": 'Slayer_helmet_(i)',
  "Hydra_slayer_helmet": 'Slayer_helmet',
  "Masori_assembler": "Ava's_assembler",
  "Open_coal_bag": 'Coal_bag',
  "Open_fish_barrel": 'Fish_barrel',
  "Open_gem_bag": 'Gem_bag',
  "Open_herb_sack": 'Herb_sack',
  "Open_seed_box": 'Seed_box',
  "Purple_slayer_helmet_(i)": 'Slayer_helmet_(i)',
  "Purple_slayer_helmet": 'Slayer_helmet',
  "Radiant_oathplate_chest": 'Oathplate_chest',
  "Radiant_oathplate_helm": 'Oathplate_helm',
  "Radiant_oathplate_legs": 'Oathplate_legs',
  "Red_slayer_helmet_(i)": 'Slayer_helmet_(i)',
  "Red_slayer_helmet": 'Slayer_helmet',
  "Sanguine_scythe_of_vitur": 'Scythe_of_vitur',
  "Sanguine_torva_full_helm": 'Torva_full_helm',
  "Sanguine_torva_platebody": 'Torva_platebody',
  "Sanguine_torva_platelegs": 'Torva_platelegs',
  "Saradomin_bracers": 'Blessed_bracers',
  "Saradomin_chaps": 'Blessed_chaps',
  "Saradomin_coif": 'Blessed_coif',
  "Saradomin_d'hide_body": 'Blessed_body',
  "Saradomin_d'hide_boots": "Blessed_boots",
  "Saradomin_d'hide_shield": 'Blessed_shield',
  "Turquoise_slayer_helmet_(i)": 'Slayer_helmet_(i)',
  "Turquoise_slayer_helmet": 'Slayer_helmet',
  "Twisted_ancestral_hat": 'Ancestral_hat',
  "Twisted_ancestral_robe_bottom": 'Ancestral_robe_bottom',
  "Twisted_ancestral_robe_top": 'Ancestral_robe_top',
  "Twisted_slayer_helmet_(i)": 'Slayer_helmet_(i)',
  "Twisted_slayer_helmet": 'Slayer_helmet',
  "Tzkal_slayer_helmet_(i)": 'Slayer_helmet_(i)',
  "Tzkal_slayer_helmet": 'Slayer_helmet',
  "Tztok_slayer_helmet_(i)": 'Slayer_helmet_(i)',
  "Tztok_slayer_helmet": 'Slayer_helmet',
  "Vampyric_slayer_helmet_(i)": 'Slayer_helmet_(i)',
  "Vampyric_slayer_helmet": 'Slayer_helmet',
  "Zamorak_bracers": 'Blessed_bracers',
  "Zamorak_chaps": 'Blessed_chaps',
  "Zamorak_coif": 'Blessed_coif',
  "Zamorak_d'hide_body": 'Blessed_body',
  "Zamorak_d'hide_boots": "Blessed_boots",
  "Zamorak_d'hide_shield": 'Blessed_shield',
};

// prettier-ignore
const sets: [string[], string][] = [
  [["Ahrim's_staff", "Ahrim's_hood", "Ahrim's_robetop", "Ahrim's_robeskirt"], "Ahrim's_set"],
  [["Dharok's_greataxe", "Dharok's_helm", "Dharok's_platebody", "Dharok's_platelegs"], "Dharok's_set"],
  [["Guthan's_warspear", "Guthan's_helm", "Guthan's_platebody", "Guthan's_chainskirt"], "Guthan's_set"],
  [["Karil's_crossbow", "Karil's_coif", "Karil's_leathertop", "Karil's_leatherskirt"], "Karil's_set"],
  [["Torag's_hammers", "Torag's_helm", "Torag's_platebody", "Torag's_platelegs"], "Torag's_set"],
  [["Verac's_flail", "Verac's_helm", "Verac's_brassard", "Verac's_plateskirt"], "Verac's_set"],
  [['Dual_macuahuitl', 'Blood_moon_helm', 'Blood_moon_chestplate', 'Blood_moon_tassets'], 'Blood_moon_set'],
  [['Blue_moon_spear', 'Blue_moon_helm', 'Blue_moon_chestplate', 'Blue_moon_tassets'], 'Blue_moon_set'],
  [['Eclipse_atlatl', 'Eclipse_moon_helm', 'Eclipse_moon_chestplate', 'Eclipse_moon_tassets'], 'Eclipse_moon_set'],
  [["Inquisitor's_great_helm", "Inquisitor's_hauberk", "Inquisitor's_plateskirt"], "Inquisitor's_set"],
  [["Justiciar_faceguard", "Justiciar_chestguard", "Justiciar_legguards"], "Justiciar_set"],
  [["Obsidian_helmet", "Obsidian_platebody", "Obsidian_platelegs"], "Obsidian_set"],
  [['Void_mage_helm', 'Void_knight_top', 'Void_knight_robe', 'Void_knight_gloves'], 'Void_mage_set'],
  [['Void_mage_helm', 'Elite_void_top', 'Void_knight_robe', 'Void_knight_gloves'], 'Void_mage_set'],
  [['Void_mage_helm', 'Void_knight_top', 'Elite_void_robe', 'Void_knight_gloves'], 'Void_mage_set'],
  [['Void_mage_helm', 'Elite_void_top', 'Elite_void_robe', 'Void_knight_gloves'], 'Void_mage_set'],
  [['Void_melee_helm', 'Void_knight_top', 'Void_knight_robe', 'Void_knight_gloves'], 'Void_melee_set'],
  [['Void_melee_helm', 'Elite_void_top', 'Void_knight_robe', 'Void_knight_gloves'], 'Void_melee_set'],
  [['Void_melee_helm', 'Void_knight_top', 'Elite_void_robe', 'Void_knight_gloves'], 'Void_melee_set'],
  [['Void_melee_helm', 'Elite_void_top', 'Elite_void_robe', 'Void_knight_gloves'], 'Void_melee_set'],
  [['Void_ranger_helm', 'Void_knight_top', 'Void_knight_robe', 'Void_knight_gloves'], 'Void_ranger_set'],
  [['Void_mage_helm', 'Elite_void_top', 'Elite_void_robe', 'Void_knight_gloves'], 'Elite_void_mage_set'],
  [['Void_melee_helm', 'Elite_void_top', 'Elite_void_robe', 'Void_knight_gloves'], 'Elite_void_melee_set'],
  [['Void_ranger_helm', 'Elite_void_top', 'Elite_void_robe', 'Void_knight_gloves'], 'Elite_void_ranger_set'],
];
