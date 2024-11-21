/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApArea } from './ApArea';
import type { ApprovedPremisesUserPermission } from './ApprovedPremisesUserPermission';
import type { ApprovedPremisesUserRole } from './ApprovedPremisesUserRole';
import type { NamedId } from './NamedId';
import type { User } from './User';
import type { UserQualification } from './UserQualification';
export type ApprovedPremisesUser = (User & {
    qualifications: Array<UserQualification>;
    roles: Array<ApprovedPremisesUserRole>;
    permissions?: Array<ApprovedPremisesUserPermission>;
    apArea: ApArea;
    /**
     * CRU Management Area to use. This will be the same as cruManagementAreaDefault unless cruManagementAreaOverride is defined
     */
    cruManagementArea: NamedId;
    /**
     * The CRU Management Area used if no override is defined. This is provided to support the user configuration page.
     */
    cruManagementAreaDefault: NamedId;
    /**
     * The CRU Management Area manually set on this user. This is provided to support the user configuration page.
     */
    cruManagementAreaOverride?: NamedId;
    version?: number;
});

