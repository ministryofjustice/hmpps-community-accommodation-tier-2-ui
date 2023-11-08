/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnyValue } from './AnyValue';
import type { ApplicationStatus } from './ApplicationStatus';
import type { NomisUser } from './NomisUser';
import type { Person } from './Person';

export type Cas2SubmittedApplication = {
    id: string;
    person: Person;
    createdAt: string;
    submittedBy?: NomisUser;
    schemaVersion: string;
    outdatedSchema: boolean;
    document?: AnyValue;
    status: ApplicationStatus;
    submittedAt?: string;
};

