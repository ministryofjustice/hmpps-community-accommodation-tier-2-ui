/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DepartureReason } from './DepartureReason';
import type { DestinationProvider } from './DestinationProvider';
import type { MoveOnCategory } from './MoveOnCategory';
export type Departure = {
    id: string;
    bookingId: string;
    dateTime: string;
    reason: DepartureReason;
    notes?: string;
    moveOnCategory: MoveOnCategory;
    destinationProvider?: DestinationProvider;
    createdAt: string;
};

