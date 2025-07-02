/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlacementApplicationType } from './PlacementApplicationType';
import type { PlacementDates } from './PlacementDates';
import type { WithdrawPlacementRequestReason } from './WithdrawPlacementRequestReason';
export type PlacementApplication = {
    applicationCompletedAt: string;
    applicationId: string;
    assessmentCompletedAt: string;
    /**
     * If type is 'Additional', provides the PlacementApplication ID. If type is 'Initial' this field shouldn't be used.
     */
    assessmentId: string;
    canBeWithdrawn: boolean;
    createdAt: string;
    createdByUserId: string;
    /**
     * Any object
     */
    data?: any;
    /**
     * Any object
     */
    document?: any;
    /**
     * If type is 'Additional', provides the PlacementApplication ID. If type is 'Initial' this field provides a PlacementRequest ID.
     */
    id: string;
    isWithdrawn: boolean;
    placementDates: Array<PlacementDates>;
    submittedAt?: string;
    type: PlacementApplicationType;
    withdrawalReason?: WithdrawPlacementRequestReason;
};

