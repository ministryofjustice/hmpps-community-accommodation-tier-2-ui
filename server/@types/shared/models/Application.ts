/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FullPerson } from './FullPerson';
import type { RestrictedPerson } from './RestrictedPerson';
import type { UnknownPerson } from './UnknownPerson';
export type Application = {
    createdAt: string;
    id: string;
    person: (FullPerson | RestrictedPerson | UnknownPerson);
    type: string;
};

