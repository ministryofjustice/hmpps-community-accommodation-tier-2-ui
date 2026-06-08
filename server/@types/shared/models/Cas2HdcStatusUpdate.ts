/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas2HdcStatusUpdateDetail } from './Cas2HdcStatusUpdateDetail';
import type { ExternalUser } from './ExternalUser';
export type Cas2HdcStatusUpdate = {
    description: string;
    id: string;
    label: string;
    name: string;
    statusUpdateDetails?: Array<Cas2HdcStatusUpdateDetail>;
    updatedAt?: string;
    updatedBy?: ExternalUser;
};

