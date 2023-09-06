import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'

type RiskToOthersBody = Record<string, never>

@Page({
  name: 'risk-to-others',
  bodyProperties: [],
})
export default class RiskToOthers implements TaskListPage {
  title = `Risk to others for ${nameOrPlaceholderCopy(this.application.person)}`

  body: RiskToOthersBody

  constructor(
    body: Partial<RiskToOthersBody>,
    private readonly application: Application,
  ) {
    this.body = body as RiskToOthersBody
  }

  previous() {
    return 'summary'
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
