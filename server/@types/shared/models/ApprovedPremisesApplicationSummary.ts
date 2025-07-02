/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationSummary } from './ApplicationSummary';
import type { ApprovedPremisesApplicationStatus } from './ApprovedPremisesApplicationStatus';
import type { PersonRisks } from './PersonRisks';
import type { ReleaseTypeOption } from './ReleaseTypeOption';
export type ApprovedPremisesApplicationSummary = (ApplicationSummary & {
    arrivalDate?: string;
    createdByUserId?: string;
    hasRequestsForPlacement?: boolean;
    isEmergencyApplication?: boolean;
    isEsapApplication?: boolean;
    isPipeApplication?: boolean;
    isWithdrawn?: boolean;
    isWomensApplication?: boolean;
    releaseType?: ReleaseTypeOption;
    risks?: PersonRisks;
    status?: ApprovedPremisesApplicationStatus;
    tier?: string;
} & {
    createdByUserId: string;
    hasRequestsForPlacement: boolean;
    isWithdrawn: boolean;
    status: ApprovedPremisesApplicationStatus;
});

