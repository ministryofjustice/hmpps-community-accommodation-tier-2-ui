/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookingSearchResultBedSummary } from './BookingSearchResultBedSummary';
import type { BookingSearchResultBookingSummary } from './BookingSearchResultBookingSummary';
import type { BookingSearchResultPersonSummary } from './BookingSearchResultPersonSummary';
import type { BookingSearchResultPremisesSummary } from './BookingSearchResultPremisesSummary';
import type { BookingSearchResultRoomSummary } from './BookingSearchResultRoomSummary';
export type BookingSearchResult = {
    person: BookingSearchResultPersonSummary;
    booking: BookingSearchResultBookingSummary;
    premises: BookingSearchResultPremisesSummary;
    room: BookingSearchResultRoomSummary;
    bed: BookingSearchResultBedSummary;
};

