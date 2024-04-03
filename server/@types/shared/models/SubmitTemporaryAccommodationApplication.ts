/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnyValue } from './AnyValue';
import type { SubmitApplication } from './SubmitApplication';
export type SubmitTemporaryAccommodationApplication = (SubmitApplication & {
    arrivalDate: string;
    isRegisteredSexOffender?: boolean;
    needsAccessibleProperty?: boolean;
    hasHistoryOfArson?: boolean;
    isDutyToReferSubmitted?: boolean;
    dutyToReferSubmissionDate?: string;
    isApplicationEligible?: boolean;
    eligibilityReason?: string;
    dutyToReferLocalAuthorityAreaName?: string;
    personReleaseDate?: string;
    pdu?: string;
    isHistoryOfSexualOffence?: boolean;
    isConcerningSexualBehaviour?: boolean;
    summaryData: AnyValue;
});

