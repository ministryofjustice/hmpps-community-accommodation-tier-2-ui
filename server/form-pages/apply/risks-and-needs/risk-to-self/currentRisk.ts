import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getOasysImportDateFromApplication } from '../../../utils'
import { convertKeyValuePairToCheckboxItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'

type CurrentRiskBody = { currentRiskDetail: string; confirmation: string }

@Page({
  name: 'current-risk',
  bodyProperties: ['currentRiskDetail', 'confirmation'],
})
export default class CurrentRisk implements TaskListPage {
  title = `${nameOrPlaceholderCopy(this.application.person)}'s current risks`

  questions = {
    currentRiskDetail: {
      question: `Describe ${nameOrPlaceholderCopy(
        this.application.person,
      )}'s current issues and needs related to self harm and suicide`,
    },
    confirmation: {
      question: 'I confirm this information is relevant and up to date.',
    },
  }

  body: CurrentRiskBody

  importDate = getOasysImportDateFromApplication(this.application, 'current-risk')

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

    if (!this.body.confirmation) {
      errors.confirmation = errorLookups.oasysConfirmation.empty
    }

    return errors
  }

  response() {
    const response = {
      [this.questions.currentRiskDetail.question]: this.body.currentRiskDetail,
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
