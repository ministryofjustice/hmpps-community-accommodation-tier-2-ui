/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApType } from './ApType';
import type { Cas1SpaceNeedCharacteristic } from './Cas1SpaceNeedCharacteristic';
import type { Cas1SpaceRiskCharacteristic } from './Cas1SpaceRiskCharacteristic';
import type { Gender } from './Gender';
export type Cas1SpaceBookingRequirements = {
    apType: ApType;
    needCharacteristics?: Array<Cas1SpaceNeedCharacteristic>;
    riskCharacteristics?: Array<Cas1SpaceRiskCharacteristic>;
    gender: Gender;
};

