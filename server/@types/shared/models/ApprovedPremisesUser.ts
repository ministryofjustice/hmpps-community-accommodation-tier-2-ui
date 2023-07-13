/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApprovedPremisesUserRole } from './ApprovedPremisesUserRole';
import type { User } from './User';
import type { UserQualification } from './UserQualification';

export type ApprovedPremisesUser = (User & {
    name: string;
    deliusUsername: string;
    email?: string;
    telephoneNumber?: string;
    qualifications: Array<UserQualification>;
    roles: Array<ApprovedPremisesUserRole>;
});

