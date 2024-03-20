/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas1ApplicationTimelinessCategory } from './Cas1ApplicationTimelinessCategory';
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
    noticeType?: Cas1ApplicationTimelinessCategory;
});

