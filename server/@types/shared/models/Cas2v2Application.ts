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
import type { Unit } from './Unit';
export type Cas2v2Application = (Application & {
    createdBy: Cas2v2User;
    schemaVersion: string;
    outdatedSchema: boolean;
    data?: Unit;
    document?: Unit;
    status: ApplicationStatus;
    submittedAt?: string;
    telephoneNumber?: string;
    assessment?: Cas2v2Assessment;
    timelineEvents?: Array<Cas2TimelineEvent>;
    applicationOrigin: ApplicationOrigin;
    bailHearingDate?: string;
});

