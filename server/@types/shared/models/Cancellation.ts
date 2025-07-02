/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancellationReason } from './CancellationReason';
export type Cancellation = {
    bookingId: string;
    createdAt: string;
    date: string;
    id?: string;
    notes?: string;
    otherReason?: string;
    premisesName: string;
    reason: CancellationReason;
};

