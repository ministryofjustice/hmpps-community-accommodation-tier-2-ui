/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApprovedPremisesApplication } from './ApprovedPremisesApplication';
import type { ApprovedPremisesUser } from './ApprovedPremisesUser';
import type { ApType } from './ApType';
import type { AssessmentDecision } from './AssessmentDecision';
import type { Cancellation } from './Cancellation';
import type { Cas1SpaceBookingSummary } from './Cas1SpaceBookingSummary';
import type { Cas2Application } from './Cas2Application';
import type { Cas2v2Application } from './Cas2v2Application';
import type { FullPerson } from './FullPerson';
import type { OfflineApplication } from './OfflineApplication';
import type { PersonRisks } from './PersonRisks';
import type { PlacementCriteria } from './PlacementCriteria';
import type { PlacementRequestBookingSummary } from './PlacementRequestBookingSummary';
import type { PlacementRequestRequestType } from './PlacementRequestRequestType';
import type { PlacementRequestStatus } from './PlacementRequestStatus';
import type { ReleaseTypeOption } from './ReleaseTypeOption';
import type { RestrictedPerson } from './RestrictedPerson';
import type { TemporaryAccommodationApplication } from './TemporaryAccommodationApplication';
import type { UnknownPerson } from './UnknownPerson';
import type { WithdrawPlacementRequestReason } from './WithdrawPlacementRequestReason';
export type PlacementRequestDetail = {
    application: (ApprovedPremisesApplication | Cas2Application | Cas2v2Application | OfflineApplication | TemporaryAccommodationApplication);
    applicationDate: string;
    applicationId: string;
    assessmentDate: string;
    assessmentDecision: AssessmentDecision;
    assessmentId: string;
    assessor: ApprovedPremisesUser;
    booking?: PlacementRequestBookingSummary;
    /**
     * Not used by UI. Space Booking cancellations to be provided if cancellations are required in future.
     */
    cancellations: Array<Cancellation>;
    desirableCriteria: Array<PlacementCriteria>;
    duration: number;
    essentialCriteria: Array<PlacementCriteria>;
    expectedArrival: string;
    id: string;
    isParole: boolean;
    isWithdrawn: boolean;
    legacyBooking?: PlacementRequestBookingSummary;
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
    /**
     * The space bookings associated with this placement request
     */
    spaceBookings: Array<Cas1SpaceBookingSummary>;
    status: PlacementRequestStatus;
    type: ApType;
    withdrawalReason?: WithdrawPlacementRequestReason;
};

