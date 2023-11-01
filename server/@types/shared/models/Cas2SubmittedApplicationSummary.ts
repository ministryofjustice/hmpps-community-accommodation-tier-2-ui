/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationStatus } from './ApplicationStatus';
import type { Person } from './Person';

export type Cas2SubmittedApplicationSummary = {
    id: string;
    createdByUserId: string;
    status: ApplicationStatus;
    person: Person;
    createdAt: string;
    submittedAt?: string;
};

