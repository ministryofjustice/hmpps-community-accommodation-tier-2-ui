/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DepartureReason } from './DepartureReason';
import type { DestinationProvider } from './DestinationProvider';
import type { MoveOnCategory } from './MoveOnCategory';
export type Departure = {
    bookingId: string;
    createdAt: string;
    dateTime: string;
    destinationProvider?: DestinationProvider;
    id: string;
    moveOnCategory: MoveOnCategory;
    notes?: string;
    reason: DepartureReason;
};

