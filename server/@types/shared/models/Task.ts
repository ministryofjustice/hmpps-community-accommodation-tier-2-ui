/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApArea } from './ApArea';
import type { ApprovedPremisesUser } from './ApprovedPremisesUser';
import type { PersonSummary } from './PersonSummary';
import type { ProbationDeliveryUnit } from './ProbationDeliveryUnit';
import type { TaskStatus } from './TaskStatus';
import type { TaskType } from './TaskType';
export type Task = {
    taskType: TaskType;
    id: string;
    applicationId: string;
    personSummary: PersonSummary;
    /**
     * Superseded by personSummary which provides 'name' as well as 'personType' and 'crn'.
     * @deprecated
     */
    personName: string;
    crn: string;
    /**
     * The Due date of the task - this is deprecated in favour of the `dueAt` field
     * @deprecated
     */
    dueDate: string;
    dueAt: string;
    expectedArrivalDate?: string;
    allocatedToStaffMember?: ApprovedPremisesUser;
    status: TaskStatus;
    apArea?: ApArea;
    probationDeliveryUnit?: ProbationDeliveryUnit;
    outcomeRecordedAt?: string;
};

