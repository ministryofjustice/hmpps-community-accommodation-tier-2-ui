/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubmitCas2Application = {
    /**
     * Id of the application being submitted
     */
    applicationId: string;
    conditionalReleaseDate?: string;
    hdcEligibilityDate?: string;
    /**
     * First and second preferences for where the accommodation should be located, pipe-separated
     */
    preferredAreas?: string;
    telephoneNumber: string;
    translatedDocument: any;
};

