/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnyValue } from './AnyValue';
import type { ApType } from './ApType';
import type { PlacementDates } from './PlacementDates';
import type { PlacementRequirements } from './PlacementRequirements';
export type AssessmentAcceptance = {
    document: AnyValue;
    requirements?: PlacementRequirements;
    placementDates?: PlacementDates;
    apType?: ApType;
    notes?: string;
};

