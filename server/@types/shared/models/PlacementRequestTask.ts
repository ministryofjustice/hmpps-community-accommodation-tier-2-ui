/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlacementDates } from './PlacementDates';
import type { PlacementRequestStatus } from './PlacementRequestStatus';
import type { PlacementRequestTaskOutcome } from './PlacementRequestTaskOutcome';
import type { ReleaseTypeOption } from './ReleaseTypeOption';
import type { RiskTierEnvelope } from './RiskTierEnvelope';
import type { Task } from './Task';
export type PlacementRequestTask = (Task & PlacementDates & {
    tier: RiskTierEnvelope;
    releaseType: ReleaseTypeOption;
    placementRequestStatus: PlacementRequestStatus;
    outcome?: PlacementRequestTaskOutcome;
});

