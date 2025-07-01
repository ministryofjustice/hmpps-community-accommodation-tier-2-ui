/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApArea } from './ApArea';
import type { ApprovedPremisesUser } from './ApprovedPremisesUser';
import type { ApType } from './ApType';
import type { FullPersonSummary } from './FullPersonSummary';
import type { ProbationDeliveryUnit } from './ProbationDeliveryUnit';
import type { RestrictedPersonSummary } from './RestrictedPersonSummary';
import type { TaskStatus } from './TaskStatus';
import type { TaskType } from './TaskType';
import type { UnknownPersonSummary } from './UnknownPersonSummary';
export type Task = {
    allocatedToStaffMember?: ApprovedPremisesUser;
    apArea?: ApArea;
    apType: ApType;
    applicationId: string;
    crn: string;
    dueAt: string;
    /**
     * The Due date of the task - this is deprecated in favour of the `dueAt` field
     */
    dueDate: string;
    expectedArrivalDate?: string;
    id: string;
    outcomeRecordedAt?: string;
    /**
     * Superseded by personSummary which provides 'name' as well as 'personType' and 'crn'.
     */
    personName: string;
    personSummary: (FullPersonSummary | RestrictedPersonSummary | UnknownPersonSummary);
    probationDeliveryUnit?: ProbationDeliveryUnit;
    status: TaskStatus;
    taskType: TaskType;
};

