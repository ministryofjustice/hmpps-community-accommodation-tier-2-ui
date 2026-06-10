/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationOrigin } from './ApplicationOrigin';
import type { ApplicationStatus } from './ApplicationStatus';
import type { Cas2HdcAssessment } from './Cas2HdcAssessment';
import type { Cas2TimelineEvent } from './Cas2TimelineEvent';
import type { FullPerson } from './FullPerson';
import type { NomisUser } from './NomisUser';
import type { RestrictedPerson } from './RestrictedPerson';
import type { UnknownPerson } from './UnknownPerson';
export type Cas2HdcApplication = {
    allocatedPomEmailAddress?: string;
    allocatedPomName?: string;
    applicationOrigin?: ApplicationOrigin;
    assessment?: Cas2HdcAssessment;
    assignmentDate?: string;
    bailHearingDate?: string;
    createdAt: string;
    createdBy: NomisUser;
    currentPrisonName?: string;
    data?: any;
    document?: any;
    id: string;
    isTransferredApplication: boolean;
    omuEmailAddress?: string;
    person: (FullPerson | RestrictedPerson | UnknownPerson);
    status: ApplicationStatus;
    submittedAt?: string;
    telephoneNumber?: string;
    timelineEvents?: Array<Cas2TimelineEvent>;
    type: string;
};

