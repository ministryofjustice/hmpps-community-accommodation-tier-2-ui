/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServiceName } from './ServiceName';
export type NewBooking = {
    arrivalDate: string;
    assessmentId?: string;
    bedId?: string;
    crn: string;
    departureDate: string;
    enableTurnarounds?: boolean;
    eventNumber?: string;
    serviceName: ServiceName;
};

