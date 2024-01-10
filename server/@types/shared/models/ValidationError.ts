/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InvalidParam } from './InvalidParam';
import type { Problem } from './Problem';
export type ValidationError = (Problem & {
    'invalid-params'?: Array<InvalidParam>;
});

