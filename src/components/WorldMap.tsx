import '../styles/world-map.css';
import { Button, PanAndZoomProvider, PanAndZoomTransform } from '@zigurous/forge-react'; // prettier-ignore
import classNames from 'classnames';
import React from 'react';
import AreaBadge from './AreaBadge';
import WorldMapSVG from './WorldMapSVG';
import { useRegionsContext } from '../context';
import { useAspectFitScaling } from '../hooks';
import type { RegionId } from '../types';

const MAP_SIZE = { width: 463, height: 215 };

export default function WorldMap() {
  const context = useRegionsContext();
  const [ref, scale] = useAspectFitScaling(MAP_SIZE.width, MAP_SIZE.height);
  return (
    <PanAndZoomProvider
      className={classNames(
        'world-map',
        {
          selected:
            context.selectedRegions.length > 0 || context.multiRegionMode,
        },
        context.selectedRegions,
      )}
      ref={ref}
    >
      {(_, panning, resetMap) => (
        <>
          <PanAndZoomTransform>
            <div
              className="world-map__container"
              style={{
                width: MAP_SIZE.width,
                height: MAP_SIZE.height,
                transform: scale
                  ? `translate(-50%, -50%) scale(${scale * 0.8})`
                  : undefined,
              }}
            >
              <WorldMapSVG
                className="world-map__image"
                width={MAP_SIZE.width}
                height={MAP_SIZE.height}
                onClick={e => {
                  if (panning.current) return;
                  const target = e.target as HTMLElement;
                  const regionId = target.parentElement?.id as
                    | RegionId
                    | undefined;
                  if (regionId) {
                    if (context.selectedRegions.includes(regionId)) {
                      context.deselectRegion(regionId);
                    } else {
                      context.selectRegion(regionId);
                    }
                  }
                }}
              />
              <div className="world-map__badges">
                {context.regions.map(region => {
                  const selected = context.selectedRegions.includes(region.id);
                  return (
                    <AreaBadge
                      key={region.id}
                      region={region}
                      selected={selected}
                      deselected={
                        !selected &&
                        (context.selectedRegions.length > 0 ||
                          context.multiRegionMode)
                      }
                      onClick={() => {
                        if (!panning.current) {
                          if (selected) {
                            context.deselectRegion(region.id);
                          } else {
                            context.selectRegion(region.id);
                          }
                        }
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </PanAndZoomTransform>
          <Button
            className="world-map__reset-button"
            icon="zoom_out_map"
            iconAlignment="only"
            onClick={resetMap}
            size="lg"
            variant="unstyled"
          />
        </>
      )}
    </PanAndZoomProvider>
  );
}
