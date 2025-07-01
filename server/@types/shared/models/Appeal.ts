/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppealDecision } from './AppealDecision';
import type { ApprovedPremisesUser } from './ApprovedPremisesUser';
import type { TemporaryAccommodationUser } from './TemporaryAccommodationUser';
export type Appeal = {
    appealDate: string;
    appealDetail: string;
    applicationId: string;
    assessmentId?: string;
    createdAt: string;
    createdByUser: (ApprovedPremisesUser | TemporaryAccommodationUser);
    decision: AppealDecision;
    decisionDetail: string;
    id: string;
};

