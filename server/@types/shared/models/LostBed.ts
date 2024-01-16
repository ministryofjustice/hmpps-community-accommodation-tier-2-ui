/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LostBedCancellation } from './LostBedCancellation';
import type { LostBedReason } from './LostBedReason';
import type { LostBedStatus } from './LostBedStatus';
export type LostBed = {
    id: string;
    startDate: string;
    endDate: string;
    bedId: string;
    bedName: string;
    roomName: string;
    reason: LostBedReason;
    referenceNumber?: string;
    notes?: string;
    status: LostBedStatus;
    cancellation?: LostBedCancellation | null;
};

