import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'

type RiskFactorsBody = Record<string, never>

@Page({
  name: 'risk-factors',
  bodyProperties: [],
})
export default class RiskFactors implements TaskListPage {
  documentTitle = 'Risk factors for the person'

  title = `Risk factors for ${nameOrPlaceholderCopy(this.application.person)}`

  body: RiskFactorsBody

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

    return errors
  }

  response() {
    const response = {}

    return response
  }
}
