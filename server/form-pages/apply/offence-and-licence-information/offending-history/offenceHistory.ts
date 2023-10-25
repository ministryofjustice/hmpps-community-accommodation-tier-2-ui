import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { OffenceHistoryDataBody } from './custom-forms/offenceHistoryData'
import { DateFormats } from '../../../../utils/dateUtils'
import { createQueryString, nameOrPlaceholderCopy } from '../../../../utils/utils'
import paths from '../../../../paths/apply'

type OffenceHistoryBody = Record<string, never>

type OffenceHistoryUI = {
  titleAndNumber: string
  offenceCategory: string
  offenceDate: string
  sentenceLength: string
  summary: string
  removeLink: string
}

@Page({
  name: 'offence-history',
  bodyProperties: [''],
})
export default class OffenceHistory implements TaskListPage {
  personName = nameOrPlaceholderCopy(this.application.person)

  documentTitle = 'Offence history'

  title = `Offence history for ${this.personName}`

  body: OffenceHistoryBody

  offences: OffenceHistoryUI[]

  pageName = 'offence-history'

  dataPageName = 'offence-history-data'

  taskName = 'offending-history'

  constructor(
    body: Partial<OffenceHistoryBody>,
    private readonly application: Application,
  ) {
    if (application.data[this.taskName]?.[this.dataPageName]) {
      const offenceHistoryData = application.data[this.taskName][this.dataPageName] as [OffenceHistoryDataBody]

      const query = {
        redirectPage: this.pageName,
      }

      this.offences = offenceHistoryData.map((offence, index) => {
        const offenceDate = DateFormats.dateAndTimeInputsToUiDate(offence, 'offenceDate')

        return {
          titleAndNumber: offence.titleAndNumber,
          offenceCategory: offence.offenceCategory,
          offenceDate,
          sentenceLength: offence.sentenceLength,
          summary: offence.summary,
          removeLink: `${paths.applications.removeFromList({
            id: application.id,
            task: this.taskName,
            page: this.dataPageName,
            index: index.toString(),
          })}?${createQueryString(query)}`,
        }
      })
    }
    this.body = body as OffenceHistoryBody
  }

  previous() {
    return 'any-previous-convictions'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    return errors
  }
}
