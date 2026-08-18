/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TierVersionDto } from './TierVersionDto';
export type TierDto = {
    /**
     * The date that the tier score last changed, or the most recent calculation date if this is the first time we've captured the tier for the given CRN
     */
    calculationDate: string;
    /**
     * Provisional will only be provided when version is V3
     */
    provisional?: boolean;
    tierScore: string;
    version: TierVersionDto;
};

