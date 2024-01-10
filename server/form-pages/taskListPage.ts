/* istanbul ignore file */

import type { DataServices, FormArtifact, TaskListErrors } from '@approved-premises/ui'

export interface TaskListPageInterface {
  new (body: Record<string, unknown>, document?: FormArtifact, previousPage?: string): TaskListPage
  initialize?(
    body: Record<string, unknown>,
    document: FormArtifact,
    token: string,
    dataServices: DataServices,
  ): Promise<TaskListPage>
}

export default abstract class TaskListPage {
  /** 
   * content for the HTML document <title> element, should not contain any PII
     (such as person's name) to avoid data leaks. 
   */
  abstract documentTitle: string

  abstract title: string

  abstract body: Record<string, unknown>

  abstract previous(): string

  abstract next(): string

  abstract errors(): TaskListErrors<this>

  abstract response?(): Record<string, string>

  abstract onSave?(): void
}
