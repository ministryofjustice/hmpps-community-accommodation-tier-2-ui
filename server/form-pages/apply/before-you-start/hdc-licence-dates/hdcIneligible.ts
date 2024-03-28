import { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'

type HDCIneligibleBody = Record<string, never>

@Page({
  name: 'hdc-ineligible',
  bodyProperties: [],
})
export default class HDCIneligible implements TaskListPage {
  documentTitle = 'It is too late to submit a CAS-2 application'

  title = 'It is too late to submit a CAS-2 application'

  body: HDCIneligibleBody

  constructor(
    body: Partial<HDCIneligibleBody>,
    private readonly application: Application,
  ) {
    this.body = body as HDCIneligibleBody
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
