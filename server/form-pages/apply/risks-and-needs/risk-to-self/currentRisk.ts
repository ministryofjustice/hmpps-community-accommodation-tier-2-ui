import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'

type CurrentRiskBody = { currentRiskDetail: string }

@Page({
  name: 'currentRisk',
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
    return 'historicalRisk'
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
