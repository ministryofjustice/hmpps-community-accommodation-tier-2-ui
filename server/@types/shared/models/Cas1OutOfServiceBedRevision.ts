/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas1OutOfServiceBedReason } from './Cas1OutOfServiceBedReason';
import type { Cas1OutOfServiceBedRevisionType } from './Cas1OutOfServiceBedRevisionType';
import type { User } from './User';
export type Cas1OutOfServiceBedRevision = {
    id: string;
    updatedAt: string;
    updatedBy?: User;
    revisionType: Array<Cas1OutOfServiceBedRevisionType>;
    startDate?: string;
    endDate?: string;
    reason?: Cas1OutOfServiceBedReason;
    referenceNumber?: string;
    notes?: string;
};

