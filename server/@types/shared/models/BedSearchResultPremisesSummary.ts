/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CharacteristicPair } from './CharacteristicPair';
export type BedSearchResultPremisesSummary = {
    id: string;
    name: string;
    addressLine1: string;
    addressLine2?: string;
    town?: string;
    postcode: string;
    probationDeliveryUnitName?: string;
    notes?: string;
    characteristics: Array<CharacteristicPair>;
    /**
     * the total number of Beds in the Premises
     */
    bedCount: number;
    /**
     * the total number of booked Beds in the Premises
     */
    bookedBedCount?: number;
};

