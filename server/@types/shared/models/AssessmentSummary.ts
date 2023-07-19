/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AssessmentDecision } from './AssessmentDecision';
import type { AssessmentStatus } from './AssessmentStatus';
import type { Person } from './Person';
import type { PersonRisks } from './PersonRisks';

export type AssessmentSummary = {
    type: 'CAS1' | 'CAS3';
    id: string;
    applicationId: string;
    arrivalDate?: string;
    createdAt: string;
    dateOfInfoRequest?: string;
    status: AssessmentStatus;
    decision?: AssessmentDecision;
    risks?: PersonRisks;
    person: Person;
};

