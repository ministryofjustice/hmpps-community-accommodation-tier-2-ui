/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApArea } from './ApArea';
import type { ApprovedPremisesUserRole } from './ApprovedPremisesUserRole';
import type { NamedId } from './NamedId';
import type { User } from './User';
import type { UserQualification } from './UserQualification';
/**
 * This should be changed to embed the user as a property of this type, instead of 'extending' User. Currently this causes unmarshalling issues in integration tests, if using Jackson, due to discriminators not being logically correct
 */
export type UserWithWorkload = (User & {
    numTasksPending?: number;
    numTasksCompleted7Days?: number;
    numTasksCompleted30Days?: number;
    qualifications?: Array<UserQualification>;
    roles?: Array<ApprovedPremisesUserRole>;
    /**
     * This is deprecated. Used cruManagementArea instead as this is used to group task management
     * @deprecated
     */
    apArea?: ApArea;
    cruManagementArea?: NamedId;
});

