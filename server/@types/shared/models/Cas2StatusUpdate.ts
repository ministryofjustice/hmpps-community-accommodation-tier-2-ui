/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas2StatusUpdateDetail } from './Cas2StatusUpdateDetail';
import type { ExternalUser } from './ExternalUser';
export type Cas2StatusUpdate = {
    id: string;
    name: string;
    label: string;
    description: string;
    updatedBy?: ExternalUser;
    updatedAt?: string;
    statusUpdateDetails?: Array<Cas2StatusUpdateDetail>;
};

