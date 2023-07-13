/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlacementApplicationDecision } from './PlacementApplicationDecision';

export type PlacementApplicationDecisionEnvelope = {
    decision: PlacementApplicationDecision;
    summaryOfChanges: string;
    decisionSummary: string;
};

