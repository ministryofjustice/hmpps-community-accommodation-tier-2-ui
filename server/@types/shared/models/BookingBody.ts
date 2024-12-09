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
    /**
     * KeyWorker is a legacy field only used by CAS1. It is not longer being captured or populated
     * @deprecated
     */
    keyWorker?: StaffMember;
    serviceName: ServiceName;
    bed?: Bed;
};

