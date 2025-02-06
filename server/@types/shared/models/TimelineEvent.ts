/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TimelineEventAssociatedUrl } from './TimelineEventAssociatedUrl';
import type { TimelineEventType } from './TimelineEventType';
import type { TriggerSourceType } from './TriggerSourceType';
import type { User } from './User';
export type TimelineEvent = {
    type?: TimelineEventType;
    id?: string;
    occurredAt?: string;
    content?: string;
    createdBy?: User;
    associatedUrls?: Array<TimelineEventAssociatedUrl>;
    triggerSource?: TriggerSourceType;
};

