/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationStatus } from './ApplicationStatus';
import type { ApplicationSummary } from './ApplicationSummary';
import type { PersonRisks } from './PersonRisks';

export type TemporaryAccommodationApplicationSummary = (ApplicationSummary & {
    createdByUserId: string;
    status: ApplicationStatus;
    risks?: PersonRisks;
});

