import { clamp } from '@zigurous/forge-react';
import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'; // prettier-ignore
import { useEquipmentContext, useQuestsContext } from '../context'; // prettier-ignore
import { gearProgressionCategories } from '../utils';
import type { GearProgressionTier, GearProgressionCategoryId, GearProgressionSubcategoryId, GearProgressionContextCategory, GearProgressionContextTier } from '../types'; // prettier-ignore

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
    ...gearProgressionCategories[0],
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
    if (window.Worker) {
      const worker = new Worker(
        new URL('../workers/gear-progression.worker.ts', import.meta.url),
        { type: 'module' },
      );
      worker.onmessage = (e: MessageEvent<GearProgressionContextCategory>) => {
        setState(e.data);
      };
      worker.postMessage({
        tiers: data.progression.nodes,
        category: gearProgressionCategories.find(
          category => category.id === categoryId,
        )!,
        equipment,
        quests,
      });
      return () => {
        worker.terminate();
      };
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
