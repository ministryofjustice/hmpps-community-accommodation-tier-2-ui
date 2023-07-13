/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BedOccupancyEntry } from './BedOccupancyEntry';

export type BedOccupancyRange = {
    bedId: string;
    bedName: string;
    schedule: Array<BedOccupancyEntry>;
};

