/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Premises } from './Premises';
import type { ProbationDeliveryUnit } from './ProbationDeliveryUnit';
export type TemporaryAccommodationPremises = (Premises & {
    pdu?: string;
    probationDeliveryUnit?: ProbationDeliveryUnit;
    turnaroundWorkingDayCount?: number;
} & {
    pdu: string;
});

