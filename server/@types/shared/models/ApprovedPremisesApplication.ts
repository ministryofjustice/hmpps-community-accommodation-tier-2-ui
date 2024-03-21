/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnyValue } from './AnyValue';
import type { ApArea } from './ApArea';
import type { Application } from './Application';
import type { ApprovedPremisesApplicationStatus } from './ApprovedPremisesApplicationStatus';
import type { AssessmentDecision } from './AssessmentDecision';
import type { Cas1ApplicationUserDetails } from './Cas1ApplicationUserDetails';
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
    apArea?: ApArea;
    applicantUserDetails?: Cas1ApplicationUserDetails;
    /**
     * If true, caseManagerUserDetails will provide case manager details. Otherwise, applicantUserDetails can be used for case manager details
     */
    caseManagerIsNotApplicant?: boolean;
    caseManagerUserDetails?: Cas1ApplicationUserDetails;
});

