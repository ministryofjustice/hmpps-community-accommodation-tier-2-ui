/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Arrival } from './Arrival';
import type { Bed } from './Bed';
import type { BookingPremisesSummary } from './BookingPremisesSummary';
import type { BookingStatus } from './BookingStatus';
import type { Cancellation } from './Cancellation';
import type { Confirmation } from './Confirmation';
import type { Departure } from './Departure';
import type { Extension } from './Extension';
import type { FullPerson } from './FullPerson';
import type { Nonarrival } from './Nonarrival';
import type { RestrictedPerson } from './RestrictedPerson';
import type { ServiceName } from './ServiceName';
import type { StaffMember } from './StaffMember';
import type { Turnaround } from './Turnaround';
import type { UnknownPerson } from './UnknownPerson';
export type Booking = {
    applicationId?: string;
    arrival?: Arrival;
    arrivalDate: string;
    assessmentId?: string;
    bed?: Bed;
    /**
     * The latest version of the cancellation, if it exists
     */
    cancellation?: Cancellation;
    /**
     * The full history of the cancellation
     */
    cancellations: Array<Cancellation>;
    confirmation?: Confirmation;
    createdAt: string;
    /**
     * The latest version of the departure, if it exists
     */
    departure?: Departure;
    departureDate: string;
    /**
     * The full history of the departure
     */
    departures: Array<Departure>;
    effectiveEndDate?: string;
    extensions: Array<Extension>;
    id: string;
    /**
     * KeyWorker is a legacy field only used by CAS1. It is not longer being captured or populated
     */
    keyWorker?: StaffMember;
    nonArrival?: Nonarrival;
    originalArrivalDate: string;
    originalDepartureDate: string;
    person: (FullPerson | RestrictedPerson | UnknownPerson);
    premises: BookingPremisesSummary;
    serviceName: ServiceName;
    status: BookingStatus;
    /**
     * The latest version of the turnaround, if it exists
     */
    turnaround?: Turnaround;
    turnaroundStartDate?: string;
    /**
     * The full history of turnarounds
     */
    turnarounds?: Array<Turnaround>;
};

