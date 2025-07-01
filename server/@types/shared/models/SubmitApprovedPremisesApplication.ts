/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApType } from './ApType';
import type { Cas1ApplicationTimelinessCategory } from './Cas1ApplicationTimelinessCategory';
import type { Cas1ApplicationUserDetails } from './Cas1ApplicationUserDetails';
import type { ReleaseTypeOption } from './ReleaseTypeOption';
import type { SentenceTypeOption } from './SentenceTypeOption';
import type { SituationOption } from './SituationOption';
import type { SubmitApplication } from './SubmitApplication';
export type SubmitApprovedPremisesApplication = (SubmitApplication & {
    /**
     * If the user's ap area id is incorrect, they can optionally override it for the application
     */
    apAreaId?: string;
    apType?: ApType;
    applicantUserDetails?: Cas1ApplicationUserDetails;
    arrivalDate?: string;
    caseManagerIsNotApplicant?: boolean;
    caseManagerUserDetails?: Cas1ApplicationUserDetails;
    /**
     * noticeType should be used to indicate if this an emergency application
     */
    isEmergencyApplication?: boolean;
    isWomensApplication?: boolean;
    licenseExpiryDate?: string;
    noticeType?: Cas1ApplicationTimelinessCategory;
    reasonForShortNotice?: string;
    reasonForShortNoticeOther?: string;
    releaseType?: ReleaseTypeOption;
    sentenceType?: SentenceTypeOption;
    situation?: SituationOption;
    targetLocation?: string;
} & {
    apType: ApType;
    releaseType: ReleaseTypeOption;
    sentenceType: SentenceTypeOption;
    targetLocation: string;
});

