/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PersonRisks } from './PersonRisks';
import type { PlacementDates } from './PlacementDates';
import type { PlacementType } from './PlacementType';
import type { ReleaseTypeOption } from './ReleaseTypeOption';
import type { Task } from './Task';

export type PlacementApplicationTask = (Task & {
    id: string;
    risks: PersonRisks;
    releaseType: ReleaseTypeOption;
    placementType: PlacementType;
    placementDates?: Array<PlacementDates>;
});

