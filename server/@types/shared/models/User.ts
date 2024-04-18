/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProbationDeliveryUnit } from './ProbationDeliveryUnit';
import type { ProbationRegion } from './ProbationRegion';
export type User = {
    service: string;
    id: string;
    name: string;
    deliusUsername: string;
    email?: string;
    telephoneNumber?: string;
    isActive?: boolean;
    region: ProbationRegion;
    probationDeliveryUnit?: ProbationDeliveryUnit;
};

