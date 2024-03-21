/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnyValue } from './AnyValue';
import type { Application } from './Application';
import type { ApplicationStatus } from './ApplicationStatus';
import type { PersonRisks } from './PersonRisks';
export type TemporaryAccommodationApplication = (Application & {
    createdByUserId: string;
    schemaVersion: string;
    outdatedSchema: boolean;
    data?: AnyValue;
    document?: AnyValue;
    status: ApplicationStatus;
    risks?: PersonRisks;
    submittedAt?: string;
    arrivalDate?: string;
    offenceId: string;
});

