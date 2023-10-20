import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'

type GuidanceBody = Record<string, never>

@Page({
  name: 'guidance',
  bodyProperties: [],
})
export default class Guidance implements TaskListPage {
  documentTitle = 'Request health information for the person'

  title = `Request health information for ${nameOrPlaceholderCopy(this.application.person)}`

  body: GuidanceBody

  constructor(
    body: Partial<GuidanceBody>,
    private readonly application: Application,
  ) {
    this.body = body as GuidanceBody
  }

  previous() {
    return 'taskList'
  }

  next() {
    return 'substance-misuse'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    return errors
  }
}
