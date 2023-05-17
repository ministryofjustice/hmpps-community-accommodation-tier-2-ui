/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationStatus } from './ApplicationStatus';
import type { ApplicationSummary } from './ApplicationSummary';

export type TemporaryAccommodationApplicationSummary = (ApplicationSummary & {
    createdByUserId: string;
    status: ApplicationStatus;
});

