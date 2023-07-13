/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Characteristic = {
    id: string;
    name: string;
    propertyName?: string;
    serviceScope: 'approved-premises' | 'temporary-accommodation' | '*';
    modelScope: 'premises' | 'room' | '*';
};

