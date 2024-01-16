/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnyValue } from './AnyValue';
import type { Application } from './Application';
import type { ApplicationStatus } from './ApplicationStatus';
import type { NomisUser } from './NomisUser';
export type Cas2Application = (Application & {
    createdBy: NomisUser;
    schemaVersion: string;
    outdatedSchema: boolean;
    data?: AnyValue;
    document?: AnyValue;
    status: ApplicationStatus;
    submittedAt?: string;
});

