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

type WhoIsAtRiskBody = { whoIsAtRisk: string; confirmation: string }

@Page({
  name: 'who-is-at-risk',
  bodyProperties: ['whoIsAtRisk', 'confirmation'],
})
export default class WhoIsAtRisk implements TaskListPage {
  documentTitle = 'People at risk from the person'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `People at risk from ${this.personName}`

  body: WhoIsAtRiskBody

  questions = getQuestions(this.personName)['risk-of-serious-harm']['who-is-at-risk']

  importDate = getOasysImportDateFromApplication(this.application, 'risk-of-serious-harm')

  hasOasysRecord: boolean

  constructor(
    body: Partial<WhoIsAtRiskBody>,
    private readonly application: Application,
  ) {
    this.body = body as WhoIsAtRiskBody
    this.hasOasysRecord = hasOasys(application, 'risk-of-serious-harm')
  }

  previous() {
    return 'summary'
  }

  next() {
    return 'nature-of-the-risk'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.whoIsAtRisk) {
      errors.whoIsAtRisk = errorLookups.whoIsAtRisk.empty
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
