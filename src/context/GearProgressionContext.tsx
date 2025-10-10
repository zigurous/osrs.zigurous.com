import { clamp } from '@zigurous/forge-react';
import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'; // prettier-ignore
import { useEquipmentContext, useQuestsContext } from '../context'; // prettier-ignore
import { processGearProgressionData } from '../utils';
import type { GearProgressionTier, GearProgressionCategoryId, GearProgressionSubcategoryId, GearProgressionContextCategory, GearProgressionContextTier, GearProgressionWorkerInput, GearProgressionCategory } from '../types'; // prettier-ignore

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
  title: 'Loading...',
  items: [],
  timeline: [],
  equipment: {},
  trackedItems: new Set(),
  skillRequirements: {},
};

const defaultData: GearProgressionContextData = {
  category: {
    ...categories[0],
    tiers: [emptyTier],
    sequence: [emptyTier],
  },
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
  const [state, setState] = useState(defaultData.category);
  const { equipment } = useEquipmentContext();
  const { quests } = useQuestsContext();

  useEffect(() => {
    const category = categories.find(category => category.id === categoryId)!;
    const input: GearProgressionWorkerInput = {
      tiers: data.progression.nodes,
      category,
      equipment,
      quests,
    };
    if (window.Worker) {
      const worker = new Worker(
        new URL('../workers/gear-progression.worker.ts', import.meta.url),
        { type: 'module' },
      );
      worker.onmessage = (e: MessageEvent<GearProgressionContextCategory>) => {
        setState(e.data);
      };
      worker.postMessage(input);
      return () => {
        worker.terminate();
      };
    } else {
      setState(processGearProgressionData(input));
    }
  }, [data, categoryId, equipment, quests]);

  return state;
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
