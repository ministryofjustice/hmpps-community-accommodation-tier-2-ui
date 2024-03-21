/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bed } from './Bed';
import type { Person } from './Person';
import type { ServiceName } from './ServiceName';
import type { StaffMember } from './StaffMember';
export type BookingBody = {
    id: string;
    person: Person;
    arrivalDate: string;
    originalArrivalDate: string;
    departureDate: string;
    originalDepartureDate: string;
    createdAt: string;
    keyWorker?: StaffMember;
    serviceName: ServiceName;
    bed?: Bed;
};

