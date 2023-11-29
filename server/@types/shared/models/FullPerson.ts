/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Person } from './Person';

export type FullPerson = (Person & {
    name: string;
    dateOfBirth: string;
    nomsNumber?: string;
    pncNumber?: string;
    ethnicity?: string;
    nationality?: string;
    religionOrBelief?: string;
    sex: string;
    genderIdentity?: string;
    status: 'InCustody' | 'InCommunity' | 'Unknown';
    prisonName?: string;
    isRestricted?: boolean;
});

