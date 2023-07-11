/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Assessment } from './Assessment';
import type { TemporaryAccommodationApplication } from './TemporaryAccommodationApplication';
import type { TemporaryAccommodationUser } from './TemporaryAccommodationUser';

export type TemporaryAccommodationAssessment = (Assessment & {
    application: TemporaryAccommodationApplication;
    allocatedToStaffMember?: TemporaryAccommodationUser;
});

