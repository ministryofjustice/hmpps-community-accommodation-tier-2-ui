/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationOrigin } from './ApplicationOrigin';
import type { ApplicationStatus } from './ApplicationStatus';
import type { Cas2Assessment } from './Cas2Assessment';
import type { Cas2TimelineEvent } from './Cas2TimelineEvent';
import type { FullPerson } from './FullPerson';
import type { NomisUser } from './NomisUser';
import type { RestrictedPerson } from './RestrictedPerson';
import type { UnknownPerson } from './UnknownPerson';
export type Cas2Application = {
    allocatedPomEmailAddress?: string;
    allocatedPomName?: string;
    applicationOrigin?: ApplicationOrigin;
    assessment?: Cas2Assessment;
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

