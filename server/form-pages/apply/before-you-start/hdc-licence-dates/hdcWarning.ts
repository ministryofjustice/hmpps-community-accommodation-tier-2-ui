import { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'

type HDCWarningBody = Record<string, never>

@Page({
  name: 'hdc-warning',
  bodyProperties: [],
})
export default class HDCWarning implements TaskListPage {
  documentTitle = 'It may be too late to offer this applicant a CAS-2 placement'

  title = 'It may be too late to offer this applicant a CAS-2 placement'

  body: HDCWarningBody

  constructor(
    body: Partial<HDCWarningBody>,
    private readonly application: Application,
  ) {
    this.body = body as HDCWarningBody
  }

  previous() {
    return 'hdc-licence-dates'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    return errors
  }
}
