/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReleaseTypeOption } from './ReleaseTypeOption';
import type { UpdateApplication } from './UpdateApplication';
export type UpdateApprovedPremisesApplication = (UpdateApplication & {
    isInapplicable?: boolean;
    isWomensApplication?: boolean;
    isPipeApplication?: boolean;
    isEmergencyApplication?: boolean;
    isEsapApplication?: boolean;
    targetLocation?: string;
    releaseType?: ReleaseTypeOption;
    arrivalDate?: string;
});

