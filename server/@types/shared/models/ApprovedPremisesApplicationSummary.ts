/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationStatus } from './ApplicationStatus';
import type { ApplicationSummary } from './ApplicationSummary';
import type { PersonRisks } from './PersonRisks';

export type ApprovedPremisesApplicationSummary = (ApplicationSummary & {
    isWomensApplication?: boolean;
    isPipeApplication?: boolean;
    arrivalDate?: string;
    risks?: PersonRisks;
    createdByUserId: string;
    status: ApplicationStatus;
});

