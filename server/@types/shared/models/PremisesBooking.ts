/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bed } from './Bed';
import type { BookingStatus } from './BookingStatus';
import type { Person } from './Person';
export type PremisesBooking = {
    id?: string;
    arrivalDate?: string;
    departureDate?: string;
    person?: Person;
    bed?: Bed;
    status?: BookingStatus;
};

