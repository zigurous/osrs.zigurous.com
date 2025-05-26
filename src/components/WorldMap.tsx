import { Button, usePanAndZoom } from '@zigurous/forge-react';
import classNames from 'classnames';
import { navigate } from 'gatsby';
import React, { useEffect, useRef, useState } from 'react';
import AreaBadge from './AreaBadge';
import WorldMapSVG from './WorldMapSVG';
import { useRegionsContext } from '../context';
import '../styles/world-map.css';

const MAP_SIZE = { width: 463, height: 215 };

export default function WorldMap() {
  const { regions, selectedRegion } = useRegionsContext();
  const ref = useRef<HTMLDivElement>(null);

  const [{ panX, panY, zoom }, panning, resetMap] = usePanAndZoom(ref);
  const [scale, setScale] = useState(1);
  const [observer] = useState(() =>
    typeof window !== 'undefined'
      ? new ResizeObserver((entries: ResizeObserverEntry[]) => {
          setScale(entries[0].contentRect.width / MAP_SIZE.width);
        })
      : null,
  );

  useEffect(() => {
    if (ref.current && observer) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current && observer) {
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
      {ref.current && (
        <div
          className="w-full h-full"
          style={{
            transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
            transformOrigin: '0 0',
          }}
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
                if (panning.current) return;
                const target = e.target as HTMLElement;
                const regionId = target.parentElement?.id;
                if (regionId) {
                  navigate(
                    regionId === selectedRegion?.id
                      ? '/'
                      : `/?region=${regionId}`,
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
                      if (panning.current) return;
                      navigate(selected ? '/' : `/?region=${region.id}`, {
                        replace: true,
                      });
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
      <Button
        className="world-map__reset-button"
        icon="zoom_out_map"
        iconAlignment="only"
        size="lg"
        variant="unstyled"
        onClick={resetMap}
      />
    </div>
  );
}
