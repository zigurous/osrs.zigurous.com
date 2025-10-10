import {
  calculateExpectedHitpointsLevel,
  equipmentSlots,
  getDefaultSkillLevels,
  skills,
  sumQuestExperienceLevels,
} from '../utils';
import type {
  EquippedItems,
  GearProgressionContextTier,
  GearProgressionWorkerInput,
} from '../types';

self.onmessage = (e: MessageEvent<GearProgressionWorkerInput>) => {
  const tiers: GearProgressionContextTier[] = [];
  for (let i = 0; i < e.data.tiers.length; i++) {
    const previous = i > 0 ? tiers[i - 1] : undefined;
    tiers.push(processData(e.data, i, previous));
  }
  const sequence = tiers.filter(tier => !tier.hidden);
  for (let i = 0; i < sequence.length; i++) {
    const tier = sequence[i];
    tier.sequenceIndex = i;
    tier.previous = i > 0 ? sequence[i - 1] : undefined;
    tier.next = i < sequence.length - 1 ? sequence[i + 1] : undefined;
  }
  postMessage({
    ...e.data.category,
    tiers,
    sequence,
  });
};

function processData(
  data: GearProgressionWorkerInput,
  tierIndex: number,
  previous?: GearProgressionContextTier,
): GearProgressionContextTier {
  const hidden = false;
  // const hidden =
  //   !tier.categories.includes(data.category.id) &&
  //   !tier.categories.includes('all');

  let trackedItems: Set<string> = new Set();
  let equipmentSets: Set<string> = new Set([data.category.id]);
  const equipment: Record<string, EquippedItems> = {
    [data.category.id]: {},
  };

  data.category.subcategories.forEach(subcategory => {
    equipmentSets.add(subcategory.id);
    equipment[subcategory.id] = {};
  });

  const skillRequirements = getDefaultSkillLevels();
  let questMilestone: string | undefined;

  const getItemById = (id: string) =>
    data.equipment.find(item => item.id === id);

  for (let i = 0; i <= tierIndex; i++) {
    const tier = data.tiers[i];

    // Calculate skill totals based on quest milestones
    if (tier.questMilestone) {
      const milestoneIndex =
        data.quests.findIndex(quest => quest.id === tier.questMilestone) + 1;
      const quests = data.quests.slice(0, milestoneIndex);
      questMilestone = tier.questMilestone;
      const totals = sumQuestExperienceLevels(quests, true, true);
      skills.forEach(skill => {
        skillRequirements[skill] = Math.max(
          skillRequirements[skill],
          totals[skill],
        );
      });
    }

    // Set custom skill requirements
    tier.skills?.forEach(stat => {
      skillRequirements[stat.skill] = Math.max(
        skillRequirements[stat.skill],
        stat.level,
      );
    });

    // Assign primary equipment
    tier.items?.forEach(el => {
      const item = getItemById(el.id);
      if (item) {
        trackedItems.add(item.id);
        if (item.ammo) {
          trackedItems.add(item.ammo.id);
        }
        if (el.category === data.category.id || el.category === 'all') {
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
    tier.subcategoryItems?.forEach(el => {
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
    ...data.tiers[tierIndex],
    tierIndex,
    hidden,
    questMilestone,
    equipment,
    trackedItems,
    skillRequirements,
  };
}

export {};
