import { CreateSchemaCustomizationArgs } from 'gatsby';

export const createSchemaCustomization = ({
  actions,
  schema,
}: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions;
  const typeDefs = `
    type BestInSlotJson implements Node @dontInfer {
      category: String!
      equipment: [BestInSlotEquipmentSlot!]!
    }
    type BestInSlotEquipmentSlot {
      id: String!
      items: [String!]!
    }
    type BestInSlotItem {
      id: String!
      icon: String
      name: String
      tags: [String!]
      regions: [String!]
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
      requiredLevel: RequiredLevel
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
    type EquipmentJson implements Node @dontInfer {
      jsonId: String!
      icon: String
      name: String
      slot: String
      tags: [String!]
      regions: [String!]
      requiredWeapon: String
      ammo: EquipmentAmmo
      skillRequirements: [SkillLevel!]
    }
    type EquipmentAmmo {
      id: String!
      icon: String
    }
    type GearProgressionJson implements Node @dontInfer {
      category: String!
      tiers: [GearProgressionTier!]!
    }
    type GearProgressionTier {
      title: String!
      items: [String!]
      subcategoryItems: [GearProgressionSubcategoryItem!]
      skills: [SkillLevelHighlight!]
      timeline: [GearProgressionTimelineCard!]!
      notes: [String!]
      questMilestone: String
    }
    type GearProgressionSubcategoryItem {
      id: String!
      subcategory: String!
    }
    type GearProgressionTimelineCard {
      id: String!
      icon: String!
      title: String
      subtitle: String
      items: [String!]
      subcards: [GearProgressionTimelineSubCard!]
    }
    type GearProgressionTimelineSubCard {
      id: String!
      icon: String!
      title: String
      subtitle: String
      setupId: String
    }
    type GuildsJson implements Node @dontInfer {
      jsonId: String!
      icon: String
      title: String
      subtitle: String
      caption: String
      category: String!
      sortingGroups: [String!]!
      requiredLevel: RequiredLevel
      notableDrops: [String!]
    }
    type ItemsJson implements Node @dontInfer {
      jsonId: String!
      icon: String
      name: String
      tags: [String!]
      transmutations: [String!]
      tooltip: String
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
      requiredLevel: RequiredLevel
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
      requiredLevel: RequiredLevel
      notableDrops: [String!]
    }
    type NpcsJson implements Node @dontInfer {
      jsonId: String!
      icon: String
      title: String
      subtitle: String
      category: String!
      caption: String
      sortingGroups: [String!]!
      requiredLevel: RequiredLevel
      notableDrops: [String!]
    }
    type PetsJson implements Node @dontInfer {
      jsonId: String!
      icon: String
      name: String
      source: ItemSource!
      tags: [String!]!
    }
    type QuestsJson implements Node @dontInfer {
      jsonId: String!
      title: String
      questRequirements: [String!]
      skillRequirements: [SkillLevel!]
      rewards: [QuestReward!]
    }
    type QuestReward {
      skill: String!
      experience: Int!
    }
    type QuestOrderJson implements Node @dontInfer {
      jsonId: String!
      mode: String!
      quests: [String!]!
    }
    type QuestSeriesJson implements Node @dontInfer {
      jsonId: String!
      link: String
      title: String
      caption: String
      quests: [String!]!
      unlocks: [String!]
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
    type RecommendedSetupsJson implements Node @dontInfer {
      jsonId: String!
      title: String!
      strategiesLinkId: String
      loadouts: [RecommendedSetupLoadout!]!
    }
    type RecommendedSetupLoadout {
      title: String
      equipment: [RecommendedSetupEquipmentItem!]!
      inventory: [RecommendedSetupInventoryItem!]!
      runePouch: [String!]
      spell: String
    }
    type RecommendedSetupEquipmentItem {
      slot: String!
      item: String!
    }
    type RecommendedSetupInventoryItem {
      slot: Int!
      item: String!
    }
    type RegionsJson implements Node @dontInfer {
      jsonId: String!
      name: String!
      description: String!
      storylines: [String!]!
      locations: [String!]!
      skilling: [String!]!
      raids: [String!]!
      bosses: [String!]!
      minigames: [String!]!
      guilds: [String!]!
      dungeons: [String!]!
      monsters: [String!]!
      npcs: [String!]!
      misc: [String!]!
      pets: [String!]!
      resources: [String!]!
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
      requiredLevel: RequiredLevel
      notableDrops: [String!]
    }
    type SkillLevel {
      skill: String!
      level: Int!
    }
    type SkillLevelHighlight {
      skill: String!
      level: Int!
      highlight: Boolean
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
      caption: String
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
      requiredLevel: RequiredLevel!
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

  const coerceRequiredLevel = (value: any) => {
    if (Array.isArray(value) || typeof value === 'number') {
      return value;
    } else {
      throw new Error(
        'RequiredLevel cannot represent value: ' + JSON.stringify(value),
      );
    }
  };

  const ItemSource = schema.buildScalarType({
    name: 'ItemSource',
    serialize: coerceItemSource,
    parseValue: coerceItemSource,
  });

  const RequiredLevel = schema.buildScalarType({
    name: 'RequiredLevel',
    serialize: coerceRequiredLevel,
    parseValue: coerceRequiredLevel,
  });

  createTypes([typeDefs, ItemSource, RequiredLevel]);
};
