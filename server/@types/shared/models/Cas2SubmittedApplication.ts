/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnyValue } from './AnyValue';
import type { ApplicationStatus } from './ApplicationStatus';
import type { Person } from './Person';

export type Cas2SubmittedApplication = {
    id: string;
    person: Person;
    createdAt: string;
    createdByUserId: string;
    schemaVersion: string;
    outdatedSchema: boolean;
    document?: AnyValue;
    status: ApplicationStatus;
    submittedAt?: string;
};

