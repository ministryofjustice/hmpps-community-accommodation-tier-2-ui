/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas1SpaceBookingRequirements } from './Cas1SpaceBookingRequirements';
export type Cas1SpaceSearchParameters = {
    /**
     * The date the space is required from
     */
    startDate: string;
    /**
     * The number of days the space is needed, from the start date
     */
    durationInDays: number;
    /**
     * The 'target' location, in the form of a postcode district
     */
    targetPostcodeDistrict: string;
    requirements: Cas1SpaceBookingRequirements;
};

