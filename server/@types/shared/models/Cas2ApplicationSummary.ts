/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationStatus } from './ApplicationStatus';
import type { ApplicationSummary } from './ApplicationSummary';
import type { LatestCas2StatusUpdate } from './LatestCas2StatusUpdate';
import type { PersonRisks } from './PersonRisks';
export type Cas2ApplicationSummary = (ApplicationSummary & {
    createdByUserId: string;
    status: ApplicationStatus;
    latestStatusUpdate?: LatestCas2StatusUpdate;
    risks?: PersonRisks;
    hdcEligibilityDate?: string;
});

