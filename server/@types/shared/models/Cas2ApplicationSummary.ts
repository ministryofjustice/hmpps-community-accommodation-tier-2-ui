/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationStatus } from './ApplicationStatus';
import type { LatestCas2StatusUpdate } from './LatestCas2StatusUpdate';
import type { PersonRisks } from './PersonRisks';
export type Cas2ApplicationSummary = {
    type: string;
    id: string;
    createdAt: string;
    submittedAt?: string;
    createdByUserId: string;
    createdByUserName?: string;
    status: ApplicationStatus;
    latestStatusUpdate?: LatestCas2StatusUpdate;
    risks?: PersonRisks;
    hdcEligibilityDate?: string;
    personName: string;
    crn: string;
    nomsNumber: string;
};

