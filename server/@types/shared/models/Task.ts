/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApArea } from './ApArea';
import type { ApprovedPremisesUser } from './ApprovedPremisesUser';
import type { TaskStatus } from './TaskStatus';
import type { TaskType } from './TaskType';
export type Task = {
    taskType: TaskType;
    id: string;
    applicationId: string;
    personName: string;
    crn: string;
    dueDate: string;
    allocatedToStaffMember?: ApprovedPremisesUser;
    status: TaskStatus;
    apArea?: ApArea;
};

