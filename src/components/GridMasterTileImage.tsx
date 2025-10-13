import classNames from 'classnames';
import React from 'react';
import WikiIcon from './WikiIcon';
import relicCorruptedShark from '../images/grid-master-relic-corrupted-shark.png';
import relicFriendlyForager from '../images/grid-master-relic-friendly-forager.png';
import relicGathering from '../images/grid-master-relic-gathering.png';
import relicGoldenGod from '../images/grid-master-relic-golden-god.png';
import relicGuardian from '../images/grid-master-relic-guardian.png';
import relicMinimumPotential from '../images/grid-master-relic-minimum-potential.png';
import relicProductionMaster from '../images/grid-master-relic-production-master.png';
import relicScarab from '../images/grid-master-relic-scarab.png';
import relicSlayerMaster from '../images/grid-master-relic-slayer-master.png';
import rewardCombatStyles from '../images/grid-master-reward-combat-styles.png';
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
  R4: rewardXpMultiplier,
  A3: relicGoldenGod,
  A4: relicProductionMaster,
  C7: relicScarab,
  D2: rewardXp,
  D3: relicGathering,
  D4: relicGathering,
  D5: relicGathering,
  D6: rewardCombatStyles,
  D7: relicMinimumPotential,
  D8: rewardXpMultiplier,
  E1: relicSlayerMaster,
  E2: relicCorruptedShark,
  G2: relicGuardian,
  G4: relicFriendlyForager,
};
