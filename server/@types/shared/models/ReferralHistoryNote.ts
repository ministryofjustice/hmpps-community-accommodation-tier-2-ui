/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReferralHistoryNoteMessageDetails } from './ReferralHistoryNoteMessageDetails';
export type ReferralHistoryNote = {
    id: string;
    createdAt: string;
    message?: string;
    messageDetails?: ReferralHistoryNoteMessageDetails;
    createdByUserName: string;
    type: string;
};

