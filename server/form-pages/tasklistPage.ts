/* istanbul ignore file */

import type { DataServices, FormArtifact, PageResponse, TaskListErrors } from '@approved-premises/ui'

export interface TasklistPageInterface {
  new (body: Record<string, unknown>, document?: FormArtifact, previousPage?: string): TasklistPage
  initialize?(
    body: Record<string, unknown>,
    document: FormArtifact,
    token: string,
    dataServices: DataServices,
  ): Promise<TasklistPage>
}

export default abstract class TasklistPage {
  abstract title: string

  abstract body: Record<string, unknown>

  abstract previous(): string

  abstract next(): string

  abstract errors(): TaskListErrors<this>

  abstract response(): PageResponse
}
