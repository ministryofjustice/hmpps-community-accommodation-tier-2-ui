import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getOasysImportDateFromApplication } from '../../../utils'
import { convertKeyValuePairToCheckboxItems } from '../../../../utils/formUtils'

type HistoricalRiskBody = { historicalRiskDetail: string; confirmation: string }

@Page({
  name: 'historical-risk',
  bodyProperties: ['historicalRiskDetail', 'confirmation'],
})
export default class HistoricalRisk implements TaskListPage {
  title = `${nameOrPlaceholderCopy(this.application.person)}'s historical risks`

  questions = {
    historicalRiskDetail: {
      question: `Describe ${nameOrPlaceholderCopy(
        this.application.person,
      )}'s historical issues and needs related to self harm and suicide`,
    },
    confirmation: {
      question: 'I confirm this information is relevant and up to date.',
    },
  }

  importDate = getOasysImportDateFromApplication(this.application, 'historical-risk')

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
      [this.questions.confirmation.question]: this.body.confirmation,
    }

    return response
  }

  items() {
    return convertKeyValuePairToCheckboxItems({ confirmed: this.questions.confirmation.question }, [
      this.body.confirmation,
    ])
  }
}
