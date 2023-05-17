/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnyValue } from './AnyValue';
import type { Application } from './Application';
import type { ApplicationStatus } from './ApplicationStatus';

export type TemporaryAccommodationApplication = (Application & {
    createdByUserId: string;
    schemaVersion: string;
    outdatedSchema: boolean;
    data?: AnyValue;
    document?: AnyValue;
    status: ApplicationStatus;
});

