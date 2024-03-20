/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type NewRoom = {
    name: string;
    notes?: string;
    characteristicIds: Array<string>;
    /**
     * End date of the bed availability, open for availability if not specified.
     */
    bedEndDate?: string;
};

