import '../styles/area-badge.css';
import classNames from 'classnames';
import React from 'react';
import badgeAsgarnia from '../images/badge-asgarnia.png';
import badgeDesert from '../images/badge-desert.png';
import badgeFremennik from '../images/badge-fremennik.png';
import badgeKandarin from '../images/badge-kandarin.png';
import badgeKaramja from '../images/badge-karamja.png';
import badgeKourend from '../images/badge-kourend.png';
import badgeMisthalin from '../images/badge-misthalin.png';
import badgeMorytania from '../images/badge-morytania.png';
import badgeTirannwn from '../images/badge-tirannwn.png';
import badgeVarlamore from '../images/badge-varlamore.png';
import badgeWilderness from '../images/badge-wilderness.png';
import type { Region, RegionId } from '../types/region';

type AreaBadgeProps = {
  region: Region;
  deselected?: boolean;
  hideText?: boolean;
  selected?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function AreaBadge({
  region,
  deselected,
  hideText,
  selected,
  ...rest
}: AreaBadgeProps) {
  const image = Badges[region.id].image;
  if (!image) return null;
  return (
    <div
      {...rest}
      aria-label={`${region.name} Area Badge`}
      className={classNames('area-badge', { selected, deselected })}
      id={region.id}
    >
      {!hideText && (
        <span
          className="area-badge__text"
          style={{ backgroundColor: Badges[region.id].backgroundColor }}
        >
          {region.name}
        </span>
      )}
      <img alt="" aria-hidden className="area-badge__image" src={image} />
    </div>
  );
}

interface BadgeRecord {
  image: string | null;
  backgroundColor: string;
}

export const Badges: Record<RegionId, BadgeRecord> = Object.freeze({
  asgarnia: { image: badgeAsgarnia, backgroundColor: '#0c58ca' },
  desert: { image: badgeDesert, backgroundColor: '#be2633' },
  fremennik: { image: badgeFremennik, backgroundColor: '#664c38' },
  kandarin: { image: badgeKandarin, backgroundColor: '#be2633' },
  karamja: { image: badgeKaramja, backgroundColor: '#178c51' },
  kourend: { image: badgeKourend, backgroundColor: '#178c51' },
  misthalin: { image: badgeMisthalin, backgroundColor: '#0c58ca' },
  morytania: { image: badgeMorytania, backgroundColor: '#005784' },
  tirannwn: { image: badgeTirannwn, backgroundColor: '#178c51' },
  varlamore: { image: badgeVarlamore, backgroundColor: '#f9e30c' },
  wilderness: { image: badgeWilderness, backgroundColor: '#4a4a4a' },
  sailing: { image: null, backgroundColor: 'transparent' },
});
