/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas1KeyWorkerAllocation } from './Cas1KeyWorkerAllocation';
import type { Cas1SpaceBookingSummaryStatus } from './Cas1SpaceBookingSummaryStatus';
import type { Cas1SpaceCharacteristic } from './Cas1SpaceCharacteristic';
import type { PersonSummary } from './PersonSummary';
export type Cas1SpaceBookingSummary = {
    id: string;
    person: PersonSummary;
    /**
     * actual arrival date or, if not known, the expected arrival date
     */
    canonicalArrivalDate: string;
    /**
     * actual departure date or, if not known, the expected departure date
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
};

