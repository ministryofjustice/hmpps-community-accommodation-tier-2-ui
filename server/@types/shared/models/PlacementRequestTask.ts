/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PersonRisks } from './PersonRisks';
import type { PlacementDates } from './PlacementDates';
import type { ReleaseTypeOption } from './ReleaseTypeOption';
import type { Task } from './Task';

export type PlacementRequestTask = (Task & PlacementDates & {
    id: string;
    risks: PersonRisks;
    releaseType: ReleaseTypeOption;
});

