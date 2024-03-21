/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppealDecision } from './AppealDecision';
import type { User } from './User';
export type Appeal = {
    id: string;
    appealDate: string;
    appealDetail: string;
    decision: AppealDecision;
    decisionDetail: string;
    createdAt: string;
    applicationId: string;
    assessmentId?: string;
    createdByUser: User;
};

