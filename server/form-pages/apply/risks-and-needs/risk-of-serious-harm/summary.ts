import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'

type SummaryBody = Record<string, never>

@Page({
  name: 'summary',
  bodyProperties: [],
})
export default class Summary implements TaskListPage {
  title = `Risk of serious harm (RoSH) summary for ${nameOrPlaceholderCopy(this.application.person)}`

  body: SummaryBody

  constructor(
    body: Partial<SummaryBody>,
    private readonly application: Application,
  ) {
    this.body = body as SummaryBody
  }

  previous() {
    return 'oasys-import'
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
