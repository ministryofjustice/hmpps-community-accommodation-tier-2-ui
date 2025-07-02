/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas2StatusUpdateDetail } from './Cas2StatusUpdateDetail';
import type { ExternalUser } from './ExternalUser';
export type Cas2StatusUpdate = {
    description: string;
    id: string;
    label: string;
    name: string;
    statusUpdateDetails?: Array<Cas2StatusUpdateDetail>;
    updatedAt?: string;
    updatedBy?: ExternalUser;
};

