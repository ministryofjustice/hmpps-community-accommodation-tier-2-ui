/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApType } from './ApType';
import type { CharacteristicPair } from './CharacteristicPair';
import type { NamedId } from './NamedId';
export type Cas1PremisesSearchResultSummary = {
    id?: string;
    apCode?: string;
    deliusQCode?: string;
    apType?: ApType;
    name?: string;
    addressLine1?: string;
    addressLine2?: string;
    town?: string;
    postcode?: string;
    apArea?: NamedId;
    /**
     * The total number of spaces in this premises
     */
    totalSpaceCount?: number;
    premisesCharacteristics?: Array<CharacteristicPair>;
};

