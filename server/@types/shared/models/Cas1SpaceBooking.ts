/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas1SpaceBookingRequirements } from './Cas1SpaceBookingRequirements';
import type { NamedId } from './NamedId';
import type { Person } from './Person';
import type { User } from './User';
export type Cas1SpaceBooking = {
    id: string;
    person: Person;
    requirements: Cas1SpaceBookingRequirements;
    premises: NamedId;
    apArea: NamedId;
    bookedBy: User;
    arrivalDate: string;
    departureDate: string;
    createdAt: string;
};

