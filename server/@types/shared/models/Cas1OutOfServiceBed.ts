/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas1OutOfServiceBedCancellation } from './Cas1OutOfServiceBedCancellation';
import type { Cas1OutOfServiceBedReason } from './Cas1OutOfServiceBedReason';
import type { Cas1OutOfServiceBedRevision } from './Cas1OutOfServiceBedRevision';
import type { Cas1OutOfServiceBedStatus } from './Cas1OutOfServiceBedStatus';
import type { NamedId } from './NamedId';
import type { Temporality } from './Temporality';
export type Cas1OutOfServiceBed = {
    id: string;
    createdAt: string;
    startDate: string;
    endDate: string;
    bed: NamedId;
    room: NamedId;
    premises: NamedId;
    apArea: NamedId;
    reason: Cas1OutOfServiceBedReason;
    referenceNumber?: string;
    notes?: string;
    daysLostCount: number;
    temporality: Temporality;
    status: Cas1OutOfServiceBedStatus;
    cancellation?: Cas1OutOfServiceBedCancellation | null;
    revisionHistory: Array<Cas1OutOfServiceBedRevision>;
};

