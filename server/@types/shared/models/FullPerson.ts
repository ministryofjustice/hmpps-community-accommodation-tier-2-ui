/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Person } from './Person';
import type { PersonStatus } from './PersonStatus';
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
    status: PersonStatus;
    prisonName?: string;
    isRestricted?: boolean;
});

