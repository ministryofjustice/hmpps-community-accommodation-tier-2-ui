/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas2AssessmentEntity } from './Cas2AssessmentEntity';
import type { Cas2StatusUpdateDetailEntity } from './Cas2StatusUpdateDetailEntity';
import type { ExternalUserEntity } from './ExternalUserEntity';
export type Cas2StatusUpdateEntity = {
    application: any;
    assessment?: Cas2AssessmentEntity;
    assessor: ExternalUserEntity;
    createdAt: string;
    description: string;
    id: string;
    label: string;
    statusId: string;
    statusUpdateDetails?: Array<Cas2StatusUpdateDetailEntity>;
};

