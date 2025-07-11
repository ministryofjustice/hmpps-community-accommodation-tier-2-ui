/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Application } from './Application';
import type { ApplicationOrigin } from './ApplicationOrigin';
import type { ApplicationStatus } from './ApplicationStatus';
import type { Cas2Assessment } from './Cas2Assessment';
import type { Cas2TimelineEvent } from './Cas2TimelineEvent';
import type { ExternalUserEntity } from './ExternalUserEntity';
import type { NomisUser } from './NomisUser';
import type { NomisUserEntity } from './NomisUserEntity';
export type Cas2Application = (Application & {
    allocatedPomEmailAddress?: string;
    allocatedPomName?: string;
    applicationOrigin?: ApplicationOrigin;
    assessment?: Cas2Assessment;
    assignmentDate?: string;
    bailHearingDate?: string;
    cas2CreatedBy?: (ExternalUserEntity | NomisUserEntity);
    createdBy?: NomisUser;
    currentPrisonName?: string;
    /**
     * Any object
     */
    data?: any;
    /**
     * Any object
     */
    document?: any;
    isTransferredApplication?: boolean;
    omuEmailAddress?: string;
    status?: ApplicationStatus;
    submittedAt?: string;
    telephoneNumber?: string;
    timelineEvents?: Array<Cas2TimelineEvent>;
} & {
    createdBy: NomisUser;
    isTransferredApplication: boolean;
    status: ApplicationStatus;
});

