/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Person } from './Person';

export type ApplicationSummary = {
    id: string;
    person: Person;
    createdAt: string;
    submittedAt?: string;
};

