/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Application } from './Application';
import type { ApplicationOrigin } from './ApplicationOrigin';
import type { ApplicationStatus } from './ApplicationStatus';
import type { Cas2Assessment } from './Cas2Assessment';
import type { Cas2TimelineEvent } from './Cas2TimelineEvent';
import type { Cas2User } from './Cas2User';
import type { NomisUser } from './NomisUser';
import type { Unit } from './Unit';
export type Cas2Application = (Application & {
    createdBy: NomisUser;
    cas2CreatedBy?: Cas2User;
    schemaVersion: string;
    outdatedSchema: boolean;
    data?: Unit;
    document?: Unit;
    status: ApplicationStatus;
    submittedAt?: string;
    telephoneNumber?: string;
    assessment?: Cas2Assessment;
    timelineEvents?: Array<Cas2TimelineEvent>;
    allocatedPomName?: string;
    currentPrisonName?: string;
    allocatedPomEmailAddress?: string;
    omuEmailAddress?: string;
    isTransferredApplication: boolean;
    assignmentDate?: string;
    applicationOrigin?: ApplicationOrigin;
    bailHearingDate?: string;
});

