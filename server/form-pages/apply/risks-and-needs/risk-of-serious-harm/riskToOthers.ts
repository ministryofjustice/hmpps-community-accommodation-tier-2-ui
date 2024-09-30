import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getOasysImportDateFromApplication } from '../../../utils'
import { convertKeyValuePairToCheckboxItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'
import { getQuestions } from '../../../utils/questions'
import { hasOasys } from '../../../../utils/applicationUtils'

type RiskToOthersBody = { whoIsAtRisk: string; natureOfRisk: string; confirmation: string }

@Page({
  name: 'risk-to-others',
  bodyProperties: ['whoIsAtRisk', 'natureOfRisk', 'confirmation'],
})
export default class RiskToOthers implements TaskListPage {
  documentTitle = 'Risk to others for the person'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Risk to others for ${this.personName}`

  body: RiskToOthersBody

  questions = getQuestions(this.personName)['risk-of-serious-harm']['risk-to-others']

  importDate = getOasysImportDateFromApplication(this.application, 'risk-of-serious-harm')

  hasOasysRecord: boolean

  constructor(
    body: Partial<RiskToOthersBody>,
    private readonly application: Application,
  ) {
    this.body = body as RiskToOthersBody
    this.hasOasysRecord = hasOasys(application, 'risk-of-serious-harm')
  }

  previous() {
    return 'summary'
  }

  next() {
    return 'risk-management-arrangements'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.whoIsAtRisk) {
      errors.whoIsAtRisk = errorLookups.whoIsAtRisk.empty
    }
    if (!this.body.natureOfRisk) {
      errors.natureOfRisk = errorLookups.natureOfRisk.empty
    }
    if (!this.body.confirmation) {
      errors.confirmation = errorLookups.oasysConfirmation.empty
    }

    return errors
  }

  items() {
    return convertKeyValuePairToCheckboxItems({ confirmed: this.questions.confirmation.question }, [
      this.body.confirmation,
    ])
  }
}
