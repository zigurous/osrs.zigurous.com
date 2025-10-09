import { clamp } from '@zigurous/forge-react';
import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'; // prettier-ignore
import { useEquipmentContext, useQuestsContext } from '../context'; // prettier-ignore
import { calculateExpectedHitpointsLevel, equipmentSlots, getDefaultSkillLevels, skills } from '../utils'; // prettier-ignore
import type { GearProgressionTier, SkillLevels, GearProgressionCategory, GearProgressionCategoryId, EquippedItems, GearProgressionSubcategoryId } from '../types'; // prettier-ignore

// prettier-ignore
interface GearProgressionContextData {
  category: GearProgressionContextCategory;
  subcategory?: GearProgressionSubcategoryId;
  currentTier: GearProgressionContextTier;
  previousTier?: GearProgressionContextTier;
  nextTier?: GearProgressionContextTier;
  tierIndex: number;
  transitionIndex?: number;
  setCategory: (category: GearProgressionCategoryId) => void;
  setSubcategory: (subcategory: GearProgressionSubcategoryId | undefined) => void;
  setTierIndex: React.Dispatch<React.SetStateAction<number>>;
  setTimelineDirection: (direction: number) => void;
}

type GearProgressionContextCategory = GearProgressionCategory & {
  tiers: GearProgressionContextTier[];
  sequence: GearProgressionContextTier[];
};

type GearProgressionContextTier = Omit<GearProgressionTier, 'categories'> & {
  equipment: Record<string, EquippedItems>;
  trackedItems: Set<string>;
  skillRequirements: Partial<SkillLevels>;
  tierIndex: number;
  sequenceIndex?: number;
  previous?: GearProgressionContextTier;
  next?: GearProgressionContextTier;
  hidden?: boolean;
};

export const categories: GearProgressionCategory[] = [
  {
    id: 'melee',
    title: 'Melee',
    icon: 'Attack_style_icon',
    subcategoryKey: 'meleeSubcategory',
    subcategories: [
      { id: 'melee-stab', label: 'Stab', icon: 'White_dagger' },
      { id: 'melee-slash', label: 'Slash', icon: 'White_scimitar' },
      { id: 'melee-crush', label: 'Crush', icon: 'White_warhammer' },
      { id: 'melee-spec', label: 'Special', icon: 'Special_attack_orb' },
      { id: 'melee-slayer', label: 'Slayer', icon: 'Slayer_icon' },
    ],
  },
  {
    id: 'ranged',
    title: 'Ranged',
    icon: 'Ranged_icon_(detail)',
    subcategoryKey: 'rangedSubcategory',
    subcategories: [
      { id: 'ranged-standard', label: 'Standard', icon: 'Steel_arrow_5' },
      { id: 'ranged-light', label: 'Light', icon: 'Steel_dart' },
      { id: 'ranged-heavy', label: 'Heavy', icon: 'Steel_bolts_5' },
      { id: 'ranged-spec', label: 'Special', icon: 'Special_attack_orb' },
      { id: 'ranged-slayer', label: 'Slayer', icon: 'Slayer_icon' },
    ],
  },
  {
    id: 'magic',
    title: 'Magic',
    icon: 'Magic_icon_(detail)',
    subcategoryKey: 'magicSubcategory',
    subcategories: [
      { id: 'magic-standard', label: 'Standard', icon: 'Standard_spellbook' },
      { id: 'magic-ancient', label: 'Ancient', icon: 'Ancient_spellbook' },
      { id: 'magic-arceuus', label: 'Arceuus', icon: 'Arceuus_spellbook' },
      { id: 'magic-spec', label: 'Special', icon: 'Special_attack_orb' },
      { id: 'magic-slayer', label: 'Slayer', icon: 'Slayer_icon' },
    ],
  },
];

const emptyTier: GearProgressionContextTier = {
  tierIndex: 0,
  title: '',
  items: [],
  timeline: [],
  equipment: {},
  trackedItems: new Set(),
  skillRequirements: {},
};

const defaultData: GearProgressionContextData = {
  category: { ...categories[0], tiers: [emptyTier], sequence: [emptyTier] },
  currentTier: emptyTier,
  tierIndex: 0,
  setCategory: () => undefined,
  setSubcategory: () => undefined,
  setTierIndex: () => undefined,
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
  const [categoryId, _setCategoryId] = useState(defaultData.category.id);
  const [subcategory, setSubcategory] =
    useState<GearProgressionSubcategoryId>();
  const [tierIndex, _setTierIndex] = useState(defaultData.tierIndex);
  const [transitionIndex, setTransitionIndex] = useState<number>();

  const transition = useRef<NodeJS.Timeout>();
  const tierRef = useRef(emptyTier);
  const upperIndexRef = useRef(0);

  const data = useStaticQuery<GearProgressionQueryData>(dataQuery);
  const categories = {
    melee: useGearProgressionCategory(data, 'melee'),
    ranged: useGearProgressionCategory(data, 'ranged'),
    magic: useGearProgressionCategory(data, 'magic'),
  };

  const category = categories[categoryId];
  tierRef.current = category.sequence[tierIndex];
  upperIndexRef.current = Math.max(category.sequence.length - 1, 0);

  const setTierIndex = useCallback(
    (action: React.SetStateAction<number>) =>
      _setTierIndex(state =>
        typeof action === 'number'
          ? clamp(action, 0, upperIndexRef.current)
          : clamp(action(state), 0, upperIndexRef.current),
      ),
    [],
  );

  const setTimelineDirection = useCallback((direction: number) => {
    if (!transition.current) {
      let transitionIndex: number | undefined;
      if (direction > 0) {
        transitionIndex = tierRef.current.next?.sequenceIndex;
      } else if (direction < 0) {
        transitionIndex = tierRef.current.previous?.sequenceIndex;
      }
      if (transitionIndex !== undefined) {
        setTransitionIndex(transitionIndex);
        transition.current = setTimeout(() => {
          transition.current = undefined;
          setTierIndex(transitionIndex);
          setTransitionIndex(undefined);
        }, 300);
      }
    }
  }, []);

  const setCategory = useCallback(
    (category: GearProgressionCategoryId) => {
      _setCategoryId(category);
      // Match the previous subcategory if applicable
      if (subcategory) {
        const split = subcategory.split('-')[1];
        if (split === 'spec' || split === 'slayer') {
          // prettier-ignore
          setSubcategory(`${category}-${split}` as GearProgressionSubcategoryId);
        } else {
          setSubcategory(undefined);
        }
      }
      // prettier-ignore
      // Jump to the matching tier of the new category
      for (let i = tierRef.current.tierIndex; i < categories[category].tiers.length; i++) {
        const jump = categories[category].tiers[i];
        if (!jump.hidden && jump.sequenceIndex !== undefined) {
          upperIndexRef.current = categories[category].sequence.length - 1;
          setTierIndex(jump.sequenceIndex);
          return;
        }
      }
      setTierIndex(0);
    },
    [categoryId, subcategory],
  );

  return (
    <GearProgressionContext.Provider
      value={{
        category,
        subcategory,
        currentTier: tierRef.current || emptyTier,
        previousTier: tierRef.current?.previous,
        nextTier: tierRef.current?.next,
        tierIndex,
        transitionIndex,
        setCategory,
        setSubcategory,
        setTierIndex,
        setTimelineDirection,
      }}
    >
      {children}
    </GearProgressionContext.Provider>
  );
}

function useGearProgressionCategory(
  data: GearProgressionQueryData,
  categoryId: GearProgressionCategoryId,
): GearProgressionContextCategory {
  const { equipment, getItemById } = useEquipmentContext();
  const { calculateSkillTotals } = useQuestsContext();

  const processTierData = useCallback(
    (
      tiers: GearProgressionTier[],
      categoryId: GearProgressionCategoryId,
      tierIndex: number,
      previous?: GearProgressionContextTier,
    ): GearProgressionContextTier => {
      const tier = tiers[tierIndex];
      const hidden = false;
      // const hidden =
      //   !tier.categories.includes(categoryId) &&
      //   !tier.categories.includes('all');

      let trackedItems: Set<string> = new Set();
      let equipmentSets: Set<string> = new Set([categoryId]);
      const equipment: Record<string, EquippedItems> = {
        [categoryId]: {},
      };

      const category = categories.find(c => c.id === categoryId)!;
      category.subcategories.forEach(subcategory => {
        equipmentSets.add(subcategory.id);
        equipment[subcategory.id] = {};
      });

      const skillRequirements = getDefaultSkillLevels();
      let questMilestone: string | undefined;

      for (let i = 0; i <= tierIndex; i++) {
        // Calculate skill totals based on quest milestones
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

        // Set custom skill requirements
        tiers[i].skills?.forEach(stat => {
          skillRequirements[stat.skill] = Math.max(
            skillRequirements[stat.skill],
            stat.level,
          );
        });

        // Assign primary equipment
        tiers[i].items?.forEach(el => {
          const item = getItemById(el.id);
          if (item) {
            trackedItems.add(item.id);
            if (item.ammo) {
              trackedItems.add(item.ammo.id);
            }
            if (el.category === categoryId || el.category === 'all') {
              equipmentSets.forEach(set => {
                equipment[set][item.slot] = item;
              });
            }
            item.requirements?.forEach(req => {
              skillRequirements[req.skill] = Math.max(
                skillRequirements[req.skill],
                req.level,
              );
            });
          }
        });

        // Assign subcategory equipment
        tiers[i].subcategoryItems?.forEach(el => {
          const item = getItemById(el.id);
          if (item) {
            trackedItems.add(item.id);
            if (item.ammo) {
              trackedItems.add(item.ammo.id);
            }
            if (equipmentSets.has(el.subcategory)) {
              equipment[el.subcategory][item.slot] = item;
            }
            item.requirements?.forEach(req => {
              skillRequirements[req.skill] = Math.max(
                skillRequirements[req.skill],
                req.level,
              );
            });
          }
        });
      }

      // Diff the current and previous equipment to mark upgrades
      if (previous && tierIndex > 0) {
        equipmentSets.forEach(set => {
          equipmentSlots.forEach(slot => {
            const item = equipment[set][slot];
            if (
              item &&
              !previous.trackedItems.has(item.id) &&
              !item.id.includes('#equipmentslot')
            ) {
              const tags = item.tags || [];
              if (!tags.includes('unmarked')) {
                equipment[set][slot] = { ...item, tags: [...tags, 'upgrade'] };
              }
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
        ...tier,
        tierIndex,
        hidden,
        questMilestone,
        equipment,
        trackedItems,
        skillRequirements,
      };
    },
    [equipment, getItemById, calculateSkillTotals],
  );

  return useMemo<GearProgressionContextCategory>(() => {
    const tiers: GearProgressionContextTier[] = [];
    for (let i = 0; i < data.progression.nodes.length; i++) {
      const previous = i > 0 ? tiers[i - 1] : undefined;
      tiers.push(
        processTierData(data.progression.nodes, categoryId, i, previous),
      );
    }
    const sequence = tiers.filter(tier => !tier.hidden);
    for (let i = 0; i < sequence.length; i++) {
      const tier = sequence[i];
      tier.sequenceIndex = i;
      tier.previous = i > 0 ? sequence[i - 1] : undefined;
      tier.next = i < sequence.length - 1 ? sequence[i + 1] : undefined;
    }
    return {
      ...categories.find(category => category.id === categoryId)!,
      tiers,
      sequence,
    };
  }, [data, categoryId]);
}

interface GearProgressionQueryData {
  progression: {
    nodes: GearProgressionTier[];
  };
}

const dataQuery = graphql`
  query GearProgressionQuery {
    progression: allGearProgressionJson {
      nodes {
        title
        categories
        items {
          id
          category
        }
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
          category
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
`;
