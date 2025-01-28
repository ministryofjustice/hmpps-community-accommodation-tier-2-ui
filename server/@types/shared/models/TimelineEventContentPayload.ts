/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NamedId } from './NamedId';
import type { TimelineEventType } from './TimelineEventType';
/**
 * Base schema for all timeline event payloads
 */
export type TimelineEventContentPayload = {
    type: TimelineEventType;
    premises: NamedId;
    schemaVersion: number;
};

