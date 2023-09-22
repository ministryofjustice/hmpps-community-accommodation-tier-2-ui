import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getOasysImportDateFromApplication } from '../../../utils'
import { convertKeyValuePairToCheckboxItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'

type ReducingRiskBody = {
  factorsLikelyToReduceRisk: string
  confirmation: string
}

@Page({
  name: 'reducing-risk',
  bodyProperties: ['factorsLikelyToReduceRisk', 'confirmation'],
})
export default class ReducingRisk implements TaskListPage {
  documentTitle = 'Reducing risk for the person'

  title = `Reducing risk for ${nameOrPlaceholderCopy(this.application.person)}`

  body: ReducingRiskBody

  questions = {
    factorsLikelyToReduceRisk: {
      question: 'What factors are likely to reduce risk?',
      hint: 'Describe factors, actions and events which might reduce or contain the level of risk now and in the future.',
    },
    confirmation: {
      question: 'I confirm this information is relevant and up to date.',
    },
  }

  importDate = getOasysImportDateFromApplication(this.application, 'risk-of-serious-harm')

  constructor(
    body: Partial<ReducingRiskBody>,
    private readonly application: Application,
  ) {
    this.body = body as ReducingRiskBody
  }

  previous() {
    return 'risk-factors'
  }

  next() {
    return 'risk-management-arrangements'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.confirmation) {
      errors.confirmation = errorLookups.oasysConfirmation.empty
    }
    if (!this.body.factorsLikelyToReduceRisk) {
      errors.factorsLikelyToReduceRisk = 'Enter the factors that are likely to increase risk'
    }

    return errors
  }

  response() {
    const response = {
      [this.questions.factorsLikelyToReduceRisk.question]: this.body.factorsLikelyToReduceRisk,
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
