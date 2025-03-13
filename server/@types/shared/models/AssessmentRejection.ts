/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Unit } from './Unit';
export type AssessmentRejection = {
    document: Unit;
    rejectionRationale: string;
    /**
     * Only used by CAS3
     */
    referralRejectionReasonId?: string;
    /**
     * Only used by CAS3
     */
    referralRejectionReasonDetail?: string;
    isWithdrawn?: boolean;
    agreeWithShortNoticeReason?: boolean;
    agreeWithShortNoticeReasonComments?: string;
    reasonForLateApplication?: string;
};

