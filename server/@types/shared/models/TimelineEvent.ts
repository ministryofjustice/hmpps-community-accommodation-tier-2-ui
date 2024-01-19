/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TimelineEventAssociatedUrl } from './TimelineEventAssociatedUrl';
import type { TimelineEventType } from './TimelineEventType';
export type TimelineEvent = {
    type?: TimelineEventType;
    id?: string;
    occurredAt?: string;
    content?: string;
    createdBy?: string;
    associatedUrls?: Array<TimelineEventAssociatedUrl>;
};

