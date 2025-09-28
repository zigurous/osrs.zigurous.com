import { clamp } from '@zigurous/forge-react';
import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'; // prettier-ignore
import { useEquipmentContext, useQuestsContext } from '../context'; // prettier-ignore
import { calculateExpectedHitpointsLevel, equipmentSlots, getDefaultSkillLevels, getEmptyEquipmentSlots, skills } from '../utils'; // prettier-ignore
import type { GearProgressionTier, SkillLevels, GearProgressionCategory, GearProgressionCategoryId, EquippedItems } from '../types'; // prettier-ignore

interface GearProgressionContextData {
  tierIndex: number;
  highestTier: number;
  timelineDirection: number;
  categories: GearProgressionCategory[];
  selectedCategory: GearProgressionCategory;
  selectedSubcategory: string | undefined;
  current: GearProgressionContextTier;
  previous?: GearProgressionContextTier;
  next?: GearProgressionContextTier;
  setTier: React.Dispatch<React.SetStateAction<number>>;
  setCategory: React.Dispatch<React.SetStateAction<GearProgressionCategoryId>>;
  setSubcategory: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTimelineDirection: (direction: number) => void;
}

type GearProgressionContextTier = GearProgressionTier & {
  equipment: Record<string, EquippedItems>;
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
      { id: 'slayer', label: 'Slayer', icon: 'Slayer_icon' },
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
  timeline: [],
  equipment: { [EQUIPMENT_OVERALL]: {} },
  skillRequirements: {},
};

const defaultData: GearProgressionContextData = {
  tierIndex: 0,
  highestTier: 0,
  timelineDirection: 0,
  categories: categories,
  selectedCategory: categories[0],
  selectedSubcategory: undefined,
  current: emptyTier,
  setTier: () => undefined,
  setCategory: () => undefined,
  setSubcategory: () => undefined,
  setTimelineDirection: () => undefined,
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
  const [categoryId, setCategory] = useState(defaultData.selectedCategory.id);
  const [subcategoryId, setSubcategory] = useState<string>();
  const [tierIndex, setTierIndex] = useState(defaultData.tierIndex);
  const [timelineDirection, setDirection] = useState(0);

  useEffect(() => {
    setTierIndex(0);
  }, [categoryId]);

  const selectedCategory = categories.find(c => c.id === categoryId)!;
  const tiers =
    data.progression.nodes.find(node => node.category === categoryId)?.tiers ??
    [];
  const highestTier = Math.max(tiers.length - 1, 0);

  const setTier = useCallback<React.Dispatch<React.SetStateAction<number>>>(
    action =>
      setTierIndex(state =>
        typeof action === 'number'
          ? clamp(action, 0, highestTier)
          : clamp(action(state), 0, highestTier),
      ),
    [highestTier],
  );

  const setTimelineDirection = useCallback(
    (direction: number) =>
      setDirection(state => {
        if (direction === 0) return direction;
        else if (state === 0) return direction;
        else return state;
      }),
    [],
  );

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

  const next = useGearProgressionTier(
    data,
    tiers,
    tierIndex + 1,
    categoryId,
    subcategoryId,
    current,
  );

  return (
    <GearProgressionContext.Provider
      value={{
        tierIndex,
        highestTier,
        timelineDirection,
        categories,
        selectedCategory,
        selectedSubcategory: subcategoryId,
        current,
        previous,
        next,
        setTier,
        setCategory,
        setSubcategory,
        setTimelineDirection,
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
    if (tierIndex < 0 || tiers.length == 0 || tierIndex >= tiers.length) {
      return emptyTier;
    }

    let equipmentSets: Set<string> = new Set();
    equipmentSets.add(EQUIPMENT_OVERALL);
    const equipment: Record<string, EquippedItems> = {
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
      tiers[i].skills?.forEach(stat => {
        skillRequirements[stat.skill] = Math.max(
          skillRequirements[stat.skill],
          stat.level,
        );
      });
      tiers[i].items?.forEach(id => {
        const item = getItemById(id);
        if (item) {
          equipment[EQUIPMENT_OVERALL][item.slot] = item;
          item.requirements?.forEach(req => {
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
            item.requirements?.forEach(req => {
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

    // Set minimum expected hitpoints level
    if (skillRequirements.hitpoints >= 60) {
      skillRequirements.hitpoints = Math.max(
        skillRequirements.hitpoints,
        calculateExpectedHitpointsLevel(skillRequirements),
      );
    }

    return {
      ...tiers[tierIndex],
      questMilestone,
      equipment,
      skillRequirements,
    };
  }, [data, tierIndex, categoryId, subcategoryId]);
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
          skills {
            skill
            level
            highlight
          }
          timeline {
            id
            icon
            title
            subtitle
            items
            subcards {
              id
              icon
              title
              subtitle
              setupId
            }
          }
          notes
          questMilestone
        }
      }
    }
  }
`;
