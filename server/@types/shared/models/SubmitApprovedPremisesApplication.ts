/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas1ApplicationUserDetails } from './Cas1ApplicationUserDetails';
import type { ReleaseTypeOption } from './ReleaseTypeOption';
import type { SentenceTypeOption } from './SentenceTypeOption';
import type { SituationOption } from './SituationOption';
import type { SubmitApplication } from './SubmitApplication';
export type SubmitApprovedPremisesApplication = (SubmitApplication & {
    isPipeApplication: boolean;
    isWomensApplication: boolean;
    isEmergencyApplication: boolean;
    isEsapApplication: boolean;
    targetLocation: string;
    releaseType: ReleaseTypeOption;
    sentenceType: SentenceTypeOption;
    situation?: SituationOption;
    arrivalDate?: string;
    apAreaId?: string;
    applicantUserDetails?: Cas1ApplicationUserDetails;
    caseManagerIsNotApplicant?: boolean;
    caseManagerUserDetails?: Cas1ApplicationUserDetails;
});

