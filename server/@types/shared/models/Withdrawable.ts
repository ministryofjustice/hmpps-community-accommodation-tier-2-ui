/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DatePeriod } from './DatePeriod';
import type { WithdrawableType } from './WithdrawableType';
export type Withdrawable = {
    id: string;
    type: WithdrawableType;
    /**
     * 0, 1 or more dates can be specified depending upon the WithdrawableType
     */
    dates: Array<DatePeriod>;
};

