/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationOrigin } from './ApplicationOrigin';
import type { ApplicationStatus } from './ApplicationStatus';
import type { LatestCas2StatusUpdate } from './LatestCas2StatusUpdate';
import type { PersonRisks } from './PersonRisks';
export type Cas2ApplicationSummary = {
    allocatedPomName: string;
    allocatedPomUserId: string;
    applicationOrigin?: ApplicationOrigin;
    assignmentDate: string;
    bailHearingDate?: string;
    createdAt: string;
    createdByUserId: string;
    createdByUserName?: string;
    crn: string;
    currentPrisonName?: string;
    hdcEligibilityDate?: string;
    id: string;
    latestStatusUpdate?: LatestCas2StatusUpdate;
    nomsNumber: string;
    personName: string;
    risks?: PersonRisks;
    status: ApplicationStatus;
    submittedAt?: string;
    type: string;
};

