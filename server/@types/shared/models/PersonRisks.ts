/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FlagsEnvelope } from './FlagsEnvelope';
import type { MappaEnvelope } from './MappaEnvelope';
import type { RiskTierEnvelope } from './RiskTierEnvelope';
import type { RoshRisksEnvelope } from './RoshRisksEnvelope';
export type PersonRisks = {
    crn: string;
    flags: FlagsEnvelope;
    mappa?: MappaEnvelope;
    roshRisks: RoshRisksEnvelope;
    tier: RiskTierEnvelope;
};

