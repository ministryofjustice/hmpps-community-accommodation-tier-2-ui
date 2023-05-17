/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PropertyStatus } from './PropertyStatus';

export type PremisesSummary = {
    id: string;
    name: string;
    addressLine1: string;
    addressLine2?: string;
    postcode: string;
    bedCount: number;
    status: PropertyStatus;
};

