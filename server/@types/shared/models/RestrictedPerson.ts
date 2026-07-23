/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Person } from './Person';
import type { TierDto } from './TierDto';
export type RestrictedPerson = (Person & {
    /**
     * The person's current tier, if available
     */
    tier?: TierDto;
});

