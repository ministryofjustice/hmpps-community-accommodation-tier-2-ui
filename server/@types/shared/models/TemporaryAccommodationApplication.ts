/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Application } from './Application';
import type { ApplicationStatus } from './ApplicationStatus';
import type { PersonRisks } from './PersonRisks';
export type TemporaryAccommodationApplication = (Application & {
    arrivalDate?: string;
    assessmentId?: string;
    createdByUserId?: string;
    /**
     * Any object
     */
    data?: any;
    /**
     * Any object
     */
    document?: any;
    offenceId?: string;
    outdatedSchema?: boolean;
    risks?: PersonRisks;
    schemaVersion?: string;
    status?: ApplicationStatus;
    submittedAt?: string;
} & {
    createdByUserId: string;
    offenceId: string;
    outdatedSchema: boolean;
    schemaVersion: string;
    status: ApplicationStatus;
});

