/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Application } from './Application';
import type { Cancellation } from './Cancellation';
import type { PlacementRequest } from './PlacementRequest';
export type PlacementRequestDetail = (PlacementRequest & {
    /**
     * Not used by UI. Space Booking cancellations to be provided if cancellations are required in future.
     * @deprecated
     */
    cancellations: Array<Cancellation>;
    application: Application;
});

