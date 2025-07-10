/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas2ApplicationEntity } from './Cas2ApplicationEntity';
import type { Cas2StatusUpdateEntity } from './Cas2StatusUpdateEntity';
export type Cas2AssessmentEntity = {
    application: Cas2ApplicationEntity;
    assessorName?: string;
    createdAt: string;
    id: string;
    nacroReferralId?: string;
    statusUpdates?: Array<Cas2StatusUpdateEntity>;
};

