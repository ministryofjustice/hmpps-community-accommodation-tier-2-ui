/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Assessment } from './Assessment';
import type { TemporaryAccommodationApplication } from './TemporaryAccommodationApplication';
import type { TemporaryAccommodationAssessmentStatus } from './TemporaryAccommodationAssessmentStatus';
import type { TemporaryAccommodationUser } from './TemporaryAccommodationUser';
export type TemporaryAccommodationAssessment = (Assessment & {
    accommodationRequiredFromDate?: string;
    allocatedToStaffMember?: TemporaryAccommodationUser;
    application?: TemporaryAccommodationApplication;
    releaseDate?: string;
    status?: TemporaryAccommodationAssessmentStatus;
    /**
     * Any object
     */
    summaryData?: any;
} & {
    application: TemporaryAccommodationApplication;
    /**
     * Any object
     */
    summaryData: any;
});

