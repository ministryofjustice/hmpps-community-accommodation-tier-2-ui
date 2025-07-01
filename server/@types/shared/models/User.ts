/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProbationDeliveryUnit } from './ProbationDeliveryUnit';
import type { ProbationRegion } from './ProbationRegion';
export type User = {
    deliusUsername: string;
    email?: string;
    id: string;
    isActive?: boolean;
    name: string;
    probationDeliveryUnit?: ProbationDeliveryUnit;
    region: ProbationRegion;
    service: string;
    telephoneNumber?: string;
};

