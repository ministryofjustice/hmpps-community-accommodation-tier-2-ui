/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApprovedPremisesApplication } from './ApprovedPremisesApplication';
import type { ApprovedPremisesAssessmentStatus } from './ApprovedPremisesAssessmentStatus';
import type { ApprovedPremisesUser } from './ApprovedPremisesUser';
import type { Assessment } from './Assessment';
export type ApprovedPremisesAssessment = (Assessment & {
    application: ApprovedPremisesApplication;
    allocatedToStaffMember?: ApprovedPremisesUser;
    status?: ApprovedPremisesAssessmentStatus;
    createdFromAppeal: boolean;
});

