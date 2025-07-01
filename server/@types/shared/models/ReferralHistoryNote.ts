/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReferralHistoryNoteMessageDetails } from './ReferralHistoryNoteMessageDetails';
export type ReferralHistoryNote = {
    createdAt: string;
    createdByUserName: string;
    id: string;
    message?: string;
    messageDetails?: ReferralHistoryNoteMessageDetails;
    type: string;
};

