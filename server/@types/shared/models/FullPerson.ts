/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Person } from './Person';
import type { PersonStatus } from './PersonStatus';
import type { TierDto } from './TierDto';
export type FullPerson = (Person & {
    dateOfBirth?: string;
    ethnicity?: string;
    genderIdentity?: string;
    isRestricted?: boolean;
    name?: string;
    nationality?: string;
    nomsNumber?: string;
    pncNumber?: string;
    prisonName?: string;
    religionOrBelief?: string;
    sex?: string;
    status?: PersonStatus;
    /**
     * The person's current tier, if available
     */
    tier?: TierDto;
} & {
    dateOfBirth: string;
    name: string;
    sex: string;
    status: PersonStatus;
});

