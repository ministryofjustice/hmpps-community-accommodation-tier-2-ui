import type { TaskWithStatus } from '@approved-premises/ui'
import { Cas2Application as Application } from '../@types/shared'
import applyPaths from '../paths/apply'

export const statusTag = (task: TaskWithStatus): string => {
  switch (task.status) {
    case 'complete':
      return `<span id="${task.id}-status">Completed</span>`
    case 'in_progress':
      return `<strong class="govuk-tag govuk-tag--light-blue" id="${task.id}-status">In progress</strong>`
    case 'not_started':
      return `<strong class="govuk-tag govuk-tag--blue" id="${task.id}-status">Not yet started</strong>`
    default:
      return `<span id="${task.id}-status">Cannot start yet</span>`
  }
}

export const taskLink = (task: TaskWithStatus, application: Application): string => {
  if (task.status !== 'cannot_start') {
    const firstPage = Object.keys(task.pages)[0]
    const link = applyPaths.applications.pages.show({
      id: application.id,
      task: task.id,
      page: firstPage,
    })

    return `<a class="govuk-link govuk-task-list__link govuk-link--no-visited-state" href="${link}" aria-describedby="${task.id}-status" data-cy-task-name="${task.id}">${task.title}</a>`
  }
  return task.title
}
