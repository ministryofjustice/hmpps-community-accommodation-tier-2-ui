/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bed } from './Bed';
import type { Characteristic } from './Characteristic';
export type Room = {
    beds?: Array<Bed>;
    characteristics: Array<Characteristic>;
    code?: string;
    id: string;
    name: string;
    notes?: string;
};

