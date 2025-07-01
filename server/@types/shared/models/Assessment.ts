/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssessmentDecision } from './AssessmentDecision';
import type { ClarificationNote } from './ClarificationNote';
export type Assessment = {
    allocatedAt?: string;
    clarificationNotes: Array<ClarificationNote>;
    createdAt: string;
    /**
     * Any object
     */
    data?: any;
    decision?: AssessmentDecision;
    id: string;
    outdatedSchema: boolean;
    rejectionRationale?: string;
    schemaVersion: string;
    service: string;
    submittedAt?: string;
};

