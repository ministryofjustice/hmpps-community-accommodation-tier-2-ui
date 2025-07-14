/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Application } from './Application';
import type { ApplicationOrigin } from './ApplicationOrigin';
import type { ApplicationStatus } from './ApplicationStatus';
import type { Cas2TimelineEvent } from './Cas2TimelineEvent';
import type { Cas2v2Assessment } from './Cas2v2Assessment';
import type { Cas2v2User } from './Cas2v2User';
export type Cas2v2Application = (Application & {
    applicationOrigin?: ApplicationOrigin;
    assessment?: Cas2v2Assessment;
    bailHearingDate?: string;
    createdBy?: Cas2v2User;
    /**
     * Any object
     */
    data?: any;
    /**
     * Any object
     */
    document?: any;
    status?: ApplicationStatus;
    submittedAt?: string;
    telephoneNumber?: string;
    timelineEvents?: Array<Cas2TimelineEvent>;
} & {
    applicationOrigin: ApplicationOrigin;
    createdBy: Cas2v2User;
    status: ApplicationStatus;
});

