/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Arrival } from './Arrival';
import type { BookingBody } from './BookingBody';
import type { BookingPremisesSummary } from './BookingPremisesSummary';
import type { BookingStatus } from './BookingStatus';
import type { Cancellation } from './Cancellation';
import type { Confirmation } from './Confirmation';
import type { Departure } from './Departure';
import type { Extension } from './Extension';
import type { Nonarrival } from './Nonarrival';
import type { Turnaround } from './Turnaround';
export type Booking = (BookingBody & {
    status: BookingStatus;
    extensions: Array<Extension>;
    arrival?: Arrival | null;
    /**
     * The latest version of the departure, if it exists
     */
    departure?: Departure | null;
    /**
     * The full history of the departure
     */
    departures: Array<Departure>;
    nonArrival?: Nonarrival | null;
    /**
     * The latest version of the cancellation, if it exists
     */
    cancellation?: Cancellation | null;
    /**
     * The full history of the cancellation
     */
    cancellations: Array<Cancellation>;
    confirmation?: Confirmation | null;
    /**
     * The latest version of the turnaround, if it exists
     */
    turnaround?: Turnaround | null;
    /**
     * The full history of turnarounds
     */
    turnarounds?: Array<Turnaround>;
    turnaroundStartDate?: string;
    effectiveEndDate?: string;
    applicationId?: string;
    assessmentId?: string;
    premises: BookingPremisesSummary;
});

