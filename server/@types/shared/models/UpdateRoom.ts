/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Information to update the room with
 */
export type UpdateRoom = {
    /**
     * End date of the bed availability, open for availability if not specified
     */
    bedEndDate?: string;
    characteristicIds: Array<string>;
    name?: string;
    notes?: string;
};

