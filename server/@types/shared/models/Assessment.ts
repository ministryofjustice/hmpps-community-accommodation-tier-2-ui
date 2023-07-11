/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnyValue } from './AnyValue';
import type { AssessmentDecision } from './AssessmentDecision';
import type { AssessmentStatus } from './AssessmentStatus';
import type { ClarificationNote } from './ClarificationNote';

export type Assessment = {
    service: string;
    id: string;
    schemaVersion: string;
    outdatedSchema: boolean;
    createdAt: string;
    allocatedAt: string;
    submittedAt?: string;
    decision?: AssessmentDecision;
    rejectionRationale?: string;
    data?: AnyValue;
    clarificationNotes: Array<ClarificationNote>;
    status?: AssessmentStatus;
};

