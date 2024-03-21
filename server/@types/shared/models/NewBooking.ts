/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServiceName } from './ServiceName';
export type NewBooking = {
    crn: string;
    arrivalDate: string;
    departureDate: string;
    bedId?: string;
    serviceName: ServiceName;
    enableTurnarounds?: boolean;
    assessmentId?: string;
    eventNumber?: string;
};

