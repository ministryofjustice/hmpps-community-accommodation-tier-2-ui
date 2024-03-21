/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArrayOfOASysRiskToSelfQuestions } from './ArrayOfOASysRiskToSelfQuestions';
import type { OASysAssessmentId } from './OASysAssessmentId';
import type { OASysAssessmentState } from './OASysAssessmentState';
export type OASysRiskToSelf = {
    assessmentId: OASysAssessmentId;
    assessmentState: OASysAssessmentState;
    dateStarted: string;
    dateCompleted?: string;
    riskToSelf: ArrayOfOASysRiskToSelfQuestions;
};

