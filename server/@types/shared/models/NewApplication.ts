/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationOrigin } from './ApplicationOrigin';
/**
 * Information to create a blank application with
 */
export type NewApplication = {
    applicationOrigin?: ApplicationOrigin;
    convictionId?: number;
    crn: string;
    deliusEventNumber?: string;
    offenceId?: string;
};

