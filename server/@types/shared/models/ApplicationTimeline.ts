/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApprovedPremisesApplicationStatus } from './ApprovedPremisesApplicationStatus';
import type { TimelineEvent } from './TimelineEvent';
import type { User } from './User';
export type ApplicationTimeline = {
    id: string;
    createdAt: string;
    isOfflineApplication: boolean;
    status?: ApprovedPremisesApplicationStatus;
    createdBy?: User;
    timelineEvents: Array<TimelineEvent>;
};

