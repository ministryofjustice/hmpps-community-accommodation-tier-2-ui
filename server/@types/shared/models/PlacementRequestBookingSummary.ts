/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas1SpaceCharacteristic } from './Cas1SpaceCharacteristic';
export type PlacementRequestBookingSummary = {
    id: string;
    premisesId: string;
    premisesName: string;
    arrivalDate: string;
    departureDate: string;
    createdAt: string;
    type: 'space' | 'legacy';
    characteristics?: Array<Cas1SpaceCharacteristic>;
};

