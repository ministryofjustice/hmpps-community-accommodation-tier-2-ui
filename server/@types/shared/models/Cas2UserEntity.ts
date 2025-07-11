/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas2ApplicationEntity } from './Cas2ApplicationEntity';
import type { Cas2UserType } from './Cas2UserType';
export type Cas2UserEntity = {
    active?: boolean;
    activeNomisCaseloadId?: string;
    applications: Array<Cas2ApplicationEntity>;
    createdAt?: string;
    deliusStaffCode?: string;
    deliusTeamCodes?: Array<string>;
    email?: string;
    enabled?: boolean;
    id: string;
    isActive: boolean;
    isEnabled: boolean;
    isExternal: boolean;
    name: string;
    nomisStaffId?: number;
    userType: Cas2UserType;
    username: string;
};

