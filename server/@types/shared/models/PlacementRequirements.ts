/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApType } from './ApType';
import type { PlacementCriteria } from './PlacementCriteria';
export type PlacementRequirements = {
    desirableCriteria: Array<PlacementCriteria>;
    essentialCriteria: Array<PlacementCriteria>;
    /**
     * Postcode outcode
     */
    location: string;
    radius: number;
    type: ApType;
};

