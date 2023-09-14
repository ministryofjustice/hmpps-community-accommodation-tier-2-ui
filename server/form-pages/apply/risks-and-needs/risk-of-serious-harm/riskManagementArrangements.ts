import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'

type RiskManagementArrangementsBody = Record<string, never>

@Page({
  name: 'risk-management-arrangements',
  bodyProperties: [],
})
export default class RiskManagementArrangements implements TaskListPage {
  documentTitle = 'Risk management arrangements for the person'

  title = `Risk management arrangements for ${nameOrPlaceholderCopy(this.application.person)}`

  body: RiskManagementArrangementsBody

  constructor(
    body: Partial<RiskManagementArrangementsBody>,
    private readonly application: Application,
  ) {
    this.body = body as RiskManagementArrangementsBody
  }

  previous() {
    return 'reducing-risk'
  }

  next() {
    return 'cell-share-information'
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
