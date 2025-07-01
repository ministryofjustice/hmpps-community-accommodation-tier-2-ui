/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApArea } from './ApArea';
import type { ApprovedPremisesUserRole } from './ApprovedPremisesUserRole';
import type { NamedId } from './NamedId';
import type { ProbationDeliveryUnit } from './ProbationDeliveryUnit';
import type { ProbationRegion } from './ProbationRegion';
import type { UserQualification } from './UserQualification';
export type UserWithWorkload = {
    /**
     * This is deprecated. Used cruManagementArea instead as this is used to group task management
     * @deprecated
     */
    apArea?: ApArea;
    cruManagementArea?: NamedId;
    deliusUsername: string;
    email?: string;
    id: string;
    isActive?: boolean;
    name: string;
    numTasksCompleted30Days?: number;
    numTasksCompleted7Days?: number;
    numTasksPending?: number;
    probationDeliveryUnit?: ProbationDeliveryUnit;
    qualifications?: Array<UserQualification>;
    region: ProbationRegion;
    roles?: Array<ApprovedPremisesUserRole>;
    service: string;
    telephoneNumber?: string;
};

