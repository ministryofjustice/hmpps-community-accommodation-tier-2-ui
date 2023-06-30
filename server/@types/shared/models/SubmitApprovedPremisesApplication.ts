/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ReleaseTypeOption } from './ReleaseTypeOption';
import type { SubmitApplication } from './SubmitApplication';

export type SubmitApprovedPremisesApplication = (SubmitApplication & {
    isPipeApplication: boolean;
    isWomensApplication: boolean;
    isEmergencyApplication: boolean;
    isEsapApplication: boolean;
    targetLocation: string;
    releaseType: ReleaseTypeOption;
    arrivalDate?: string;
});

