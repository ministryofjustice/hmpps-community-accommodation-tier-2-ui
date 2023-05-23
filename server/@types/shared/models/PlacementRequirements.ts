/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApType } from './ApType';
import type { Gender } from './Gender';
import type { PlacementCriteria } from './PlacementCriteria';

export type PlacementRequirements = {
    gender: Gender;
    type: ApType;
    expectedArrival: string;
    duration: number;
    location: string;
    radius: number;
    essentialCriteria: Array<PlacementCriteria>;
    desirableCriteria: Array<PlacementCriteria>;
    notes?: string;
};

