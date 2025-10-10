import { processGearProgressionData } from '../utils/gear-progression';
import type { GearProgressionWorkerInput } from '../types/gear-progression';

self.onmessage = (e: MessageEvent<GearProgressionWorkerInput>) => {
  postMessage(processGearProgressionData(e.data));
};

export {};
