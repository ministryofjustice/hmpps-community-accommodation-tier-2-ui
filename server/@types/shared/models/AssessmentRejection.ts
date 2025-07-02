/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Rejection info
 */
export type AssessmentRejection = {
    agreeWithShortNoticeReason?: boolean;
    agreeWithShortNoticeReasonComments?: string;
    /**
     * Any object
     */
    document: any;
    isWithdrawn?: boolean;
    reasonForLateApplication?: string;
    /**
     * Only used by CAS3
     */
    referralRejectionReasonDetail?: string;
    /**
     * Only used by CAS3
     */
    referralRejectionReasonId?: string;
    rejectionRationale: string;
};

