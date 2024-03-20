/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Application } from './Application';
import type { Cancellation } from './Cancellation';
import type { PlacementRequest } from './PlacementRequest';
export type PlacementRequestDetail = (PlacementRequest & {
    cancellations: Array<Cancellation>;
    application: Application;
});

