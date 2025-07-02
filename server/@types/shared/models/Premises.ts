/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApArea } from './ApArea';
import type { Characteristic } from './Characteristic';
import type { LocalAuthorityArea } from './LocalAuthorityArea';
import type { ProbationRegion } from './ProbationRegion';
import type { PropertyStatus } from './PropertyStatus';
export type Premises = {
    addressLine1: string;
    addressLine2?: string;
    apArea: ApArea;
    availableBedsForToday: number;
    bedCount: number;
    characteristics?: Array<Characteristic>;
    id: string;
    localAuthorityArea?: LocalAuthorityArea;
    name: string;
    notes?: string;
    postcode: string;
    probationRegion: ProbationRegion;
    service: string;
    status: PropertyStatus;
    town?: string;
};

