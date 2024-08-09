/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Task } from './Task';
import type { UserWithWorkload } from './UserWithWorkload';
export type TaskWrapper = {
    task: Task;
    /**
     * Users to whom this task can be allocated
     */
    users: Array<UserWithWorkload>;
};

