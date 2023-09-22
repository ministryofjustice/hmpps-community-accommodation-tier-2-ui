import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getOasysImportDateFromApplication } from '../../../utils'
import { convertKeyValuePairToCheckboxItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'

type RiskFactorsBody = {
  circumstancesLikelyToIncreaseRisk: string
  whenIsRiskLikelyToBeGreatest: string
  confirmation: string
}

@Page({
  name: 'risk-factors',
  bodyProperties: ['circumstancesLikelyToIncreaseRisk', 'whenIsRiskLikelyToBeGreatest', 'confirmation'],
})
export default class RiskFactors implements TaskListPage {
  documentTitle = 'Risk factors for the person'

  title = `Risk factors for ${nameOrPlaceholderCopy(this.application.person)}`

  body: RiskFactorsBody

  questions = {
    circumstancesLikelyToIncreaseRisk: {
      question: 'What circumstances are likely to increase risk?',
    },
    whenIsRiskLikelyToBeGreatest: {
      question: 'When is the risk likely to be greatest?',
      hint: 'Consider the timescale and indicate whether risk is immediate or not.',
    },
    confirmation: {
      question: 'I confirm this information is relevant and up to date.',
    },
  }

  importDate = getOasysImportDateFromApplication(this.application, 'risk-of-serious-harm')

  constructor(
    body: Partial<RiskFactorsBody>,
    private readonly application: Application,
  ) {
    this.body = body as RiskFactorsBody
  }

  previous() {
    return 'summary'
  }

  next() {
    return 'reducing-risk'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.confirmation) {
      errors.confirmation = errorLookups.oasysConfirmation.empty
    }
    if (!this.body.circumstancesLikelyToIncreaseRisk) {
      errors.circumstancesLikelyToIncreaseRisk = 'Enter the circumstances that are likely to increase risk'
    }
    if (!this.body.whenIsRiskLikelyToBeGreatest) {
      errors.whenIsRiskLikelyToBeGreatest = 'Enter when the risk is likely to be the greatest'
    }

    return errors
  }

  response() {
    const response = {
      [this.questions.circumstancesLikelyToIncreaseRisk.question]: this.body.circumstancesLikelyToIncreaseRisk,
      [this.questions.whenIsRiskLikelyToBeGreatest.question]: this.body.whenIsRiskLikelyToBeGreatest,
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
