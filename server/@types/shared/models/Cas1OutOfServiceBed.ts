/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas1OutOfServiceBedCancellation } from './Cas1OutOfServiceBedCancellation';
import type { Cas1OutOfServiceBedReason } from './Cas1OutOfServiceBedReason';
import type { Cas1OutOfServiceBedStatus } from './Cas1OutOfServiceBedStatus';
export type Cas1OutOfServiceBed = {
    id: string;
    createdAt: string;
    startDate: string;
    endDate: string;
    bedId: string;
    bedName: string;
    roomName: string;
    reason: Cas1OutOfServiceBedReason;
    referenceNumber?: string;
    notes?: string;
    status: Cas1OutOfServiceBedStatus;
    cancellation?: Cas1OutOfServiceBedCancellation | null;
};

