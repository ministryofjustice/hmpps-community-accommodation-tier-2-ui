/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApprovedPremisesAssessmentStatus } from './ApprovedPremisesAssessmentStatus';
import type { AssessmentSummary } from './AssessmentSummary';
/**
 * Please use the Cas1AssessmentSummary endpoint instead
 * @deprecated
 */
export type ApprovedPremisesAssessmentSummary = (AssessmentSummary & {
    status: ApprovedPremisesAssessmentStatus;
    dueAt: string;
});

