import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'; // prettier-ignore
import { useEquipmentContext, useQuestsContext } from '../context'; // prettier-ignore
import { calculateExpectedHitpointsLevel, equipmentSlots, getDefaultSkillLevels, getEmptyEquipmentSlots, skills } from '../utils'; // prettier-ignore
import type { GearProgressionTier, SkillLevels, EquipmentSlots, GearProgressionCategory, GearProgressionCategoryId } from '../types'; // prettier-ignore

interface GearProgressionContextData {
  tierIndex: number;
  highestTier: number;
  setTier: React.Dispatch<React.SetStateAction<number>>;
  setCategory: React.Dispatch<React.SetStateAction<GearProgressionCategoryId>>;
  setSubcategory: React.Dispatch<React.SetStateAction<string | undefined>>;
  categories: GearProgressionCategory[];
  selectedCategory: GearProgressionCategory;
  selectedSubcategory: string | undefined;
  current: GearProgressionContextTier;
  previous: GearProgressionContextTier;
}

type GearProgressionContextTier = GearProgressionTier & {
  equipment: Record<string, EquipmentSlots>;
  skillRequirements: Partial<SkillLevels>;
};

export const categories: GearProgressionCategory[] = [
  {
    id: 'melee',
    title: 'Melee',
    icon: 'Attack_style_icon',
    subcategoryKey: 'meleeSubcategory',
    subcategories: [
      { id: 'stab', label: 'Stab', icon: 'White_dagger' },
      { id: 'slash', label: 'Slash', icon: 'White_scimitar' },
      { id: 'crush', label: 'Crush', icon: 'White_warhammer' },
      { id: 'spec', label: 'Special', icon: 'Special_attack_orb' },
    ],
  },
  {
    id: 'ranged',
    title: 'Ranged',
    icon: 'Ranged_icon_(detail)',
    subcategoryKey: 'rangedSubcategory',
    subcategories: [
      { id: 'spec', label: 'Special', icon: 'Special_attack_orb' },
    ],
  },
  {
    id: 'magic',
    title: 'Magic',
    icon: 'Magic_icon_(detail)',
    subcategoryKey: 'magicSubcategory',
    subcategories: [
      { id: 'spec', label: 'Special', icon: 'Special_attack_orb' },
    ],
  },
];

export const EQUIPMENT_OVERALL = 'overall';

const emptyTier: GearProgressionContextTier = {
  title: '',
  items: [],
  upgrades: [],
  equipment: { [EQUIPMENT_OVERALL]: {} },
  skillRequirements: {},
};

const defaultData: GearProgressionContextData = {
  tierIndex: 0,
  highestTier: 0,
  setTier: () => undefined,
  setCategory: () => undefined,
  setSubcategory: () => undefined,
  categories: categories,
  selectedCategory: categories[0],
  selectedSubcategory: undefined,
  current: emptyTier,
  previous: emptyTier,
};

const GearProgressionContext =
  createContext<GearProgressionContextData>(defaultData);
export default GearProgressionContext;

export function useGearProgressionContext(): GearProgressionContextData {
  return useContext<GearProgressionContextData>(GearProgressionContext);
}

export function GearProgressionContextProvider({
  children,
}: React.PropsWithChildren) {
  const data = useStaticQuery<GearProgressionQueryData>(dataQuery);
  const [tierIndex, setTier] = useState(defaultData.tierIndex);
  const [categoryId, setCategory] = useState<GearProgressionCategoryId>(
    defaultData.selectedCategory.id,
  );
  const [subcategoryId, setSubcategory] = useState<string>();

  useEffect(() => {
    setTier(0);
  }, [categoryId]);

  const selectedCategory = categories.find(c => c.id === categoryId)!;
  const tiers = data.progression.nodes.find(
    node => node.category === categoryId,
  )!.tiers;

  const previous = useGearProgressionTier(
    data,
    tiers,
    tierIndex - 1,
    categoryId,
    subcategoryId,
  );

  const current = useGearProgressionTier(
    data,
    tiers,
    tierIndex,
    categoryId,
    subcategoryId,
    previous,
  );

  return (
    <GearProgressionContext.Provider
      value={{
        tierIndex,
        highestTier: tiers.length - 1,
        setTier,
        setCategory,
        setSubcategory,
        categories,
        selectedCategory,
        selectedSubcategory: subcategoryId,
        current,
        previous,
      }}
    >
      {children}
    </GearProgressionContext.Provider>
  );
}

function useGearProgressionTier(
  data: GearProgressionQueryData,
  tiers: GearProgressionTier[],
  tierIndex: number,
  categoryId: GearProgressionCategoryId,
  subcategoryId?: string,
  previous?: GearProgressionContextTier,
): GearProgressionContextTier {
  const { getItemById } = useEquipmentContext();
  const { calculateSkillTotals } = useQuestsContext();

  return useMemo<GearProgressionContextTier>(() => {
    if (tierIndex < 0 || tiers.length == 0) {
      return emptyTier;
    }

    let equipmentSets: Set<string> = new Set();
    equipmentSets.add(EQUIPMENT_OVERALL);
    const equipment: Record<string, EquipmentSlots> = {
      [EQUIPMENT_OVERALL]: getEmptyEquipmentSlots(),
    };
    const skillRequirements = getDefaultSkillLevels();
    let questMilestone: string | undefined;

    // Calculate skill totals based on quest milestones
    for (let i = 0; i <= tierIndex; i++) {
      if (tiers[i].questMilestone) {
        questMilestone = tiers[i].questMilestone;
        const totals = calculateSkillTotals(tiers[i].questMilestone!, true);
        skills.forEach(skill => {
          skillRequirements[skill] = Math.max(
            skillRequirements[skill],
            totals[skill],
          );
        });
      }
    }

    // Assign equipment and set minimum skill requirements
    for (let i = 0; i <= tierIndex; i++) {
      tiers[i].stats?.forEach(stat => {
        skillRequirements[stat.skill] = Math.max(
          skillRequirements[stat.skill],
          stat.level,
        );
      });
      tiers[i].items.forEach(id => {
        const item = getItemById(id);
        if (item) {
          equipment[EQUIPMENT_OVERALL][item.slot] = item;
          item.skillRequirements?.forEach(req => {
            skillRequirements[req.skill] = Math.max(
              skillRequirements[req.skill],
              req.level,
            );
          });
        }
      });
      tiers[i].subcategoryItems?.forEach(subitem => {
        const item = getItemById(subitem.id);
        if (item) {
          equipmentSets.add(subitem.subcategory);
          equipment[subitem.subcategory] ??= {};
          equipment[subitem.subcategory][item.slot] = item;
          if (subitem.subcategory === subcategoryId) {
            equipment[EQUIPMENT_OVERALL][item.slot] = item;
            item.skillRequirements?.forEach(req => {
              skillRequirements[req.skill] = Math.max(
                skillRequirements[req.skill],
                req.level,
              );
            });
          }
        }
      });
    }

    // Diff the current and previous equipment to mark upgrades
    if (previous && tierIndex > 0) {
      equipmentSets.forEach(set => {
        equipmentSlots.forEach(slot => {
          const item = equipment[set][slot];
          if (item && item !== previous.equipment[set]?.[slot]) {
            equipment[set][slot] = {
              ...item,
              tags: [...(item.tags || []), 'upgrade'],
            };
          }
        });
      });
    }

    // Set attack and strength as a minimum to defence level
    if (skillRequirements.defence >= 60) {
      skillRequirements.attack = Math.max(
        skillRequirements.attack,
        skillRequirements.defence,
      );
      skillRequirements.strength = Math.max(
        skillRequirements.strength,
        skillRequirements.defence,
      );
    }

    // Set minimum expected hitpoints level
    if (skillRequirements.hitpoints >= 30) {
      skillRequirements.hitpoints = Math.max(
        skillRequirements.hitpoints,
        calculateExpectedHitpointsLevel(
          skillRequirements.attack,
          skillRequirements.strength,
          skillRequirements.defence,
        ),
      );
    }

    return {
      ...tiers[tierIndex],
      questMilestone,
      equipment,
      skillRequirements,
    };
  }, [
    data,
    tiers,
    tierIndex,
    categoryId,
    subcategoryId,
    previous,
    getItemById,
    calculateSkillTotals,
  ]);
}

interface GearProgressionQueryData {
  progression: {
    nodes: {
      category: GearProgressionCategoryId;
      tiers: GearProgressionTier[];
    }[];
  };
}

const dataQuery = graphql`
  query GearProgressionQuery {
    progression: allGearProgressionJson {
      nodes {
        category
        tiers {
          title
          items
          subcategoryItems {
            id
            subcategory
          }
          stats {
            skill
            level
            highlight
          }
          upgrades {
            id
            type
            icon
            title
            subtitle
            items
            subitems {
              id
              type
              icon
              title
              subtitle
            }
          }
          notes
          questMilestone
          optional
        }
      }
    }
  }
`;
