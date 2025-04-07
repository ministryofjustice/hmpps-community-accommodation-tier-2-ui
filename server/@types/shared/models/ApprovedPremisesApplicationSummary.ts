/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationSummary } from './ApplicationSummary';
import type { ApprovedPremisesApplicationStatus } from './ApprovedPremisesApplicationStatus';
import type { PersonRisks } from './PersonRisks';
import type { ReleaseTypeOption } from './ReleaseTypeOption';
/**
 * Use Cas1ApplicationSummary
 * @deprecated
 */
export type ApprovedPremisesApplicationSummary = (ApplicationSummary & {
    isWomensApplication?: boolean;
    isPipeApplication?: boolean;
    isEmergencyApplication?: boolean;
    isEsapApplication?: boolean;
    arrivalDate?: string;
    risks?: PersonRisks;
    createdByUserId: string;
    status: ApprovedPremisesApplicationStatus;
    tier?: string;
    isWithdrawn: boolean;
    releaseType?: ReleaseTypeOption;
    hasRequestsForPlacement: boolean;
});

