/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas1SpaceCharacteristic } from './Cas1SpaceCharacteristic';
import type { Type } from './Type';
export type PlacementRequestBookingSummary = {
    arrivalDate: string;
    characteristics?: Array<Cas1SpaceCharacteristic>;
    createdAt: string;
    departureDate: string;
    id: string;
    premisesId: string;
    premisesName: string;
    type: Type;
};

