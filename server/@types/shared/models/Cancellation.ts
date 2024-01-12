/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancellationReason } from './CancellationReason';
export type Cancellation = {
    id?: string;
    bookingId: string;
    date: string;
    reason: CancellationReason;
    notes?: string;
    createdAt: string;
    premisesName: string;
};

