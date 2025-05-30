/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas1ChangeRequestType } from './Cas1ChangeRequestType';
import type { Cas1KeyWorkerAllocation } from './Cas1KeyWorkerAllocation';
import type { Cas1SpaceBookingSummaryStatus } from './Cas1SpaceBookingSummaryStatus';
import type { Cas1SpaceCharacteristic } from './Cas1SpaceCharacteristic';
import type { NamedId } from './NamedId';
import type { PersonSummary } from './PersonSummary';
export type Cas1SpaceBookingSummary = {
    id: string;
    person: PersonSummary;
    premises: NamedId;
    /**
     * actual arrival date or, if not known, the expected arrival date
     * @deprecated
     */
    canonicalArrivalDate: string;
    /**
     * actual departure date or, if not known, the expected departure date
     * @deprecated
     */
    canonicalDepartureDate: string;
    /**
     * expected arrival date
     */
    expectedArrivalDate: string;
    /**
     * actual arrival date if known
     */
    actualArrivalDate?: string;
    /**
     * expected departure date
     */
    expectedDepartureDate: string;
    /**
     * actual departure date if known
     */
    actualDepartureDate?: string;
    isNonArrival?: boolean;
    /**
     * Risk rating tier level of corresponding application
     */
    tier?: string;
    keyWorkerAllocation?: Cas1KeyWorkerAllocation;
    status?: Cas1SpaceBookingSummaryStatus;
    /**
     * Room and premise characteristics
     */
    characteristics: Array<Cas1SpaceCharacteristic>;
    deliusEventNumber?: string;
    isCancelled: boolean;
    /**
     * Use 'openChangeRequestTypes'
     * @deprecated
     */
    plannedTransferRequested?: boolean;
    /**
     * Use 'openChangeRequestTypes'
     * @deprecated
     */
    appealRequested?: boolean;
    openChangeRequestTypes: Array<Cas1ChangeRequestType>;
};

