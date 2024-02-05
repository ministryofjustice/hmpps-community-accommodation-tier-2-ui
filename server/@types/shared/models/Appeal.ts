/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppealDecision } from './AppealDecision';
export type Appeal = {
    id: string;
    appealDate: string;
    appealDetail: string;
    reviewer: string;
    decision: AppealDecision;
    decisionDetail: string;
    createdAt: string;
    applicationId: string;
    assessmentId?: string;
    createdByUserId: string;
};

