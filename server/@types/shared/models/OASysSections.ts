/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OASysAssessmentId } from './OASysAssessmentId';
import type { OASysAssessmentState } from './OASysAssessmentState';
import type { OASysQuestion } from './OASysQuestion';
import type { OASysSupportingInformationQuestion } from './OASysSupportingInformationQuestion';
export type OASysSections = {
    assessmentId: OASysAssessmentId;
    assessmentState: OASysAssessmentState;
    dateStarted: string;
    dateCompleted?: string;
    offenceDetails: Array<OASysQuestion>;
    roshSummary: Array<OASysQuestion>;
    supportingInformation: Array<OASysSupportingInformationQuestion>;
    riskToSelf: Array<OASysQuestion>;
    riskManagementPlan: Array<OASysQuestion>;
};

