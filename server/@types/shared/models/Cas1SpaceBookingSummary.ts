/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas1ChangeRequestType } from './Cas1ChangeRequestType';
import type { Cas1KeyWorkerAllocation } from './Cas1KeyWorkerAllocation';
import type { Cas1SpaceBookingSummaryStatus } from './Cas1SpaceBookingSummaryStatus';
import type { Cas1SpaceCharacteristic } from './Cas1SpaceCharacteristic';
import type { FullPersonSummary } from './FullPersonSummary';
import type { NamedId } from './NamedId';
import type { RestrictedPersonSummary } from './RestrictedPersonSummary';
import type { UnknownPersonSummary } from './UnknownPersonSummary';
export type Cas1SpaceBookingSummary = {
    /**
     * actual arrival date if known
     */
    actualArrivalDate?: string;
    /**
     * actual departure date if known
     */
    actualDepartureDate?: string;
    /**
     * Use 'openChangeRequestTypes'
     * @deprecated
     */
    appealRequested?: boolean;
    /**
     * actual arrival date or, if not known, the expected arrival date
     */
    canonicalArrivalDate: string;
    /**
     * actual departure date or, if not known, the expected departure date
     */
    canonicalDepartureDate: string;
    /**
     * Room and premise characteristics
     */
    characteristics: Array<Cas1SpaceCharacteristic>;
    deliusEventNumber?: string;
    /**
     * expected arrival date
     */
    expectedArrivalDate: string;
    /**
     * expected departure date
     */
    expectedDepartureDate: string;
    id: string;
    isCancelled: boolean;
    isNonArrival?: boolean;
    keyWorkerAllocation?: Cas1KeyWorkerAllocation;
    openChangeRequestTypes: Array<Cas1ChangeRequestType>;
    person: (FullPersonSummary | RestrictedPersonSummary | UnknownPersonSummary);
    /**
     * Use 'openChangeRequestTypes'
     * @deprecated
     */
    plannedTransferRequested?: boolean;
    premises: NamedId;
    /**
     * @deprecated
     */
    status?: Cas1SpaceBookingSummaryStatus;
    /**
     * Risk rating tier level of corresponding application
     */
    tier?: string;
};

