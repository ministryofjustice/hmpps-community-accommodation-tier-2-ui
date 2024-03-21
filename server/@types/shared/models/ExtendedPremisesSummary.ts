/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DateCapacity } from './DateCapacity';
import type { PremisesBooking } from './PremisesBooking';
export type ExtendedPremisesSummary = {
    id?: string;
    name?: string;
    apCode?: string;
    postcode?: string;
    bedCount?: number;
    availableBedsForToday?: number;
    bookings?: Array<PremisesBooking>;
    dateCapacities?: Array<DateCapacity>;
};

