import '../styles/gear-progression-card.css';
import { Button, Stack } from '@zigurous/forge-react';
import React, { useEffect, useMemo, useState } from 'react';
import EquipmentInventory from './EquipmentInventory';
import IconToggle from './IconToggle';
import SkillsGrid from './SkillsGrid';
import Slider from './Slider';
import TitledCard from './TitledCard';
import { useEquipmentContext, useQuestsContext } from '../context';
import { calculateExpectedHitpointsLevel, equipmentSlots, getDefaultSkillLevels, getEmptyEquipmentSlots, skills } from '../utils'; // prettier-ignore
import type { EquipmentCategory, GearProgressionContext, GearProgressionContextTier, GearProgressionQueryData } from '../types'; // prettier-ignore
import WikiLink from './WikiLink';

interface GearProgressionCardProps {
  data: GearProgressionQueryData;
}

export default function GearProgressionCard({
  data,
}: GearProgressionCardProps) {
  const [categoryId, setCategoryId] = useState('melee');
  const progression = useGearProgression(data, categoryId);
  return (
    <TitledCard
      className="gear-progression-card"
      title={progression.current.title}
      titleIcon={progression.category.icon}
      subtitle={progression.current.optional ? 'Optional' : undefined}
      captionIcon={
        <Stack inline className="h-0" align="center" justify="end" spacing="xs">
          {categories.map(category => (
            <IconToggle
              icon={category.icon}
              key={category.id}
              label={category.title}
              on={categoryId === category.id}
              onChange={on => {
                if (on) {
                  setCategoryId(category.id);
                }
              }}
            />
          ))}
        </Stack>
      }
    >
      <div className="gear-progression-card__equipment">
        <Stack
          align="center"
          layout="vertical"
          spacing="lg"
          style={{ minWidth: '264px' }}
        >
          <EquipmentInventory
            className="mt-sm"
            slots={progression.current.equipment}
          />
          <Stack
            className="w-full"
            align="center"
            justify="between"
            spacing="md"
          >
            <Button
              disabled={progression.tierIndex <= 0}
              icon="chevron_left"
              iconProps={{
                color: 'var(--color-silver)',
                size: 'md',
              }}
              iconAlignment="only"
              onClick={() => progression.setTier(tier => tier - 1)}
            />
            <Slider
              id="tier-range"
              min={0}
              max={progression.highestTier}
              value={progression.tierIndex}
              onChange={progression.setTier}
            />
            <Button
              disabled={progression.tierIndex >= progression.highestTier}
              icon="chevron_right"
              iconProps={{
                color: 'var(--color-silver)',
                size: 'md',
              }}
              iconAlignment="only"
              onClick={() => progression.setTier(tier => tier + 1)}
            />
          </Stack>
        </Stack>
        <SkillsGrid
          className="ml-xxl mr-lg"
          levels={progression.current.skillRequirements}
          previous={progression.previous.skillRequirements}
          skills={[
            'hitpoints',
            'attack',
            'strength',
            'defence',
            'ranged',
            'magic',
            'prayer',
            'slayer',
          ]}
          cols={1}
          rows={8}
        />
      </div>
      <div className="divider" />
      <div className="gear-progression-card__summary">
        <ul className="list-bullet list-indent text-muted">
          {progression.current.summary.map(note => (
            <li key={note}>{parseRichText(note)}</li>
          ))}
        </ul>
      </div>
    </TitledCard>
  );
}

function parseRichText(str: string) {
  let copy = str;
  const jsx: React.ReactNode[] = [str];
  const regex = new RegExp('(?:<Link="([^"]+)">([^<]+)<\/Link>)', 'g');
  str.matchAll(regex).forEach(match => {
    const split = copy.split(match[0]);
    jsx[jsx.length - 1] = (
      <React.Fragment key={split[0]}>{split[0]}</React.Fragment>
    );
    jsx.push(
      <WikiLink className="text-primary" key={match[0]} wikiId={match[1]}>
        {match[2]}
      </WikiLink>,
    );
    jsx.push(<React.Fragment key={split[1]}>{split[1]}</React.Fragment>);
    copy = split[1];
  });
  return jsx;
}

function useGearProgression(
  data: GearProgressionQueryData,
  categoryId: string,
): GearProgressionContext {
  const [tierIndex, setTier] = useState(0);
  const { getItemById } = useEquipmentContext();
  const { calculateSkillTotals } = useQuestsContext();

  useEffect(() => {
    setTier(0);
  }, [categoryId]);

  return useMemo<GearProgressionContext>(() => {
    const category = categories.find(category => category.id === categoryId)!;
    const tiers = data.progression.nodes.find(
      node => node.category === categoryId,
    )?.tiers;

    if (!tiers || tiers.length == 0) {
      const empty: GearProgressionContextTier = {
        title: category.title,
        summary: [],
        items: [],
        equipment: {},
        skillRequirements: {},
      };
      return {
        tierIndex: 0,
        highestTier: 0,
        setTier,
        category,
        current: empty,
        previous: empty,
      } as GearProgressionContext;
    }

    const gather = (tier: number): GearProgressionContextTier => {
      const equipment = getEmptyEquipmentSlots();
      const skillRequirements = getDefaultSkillLevels();

      // Calculate skill totals based on quest milestones
      for (let i = 0; i <= tier; i++) {
        if (tiers[i].questMilestone) {
          const totals = calculateSkillTotals(tiers[i].questMilestone!);
          skills.forEach(skill => {
            skillRequirements[skill] = Math.max(
              skillRequirements[skill],
              totals[skill],
            );
          });
        }
      }

      // Assign equipment and set minimum skill requirements
      for (let i = 0; i <= tier; i++) {
        tiers[i].items.forEach(id => {
          const item = getItemById(id);
          if (item) {
            equipment[item.slot] = item;
            item.skillRequirements?.forEach(req => {
              skillRequirements[req.skill] = Math.max(
                skillRequirements[req.skill],
                req.level,
              );
            });
          }
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
        equipment,
        skillRequirements,
      } as GearProgressionContextTier;
    };

    const current = gather(tierIndex);
    const previous =
      tierIndex > 0
        ? gather(tierIndex - 1)
        : {
            title: tiers[tierIndex].title,
            equipment: getEmptyEquipmentSlots(),
            skillRequirements: getDefaultSkillLevels(),
          };

    // Diff the current and previous equipment to mark upgrades
    if (tierIndex > 0) {
      equipmentSlots.forEach(slot => {
        const item = current.equipment[slot];
        if (item && item !== previous.equipment[slot]) {
          current.equipment[slot] = {
            ...item,
            tags: [...(item.tags || []), 'upgrade'],
          };
        }
      });
    }

    return {
      tierIndex,
      highestTier: Math.max(tiers.length - 1, 0),
      setTier,
      category,
      current,
      previous,
    } as GearProgressionContext;
  }, [data, categoryId, tierIndex, getItemById]);
}

const categories: EquipmentCategory[] = [
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
    ],
  },
  {
    id: 'ranged',
    title: 'Ranged',
    icon: 'Ranged_icon_(detail)',
    subcategoryKey: 'rangedSubcategory',
  },
  {
    id: 'magic',
    title: 'Magic',
    icon: 'Magic_icon_(detail)',
    subcategoryKey: 'magicSubcategory',
  },
];
