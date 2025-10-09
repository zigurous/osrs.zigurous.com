import React from 'react';
import WikiIcon from './WikiIcon';
import unknown from '../images/grid-master-unknown-task.png';
import tileD1 from '../images/grid-master-D1.png';
import tileD4 from '../images/grid-master-D4.png';
import tileD7 from '../images/grid-master-D7.png';
import tileE1 from '../images/grid-master-E1.png';
import tileE5 from '../images/grid-master-E5.png';
import tileG2 from '../images/grid-master-G2.png';
import tileA4R from '../images/grid-master-A4R.png';
import tileC7R from '../images/grid-master-C7R.png';
import tileD4R from '../images/grid-master-D4R.png';
import tileD7R from '../images/grid-master-D7R.png';
import tileE1R from '../images/grid-master-E1R.png';
import tileE2R from '../images/grid-master-E2R.png';
import tileG2R from '../images/grid-master-G2R.png';

type GridMasterTileImageProps = {
  cell: string;
  icon?: string;
  type: 'task' | 'reward';
} & Omit<React.ComponentProps<'img'>, 'width' | 'height'>;

export default function GridMasterTileImage({
  cell,
  icon,
  type,
  ...rest
}: GridMasterTileImageProps) {
  if (icon) {
    return <WikiIcon className={rest.className} icon={icon} size={48} />;
  } else {
    const image =
      type === 'task' ? tasks[cell] || unknown : rewards[cell] || unknown;
    if (!image) return null;
    return <img {...rest} width={56} height={56} src={image} />;
  }
}

const tasks: Record<string, any> = {
  D1: tileD1,
  D4: tileD4,
  D7: tileD7,
  E1: tileE1,
  E5: tileE5,
  G2: tileG2,
};

const rewards: Record<string, any> = {
  A4: tileA4R,
  C7: tileC7R,
  D4: tileD4R,
  D7: tileD7R,
  E1: tileE1R,
  E2: tileE2R,
  G2: tileG2R,
};
