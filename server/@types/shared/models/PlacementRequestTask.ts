/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlacementDates } from './PlacementDates';
import type { PlacementRequestStatus } from './PlacementRequestStatus';
import type { ReleaseTypeOption } from './ReleaseTypeOption';
import type { RiskTierEnvelope } from './RiskTierEnvelope';
import type { Task } from './Task';
export type PlacementRequestTask = (Task & PlacementDates & {
    tier: RiskTierEnvelope;
    releaseType: ReleaseTypeOption;
    placementRequestStatus: PlacementRequestStatus;
});

