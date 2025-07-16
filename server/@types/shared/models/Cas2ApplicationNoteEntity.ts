/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas2ApplicationEntity } from './Cas2ApplicationEntity';
import type { Cas2AssessmentEntity } from './Cas2AssessmentEntity';
import type { ExternalUserEntity } from './ExternalUserEntity';
import type { NomisUserEntity } from './NomisUserEntity';
export type Cas2ApplicationNoteEntity = {
    application: Cas2ApplicationEntity;
    assessment?: Cas2AssessmentEntity;
    body: string;
    createdAt: string;
    createdByCas2User?: any;
    createdByExternalUser?: ExternalUserEntity;
    createdByNomisUser?: NomisUserEntity;
    createdByUser: (ExternalUserEntity | NomisUserEntity);
    id: string;
    user: (ExternalUserEntity | NomisUserEntity);
};

