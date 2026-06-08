/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServiceType } from './ServiceType';
export type Cas2HdcReferralHistory = {
    applicationId: string;
    createdAt: string;
    id: string;
    localAuthorityArea?: string;
    pdu?: string;
    placementAddress?: string;
    placementStatus?: string;
    referralRejectionReason?: string;
    referredBy?: string;
    status: string;
    type: ServiceType;
};

