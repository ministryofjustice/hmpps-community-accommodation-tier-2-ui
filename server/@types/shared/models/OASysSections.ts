/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OASysAssessmentState } from './OASysAssessmentState';
import type { OASysQuestion } from './OASysQuestion';
import type { OASysSupportingInformationQuestion } from './OASysSupportingInformationQuestion';
export type OASysSections = {
    /**
     * The ID of assessment being used. This should always be the latest Layer 3 assessment, regardless of state.
     */
    assessmentId: number;
    assessmentState: OASysAssessmentState;
    dateCompleted?: string;
    dateStarted: string;
    offenceDetails: Array<OASysQuestion>;
    riskManagementPlan: Array<OASysQuestion>;
    riskToSelf: Array<OASysQuestion>;
    roshSummary: Array<OASysQuestion>;
    supportingInformation: Array<OASysSupportingInformationQuestion>;
};

