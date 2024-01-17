import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getQuestions } from '../../../utils/questions'

export type AdditionalInformationBody = { hasAdditionalInformation: YesOrNo; additionalInformationDetail: string }

@Page({
  name: 'additional-information',
  bodyProperties: ['hasAdditionalInformation', 'additionalInformationDetail'],
})
export default class AdditionalInformation implements TaskListPage {
  title = 'Additional Information'

  documentTitle = this.title

  questions = getQuestions(nameOrPlaceholderCopy(this.application.person))['risk-to-self']['additional-information']

  body: AdditionalInformationBody

  constructor(
    body: Partial<AdditionalInformationBody>,
    private readonly application: Application,
  ) {
    this.body = body as AdditionalInformationBody
  }

  previous() {
    return 'acct'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.hasAdditionalInformation) {
      errors.hasAdditionalInformation = 'Confirm whether you have additional information'
    }
    if (this.body.hasAdditionalInformation === 'yes' && !this.body.additionalInformationDetail) {
      errors.additionalInformationDetail = 'Provide additional information about their risk to self'
    }

    return errors
  }

  onSave(): void {
    if (this.body.hasAdditionalInformation !== 'yes') {
      delete this.body.additionalInformationDetail
    }
  }
}
