/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnyValue } from './AnyValue';
import type { Application } from './Application';
import type { ApprovedPremisesApplicationStatus } from './ApprovedPremisesApplicationStatus';
import type { AssessmentDecision } from './AssessmentDecision';
import type { PersonRisks } from './PersonRisks';
import type { PersonStatus } from './PersonStatus';
export type ApprovedPremisesApplication = (Application & {
    isWomensApplication?: boolean;
    isPipeApplication?: boolean;
    isEmergencyApplication?: boolean;
    isEsapApplication?: boolean;
    arrivalDate?: string;
    risks?: PersonRisks;
    createdByUserId: string;
    schemaVersion: string;
    outdatedSchema: boolean;
    data?: AnyValue;
    document?: AnyValue;
    status: ApprovedPremisesApplicationStatus;
    assessmentId?: string;
    assessmentDecision?: AssessmentDecision;
    assessmentDecisionDate?: string;
    submittedAt?: string;
    personStatusOnSubmission?: PersonStatus;
});

