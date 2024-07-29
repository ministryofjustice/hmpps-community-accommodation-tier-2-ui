/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnyValue } from './AnyValue';
import type { Assessment } from './Assessment';
import type { TemporaryAccommodationApplication } from './TemporaryAccommodationApplication';
import type { TemporaryAccommodationAssessmentStatus } from './TemporaryAccommodationAssessmentStatus';
import type { TemporaryAccommodationUser } from './TemporaryAccommodationUser';
export type TemporaryAccommodationAssessment = (Assessment & {
    application: TemporaryAccommodationApplication;
    allocatedToStaffMember?: TemporaryAccommodationUser;
    status?: TemporaryAccommodationAssessmentStatus;
    summaryData: AnyValue;
    releaseDate?: string;
    accommodationRequiredFromDate?: string;
});

