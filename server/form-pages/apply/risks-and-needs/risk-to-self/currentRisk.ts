import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { DateFormats } from '../../../../utils/dateUtils'

type CurrentRiskBody = { currentRiskDetail: string }

@Page({
  name: 'current-risk',
  bodyProperties: ['currentRiskDetail'],
})
export default class CurrentRisk implements TaskListPage {
  title = `${nameOrPlaceholderCopy(this.application.person)}'s current risks`

  questions = {
    currentRiskDetail: {
      question: `Describe ${nameOrPlaceholderCopy(
        this.application.person,
      )}'s current issues and needs related to self harm and suicide`,
    },
  }

  body: CurrentRiskBody

  importDate = this.application.data?.['risk-to-self']?.['current-risk'].dateOfOasysImport
    ? DateFormats.isoDateToUIDate(this.application.data?.['risk-to-self']?.['current-risk'].dateOfOasysImport, {
        format: 'medium',
      })
    : null

  constructor(
    body: Partial<CurrentRiskBody>,
    private readonly application: Application,
  ) {
    this.body = body as CurrentRiskBody
  }

  previous() {
    return 'vulnerability'
  }

  next() {
    return 'historical-risk'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    return errors
  }

  response() {
    const response = {
      [this.questions.currentRiskDetail.question]: this.body.currentRiskDetail,
    }

    return response
  }
}
