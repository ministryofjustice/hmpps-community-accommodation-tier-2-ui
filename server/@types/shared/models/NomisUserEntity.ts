/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas2ApplicationEntity } from './Cas2ApplicationEntity';
import type { Cas2User } from './Cas2User';
export type NomisUserEntity = (Cas2User & {
    accountType?: string;
    active?: boolean;
    activeCaseloadId?: string;
    applications?: Array<Cas2ApplicationEntity>;
    createdAt?: string;
    enabled?: boolean;
    id?: string;
    isActive?: boolean;
    isEnabled?: boolean;
    nomisStaffId?: number;
    nomisUsername?: string;
} & {
    accountType: string;
    applications: Array<Cas2ApplicationEntity>;
    id: string;
    isActive: boolean;
    isEnabled: boolean;
    nomisStaffId: number;
    nomisUsername: string;
});

