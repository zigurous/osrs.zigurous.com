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
import relicCorruptedShark from '../images/grid-master-relic-corrupted-shark.png';
import relicGathering from '../images/grid-master-relic-gathering.png';
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
        draggable={false}
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
      draggable={false}
      style={{ ...rest.style, width: 48, height: 48 }}
      {...rest}
    >
      <img
        alt=""
        aria-hidden
        className="object-contain w-full h-full"
        draggable={false}
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
  B2: rewardXpMultiplier,
  B3: rewardXpMultiplier,
  B5: questDragonSlayer,
  C2: questWhileGuthixSleeps,
  C8: rewardCombatMasteries,
  D2: rewardXp,
  D3: relicGathering,
  D4: relicGathering,
  D5: relicGathering,
  D6: rewardCombatMasteries,
  D8: rewardXpMultiplier,
  E2: relicCorruptedShark,
  E3: rewardCombatMasteries,
  E7: rewardXp,
  E8: rewardCombatMasteries,
  F2: questMonkeyMadness,
  F3: questSongOfTheElves,
  F4: questSinsOfTheFather,
  F6: questDesertTreasure,
  F7: rewardXpMultiplier,
  G5: questTheFinalDawn,
  R3: rewardCombatMasteries,
  R4: rewardXpMultiplier,
  R5: rewardCombatMasteries,
};
