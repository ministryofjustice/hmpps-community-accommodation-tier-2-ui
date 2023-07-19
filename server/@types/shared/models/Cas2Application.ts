/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnyValue } from './AnyValue';
import type { Application } from './Application';
import type { ApplicationStatus } from './ApplicationStatus';
import type { PersonRisks } from './PersonRisks';

export type Cas2Application = (Application & {
    arrivalDate?: string;
    risks?: PersonRisks;
    createdByUserId: string;
    schemaVersion: string;
    outdatedSchema: boolean;
    data?: AnyValue;
    document?: AnyValue;
    status: ApplicationStatus;
    submittedAt?: string;
});

