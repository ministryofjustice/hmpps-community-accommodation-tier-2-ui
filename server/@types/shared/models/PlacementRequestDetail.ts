/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Application } from './Application';
import type { Cancellation } from './Cancellation';
import type { Cas1SpaceBookingSummary } from './Cas1SpaceBookingSummary';
import type { PlacementRequest } from './PlacementRequest';
import type { PlacementRequestBookingSummary } from './PlacementRequestBookingSummary';
export type PlacementRequestDetail = (PlacementRequest & {
    /**
     * Not used by UI. Space Booking cancellations to be provided if cancellations are required in future.
     * @deprecated
     */
    cancellations: Array<Cancellation>;
    application: Application;
    /**
     * The legacy booking associated with this placement request
     */
    legacyBooking?: PlacementRequestBookingSummary;
    /**
     * The space bookings associated with this placement request
     */
    spaceBookings: Array<Cas1SpaceBookingSummary>;
});

