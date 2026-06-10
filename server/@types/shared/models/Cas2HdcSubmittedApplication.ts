/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas2HdcAssessment } from './Cas2HdcAssessment';
import type { Cas2TimelineEvent } from './Cas2TimelineEvent';
import type { FullPerson } from './FullPerson';
import type { NomisUser } from './NomisUser';
import type { RestrictedPerson } from './RestrictedPerson';
import type { UnknownPerson } from './UnknownPerson';
export type Cas2HdcSubmittedApplication = {
    allocatedPomEmailAddress?: string;
    allocatedPomName?: string;
    assessment: Cas2HdcAssessment;
    assignmentDate?: string;
    createdAt: string;
    currentPrisonName?: string;
    document?: any;
    id: string;
    isTransferredApplication: boolean;
    omuEmailAddress?: string;
    person: (FullPerson | RestrictedPerson | UnknownPerson);
    submittedAt?: string;
    submittedBy?: NomisUser;
    telephoneNumber?: string;
    timelineEvents: Array<Cas2TimelineEvent>;
};

