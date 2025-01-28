/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cas1SpaceCharacteristic } from './Cas1SpaceCharacteristic';
import type { TimelineEventContentPayload } from './TimelineEventContentPayload';
export type BookingChangedContentPayload = (TimelineEventContentPayload & {
    expectedArrival: string;
    expectedDeparture: string;
    /**
     * Only populated if the new value is different, and where schema version = 2
     */
    previousExpectedArrival?: string;
    /**
     * Only populated if the new value is different, and where schema version = 2
     */
    previousExpectedDeparture?: string;
    characteristics?: Array<Cas1SpaceCharacteristic>;
    /**
     * Only populated if the new value is different, and where schema version = 2
     */
    previousCharacteristics?: Array<Cas1SpaceCharacteristic>;
});

