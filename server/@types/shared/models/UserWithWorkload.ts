/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApprovedPremisesUserRole } from './ApprovedPremisesUserRole';
import type { User } from './User';
import type { UserQualification } from './UserQualification';
export type UserWithWorkload = (User & {
    numAssessmentsPending?: number;
    numAssessmentsCompleted7Days?: number;
    numAssessmentsCompleted30Days?: number;
    qualifications?: Array<UserQualification>;
    roles?: Array<ApprovedPremisesUserRole>;
});

