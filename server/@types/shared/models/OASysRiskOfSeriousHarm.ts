/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArrayOfOASysRiskOfSeriousHarmSummaryQuestions } from './ArrayOfOASysRiskOfSeriousHarmSummaryQuestions';
import type { OASysAssessmentId } from './OASysAssessmentId';
import type { OASysAssessmentState } from './OASysAssessmentState';
export type OASysRiskOfSeriousHarm = {
    assessmentId: OASysAssessmentId;
    assessmentState: OASysAssessmentState;
    dateStarted: string;
    dateCompleted?: string;
    rosh: ArrayOfOASysRiskOfSeriousHarmSummaryQuestions;
};

