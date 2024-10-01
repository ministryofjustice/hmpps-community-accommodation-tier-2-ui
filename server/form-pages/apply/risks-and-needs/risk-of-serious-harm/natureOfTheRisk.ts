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

type NatureOfTheRisksBody = { natureOfRisk: string; confirmation: string }

@Page({
  name: 'nature-of-the-risk',
  bodyProperties: ['natureOfRisk', 'confirmation'],
})
export default class NatureOfTheRisk implements TaskListPage {
  documentTitle = 'Nature of the risk from the person'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Nature of the risk from ${this.personName}`

  body: NatureOfTheRisksBody

  questions = getQuestions(this.personName)['risk-of-serious-harm']['nature-of-the-risk']

  importDate = getOasysImportDateFromApplication(this.application, 'risk-of-serious-harm')

  hasOasysRecord: boolean

  constructor(
    body: Partial<NatureOfTheRisksBody>,
    private readonly application: Application,
  ) {
    this.body = body as NatureOfTheRisksBody
    this.hasOasysRecord = hasOasys(application, 'risk-of-serious-harm')
  }

  previous() {
    return 'who-is-at-risk'
  }

  next() {
    return 'risk-management-arrangements'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

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
