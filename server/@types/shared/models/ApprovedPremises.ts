/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocalAuthorityArea } from './LocalAuthorityArea';
import type { Premises } from './Premises';
export type ApprovedPremises = (Premises & {
    apCode?: string;
} & {
    localAuthorityArea: LocalAuthorityArea;
    apCode: string;
});

