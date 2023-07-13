/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PremisesSummary } from './PremisesSummary';

export type TemporaryAccommodationPremisesSummary = (PremisesSummary & {
    pdu?: string;
} & {
    pdu: string;
});

