import { CreateSchemaCustomizationArgs } from 'gatsby';

export const createSchemaCustomization = ({
  actions,
  schema,
}: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions;
  const typeDefs = `
    type BestInSlotJson implements Node @dontInfer {
      combatStyle: String!
      equipment: [BestInSlotEquipmentSlot!]!
    }
    type BestInSlotEquipmentSlot {
      id: String!
      items: [BestInSlotItem!]!
    }
    type BestInSlotItem {
      id: String!
      icon: String
      name: String
      tags: [String!]
      regions: [String!]!
      ammo: BestInSlotItem
    }
    type BossesJson implements Node @dontInfer {
      jsonId: String!
      icon: String
      title: String
      subtitle: String
      category: String!
      subcategory: String
      sortingGroups: [String!]!
      recommendedCombatStyle: [String!]!
      requiredLevel: Int
      notableDrops: [String!]!
    }
    type DungeonsJson implements Node @dontInfer {
      jsonId: String!
      title: String
      subtitle: String
      category: String!
      sortingGroups: [String!]!
      notableDrops: [String!]
    }
    type GuildsJson implements Node @dontInfer {
      jsonId: String!
      title: String
      subtitle: String
      caption: String
      category: String!
      sortingGroups: [String!]!
      requiredLevel: Int
      notableDrops: [String!]
    }
    type ItemsJson implements Node @dontInfer {
      jsonId: String!
      icon: String
      name: String
      tags: [String!]
      transmutations: [String!]
    }
    type LocationsJson implements Node @dontInfer {
      jsonId: String!
      name: String
      region: String!
      tags: [String!]
    }
    type MinigamesJson implements Node @dontInfer {
      jsonId: String!
      title: String
      subtitle: String
      caption: String
      category: String!
      sortingGroups: [String!]!
      requiredLevel: Int
      notableDrops: [String!]
    }
    type MiscJson implements Node @dontInfer {
      jsonId: String!
      icon: String
      title: String
      subtitle: String
      caption: String
      category: String!
      sortingGroups: [String!]!
      requiredLevel: Int
      notableDrops: [String!]
    }
    type NpcsJson implements Node @dontInfer {
      jsonId: String!
      icon: String
      title: String
      subtitle: String
      category: String!
      sortingGroups: [String!]!
      requiredLevel: Int
      notableDrops: [String!]
    }
    type PetsJson implements Node @dontInfer {
      jsonId: String!
      icon: String
      name: String
      source: ItemSource!
      tags: [String!]!
    }
    type RaidsJson implements Node @dontInfer {
      jsonId: String!
      icon: String!
      title: String
      subtitle: String
      category: String!
      sortingGroups: [String!]!
      recommendedCombatStyle: [String!]!
      notableDrops: [String!]!
    }
    type RegionsJson implements Node @dontInfer {
      jsonId: String!
      name: String!
      description: String!
      skilling: [String!]!
      raids: [String!]
      bosses: [String!]!
      minigames: [String!]!
      guilds: [String!]
      dungeons: [String!]!
      monsters: [String!]!
      misc: [String!]!
      pets: [String!]!
    }
    type SkillingJson implements Node @dontInfer {
      jsonId: String!
      icon: String
      url: String
      title: String
      subtitle: String
      caption: String
      category: String!
      sortingGroups: [String!]!
      requiredLevel: Int
      notableDrops: [String!]
    }
    type SlayerMastersJson implements Node @dontInfer {
      jsonId: String!
      image: String!
      region: String!
      requiredCombatLevel: Int
    }
    type SlayerMonstersJson implements Node @dontInfer {
      jsonId: String!
      icon: String
      title: String
      subtitle: String
      category: String!
      sortingGroups: [String!]!
      requiredCombatLevel: Int
      requiredSlayerLevel: Int
      slayerMasters: [String!]!
      locations: [String!]!
      notableDrops: [String!]
      hideFromMenu: Boolean
    }
    type SpellsJson implements Node @dontInfer {
      jsonId: String!
      title: String
      subtitle: String
      caption: String
      category: String!
      spellbook: String!
      requiredLevel: Int!
      sortingGroups: [String!]!
      notableDrops: [String!]
    }
  `;
  const coerceItemSource = (value: any) => {
    if (Array.isArray(value) || typeof value === 'string') {
      return value;
    } else {
      throw new Error(
        'ItemSource cannot represent value: ' + JSON.stringify(value),
      );
    }
  };
  const ItemSource = schema.buildScalarType({
    name: 'ItemSource',
    serialize: coerceItemSource,
    parseValue: coerceItemSource,
  });
  createTypes([typeDefs, ItemSource]);
};
