import classNames from 'classnames';
import { navigate } from 'gatsby';
import React, { useEffect, useRef, useState } from 'react';
import AreaBadge from './AreaBadge';
import WorldMapSVG from './WorldMapSVG';
import { useRegionsContext } from '../context';
import '../styles/world-map.css';

const MAP_SIZE = { width: 463, height: 215 };

export default function WorldMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const { regions, selectedRegion } = useRegionsContext();

  const [observer] = useState(
    () =>
      new ResizeObserver((entries: ResizeObserverEntry[]) => {
        setScale(entries[0].contentRect.width / MAP_SIZE.width);
      }),
  );

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return (
    <div
      className={classNames(
        'world-map',
        {
          selected: !!selectedRegion,
        },
        selectedRegion?.id,
      )}
      ref={ref}
    >
      <div
        className="world-map__container"
        style={{
          width: MAP_SIZE.width,
          height: MAP_SIZE.height,
          transform: `translate(-50%, -50%) scale(${scale * 0.8})`,
        }}
      >
        <WorldMapSVG
          className="world-map__image"
          width={MAP_SIZE.width}
          height={MAP_SIZE.height}
          onClick={e => {
            const target = e.target as HTMLElement;
            const regionId = target.parentElement?.id;
            if (regionId) {
              /* @ts-ignore */
              navigate(
                regionId === selectedRegion?.id ? '' : `?region=${regionId}`,
                {
                  replace: true,
                },
              );
            }
          }}
        />
        <div className="world-map__badges">
          {regions.map(region => {
            const selected = Boolean(selectedRegion?.id === region.id);
            return (
              <AreaBadge
                key={region.id}
                region={region}
                selected={selected}
                deselected={!selected && !!selectedRegion}
                onClick={() => {
                  /* @ts-ignore */
                  navigate(selected ? '' : `?region=${region.id}`, {
                    replace: true,
                  });
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
