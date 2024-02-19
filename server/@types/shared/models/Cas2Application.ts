/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnyValue } from './AnyValue';
import type { Application } from './Application';
import type { ApplicationStatus } from './ApplicationStatus';
import type { Cas2StatusUpdate } from './Cas2StatusUpdate';
import type { Cas2TimelineEvent } from './Cas2TimelineEvent';
import type { NomisUser } from './NomisUser';
export type Cas2Application = (Application & {
    createdBy: NomisUser;
    schemaVersion: string;
    outdatedSchema: boolean;
    data?: AnyValue;
    document?: AnyValue;
    status: ApplicationStatus;
    submittedAt?: string;
    telephoneNumber?: string;
    statusUpdates?: Array<Cas2StatusUpdate>;
    timelineEvents?: Array<Cas2TimelineEvent>;
});

