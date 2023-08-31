import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'

type AdditionalInformationBody = { additionalInformationDetail: string }

@Page({
  name: 'additional-information',
  bodyProperties: ['additionalInformationDetail'],
})
export default class AdditionalInformation implements TaskListPage {
  title = 'Additional Information'

  questions = {
    additionalInformationDetail: {
      question: `Is there anything else to include about ${nameOrPlaceholderCopy(
        this.application.person,
      )}'s risk to self? (Optional)`,
    },
  }

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

    return errors
  }

  response() {
    const response = {
      [this.questions.additionalInformationDetail.question]: this.body.additionalInformationDetail,
    }

    return response
  }
}
