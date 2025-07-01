/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApType } from './ApType';
import type { Cas1ApplicationTimelinessCategory } from './Cas1ApplicationTimelinessCategory';
import type { ReleaseTypeOption } from './ReleaseTypeOption';
import type { UpdateApplication } from './UpdateApplication';
export type UpdateApprovedPremisesApplication = (UpdateApplication & {
    apType?: ApType;
    arrivalDate?: string;
    /**
     * noticeType should be used to indicate if an emergency application
     */
    isEmergencyApplication?: boolean;
    isInapplicable?: boolean;
    isWomensApplication?: boolean;
    noticeType?: Cas1ApplicationTimelinessCategory;
    releaseType?: ReleaseTypeOption;
    targetLocation?: string;
});

