/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BedOccupancyEntry } from './BedOccupancyEntry';

export type BedOccupancyBookingEntry = (BedOccupancyEntry & {
    bookingId: string;
    personName: string;
});

