import classNames from 'classnames';
import React from 'react';
import WikiIcon from './WikiIcon';
import questDesertTreasure from '../images/grid-master-quest-desert-treasure.png';
import questDragonSlayer from '../images/grid-master-quest-dragon-slayer.png';
import questMonkeyMadness from '../images/grid-master-quest-monkey-madness.png';
import questSinsOfTheFather from '../images/grid-master-quest-sins-of-the-father.png';
import questSongOfTheElves from '../images/grid-master-quest-song-of-the-elves.png';
import questTheFinalDawn from '../images/grid-master-quest-the-final-dawn.png';
import questWhileGuthixSleeps from '../images/grid-master-quest-while-guthix-sleeps.png';
import relicBankHeist from '../images/grid-master-relic-bank-heist.png';
import relicBankersNote from '../images/grid-master-relic-bankers-note.png';
import relicBottomlessBrew from '../images/grid-master-relic-bottomless-brew.png';
import relicCornerCutter from '../images/grid-master-relic-corner-cutter.png';
import relicCorruptedShark from '../images/grid-master-relic-corrupted-shark.png';
import relicDodgyDeals from '../images/grid-master-relic-dodgy-deals.png';
import relicFairyFlight from '../images/grid-master-relic-fairy-flight.png';
import relicFarmersFortune from '../images/grid-master-relic-farmers-fortune.png';
import relicFriendlyForager from '../images/grid-master-relic-friendly-forager.png';
import relicGathering from '../images/grid-master-relic-gathering.png';
import relicGoldenGod from '../images/grid-master-relic-golden-god.png';
import relicGrimoire from '../images/grid-master-relic-grimoire.png';
import relicGuardian from '../images/grid-master-relic-guardian.png';
import relicLastStand from '../images/grid-master-relic-last-stand.png';
import relicMinimumPotential from '../images/grid-master-relic-minimum-potential.png';
import relicProductionMaster from '../images/grid-master-relic-production-master.png';
import relicSpikeyAura from '../images/grid-master-relic-spikey-aura.png';
import relicSlayerMaster from '../images/grid-master-relic-slayer-master.png';
import relicSpecialist from '../images/grid-master-relic-specialist.png';
import relicTotalRecall from '../images/grid-master-relic-total-recall.png';
import rewardCombatMasteries from '../images/grid-master-reward-combat-masteries.png';
import rewardUnknown from '../images/grid-master-reward-unknown.png';
import rewardXp from '../images/grid-master-reward-xp.png';
import rewardXpMultiplier from '../images/grid-master-reward-xp-multiplier.png';
import taskGemstoneCrab from '../images/grid-master-task-gemstone-crab.png';
import taskInferno from '../images/grid-master-task-inferno.png';
import taskJalZek from '../images/grid-master-task-jal-zek.png';
import taskLesserDemon from '../images/grid-master-task-lesser-demon.png';
import taskOgress from '../images/grid-master-task-ogress.png';
import taskTutorial from '../images/grid-master-task-tutorial.png';
import taskUnknown from '../images/grid-master-task-unknown.png';

type GridMasterTileImageProps = {
  cell: string;
  icon?: string;
  type: 'task' | 'task-reward' | 'reward';
  unknown?: boolean;
} & Omit<React.ComponentProps<'img'>, 'width' | 'height'>;

export default function GridMasterTileImage({
  cell,
  icon,
  type,
  unknown = false,
  ...rest
}: GridMasterTileImageProps) {
  if (icon && !unknown) {
    return (
      <WikiIcon
        className={classNames(rest.className, {
          smooth: icon.includes('_detail'),
        })}
        icon={icon}
        size={48}
      />
    );
  }
  return (
    <span
      className={classNames(
        'inline-flex justify-center align-center shrink-0',
        rest.className,
      )}
      style={{ ...rest.style, width: 56, height: 56 }}
      {...rest}
    >
      <img
        alt=""
        aria-hidden
        className="object-contain w-full h-full"
        src={
          unknown
            ? type === 'reward'
              ? rewardUnknown
              : taskUnknown
            : type === 'reward' || type === 'task-reward'
              ? rewards[cell] || rewardUnknown
              : tasks[cell] || taskUnknown
        }
      />
    </span>
  );
}

const tasks: Record<string, any> = {
  D1: taskOgress,
  D4: taskTutorial,
  D7: taskLesserDemon,
  E1: taskJalZek,
  E5: taskGemstoneCrab,
  G2: taskInferno,
};

const rewards: Record<string, any> = {
  A3: relicGoldenGod,
  A4: relicProductionMaster,
  A5: relicGrimoire,
  B1: relicSpecialist,
  B2: rewardXpMultiplier,
  B3: rewardXpMultiplier,
  B4: relicDodgyDeals,
  B5: questDragonSlayer,
  C2: questWhileGuthixSleeps,
  C3: relicBankHeist,
  C4: relicCornerCutter,
  C6: relicTotalRecall,
  C7: relicSpikeyAura,
  C8: rewardCombatMasteries,
  D2: rewardXp,
  D3: relicGathering,
  D4: relicGathering,
  D5: relicGathering,
  D6: rewardCombatMasteries,
  D7: relicMinimumPotential,
  D8: rewardXpMultiplier,
  E1: relicSlayerMaster,
  E2: relicCorruptedShark,
  E3: rewardCombatMasteries,
  E4: relicFairyFlight,
  E6: relicFarmersFortune,
  E7: rewardXp,
  E8: rewardCombatMasteries,
  F1: relicLastStand,
  F2: questMonkeyMadness,
  F3: questSongOfTheElves,
  F4: questSinsOfTheFather,
  F5: relicBottomlessBrew,
  F6: questDesertTreasure,
  F7: rewardXpMultiplier,
  G2: relicGuardian,
  G3: relicBankersNote,
  G4: relicFriendlyForager,
  G5: questTheFinalDawn,
  R3: rewardCombatMasteries,
  R4: rewardXpMultiplier,
  R5: rewardCombatMasteries,
};
