/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationSummary } from './ApplicationSummary';
import type { PersonRisks } from './PersonRisks';

export type Cas2ApplicationSummary = (ApplicationSummary & {
    createdByUserId: string;
    risks?: PersonRisks;
});

