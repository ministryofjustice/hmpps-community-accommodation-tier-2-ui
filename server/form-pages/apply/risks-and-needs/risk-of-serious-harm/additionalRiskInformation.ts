import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getQuestions } from '../../../utils/questions'

export type AdditionalRiskInformationBody = { hasAdditionalInformation: YesOrNo; additionalInformationDetail: string }

@Page({
  name: 'additional-risk-information',
  bodyProperties: ['hasAdditionalInformation', 'additionalInformationDetail'],
})
export default class AdditionalRiskInformation implements TaskListPage {
  documentTitle = 'Additional risk information for the person'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Additional risk information for ${this.personName}`

  body: AdditionalRiskInformationBody

  exampleField = 'something'

  questions = getQuestions(this.personName)['risk-of-serious-harm']['additional-risk-information']

  constructor(
    body: Partial<AdditionalRiskInformationBody>,
    private readonly application: Application,
  ) {
    this.body = body as AdditionalRiskInformationBody
  }

  previous() {
    return 'cell-share-information'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.hasAdditionalInformation) {
      errors.hasAdditionalInformation = 'Select whether there is any additional risk information'
    }
    if (this.body.hasAdditionalInformation === 'yes' && !this.body.additionalInformationDetail) {
      errors.additionalInformationDetail = 'Enter additional information for risk to others'
    }

    return errors
  }

  onSave(): void {
    if (this.body.hasAdditionalInformation !== 'yes') {
      delete this.body.additionalInformationDetail
    }
  }
}
