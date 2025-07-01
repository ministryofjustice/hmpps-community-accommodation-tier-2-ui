/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApprovedPremisesUser } from './ApprovedPremisesUser';
import type { ApType } from './ApType';
import type { AssessmentDecision } from './AssessmentDecision';
import type { FullPerson } from './FullPerson';
import type { PersonRisks } from './PersonRisks';
import type { PlacementCriteria } from './PlacementCriteria';
import type { PlacementRequestBookingSummary } from './PlacementRequestBookingSummary';
import type { PlacementRequestRequestType } from './PlacementRequestRequestType';
import type { PlacementRequestStatus } from './PlacementRequestStatus';
import type { ReleaseTypeOption } from './ReleaseTypeOption';
import type { RestrictedPerson } from './RestrictedPerson';
import type { UnknownPerson } from './UnknownPerson';
import type { WithdrawPlacementRequestReason } from './WithdrawPlacementRequestReason';
export type PlacementRequest = {
    applicationDate: string;
    applicationId: string;
    assessmentDate: string;
    assessmentDecision: AssessmentDecision;
    assessmentId: string;
    assessor: ApprovedPremisesUser;
    booking?: PlacementRequestBookingSummary;
    desirableCriteria: Array<PlacementCriteria>;
    duration: number;
    essentialCriteria: Array<PlacementCriteria>;
    expectedArrival: string;
    id: string;
    isParole: boolean;
    isWithdrawn: boolean;
    /**
     * Postcode outcode
     */
    location: string;
    /**
     * Notes from the assessor for the CRU Manager
     */
    notes?: string;
    person: (FullPerson | RestrictedPerson | UnknownPerson);
    radius: number;
    releaseType: ReleaseTypeOption;
    requestType?: PlacementRequestRequestType;
    risks: PersonRisks;
    status: PlacementRequestStatus;
    type: ApType;
    withdrawalReason?: WithdrawPlacementRequestReason;
};

