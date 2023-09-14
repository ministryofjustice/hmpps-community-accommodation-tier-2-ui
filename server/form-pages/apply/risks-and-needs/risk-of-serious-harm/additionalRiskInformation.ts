import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'

type AdditionalRiskInformationBody = Record<string, never>

@Page({
  name: 'additional-risk-information',
  bodyProperties: [],
})
export default class AdditionalRiskInformation implements TaskListPage {
  documentTitle = 'Additional risk information for the person'

  title = `Additional risk information for ${nameOrPlaceholderCopy(this.application.person)}`

  body: AdditionalRiskInformationBody

  constructor(
    body: Partial<AdditionalRiskInformationBody>,
    private readonly application: Application,
  ) {
    this.body = body as AdditionalRiskInformationBody
  }

  previous() {
    return 'behaviour-notes'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    return errors
  }

  response() {
    const response = {}

    return response
  }
}
