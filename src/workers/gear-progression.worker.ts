import { processGearProgressionData } from '../utils';
import type { GearProgressionWorkerInput } from '../types';

self.onmessage = (e: MessageEvent<GearProgressionWorkerInput>) => {
  postMessage(processGearProgressionData(e.data));
};

export {};
