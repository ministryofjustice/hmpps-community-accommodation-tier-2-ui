/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnyValue } from './AnyValue';
import type { ReleaseTypeOption } from './ReleaseTypeOption';

export type SubmitApplication = {
    translatedDocument: AnyValue;
    isPipeApplication: boolean;
    isWomensApplication: boolean;
    targetLocation: string;
    releaseType: ReleaseTypeOption;
    arrivalDate?: string;
};

