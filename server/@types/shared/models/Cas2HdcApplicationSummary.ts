/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationOrigin } from './ApplicationOrigin';
import type { ApplicationStatus } from './ApplicationStatus';
import type { Cas2HdcLatestStatusUpdate } from './Cas2HdcLatestStatusUpdate';
export type Cas2HdcApplicationSummary = {
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
    latestStatusUpdate?: Cas2HdcLatestStatusUpdate;
    nomsNumber: string;
    personName: string;
    status: ApplicationStatus;
    submittedAt?: string;
    /**
     * This is redundant as it's no longer used as a subtype (it'll always be CAS2)
     * @deprecated
     */
    type: string;
};

