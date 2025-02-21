/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas2v2StatusUpdateDetail } from './Cas2v2StatusUpdateDetail';
import type { Cas2v2User } from './Cas2v2User';
export type Cas2v2StatusUpdate = {
    id: string;
    name: string;
    label: string;
    description: string;
    updatedBy?: Cas2v2User;
    updatedAt?: string;
    statusUpdateDetails?: Array<Cas2v2StatusUpdateDetail>;
};

