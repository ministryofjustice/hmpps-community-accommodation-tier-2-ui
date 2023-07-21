import type { Cas2Application as Application } from '@approved-premises/api'
import type { TableRow } from '@approved-premises/ui'
import paths from '../paths/apply'

export const dashboardTableRows = (applications: Array<Application>): Array<TableRow> => {
  return applications.map(application => {
    return [nameAnchorElement(application.person.name, application.id), textValue(application.person.crn)]
  })
}
const htmlValue = (value: string) => {
  return { html: value }
}

const nameAnchorElement = (name: string, applicationId: string) => {
  return htmlValue(
    `<a href=${paths.applications.show({ id: applicationId })} data-cy-id="${applicationId}">${name}</a>`,
  )
}

const textValue = (value: string) => {
  return { text: value }
}
