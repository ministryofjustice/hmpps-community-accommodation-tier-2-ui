import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { DateFormats } from '../../../../utils/dateUtils'

type HistoricalRiskBody = { historicalRiskDetail: string }

@Page({
  name: 'historical-risk',
  bodyProperties: ['historicalRiskDetail'],
})
export default class HistoricalRisk implements TaskListPage {
  title = `${nameOrPlaceholderCopy(this.application.person)}'s historical risks`

  questions = {
    historicalRiskDetail: {
      question: `Describe ${nameOrPlaceholderCopy(
        this.application.person,
      )}'s historical issues and needs related to self harm and suicide`,
    },
  }

  importDate = this.application.data?.['risk-to-self']?.['historical-risk'].dateOfOasysImport
    ? DateFormats.isoDateToUIDate(this.application.data?.['risk-to-self']?.['historical-risk'].dateOfOasysImport, {
        format: 'medium',
      })
    : null

  body: HistoricalRiskBody

  constructor(
    body: Partial<HistoricalRiskBody>,
    private readonly application: Application,
  ) {
    this.body = body as HistoricalRiskBody
  }

  previous() {
    return 'current-risk'
  }

  next() {
    return 'acct'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    return errors
  }

  response() {
    const response = {
      [this.questions.historicalRiskDetail.question]: this.body.historicalRiskDetail,
    }

    return response
  }
}
