/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Task } from './Task';
import type { User } from './User';

export type TaskWrapper = {
    task: Task;
    users: Array<User>;
};

