/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubmitApplication } from './SubmitApplication';
export type SubmitTemporaryAccommodationApplication = (SubmitApplication & {
    arrivalDate?: string;
    dutyToReferLocalAuthorityAreaName?: string;
    dutyToReferOutcome?: string;
    dutyToReferSubmissionDate?: string;
    eligibilityReason?: string;
    hasHistoryOfArson?: boolean;
    isApplicationEligible?: boolean;
    isConcerningArsonBehaviour?: boolean;
    isConcerningSexualBehaviour?: boolean;
    isDutyToReferSubmitted?: boolean;
    isHistoryOfSexualOffence?: boolean;
    isRegisteredSexOffender?: boolean;
    needsAccessibleProperty?: boolean;
    personReleaseDate?: string;
    prisonReleaseTypes?: Array<string>;
    probationDeliveryUnitId?: string;
    /**
     * Any object
     */
    summaryData?: any;
} & {
    arrivalDate: string;
    probationDeliveryUnitId: string;
    /**
     * Any object
     */
    summaryData: any;
});

