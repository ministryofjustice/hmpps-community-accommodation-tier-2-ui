/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PremisesSummary } from './PremisesSummary';

export type ApprovedPremisesSummary = (PremisesSummary & {
    apCode?: string;
} & {
    apCode: string;
});

