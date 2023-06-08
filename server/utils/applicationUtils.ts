import type { Cas2Application as Application } from '@approved-premises/api'
import type { TableRow } from '@approved-premises/ui'

export const dashboardTableRows = (applications: Array<Application>): Array<TableRow> => {
  return applications.map(application => {
    return [textValue(application.person.name), textValue(application.person.crn)]
  })
}

const textValue = (value: string) => {
  return { text: value }
}
