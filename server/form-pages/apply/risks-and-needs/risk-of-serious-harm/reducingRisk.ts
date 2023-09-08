import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'

type ReducingRiskBody = Record<string, never>

@Page({
  name: 'reducing-risk',
  bodyProperties: [],
})
export default class ReducingRisk implements TaskListPage {
  title = `Reducing risk for ${nameOrPlaceholderCopy(this.application.person)}`

  body: ReducingRiskBody

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

    return errors
  }

  response() {
    const response = {}

    return response
  }
}
