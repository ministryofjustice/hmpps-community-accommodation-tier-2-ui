/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationOrigin } from './ApplicationOrigin';
import type { Cas2ApplicationAssignmentEntity } from './Cas2ApplicationAssignmentEntity';
import type { Cas2ApplicationNoteEntity } from './Cas2ApplicationNoteEntity';
import type { Cas2AssessmentEntity } from './Cas2AssessmentEntity';
import type { Cas2StatusUpdateEntity } from './Cas2StatusUpdateEntity';
import type { Cas2UserEntity } from './Cas2UserEntity';
import type { NomisUserEntity } from './NomisUserEntity';
import type { Usertype } from './Usertype';
export type Cas2ApplicationEntity = {
    abandonedAt?: string;
    applicationAssignments: Array<Cas2ApplicationAssignmentEntity>;
    applicationOrigin: ApplicationOrigin;
    assessment?: Cas2AssessmentEntity;
    bailHearingDate?: string;
    conditionalReleaseDate?: string;
    createdAt: string;
    createdByCanonicalName: string;
    createdByCas2User?: Cas2UserEntity;
    createdById: string;
    createdByUser: NomisUserEntity;
    createdByUserEmail?: string;
    createdByUserIdentifier: string;
    createdByUserIsActive: boolean;
    createdByUserType: Usertype;
    createdByUsername: string;
    crn: string;
    currentAssignment?: Cas2ApplicationAssignmentEntity;
    currentAssignmentDate?: string;
    currentPomUserId?: string;
    currentPrisonCode?: string;
    data?: string;
    document?: string;
    hdcEligibilityDate?: string;
    id: string;
    isMostRecentStatusUpdateANonAssignableStatus: boolean;
    isTransferredApplication: boolean;
    nomsNumber?: string;
    notes?: Array<Cas2ApplicationNoteEntity>;
    preferredAreas?: string;
    referringPrisonCode?: string;
    statusUpdates?: Array<Cas2StatusUpdateEntity>;
    submittedAt?: string;
    telephoneNumber?: string;
};

