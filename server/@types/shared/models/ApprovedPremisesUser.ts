/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApArea } from './ApArea';
import type { ApprovedPremisesUserRole } from './ApprovedPremisesUserRole';
import type { User } from './User';
import type { UserQualification } from './UserQualification';
export type ApprovedPremisesUser = (User & {
    qualifications: Array<UserQualification>;
    roles: Array<ApprovedPremisesUserRole>;
    apArea: ApArea;
});

