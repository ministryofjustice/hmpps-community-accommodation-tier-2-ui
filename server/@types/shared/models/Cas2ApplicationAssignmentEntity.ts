/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas2ApplicationEntity } from './Cas2ApplicationEntity';
import type { NomisUserEntity } from './NomisUserEntity';
export type Cas2ApplicationAssignmentEntity = {
    allocatedPomUser?: NomisUserEntity;
    application: Cas2ApplicationEntity;
    createdAt: string;
    id: string;
    prisonCode: string;
};

