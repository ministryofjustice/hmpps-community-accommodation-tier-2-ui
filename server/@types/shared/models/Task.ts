/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApprovedPremisesUser } from './ApprovedPremisesUser';
import type { Person } from './Person';
import type { TaskStatus } from './TaskStatus';
import type { TaskType } from './TaskType';

export type Task = {
    taskType: TaskType;
    applicationId: string;
    person: Person;
    dueDate: string;
    allocatedToStaffMember: ApprovedPremisesUser;
    status: TaskStatus;
};

