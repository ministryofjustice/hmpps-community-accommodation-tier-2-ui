import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../../utils/decorators'
import TaskListPage from '../../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../../utils/utils'

type OasysImportBody = Record<string, never>

@Page({
  name: 'oasys-import',
  bodyProperties: [],
})
export default class OasysImport implements TaskListPage {
  title = `Import ${nameOrPlaceholderCopy(this.application.person)}'s risk of serious harm (RoSH) data from OASys`

  body: OasysImportBody

  constructor(
    body: Partial<OasysImportBody>,
    private readonly application: Application,
  ) {
    this.body = body as OasysImportBody
  }

  previous() {
    return 'taskList'
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
